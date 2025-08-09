<?php

namespace App\Http\Controllers\Modules\Base;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

abstract class ModuleController extends Controller
{
    /**
     * Get user permissions using Spatie Laravel Permission with improved structure
     */
    protected function getUserPermissions($user): array
    {
        // Get all permissions the user has (direct + through roles)
        $allPermissions = $user->getAllPermissions();
        $roleNames = $user->getRoleNames()->toArray();
        
        // Group permissions by module/context
        $permissionsByModule = $this->groupPermissionsByModule($allPermissions);
        
        // Create permission matrix for easy frontend checking
        $permissionMatrix = $this->createPermissionMatrix($allPermissions);
        
        // Get user's highest role for UI display
        $highestRole = $this->getHighestRole($roleNames);
        
        return [
            // Basic user info
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roleNames,
                'highest_role' => $highestRole,
            ],
            
            // Permissions organized by module
            'modules' => $permissionsByModule,
            
            // Flat permission arrays for backward compatibility
            'permissions' => $allPermissions->pluck('name')->toArray(),
            'roles' => $roleNames,
            
            // Permission matrix for easy frontend checking
            'matrix' => $permissionMatrix,
            
            // Permission counts for UI display
            'counts' => [
                'total_permissions' => $allPermissions->count(),
                'total_roles' => count($roleNames),
                'modules_with_access' => count($permissionsByModule),
            ],
            
            // Helper methods for frontend
            'helpers' => [
                'has_permission' => function($permission) use ($permissionMatrix) {
                    return in_array($permission, $permissionMatrix);
                },
                'has_role' => function($role) use ($roleNames) {
                    return in_array($role, $roleNames);
                },
                'can_access_module' => function($module) use ($permissionsByModule) {
                    return isset($permissionsByModule[$module]);
                },
            ],
        ];
    }

    /**
     * Group permissions by module/context
     */
    private function groupPermissionsByModule($permissions): array
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
                    ];
                }
                
                $grouped[$module]['permissions'][] = $permission->name;
                $grouped[$module]['actions'][] = $action;
                $grouped[$module]['count']++;
            } else {
                // Handle permissions without clear module structure
                if (!isset($grouped['general'])) {
                    $grouped['general'] = [
                        'permissions' => [],
                        'actions' => [],
                        'count' => 0,
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
    private function createPermissionMatrix($permissions): array
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
     * Get user's highest role for UI display
     */
    private function getHighestRole(array $roles): ?string
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
     * Check if user has permission for a specific action
     */
    protected function checkPermission(string $permission): void
    {
        if (!Auth::user()->can($permission)) {
            abort(403, "Access denied. Required permission: {$permission}");
        }
    }

    /**
     * Check if user has any of the given permissions
     */
    protected function checkAnyPermission(array $permissions): void
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
    protected function checkAllPermissions(array $permissions): void
    {
        $user = Auth::user();
        
        foreach ($permissions as $permission) {
            if (!$user->can($permission)) {
                abort(403, "Access denied. Required permission: {$permission}");
            }
        }
    }

    /**
     * Get module data - to be implemented by each module
     */
    abstract protected function getModuleData(): array;

    /**
     * Get module ID - to be implemented by each module
     */
    abstract protected function getModuleId(): string;

    /**
     * Get module name - to be implemented by each module
     */
    abstract protected function getModuleName(): string;

    /**
     * Get module description - to be implemented by each module
     */
    abstract protected function getModuleDescription(): string;

    /**
     * Get module icon - to be implemented by each module
     */
    abstract protected function getModuleIcon(): string;

    /**
     * Get module color - to be implemented by each module
     */
    abstract protected function getModuleColor(): string;

    /**
     * Get module sub-pages - to be implemented by each module
     */
    abstract protected function getModuleSubPages(): array;
}
