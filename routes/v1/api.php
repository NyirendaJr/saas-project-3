<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\PermissionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\BrandController;
use App\Http\Controllers\Api\V1\ImportBrandController;
use App\Http\Controllers\Api\V1\UploadFileController;

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for version 1 of your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group with the prefix "api/v1".
|
*/

// Authentication Routes
Route::name('auth.')
    ->prefix('auth')
    ->group(function () {
        Route::post('register', [AuthController::class, 'register'])->name('register');
        Route::post('login', [AuthController::class, 'login'])->name('login');

        // Protected routes
        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('me', [AuthController::class, 'me'])->name('me');
            Route::get('refresh', [AuthController::class, 'refresh'])->name('refresh');
            Route::get('logout', [AuthController::class, 'logout'])->name('logout');
        });
    });

// Permission routes
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('permissions/all', [PermissionController::class, 'all'])->name('permissions.all');
    Route::get('permissions/modules', [PermissionController::class, 'modules'])->name('permissions.modules');
    Route::get('permissions/guards', [PermissionController::class, 'guards'])->name('permissions.guards');
    Route::get('permissions/module/{module}', [PermissionController::class, 'byModule'])->name('permissions.byModule');
    Route::get('permissions/guard/{guard}', [PermissionController::class, 'byGuard'])->name('permissions.byGuard');
    Route::delete('permissions/multiple', [PermissionController::class, 'destroyMultiple'])->name('permissions.destroyMultiple');
    Route::apiResource('permissions', PermissionController::class)->names('permissions');
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('users/active', [UserController::class, 'active'])->name('users.active');
    Route::get('users/all', [UserController::class, 'all'])->name('users.all');
    Route::apiResource('users', UserController::class)->names('users');
    
    // Route::apiResource('brands', BrandController::class)->names('brands');
    // Route::post('upload-file', UploadFileController::class);

    //Imports
    // Route::post('brands/import', ImportBrandController::class);
});
