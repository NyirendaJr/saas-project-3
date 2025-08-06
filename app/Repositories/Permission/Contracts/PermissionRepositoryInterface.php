<?php

namespace App\Repositories\Permission\Contracts;

use App\Repositories\Base\Contracts\QueryableRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

interface PermissionRepositoryInterface extends QueryableRepositoryInterface
{
    /**
     * Get permissions by module
     */
    public function getByModule(string $module): Collection;

    /**
     * Get permissions by guard
     */
    public function getByGuard(string $guard): Collection;

    /**
     * Get all available modules
     */
    public function getModules(): array;

    /**
     * Get all available guards
     */
    public function getGuards(): array;

    /**
     * Delete multiple permissions
     */
    public function deleteMultiple(array $ids): int;
} 