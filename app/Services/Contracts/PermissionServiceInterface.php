<?php

namespace App\Services\Contracts;

use App\Services\Base\Contracts\BaseServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface PermissionServiceInterface extends BaseServiceInterface
{
    /**
     * Get filtered permissions with pagination
     */
    public function getFilteredPermissions(?Request $request = null, int $perPage = 15): LengthAwarePaginator;

    /**
     * Get permission by ID
     */
    public function getPermissionById(int $id): ?Model;

    /**
     * Create permission
     */
    public function createPermission(array $data): Model;

    /**
     * Update permission
     */
    public function updatePermission(int $id, array $data): Model;

    /**
     * Delete permission
     */
    public function deletePermission(int $id): bool;

    /**
     * Delete multiple permissions
     */
    public function deleteMultiplePermissions(array $ids): bool;

    /**
     * Get permissions by module
     */
    public function getPermissionsByModule(string $module): Collection;

    /**
     * Get permissions by guard
     */
    public function getPermissionsByGuard(string $guard): Collection;

    /**
     * Get all available modules
     */
    public function getModules(): array;

    /**
     * Get all available guards
     */
    public function getGuards(): array;
} 