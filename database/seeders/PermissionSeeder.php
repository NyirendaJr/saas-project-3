<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample permissions
        $permissions = [
            // User permissions
            ['name' => 'users.view', 'guard_name' => 'web', 'module' => 'users', 'description' => 'View user list and details'],
            ['name' => 'users.create', 'guard_name' => 'web', 'module' => 'users', 'description' => 'Create new users'],
            ['name' => 'users.edit', 'guard_name' => 'web', 'module' => 'users', 'description' => 'Edit existing users'],
            ['name' => 'users.delete', 'guard_name' => 'web', 'module' => 'users', 'description' => 'Delete users'],
            
            // Settings permissions
            ['name' => 'settings.view', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'View system settings'],
            ['name' => 'settings.edit', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'Edit system settings'],
            ['name' => 'permissions.view', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'View permissions'],
            ['name' => 'permissions.create', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'Create new permissions'],
            ['name' => 'permissions.edit', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'Edit permissions'],
            ['name' => 'permissions.delete', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'Delete permissions'],
            ['name' => 'roles.view', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'View roles'],
            ['name' => 'roles.create', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'Create new roles'],
            ['name' => 'roles.edit', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'Edit roles'],
            ['name' => 'roles.delete', 'guard_name' => 'web', 'module' => 'settings', 'description' => 'Delete roles'],
            
            // Sales permissions
            ['name' => 'sales.view', 'guard_name' => 'web', 'module' => 'sales', 'description' => 'View sales data'],
            ['name' => 'sales.create', 'guard_name' => 'web', 'module' => 'sales', 'description' => 'Create sales records'],
            ['name' => 'sales.edit', 'guard_name' => 'web', 'module' => 'sales', 'description' => 'Edit sales records'],
            ['name' => 'sales.delete', 'guard_name' => 'web', 'module' => 'sales', 'description' => 'Delete sales records'],
            ['name' => 'sales.reports', 'guard_name' => 'web', 'module' => 'sales', 'description' => 'Generate sales reports'],
            
            // Reports permissions
            ['name' => 'reports.view', 'guard_name' => 'web', 'module' => 'reports', 'description' => 'View all reports'],
            ['name' => 'reports.generate', 'guard_name' => 'web', 'module' => 'reports', 'description' => 'Generate new reports'],
            ['name' => 'reports.export', 'guard_name' => 'web', 'module' => 'reports', 'description' => 'Export reports'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        // Create sample roles
        $roles = [
            ['name' => 'super-admin', 'guard_name' => 'web', 'description' => 'Super Administrator with all permissions'],
            ['name' => 'admin', 'guard_name' => 'web', 'description' => 'Administrator with most permissions'],
            ['name' => 'manager', 'guard_name' => 'web', 'description' => 'Manager with limited administrative permissions'],
            ['name' => 'user', 'guard_name' => 'web', 'description' => 'Regular user with basic permissions'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        // Assign permissions to roles
        $superAdmin = Role::where('name', 'super-admin')->first();
        $admin = Role::where('name', 'admin')->first();
        $manager = Role::where('name', 'manager')->first();
        $user = Role::where('name', 'user')->first();

        // Super Admin gets all permissions
        $superAdmin->permissions()->attach(Permission::all());

        // Admin gets most permissions except super-admin specific ones
        $adminPermissions = Permission::whereNotIn('name', ['roles.delete', 'permissions.delete'])->get();
        $admin->permissions()->attach($adminPermissions);

        // Manager gets limited permissions
        $managerPermissions = Permission::whereIn('name', [
            'users.view',
            'sales.view',
            'sales.create',
            'sales.edit',
            'reports.view',
            'reports.generate'
        ])->get();
        $manager->permissions()->attach($managerPermissions);

        // User gets basic permissions
        $userPermissions = Permission::whereIn('name', [
            'sales.view',
            'reports.view'
        ])->get();
        $user->permissions()->attach($userPermissions);
    }
} 