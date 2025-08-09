<?php

namespace App\Services\Concretes;

use App\Services\Contracts\PermissionHelperServiceInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class PermissionHelperService implements PermissionHelperServiceInterface
{
    /**
     * Get comprehensive user permissions data
     */
    public function getUserPermissionsData($user): array
    {
        $allPermissions = $user->getAllPermissions();
        $roleNames = $user->getRoleNames()->toArray();
        
        return [
            // Basic user info
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roleNames,
                'highest_role' => $this->getHighestRole($roleNames),
                'is_super_admin' => $this->isSuperAdmin($user),
            ],
            
            // Permissions organized by module
            'modules' => $this->groupPermissionsByModule($allPermissions),
            
            // Flat permission arrays for backward compatibility
            'permissions' => $allPermissions->pluck('name')->toArray(),
            'roles' => $roleNames,
            
            // Permission matrix for easy frontend checking
            'matrix' => $this->createPermissionMatrix($allPermissions),
            
            // Permission counts for UI display
            'counts' => [
                'total_permissions' => $allPermissions->count(),
                'total_roles' => count($roleNames),
                'modules_with_access' => count($this->groupPermissionsByModule($allPermissions)),
            ],
            
            // Permission categories
            'categories' => $this->categorizePermissions($allPermissions),
            
            // Module access levels
            'module_access' => $this->getModuleAccessLevels($allPermissions),
        ];
    }

    /**
     * Group permissions by module/context
     */
    public function groupPermissionsByModule($permissions): array
    {
        $grouped = [];
        
        foreach ($permissions as $permission) {
            $parts = explode('_', $permission->name);
            
            if (count($parts) >= 2) {
                $module = $parts[0]; // First part is usually the module
                $action = implode('_', array_slice($parts, 1)); // Rest is the action
                
                if (!isset($grouped[$module])) {
                    $grouped[$module] = [
                        'permissions' => [],
                        'actions' => [],
                        'count' => 0,
                        'can_view' => false,
                        'can_create' => false,
                        'can_edit' => false,
                        'can_delete' => false,
                        'can_manage' => false,
                    ];
                }
                
                $grouped[$module]['permissions'][] = $permission->name;
                $grouped[$module]['actions'][] = $action;
                $grouped[$module]['count']++;
                
                // Set specific action flags
                switch ($action) {
                    case 'view':
                        $grouped[$module]['can_view'] = true;
                        break;
                    case 'create':
                        $grouped[$module]['can_create'] = true;
                        break;
                    case 'edit':
                        $grouped[$module]['can_edit'] = true;
                        break;
                    case 'delete':
                        $grouped[$module]['can_delete'] = true;
                        break;
                    case 'manage':
                        $grouped[$module]['can_manage'] = true;
                        break;
                }
            } else {
                // Handle permissions without clear module structure
                if (!isset($grouped['general'])) {
                    $grouped['general'] = [
                        'permissions' => [],
                        'actions' => [],
                        'count' => 0,
                        'can_view' => false,
                        'can_create' => false,
                        'can_edit' => false,
                        'can_delete' => false,
                        'can_manage' => false,
                    ];
                }
                
                $grouped['general']['permissions'][] = $permission->name;
                $grouped['general']['actions'][] = $permission->name;
                $grouped['general']['count']++;
            }
        }
        
        return $grouped;
    }

    /**
     * Create a flat permission matrix for easy checking
     */
    public function createPermissionMatrix($permissions): array
    {
        $matrix = [];
        
        foreach ($permissions as $permission) {
            $matrix[$permission->name] = true;
            
            // Also add wildcard permissions for easier checking
            $parts = explode('_', $permission->name);
            if (count($parts) >= 2) {
                $module = $parts[0];
                $action = implode('_', array_slice($parts, 1));
                
                // Add module-level wildcard
                $matrix["{$module}_*"] = true;
                
                // Add action-level wildcard for common patterns
                if (in_array($action, ['view', 'create', 'edit', 'delete', 'manage'])) {
                    $matrix["*_{$action}"] = true;
                }
            }
        }
        
        return array_keys($matrix);
    }

    /**
     * Categorize permissions by type
     */
    public function categorizePermissions($permissions): array
    {
        $categories = [
            'view' => [],
            'create' => [],
            'edit' => [],
            'delete' => [],
            'manage' => [],
            'other' => [],
        ];
        
        foreach ($permissions as $permission) {
            $parts = explode('_', $permission->name);
            $action = end($parts);
            
            if (isset($categories[$action])) {
                $categories[$action][] = $permission->name;
            } else {
                $categories['other'][] = $permission->name;
            }
        }
        
        return $categories;
    }

    /**
     * Get module access levels
     */
    public function getModuleAccessLevels($permissions): array
    {
        $moduleAccess = [];
        
        foreach ($permissions as $permission) {
            $parts = explode('_', $permission->name);
            
            if (count($parts) >= 2) {
                $module = $parts[0];
                $action = implode('_', array_slice($parts, 1));
                
                if (!isset($moduleAccess[$module])) {
                    $moduleAccess[$module] = [
                        'level' => 'none',
                        'permissions' => [],
                    ];
                }
                
                $moduleAccess[$module]['permissions'][] = $permission->name;
                
                // Determine access level
                $currentLevel = $moduleAccess[$module]['level'];
                $newLevel = $this->getAccessLevel($action);
                
                if ($this->isHigherLevel($newLevel, $currentLevel)) {
                    $moduleAccess[$module]['level'] = $newLevel;
                }
            }
        }
        
        return $moduleAccess;
    }

    /**
     * Get access level from action
     */
    private function getAccessLevel(string $action): string
    {
        $levels = [
            'view' => 'read',
            'create' => 'write',
            'edit' => 'write',
            'delete' => 'admin',
            'manage' => 'admin',
        ];
        
        return $levels[$action] ?? 'none';
    }

    /**
     * Check if new level is higher than current level
     */
    private function isHigherLevel(string $newLevel, string $currentLevel): bool
    {
        $levelHierarchy = [
            'none' => 0,
            'read' => 1,
            'write' => 2,
            'admin' => 3,
        ];
        
        return ($levelHierarchy[$newLevel] ?? 0) > ($levelHierarchy[$currentLevel] ?? 0);
    }

    /**
     * Get user's highest role for UI display
     */
    public function getHighestRole(array $roles): ?string
    {
        $roleHierarchy = [
            'super_admin' => 100,
            'admin' => 90,
            'manager' => 80,
            'supervisor' => 70,
            'user' => 50,
            'guest' => 10,
        ];
        
        $highestRole = null;
        $highestScore = 0;
        
        foreach ($roles as $role) {
            $score = $roleHierarchy[$role] ?? 0;
            if ($score > $highestScore) {
                $highestScore = $score;
                $highestRole = $role;
            }
        }
        
        return $highestRole;
    }

    /**
     * Check if user is super admin
     */
    public function isSuperAdmin($user): bool
    {
        return $user->hasRole('superadmin') || $user->hasPermissionTo('*');
    }

    /**
     * Check if user has permission for a specific action
     */
    public function checkPermission(string $permission): void
    {
        if (!Auth::user()->can($permission)) {
            abort(403, "Access denied. Required permission: {$permission}");
        }
    }

    /**
     * Check if user has any of the given permissions
     */
    public function checkAnyPermission(array $permissions): void
    {
        $user = Auth::user();
        $hasPermission = false;
        
        foreach ($permissions as $permission) {
            if ($user->can($permission)) {
                $hasPermission = true;
                break;
            }
        }
        
        if (!$hasPermission) {
            abort(403, "Access denied. Required one of: " . implode(', ', $permissions));
        }
    }

    /**
     * Check if user has all of the given permissions
     */
    public function checkAllPermissions(array $permissions): void
    {
        $user = Auth::user();
        
        foreach ($permissions as $permission) {
            if (!$user->can($permission)) {
                abort(403, "Access denied. Required permission: {$permission}");
            }
        }
    }

    /**
     * Get permissions for a specific module
     */
    public function getModulePermissions(string $module): array
    {
        $user = Auth::user();
        $allPermissions = $user->getAllPermissions();
        
        $modulePermissions = [];
        
        foreach ($allPermissions as $permission) {
            if (str_starts_with($permission->name, $module . '_')) {
                $modulePermissions[] = $permission->name;
            }
        }
        
        return $modulePermissions;
    }

    /**
     * Check if user can access a specific module
     */
    public function canAccessModule(string $module): bool
    {
        $user = Auth::user();
        return $user->can("{$module}_view") || 
               $user->can("{$module}_manage") || 
               $user->hasRole('super_admin');
    }
}
