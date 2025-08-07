<?php

namespace Database\Seeders;

use App\Classes\PermsSeed;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitialProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🚀 Starting Initial Project Setup...');

        // Step 1: Sync all permissions
        $this->command->info('📋 Step 1: Syncing permissions...');
        $this->syncPermissions();

        // Step 2: Create superadmin role
        $this->command->info('👑 Step 2: Creating superadmin role...');
        $this->createSuperadminRole();

        // Step 3: Assign all permissions to superadmin role
        $this->command->info('🔐 Step 3: Assigning permissions to superadmin role...');
        $this->assignPermissionsToSuperadmin();

        // Step 4: Create superadmin user
        $this->command->info('👤 Step 4: Creating superadmin user...');
        $this->createSuperadminUser();

        $this->command->info('✅ Initial project setup completed successfully!');
        $this->command->info('');
        $this->command->info('🔑 Superadmin Login Credentials:');
        $this->command->info('   Email: superadmin@example.com');
        $this->command->info('   Password: superadmin123');
        $this->command->info('');
        $this->command->info('⚠️  Please change the password after first login!');
    }

    /**
     * Sync all permissions from PermsSeed class
     */
    private function syncPermissions(): void
    {
        $result = PermsSeed::syncPermissions();
        
        $this->command->info("   ✅ Synced {$result['synced']} new permissions");
        $this->command->info("   ✅ Updated {$result['updated']} existing permissions");
        $this->command->info("   📊 Total permissions: " . Permission::count());
    }

    /**
     * Create superadmin role
     */
    private function createSuperadminRole(): void
    {
        $superadminRole = Role::firstOrCreate(
            ['name' => 'superadmin'],
            [
                'name' => 'superadmin',
                'guard_name' => 'web',
                'description' => 'Super Administrator with full system access',
            ]
        );

        $this->command->info("   ✅ Superadmin role created/updated (ID: {$superadminRole->id})");
    }

    /**
     * Assign all permissions to superadmin role
     */
    private function assignPermissionsToSuperadmin(): void
    {
        $superadminRole = Role::where('name', 'superadmin')->first();
        
        if (!$superadminRole) {
            $this->command->error('   ❌ Superadmin role not found!');
            return;
        }

        // Get all permissions
        $allPermissions = Permission::all();
        
        // Sync permissions to role (this will add missing permissions and remove extra ones)
        $superadminRole->syncPermissions($allPermissions);

        $this->command->info("   ✅ Assigned {$allPermissions->count()} permissions to superadmin role");
    }

    /**
     * Create superadmin user
     */
    private function createSuperadminUser(): void
    {
        $superadminRole = Role::where('name', 'superadmin')->first();
        
        if (!$superadminRole) {
            $this->command->error('   ❌ Superadmin role not found!');
            return;
        }

        // Check if superadmin user already exists
        $existingUser = User::where('email', 'superadmin@example.com')->first();
        
        if ($existingUser) {
            // Update existing user to ensure they have superadmin role
            $existingUser->assignRole('superadmin');
            $this->command->info("   ✅ Updated existing superadmin user (ID: {$existingUser->id})");
            return;
        }

        // Create new superadmin user
        $superadminUser = User::create([
            'name' => 'Super Administrator',
            'email' => 'superadmin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('superadmin123'),
        ]);

        // Assign superadmin role
        $superadminUser->assignRole('superadmin');

        $this->command->info("   ✅ Superadmin user created (ID: {$superadminUser->id})");
        $this->command->info("   📧 Email: {$superadminUser->email}");
    }

    /**
     * Display summary of what was created
     */
    private function displaySummary(): void
    {
        $this->command->info('');
        $this->command->info('📊 Setup Summary:');
        $this->command->info("   👤 Users: " . User::count());
        $this->command->info("   👑 Roles: " . Role::count());
        $this->command->info("   🔐 Permissions: " . Permission::count());
        
        // Show modules with permissions
        $modules = Permission::select('module')
            ->distinct()
            ->whereNotNull('module')
            ->pluck('module')
            ->sort()
            ->values();
            
        $this->command->info("   📦 Modules: " . $modules->implode(', '));
    }
}
