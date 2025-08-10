<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use App\Models\Warehouse;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all warehouses
        $warehouses = Warehouse::all();

        if ($warehouses->isEmpty()) {
            $this->command->warn('No warehouses found. Please run MultiTenancySeeder first.');
            return;
        }

        // Sample brands for different warehouses
        $brandsData = [
            // Warehouse 1 - Electronics/Tech brands
            'Main Warehouse' => [
                [
                    'name' => 'Apple',
                    'slug' => 'apple',
                    'description' => 'Premium consumer electronics and computer software',
                    'logo_url' => 'https://logo.clearbit.com/apple.com',
                    'website_url' => 'https://apple.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Samsung',
                    'slug' => 'samsung',
                    'description' => 'Multinational electronics corporation',
                    'logo_url' => 'https://logo.clearbit.com/samsung.com',
                    'website_url' => 'https://samsung.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Sony',
                    'slug' => 'sony',
                    'description' => 'Electronics, entertainment, and gaming products',
                    'logo_url' => 'https://logo.clearbit.com/sony.com',
                    'website_url' => 'https://sony.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Microsoft',
                    'slug' => 'microsoft',
                    'description' => 'Software, hardware, and cloud services',
                    'logo_url' => 'https://logo.clearbit.com/microsoft.com',
                    'website_url' => 'https://microsoft.com',
                    'is_active' => true,
                ],
            ],

            // Warehouse 2 - Fashion/Retail brands
            'Downtown Warehouse' => [
                [
                    'name' => 'Nike',
                    'slug' => 'nike',
                    'description' => 'Athletic footwear, apparel, and equipment',
                    'logo_url' => 'https://logo.clearbit.com/nike.com',
                    'website_url' => 'https://nike.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Adidas',
                    'slug' => 'adidas',
                    'description' => 'Sports clothing and accessories',
                    'logo_url' => 'https://logo.clearbit.com/adidas.com',
                    'website_url' => 'https://adidas.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Zara',
                    'slug' => 'zara',
                    'description' => 'Fast fashion clothing and accessories',
                    'logo_url' => 'https://logo.clearbit.com/zara.com',
                    'website_url' => 'https://zara.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'H&M',
                    'slug' => 'hm',
                    'description' => 'Fashion and quality at affordable prices',
                    'logo_url' => 'https://logo.clearbit.com/hm.com',
                    'website_url' => 'https://hm.com',
                    'is_active' => false, // One inactive brand for testing
                ],
            ],

            // Warehouse 3 - Home & Garden brands
            'Mall Distribution Center' => [
                [
                    'name' => 'IKEA',
                    'slug' => 'ikea',
                    'description' => 'Ready-to-assemble furniture and home accessories',
                    'logo_url' => 'https://logo.clearbit.com/ikea.com',
                    'website_url' => 'https://ikea.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Home Depot',
                    'slug' => 'home-depot',
                    'description' => 'Home improvement and construction tools',
                    'logo_url' => 'https://logo.clearbit.com/homedepot.com',
                    'website_url' => 'https://homedepot.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Williams Sonoma',
                    'slug' => 'williams-sonoma',
                    'description' => 'High-quality cookware and home furnishings',
                    'logo_url' => 'https://logo.clearbit.com/williams-sonoma.com',
                    'website_url' => 'https://williams-sonoma.com',
                    'is_active' => true,
                ],
            ],

            // Warehouse 4 - Food & Beverage brands
            'Distribution Center North' => [
                [
                    'name' => 'Coca-Cola',
                    'slug' => 'coca-cola',
                    'description' => 'Refreshing beverages and soft drinks',
                    'logo_url' => 'https://logo.clearbit.com/coca-cola.com',
                    'website_url' => 'https://coca-cola.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Nestle',
                    'slug' => 'nestle',
                    'description' => 'Food and beverage company',
                    'logo_url' => 'https://logo.clearbit.com/nestle.com',
                    'website_url' => 'https://nestle.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Starbucks',
                    'slug' => 'starbucks',
                    'description' => 'Coffee, tea, and related products',
                    'logo_url' => 'https://logo.clearbit.com/starbucks.com',
                    'website_url' => 'https://starbucks.com',
                    'is_active' => true,
                ],
                [
                    'name' => 'Pepsi',
                    'slug' => 'pepsi',
                    'description' => 'Carbonated soft drinks and snacks',
                    'logo_url' => 'https://logo.clearbit.com/pepsi.com',
                    'website_url' => 'https://pepsi.com',
                    'is_active' => true,
                ],
            ],
        ];

        foreach ($warehouses as $warehouse) {
            $warehouseBrands = $brandsData[$warehouse->name] ?? [];
            
            if (empty($warehouseBrands)) {
                $this->command->info("No brand data defined for warehouse: {$warehouse->name}");
                continue;
            }

            foreach ($warehouseBrands as $brandData) {
                $brand = Brand::firstOrCreate(
                    [
                        'warehouse_id' => $warehouse->id,
                        'slug' => $brandData['slug'],
                    ],
                    array_merge($brandData, ['warehouse_id' => $warehouse->id])
                );

                if ($brand->wasRecentlyCreated) {
                    $this->command->info("Created brand '{$brand->name}' for warehouse '{$warehouse->name}'");
                } else {
                    $this->command->info("Brand '{$brand->name}' already exists for warehouse '{$warehouse->name}'");
                }
            }
        }

        $this->command->info('Brand seeding completed!');
        
        // Display summary
        foreach ($warehouses as $warehouse) {
            $brandCount = Brand::where('warehouse_id', $warehouse->id)->count();
            $this->command->line("📦 {$warehouse->name}: {$brandCount} brands");
        }
    }
}