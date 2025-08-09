<?php

namespace App\Http\Controllers\Modules\Settings;

use App\Http\Controllers\Modules\Base\ModuleController;
use App\Services\Contracts\PermissionServiceInterface;
use App\Services\Contracts\RoleServiceInterface;
use App\Services\Contracts\PermissionHelperServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends ModuleController
{
    public function __construct(
        private PermissionHelperServiceInterface $permissionHelper
    ) {
    }

    /**
     * Show the settings module dashboard
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Check if user has access to any settings-related permissions
        $this->permissionHelper->checkAnyPermission([
            'permission_view',
            'permission_create',
            'permission_edit',
            'permission_delete',
            'role_view',
            'role_create',
            'role_edit',
            'role_delete',
            'user_view',
            'user_create',
            'user_edit',
            'user_delete'
        ]);
        
        return Inertia::render('modules/settings/index', [
            'userPermissions' => $this->permissionHelper->getUserPermissionsData($user),
            'module' => $this->getModuleData(),
        ]);
    }

    /**Show permissions page*/
    public function permissions(Request $request): Response
    {
        $this->permissionHelper->checkPermission('permission_view');

        return Inertia::render('modules/settings/permissions/index', [
            'module' => $this->getModuleData()
        ]);
    }

    /**Show roles page*/
    public function roles(Request $request): Response
    {

        $this->permissionHelper->checkPermission('role_view');

        return Inertia::render('modules/settings/roles/index', [
            'module' => $this->getModuleData(),
        ]);
    }

    /**
     * Get module ID
     */
    protected function getModuleId(): string
    {
        return 'settings';
    }

    /**
     * Get module name
     */
    protected function getModuleName(): string
    {
        return 'Settings';
    }

    /**
     * Get module description
     */
    protected function getModuleDescription(): string
    {
        return 'System settings and configuration';
    }

    /**
     * Get module icon
     */
    protected function getModuleIcon(): string
    {
        return 'settings';
    }

    /**
     * Get module color
     */
    protected function getModuleColor(): string
    {
        return 'gray';
    }

    /**
     * Get module sub-pages
     */
    protected function getModuleSubPages(): array
    {
        return [
            [
                'id' => 'permissions',
                'name' => 'Permissions',
                'description' => 'Manage system permissions',
                'route' => 'modules.settings.permissions',
                'permission' => 'view_permissions',
            ],
            [
                'id' => 'roles',
                'name' => 'Roles',
                'description' => 'Manage user roles',
                'route' => 'modules.settings.roles',
                'permission' => 'view_roles',
            ],
        ];
    }

    /**
     * Get settings module data
     */
    protected function getModuleData(): array
    {
        return [
            'id' => $this->getModuleId(),
            'name' => $this->getModuleName(),
            'description' => $this->getModuleDescription(),
            'icon' => $this->getModuleIcon(),
            'color' => $this->getModuleColor(),
            'subPages' => $this->getModuleSubPages(),
        ];
    }
}
