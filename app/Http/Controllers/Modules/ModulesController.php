<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Modules\Base\ModuleController;
use App\Services\Contracts\PermissionHelperServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ModulesController extends ModuleController
{
    public function __construct(
        private PermissionHelperServiceInterface $permissionHelper
    ) {
        // No parent constructor call needed since Base\ModuleController doesn't have one
    }

    /**
     * Display the modules index page
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        
        // Check if user has access to any module permissions
        // This ensures users can only see modules they have access to
        $this->permissionHelper->checkAnyPermission([
            // Inventory permissions
            'brand_view', 'product_view', 'category_view', 'unit_view', 'warehouse_view', 'supplier_view', 'customer_view',
            // Sales permissions
            'sale_view', 'sale_create', 'sale_edit', 'sale_delete',
            // Settings permissions
            'permission_view', 'role_view', 'user_view'
        ]);
        
        $userPermissions = $this->permissionHelper->getUserPermissionsData($user);

        return Inertia::render('modules/index', [
            'userPermissions' => $userPermissions,
        ]);
    }

    protected function getModuleId(): string
    {
        return 'modules';
    }

    protected function getModuleName(): string
    {
        return 'Modules';
    }

    protected function getModuleDescription(): string
    {
        return 'Application modules overview';
    }

    protected function getModuleIcon(): string
    {
        return 'grid';
    }

    protected function getModuleColor(): string
    {
        return 'blue';
    }

    protected function getModuleSubPages(): array
    {
        return [];
    }

    protected function getModuleData(): array
    {
        return [
            'title' => 'Modules Overview',
            'description' => 'Select a module to get started',
        ];
    }
}
