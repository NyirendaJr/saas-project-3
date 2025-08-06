<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Classes\PermsSeed;

class PermissionTableSeeder extends Seeder
{
    public function run(): void
    {
        PermsSeed::seedPermissions();
    }
}
