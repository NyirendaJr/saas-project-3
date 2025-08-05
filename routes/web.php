<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');
});

 Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');
 Route::get('/tasks', function () {
    return Inertia::render('tasks/index');
 })->name('tasks.index');

 Route::get('/users', function () {
    return Inertia::render('users/index');
 })->name('users.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
