<?php

namespace App\Providers;

use App\Services\Concretes\AuthService;
use App\Services\Concretes\UserService;
use App\Services\Concretes\PermissionService;
use App\Services\Contracts\AuthServiceInterface;
use App\Services\Contracts\UserServiceInterface;
use App\Services\Contracts\PermissionServiceInterface;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceClassProvider extends BaseServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // We don't bind BaseServiceInterface to BaseService anymore since BaseService is now abstract

        // Bind UserServiceInterface to UserService
        $this->app->bind(UserServiceInterface::class, UserService::class);
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(PermissionServiceInterface::class, PermissionService::class);
        // $this->app->bind(WarehouseServiceInterface::class, WarehouseService::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
