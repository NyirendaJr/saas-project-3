<?php

namespace App\Services\Contracts;

use App\Models\Warehouse;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface WarehouseServiceInterface
{
    /**
     * Get all warehouses for a company
     */
    public function getWarehousesForCompany(int $companyId): Collection;

    /**
     * Get warehouses accessible by a user
     */
    public function getWarehousesForUser(User $user): Collection;

    /**
     * Switch user to a different warehouse
     */
    public function switchUserWarehouse(User $user, Warehouse $warehouse): bool;

    /**
     * Assign user to a warehouse with permissions
     */
    public function assignUserToWarehouse(User $user, Warehouse $warehouse, array $permissions = []): bool;

    /**
     * Remove user from a warehouse
     */
    public function removeUserFromWarehouse(User $user, Warehouse $warehouse): bool;

    /**
     * Update user permissions for a warehouse
     */
    public function updateUserWarehousePermissions(User $user, Warehouse $warehouse, array $permissions): bool;

    /**
     * Get current warehouse context
     */
    public function getCurrentWarehouse(User $user = null): ?Warehouse;

    /**
     * Create a new warehouse
     */
    public function createWarehouse(int $companyId, array $data): Warehouse;

    /**
     * Update warehouse information
     */
    public function updateWarehouse(Warehouse $warehouse, array $data): Warehouse;
}
