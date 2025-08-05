<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Unit;
use App\Services\WarehouseTenancy;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    //public function __construct(protected WarehouseTenancy $tenancy) {}

    public function show()
    {
        return Inertia::render('dashboard/index');
    }
}
