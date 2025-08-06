<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ModuleController extends Controller
{
    /**
     * Show the modules dashboard
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $userPermissions = $this->getUserPermissions($user);

        return Inertia::render('modules/index', [
            'userPermissions' => $userPermissions,
        ]);
    }

    /**
     * Show a specific module dashboard
     */
    public function show(Request $request, $moduleId)
    {
        $user = Auth::user();
        $userPermissions = $this->getUserPermissions($user);

        // Check if user has access to this module
        if (!$this->userHasModuleAccess($userPermissions, $moduleId)) {
            abort(403, 'Access denied to this module.');
        }

        $module = $this->getModuleData($moduleId);

        return Inertia::render("modules/{$moduleId}/index", [
            'module' => $module,
            'userPermissions' => $userPermissions,
        ]);
    }

    /**
     * Show a specific sub-page within a module
     */
    public function showSubPage(Request $request, $moduleId, $subPage)
    {
        $user = Auth::user();
        $userPermissions = $this->getUserPermissions($user);

        // Check if user has access to this module
        if (!$this->userHasModuleAccess($userPermissions, $moduleId)) {
            abort(403, 'Access denied to this module.');
        }

        $module = $this->getModuleData($moduleId);

        // Handle different sub-pages
        switch ($subPage) {
            case 'permissions':
                if ($moduleId === 'settings') {
                    try {
                        // For permissions, we'll directly render the page with module data
                        $permissionService = app(\App\Services\Contracts\PermissionServiceInterface::class);
                        $filters = $request->only([
                            'search',
                            'guard_name',
                            'module',
                            'sort_by',
                            'sort_order',
                            'per_page'
                        ]);
                        
                        $permissions = $permissionService->getFilteredPermissions($request);
                        
                        return Inertia::render('modules/settings/permissions/index', [
                            'module' => $module,
                            'userPermissions' => $userPermissions,
                            'permissions' => $permissions->items(),
                            'pagination' => [
                                'current_page' => $permissions->currentPage(),
                                'last_page' => $permissions->lastPage(),
                                'per_page' => $permissions->perPage(),
                                'total' => $permissions->total(),
                                'from' => $permissions->firstItem(),
                                'to' => $permissions->lastItem(),
                            ],
                            'filters' => $filters,
                        ]);
                    } catch (\Exception $e) {
                        // If there's an error (e.g., database not set up), show empty permissions
                        return Inertia::render('modules/settings/permissions/index', [
                            'module' => $module,
                            'userPermissions' => $userPermissions,
                            'permissions' => [],
                            'pagination' => [
                                'current_page' => 1,
                                'last_page' => 1,
                                'per_page' => 15,
                                'total' => 0,
                                'from' => null,
                                'to' => null,
                            ],
                            'filters' => [],
                        ]);
                    }
                }
                break;
            default:
                abort(404, 'Sub-page not found.');
        }
    }

    /**
     * Get user permissions (you can customize this based on your permission system)
     */
    private function getUserPermissions($user)
    {
        // This is a placeholder - implement based on your permission system
        // You might use Spatie Laravel Permission, or your own implementation
        
        $permissions = [
            // Sales Management permissions
            'view_sales',
            'create_sales',
            'manage_sales',
            
            // Settings permissions (superadmin only)
            'view_settings',
            'manage_settings',
        ];

        // For demo purposes, return all permissions
        // In production, you would check the user's actual permissions
        return $permissions;
    }

    /**
     * Check if user has access to a specific module
     */
    private function userHasModuleAccess($userPermissions, $moduleId)
    {
        $modulePermissions = $this->getModulePermissions($moduleId);
        
        return !empty(array_intersect($userPermissions, $modulePermissions));
    }

    /**
     * Get module permissions
     */
    private function getModulePermissions($moduleId)
    {
        $modulePermissions = [
            'sales' => ['view_sales', 'create_sales', 'manage_sales'],
            'settings' => ['view_settings', 'manage_settings'],
        ];

        return $modulePermissions[$moduleId] ?? [];
    }

    /**
     * Get module data
     */
    private function getModuleData($moduleId)
    {
        $modules = [
            'sales' => [
                'id' => 'sales',
                'name' => 'Sales Management',
                'description' => 'Sales and customer management system',
                'color' => 'bg-emerald-500',
                'route' => '/modules/sales',
                'icon' => 'IconShoppingCart', // Frontend will map this to the actual icon component
                'permissions' => [],
                'isActive' => true,
                'order' => 1,
            ],
            'settings' => [
                'id' => 'settings',
                'name' => 'Settings',
                'description' => 'System configuration and preferences',
                'color' => 'bg-slate-500',
                'route' => '/modules/settings',
                'icon' => 'IconSettings', // Frontend will map this to the actual icon component
                'permissions' => [],
                'isActive' => true,
                'order' => 2,
            ],
        ];

        return $modules[$moduleId] ?? null;
    }
} 