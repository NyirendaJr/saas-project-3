<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Internal API Routes (Sanctum Authentication)
|--------------------------------------------------------------------------
|
| These routes are for internal SPA authentication using Laravel Sanctum.
| They are protected by the 'auth:sanctum' middleware and use session-based
| authentication for the frontend application.
|
*/

// Internal authentication routes (Sanctum)
Route::post('/auth/login', [App\Http\Controllers\Api\Internal\AuthController::class, 'login']);
Route::post('/auth/register', [App\Http\Controllers\Api\Internal\AuthController::class, 'register']);
Route::post('/auth/logout', [App\Http\Controllers\Api\Internal\AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Internal API routes for the SPA
Route::middleware(['auth:sanctum'])->group(function () {
    // User management
    Route::get('/users', [App\Http\Controllers\Api\Internal\UserController::class, 'index']);
    Route::get('/users/{user}', [App\Http\Controllers\Api\Internal\UserController::class, 'show']);
    Route::post('/users', [App\Http\Controllers\Api\Internal\UserController::class, 'store']);
    Route::put('/users/{user}', [App\Http\Controllers\Api\Internal\UserController::class, 'update']);
    Route::delete('/users/{user}', [App\Http\Controllers\Api\Internal\UserController::class, 'destroy']);

    // Permission management
    Route::get('/permissions', [App\Http\Controllers\Api\Internal\PermissionController::class, 'index']);
    Route::get('/permissions/all', [App\Http\Controllers\Api\Internal\PermissionController::class, 'all']);
    Route::get('/permissions/{permission}', [App\Http\Controllers\Api\Internal\PermissionController::class, 'show']);
    Route::post('/permissions', [App\Http\Controllers\Api\Internal\PermissionController::class, 'store']);
    Route::put('/permissions/{permission}', [App\Http\Controllers\Api\Internal\PermissionController::class, 'update']);
    Route::delete('/permissions/{permission}', [App\Http\Controllers\Api\Internal\PermissionController::class, 'destroy']);
    Route::get('/permissions/by-module/{module}', [App\Http\Controllers\Api\Internal\PermissionController::class, 'getByModule']);
    Route::get('/permissions/by-guard/{guard}', [App\Http\Controllers\Api\Internal\PermissionController::class, 'getByGuard']);
    Route::get('/permissions/modules', [App\Http\Controllers\Api\Internal\PermissionController::class, 'getModules']);
    Route::get('/permissions/guards', [App\Http\Controllers\Api\Internal\PermissionController::class, 'getGuards']);

    // Role management
    Route::get('/roles', [App\Http\Controllers\Api\Internal\RoleController::class, 'index']);
    Route::get('/roles/guards', [App\Http\Controllers\Api\Internal\RoleController::class, 'guards']);
    Route::get('/roles/{role}', [App\Http\Controllers\Api\Internal\RoleController::class, 'show']);
    Route::post('/roles', [App\Http\Controllers\Api\Internal\RoleController::class, 'store']);
    Route::put('/roles/{role}', [App\Http\Controllers\Api\Internal\RoleController::class, 'update']);
    Route::delete('/roles/{role}', [App\Http\Controllers\Api\Internal\RoleController::class, 'destroy']);
    Route::post('/roles/{role}/permissions', [App\Http\Controllers\Api\Internal\RoleController::class, 'assignPermissions']);
    Route::delete('/roles/{role}/permissions', [App\Http\Controllers\Api\Internal\RoleController::class, 'removePermissions']);
});
