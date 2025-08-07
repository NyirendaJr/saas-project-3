<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Classes\PermsSeed;

class PermissionTableSeeder extends Seeder
{
    public function run(): void
    {
        // Use syncPermissions to ensure all permissions are up to date with module information
        $result = PermsSeed::syncPermissions();
        
        $this->command->info("Permissions synced: {$result['synced']} new, {$result['updated']} updated, {$result['total']} total");
    }
}
