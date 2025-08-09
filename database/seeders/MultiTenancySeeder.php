<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Store;
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

        // Create stores/warehouses
        $stores = [
            [
                'name' => 'Main Warehouse',
                'code' => 'WH001',
                'type' => 'warehouse',
                'address' => '456 Warehouse Drive, Industrial Zone',
                'phone' => '+1234567891',
                'email' => 'warehouse@demoretail.com',
            ],
            [
                'name' => 'Downtown Store',
                'code' => 'ST001',
                'type' => 'store',
                'address' => '789 Main Street, Downtown',
                'phone' => '+1234567892',
                'email' => 'downtown@demoretail.com',
                'operating_hours' => [
                    'monday' => ['open' => '09:00', 'close' => '20:00'],
                    'tuesday' => ['open' => '09:00', 'close' => '20:00'],
                    'wednesday' => ['open' => '09:00', 'close' => '20:00'],
                    'thursday' => ['open' => '09:00', 'close' => '20:00'],
                    'friday' => ['open' => '09:00', 'close' => '22:00'],
                    'saturday' => ['open' => '10:00', 'close' => '22:00'],
                    'sunday' => ['open' => '12:00', 'close' => '18:00'],
                ],
            ],
            [
                'name' => 'Mall Outlet',
                'code' => 'OT001',
                'type' => 'outlet',
                'address' => '321 Shopping Mall, Level 2',
                'phone' => '+1234567893',
                'email' => 'mall@demoretail.com',
            ],
            [
                'name' => 'Distribution Center North',
                'code' => 'DC001',
                'type' => 'distribution_center',
                'address' => '654 Logistics Park, North Region',
                'phone' => '+1234567894',
                'email' => 'dcnorth@demoretail.com',
            ],
        ];

        $createdStores = [];
        foreach ($stores as $storeData) {
            $store = Store::firstOrCreate(
                [
                    'company_id' => $company->id,
                    'code' => $storeData['code']
                ],
                [
                    'company_id' => $company->id,
                    ...$storeData,
                ]
            );
            $createdStores[] = $store;
        }

        // Check for any existing user and update the first one found
        $existingUsers = User::take(2)->get();
        
        if ($existingUsers->count() > 0) {
            // Update the first existing user as admin
            $adminUser = $existingUsers->first();
            $adminUser->update([
                'name' => 'System Administrator',
                'company_id' => $company->id,
                'current_store_id' => $createdStores[0]->id, // Set main warehouse as current
            ]);
            $this->command->info("Updated existing user: {$adminUser->email}");
        } else {
            // Create new admin user
            $adminUser = User::create([
                'name' => 'System Administrator',
                'email' => 'admin@demoretail.com',
                'password' => Hash::make('password'),
                'company_id' => $company->id,
                'current_store_id' => $createdStores[0]->id,
                'email_verified_at' => now(),
            ]);
        }

        // Assign admin to all stores with full permissions
        foreach ($createdStores as $store) {
            $adminUser->stores()->syncWithoutDetaching([$store->id => [
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
                'stores' => [$createdStores[0]], // Only main warehouse
                'permissions' => ['manage_inventory', 'view_reports', 'manage_products'],
            ],
            [
                'name' => 'Store Manager', 
                'email' => 'store.manager@demoretail.com',
                'stores' => [$createdStores[1], $createdStores[2]], // Downtown store and mall outlet
                'permissions' => ['manage_inventory', 'view_reports', 'process_orders'],
            ],
        ];

        // Use existing users if available, otherwise create new ones
        $remainingUsers = $existingUsers->skip(1)->values(); // Skip the admin user and reset indices
        $userIndex = 0;

        foreach ($users as $userData) {
            if ($userIndex < $remainingUsers->count() && $remainingUsers->get($userIndex)) {
                // Update existing user
                $user = $remainingUsers->get($userIndex);
                $user->update([
                    'name' => $userData['name'],
                    'company_id' => $company->id,
                    'current_store_id' => $userData['stores'][0]->id,
                ]);
                $this->command->info("Updated existing user: {$user->email} -> {$userData['name']}");
            } else {
                // Create new user
                $user = User::create([
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'password' => Hash::make('password'),
                    'company_id' => $company->id,
                    'current_store_id' => $userData['stores'][0]->id,
                    'email_verified_at' => now(),
                ]);
                $this->command->info("Created new user: {$userData['email']}");
            }

            // Assign user to specified stores
            foreach ($userData['stores'] as $store) {
                $user->stores()->syncWithoutDetaching([$store->id => [
                    'permissions' => json_encode($userData['permissions']),
                    'is_active' => true,
                ]]);
            }
            
            $userIndex++;
        }

        $this->command->info('Multi-tenancy demo data created successfully!');
        $this->command->info("Company: {$company->name}");
        $this->command->info("Stores created: " . count($createdStores));
        $this->command->info("Users created: " . (count($users) + 1));
        $this->command->info('');
        $this->command->info('Login credentials:');
        $this->command->info('Admin: admin@demoretail.com / password');
        $this->command->info('Warehouse Manager: warehouse.manager@demoretail.com / password');
        $this->command->info('Store Manager: store.manager@demoretail.com / password');
        $this->command->info('Sales Associate: sales@demoretail.com / password');
    }
}
