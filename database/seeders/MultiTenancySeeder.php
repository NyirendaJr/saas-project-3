<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Warehouse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MultiTenancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create or get demo company
        $company = Company::firstOrCreate(
            ['slug' => 'demo-retail'],
            [
                'name' => 'Demo Retail Company',
                'email' => 'admin@demoretail.com',
                'phone' => '+1234567890',
                'address' => '123 Business Street, City, State 12345',
                'settings' => [
                    'currency' => 'USD',
                    'timezone' => 'America/New_York',
                    'date_format' => 'Y-m-d',
                    'business_hours' => [
                        'start' => '09:00',
                        'end' => '18:00',
                    ],
                ],
            ]
        );

        // Create warehouses
        $warehouses = [
            [
                'name' => 'Main Warehouse',
                'address' => '456 Warehouse Drive, Industrial Zone',
                'phone' => '+1234567891',
                'email' => 'warehouse@demoretail.com',
            ],
            [
                'name' => 'Downtown Warehouse',
                'address' => '789 Main Street, Downtown',
                'phone' => '+1234567892',
                'email' => 'downtown@demoretail.com',
            ],
            [
                'name' => 'Mall Distribution Center',
                'address' => '321 Shopping Mall, Level 2',
                'phone' => '+1234567893',
                'email' => 'mall@demoretail.com',
            ],
            [
                'name' => 'Distribution Center North',
                'address' => '654 Logistics Park, North Region',
                'phone' => '+1234567894',
                'email' => 'dcnorth@demoretail.com',
            ],
        ];

        $createdWarehouses = [];
        foreach ($warehouses as $warehouseData) {
            $warehouse = Warehouse::firstOrCreate(
                [
                    'company_id' => $company->id,
                    'name' => $warehouseData['name']
                ],
                [
                    'company_id' => $company->id,
                    ...$warehouseData,
                ]
            );
            $createdWarehouses[] = $warehouse;
        }

        // Check for any existing user and update the first one found
        $existingUsers = User::take(2)->get();
        
        if ($existingUsers->count() > 0) {
            // Update the first existing user as admin
            $adminUser = $existingUsers->first();
            $adminUser->update([
                'name' => 'System Administrator',
                'company_id' => $company->id,
                'current_warehouse_id' => $createdWarehouses[0]->id, // Set main warehouse as current
            ]);
            $this->command->info("Updated existing user: {$adminUser->email}");
        } else {
            // Create new admin user
            $adminUser = User::create([
                'name' => 'System Administrator',
                'email' => 'admin@demoretail.com',
                'password' => Hash::make('password'),
                'company_id' => $company->id,
                'current_warehouse_id' => $createdWarehouses[0]->id,
                'email_verified_at' => now(),
            ]);
        }

        // Assign admin to all warehouses with full permissions
        foreach ($createdWarehouses as $warehouse) {
            $adminUser->warehouses()->syncWithoutDetaching([$warehouse->id => [
                'permissions' => json_encode([
                    'manage_inventory',
                    'view_reports',
                    'manage_users',
                    'manage_settings',
                    'process_orders',
                    'manage_products',
                ]),
                'is_active' => true,
            ]]);
        }

        // Handle additional users from existing records or create new ones
        $users = [
            [
                'name' => 'Warehouse Manager',
                'email' => 'warehouse.manager@demoretail.com',
                'warehouses' => [$createdWarehouses[0]], // Only main warehouse
                'permissions' => ['manage_inventory', 'view_reports', 'manage_products'],
            ],
            [
                'name' => 'Inventory Manager', 
                'email' => 'inventory.manager@demoretail.com',
                'warehouses' => [$createdWarehouses[1], $createdWarehouses[2]], // Downtown and mall warehouses
                'permissions' => ['manage_inventory', 'view_reports', 'process_orders'],
            ],
        ];

        // Use existing users if available, otherwise create new ones
        $remainingUsers = $existingUsers->skip(1)->values(); // Skip the admin user and reset indices
        $userIndex = 0;

        foreach ($users as $userData) {
            // Use firstOrCreate to handle duplicates gracefully
            $user = User::firstOrCreate(
                ['email' => $userData['email']], // Find by email
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('password'),
                    'company_id' => $company->id,
                    'current_warehouse_id' => $userData['warehouses'][0]->id,
                    'email_verified_at' => now(),
                ]
            );

            // Update existing user if found
            if (!$user->wasRecentlyCreated) {
                $user->update([
                    'name' => $userData['name'],
                    'company_id' => $company->id,
                    'current_warehouse_id' => $userData['warehouses'][0]->id,
                ]);
                $this->command->info("Updated existing user: {$user->email} -> {$userData['name']}");
            } else {
                $this->command->info("Created new user: {$userData['email']}");
            }

            // Assign user to specified warehouses
            foreach ($userData['warehouses'] as $warehouse) {
                $user->warehouses()->syncWithoutDetaching([$warehouse->id => [
                    'permissions' => json_encode($userData['permissions']),
                    'is_active' => true,
                ]]);
            }
            
            $userIndex++;
        }

        $this->command->info('Multi-tenancy demo data created successfully!');
        $this->command->info("Company: {$company->name}");
        $this->command->info("Warehouses created: " . count($createdWarehouses));
        $this->command->info("Users created: " . (count($users) + 1));
        $this->command->info('');
        $this->command->info('Login credentials:');
        $this->command->info('Admin: admin@demoretail.com / password');
        $this->command->info('Warehouse Manager: warehouse.manager@demoretail.com / password');
        $this->command->info('Inventory Manager: inventory.manager@demoretail.com / password');
    }
}
