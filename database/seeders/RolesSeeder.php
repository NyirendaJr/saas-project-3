<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'admin', 'guard_name' => 'web', 'description' => 'Administrator role with full access'],
            ['name' => 'manager', 'guard_name' => 'web', 'description' => 'Manager role with elevated permissions'],
            ['name' => 'editor', 'guard_name' => 'web', 'description' => 'Editor role with content management permissions'],
            ['name' => 'viewer', 'guard_name' => 'web', 'description' => 'Viewer role with read-only access'],
        ];

        // Seed a larger set to test pagination properly
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name'], 'guard_name' => $role['guard_name']], $role);
        }

        // Generate additional roles to reach multiple pages
        for ($i = 1; $i <= 60; $i++) {
            $name = "role_{$i}";
            Role::firstOrCreate(
                ['name' => $name, 'guard_name' => 'web'],
                [
                    'name' => $name,
                    'guard_name' => 'web',
                    'description' => "Auto-generated role #{$i}",
                ]
            );
        }
    }
}


