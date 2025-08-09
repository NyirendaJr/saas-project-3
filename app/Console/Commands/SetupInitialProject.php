<?php

namespace App\Console\Commands;

use App\Classes\PermsSeed;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class SetupInitialProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:setup 
                            {--email=superadmin@example.com : Superadmin email address}
                            {--password=superadmin123 : Superadmin password}
                            {--name=Super Administrator : Superadmin display name}
                            {--force : Force setup even if superadmin already exists}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup initial project with permissions, roles, and superadmin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Starting Initial Project Setup...');
        $this->newLine();

        // Get options
        $email = $this->option('email');
        $password = $this->option('password');
        $name = $this->option('name');
        $force = $this->option('force');

        // Check if superadmin already exists
        if (!$force && User::where('email', $email)->exists()) {
            $this->error("❌ Superadmin user with email '{$email}' already exists!");
            $this->info('Use --force flag to update existing user or change email with --email option.');
            return 1;
        }

        // Step 1: Sync all permissions
        $this->info('📋 Step 1: Syncing permissions...');
        $this->syncPermissions();

        // Step 2: Create superadmin role
        $this->info('👑 Step 2: Creating superadmin role...');
        $this->createSuperadminRole();

        // Step 3: Assign all permissions to superadmin role
        $this->info('🔐 Step 3: Assigning permissions to superadmin role...');
        $this->assignPermissionsToSuperadmin();

        // Step 4: Create superadmin user
        $this->info('👤 Step 4: Creating superadmin user...');
        $this->createSuperadminUser($email, $password, $name, $force);

        // Display summary
        $this->displaySummary();

        $this->newLine();
        $this->info('✅ Initial project setup completed successfully!');
        $this->newLine();
        $this->info('🔑 Superadmin Login Credentials:');
        $this->info("   Email: {$email}");
        $this->info("   Password: {$password}");
        $this->newLine();
        $this->warn('⚠️  Please change the password after first login!');

        return 0;
    }

    /**
     * Sync all permissions from PermsSeed class
     */
    private function syncPermissions(): void
    {
        $result = PermsSeed::syncPermissions();
        
        $this->info("   ✅ Synced {$result['synced']} new permissions");
        $this->info("   ✅ Updated {$result['updated']} existing permissions");
        $this->info("   📊 Total permissions: " . Permission::count());
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

        $this->info("   ✅ Superadmin role created/updated (ID: {$superadminRole->id})");
    }

    /**
     * Assign all permissions to superadmin role
     */
    private function assignPermissionsToSuperadmin(): void
    {
        $superadminRole = Role::where('name', 'superadmin')->first();
        
        if (!$superadminRole) {
            $this->error('   ❌ Superadmin role not found!');
            return;
        }

        // Get all permissions
        $allPermissions = Permission::all();
        
        // Assign each permission to the role
        foreach ($allPermissions as $permission) {
            $superadminRole->givePermissionTo($permission);
        }

        $this->info("   ✅ Assigned {$allPermissions->count()} permissions to superadmin role");
    }

    /**
     * Create superadmin user
     */
    private function createSuperadminUser(string $email, string $password, string $name, bool $force): void
    {
        $superadminRole = Role::where('name', 'superadmin')->first();
        
        if (!$superadminRole) {
            $this->error('   ❌ Superadmin role not found!');
            return;
        }

        // Check if superadmin user already exists
        $existingUser = User::where('email', $email)->first();
        
        if ($existingUser) {
            if ($force) {
                // Update existing user
                $existingUser->update([
                    'name' => $name,
                    'password' => Hash::make($password),
                ]);
                $existingUser->assignRole('superadmin');
                $this->info("   ✅ Updated existing superadmin user (ID: {$existingUser->id})");
            } else {
                $this->error("   ❌ Superadmin user with email '{$email}' already exists!");
            }
            return;
        }

        // Create new superadmin user
        $superadminUser = User::create([
            'name' => $name,
            'email' => $email,
            'email_verified_at' => now(),
            'password' => Hash::make($password),
        ]);

        // Assign superadmin role
        $superadminUser->assignRole('superadmin');

        $this->info("   ✅ Superadmin user created (ID: {$superadminUser->id})");
        $this->info("   📧 Email: {$superadminUser->email}");
    }

    /**
     * Display summary of what was created
     */
    private function displaySummary(): void
    {
        $this->newLine();
        $this->info('📊 Setup Summary:');
        $this->info("   👤 Users: " . User::count());
        $this->info("   👑 Roles: " . Role::count());
        $this->info("   🔐 Permissions: " . Permission::count());
        
        // Show modules with permissions
        $modules = Permission::select('module')
            ->distinct()
            ->whereNotNull('module')
            ->pluck('module')
            ->sort()
            ->values();
            
        $this->info("   📦 Modules: " . $modules->implode(', '));
    }
}
