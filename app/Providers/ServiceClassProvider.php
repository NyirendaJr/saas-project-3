<?php

namespace App\Providers;

use App\Services\Concretes\AuthService;
use App\Services\Concretes\UserService;
use App\Services\Concretes\PermissionService;
use App\Services\Concretes\RoleService;
use App\Services\Concretes\PermissionHelperService;
use App\Services\Concretes\StoreService;
use App\Services\Contracts\AuthServiceInterface;
use App\Services\Contracts\UserServiceInterface;
use App\Services\Contracts\PermissionServiceInterface;
use App\Services\Contracts\RoleServiceInterface;
use App\Services\Contracts\PermissionHelperServiceInterface;
use App\Services\Contracts\StoreServiceInterface;
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
        $this->app->bind(RoleServiceInterface::class, RoleService::class);
        $this->app->bind(PermissionHelperServiceInterface::class, PermissionHelperService::class);
        $this->app->bind(StoreServiceInterface::class, StoreService::class);
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
