<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ModuleController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    // Module routes - specific routes first
    Route::get('/modules', [ModuleController::class, 'index'])->name('modules.index');
    Route::get('/modules/{moduleId}/{subPage}', [ModuleController::class, 'showSubPage'])->name('modules.subpage');
    Route::get('/modules/{moduleId}', [ModuleController::class, 'show'])->name('modules.show');

    // Existing routes
    Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');
    Route::get('/tasks', function () {
        return Inertia::render('tasks/index');
    })->name('tasks.index');

    Route::get('/users', function () {
        return Inertia::render('users/index');
    })->name('users.index');
    

    Route::post('/permissions', [App\Http\Controllers\WebPermissionController::class, 'store'])->name('permissions.store');
    Route::get('/permissions/{id}', [App\Http\Controllers\WebPermissionController::class, 'show'])->name('permissions.show');
    Route::put('/permissions/{id}', [App\Http\Controllers\WebPermissionController::class, 'update'])->name('permissions.update');
    Route::delete('/permissions/{id}', [App\Http\Controllers\WebPermissionController::class, 'destroy'])->name('permissions.destroy');
    Route::delete('/permissions', [App\Http\Controllers\WebPermissionController::class, 'destroyMultiple'])->name('permissions.destroyMultiple');
    Route::get('/permissions/modules/list', [App\Http\Controllers\WebPermissionController::class, 'getModules'])->name('permissions.modules');
    Route::get('/permissions/guards/list', [App\Http\Controllers\WebPermissionController::class, 'getGuards'])->name('permissions.guards');

    // Test route for permissions (temporary)
    Route::get('/test-permissions', function () {
        return Inertia::render('modules/settings/permissions/index', [
            'module' => [
                'id' => 'settings',
                'name' => 'Settings',
                'description' => 'System settings and configuration',
                'icon' => 'IconSettings',
                'route' => '/modules/settings',
                'permissions' => [],
                'isActive' => true,
                'order' => 2,
            ],
            'userPermissions' => [],
            'permissions' => [
                [
                    'id' => 1,
                    'name' => 'users.view',
                    'guard_name' => 'web',
                    'module' => 'users',
                    'description' => 'View user list and details',
                    'created_at' => '2024-01-01T00:00:00.000000Z',
                    'updated_at' => '2024-01-01T00:00:00.000000Z',
                    'roles_count' => 2,
                ],
            ],
            'pagination' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 15,
                'total' => 1,
                'from' => 1,
                'to' => 1,
            ],
            'filters' => [],
        ]);
    })->name('test.permissions');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
