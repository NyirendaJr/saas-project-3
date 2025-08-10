<?php

namespace App\Services\Concretes;

use App\Services\Contracts\WarehouseServiceInterface;
use App\Models\Warehouse;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class WarehouseService implements WarehouseServiceInterface
{
    /**
     * Get all warehouses for a company
     */
    public function getWarehousesForCompany(int $companyId): Collection
    {
        return Warehouse::where('company_id', $companyId)
                   ->where('is_active', true)
                   ->orderBy('name')
                   ->get();
    }

    /**
     * Get warehouses accessible by a user
     */
    public function getWarehousesForUser(User $user): Collection
    {
        return $user->activeWarehouses()->orderBy('name')->get();
    }

    /**
     * Switch user to a different warehouse
     */
    public function switchUserWarehouse(User $user, Warehouse $warehouse): bool
    {
        // Verify user has access to the warehouse
        if (!$user->hasAccessToWarehouse($warehouse)) {
            return false;
        }

        // Verify warehouse belongs to user's company
        if ($warehouse->company_id !== $user->company_id) {
            return false;
        }

        return $user->switchToWarehouse($warehouse);
    }

    /**
     * Assign user to a warehouse with permissions
     */
    public function assignUserToWarehouse(User $user, Warehouse $warehouse, array $permissions = []): bool
    {
        // Verify warehouse belongs to user's company
        if ($warehouse->company_id !== $user->company_id) {
            return false;
        }

        // Check if relationship already exists
        if ($user->warehouses()->where('warehouses.id', $warehouse->id)->exists()) {
            // Update existing relationship
            $user->warehouses()->updateExistingPivot($warehouse->id, [
                'permissions' => $permissions,
                'is_active' => true,
            ]);
        } else {
            // Create new relationship
            $user->warehouses()->attach($warehouse->id, [
                'permissions' => $permissions,
                'is_active' => true,
            ]);
        }

        // If user doesn't have a current warehouse, set this as current
        if (!$user->current_warehouse_id) {
            $user->update(['current_warehouse_id' => $warehouse->id]);
        }

        return true;
    }

    /**
     * Remove user from a warehouse
     */
    public function removeUserFromWarehouse(User $user, Warehouse $warehouse): bool
    {
        // Mark as inactive instead of deleting
        $user->warehouses()->updateExistingPivot($warehouse->id, [
            'is_active' => false,
        ]);

        // If this was the user's current warehouse, switch to another available warehouse
        if ($user->current_warehouse_id === $warehouse->id) {
            $otherWarehouse = $user->activeWarehouses()->where('warehouses.id', '!=', $warehouse->id)->first();
            $user->update(['current_warehouse_id' => $otherWarehouse?->id]);
        }

        return true;
    }

    /**
     * Update user permissions for a warehouse
     */
    public function updateUserWarehousePermissions(User $user, Warehouse $warehouse, array $permissions): bool
    {
        if (!$user->hasAccessToWarehouse($warehouse)) {
            return false;
        }

        $user->warehouses()->updateExistingPivot($warehouse->id, [
            'permissions' => $permissions,
        ]);

        return true;
    }

    /**
     * Get current warehouse context
     */
    public function getCurrentWarehouse(User $user = null): ?Warehouse
    {
        $user = $user ?? Auth::user();
        return $user?->currentWarehouse;
    }

    /**
     * Create a new warehouse
     */
    public function createWarehouse(int $companyId, array $data): Warehouse
    {
        $data['company_id'] = $companyId;
        
        // Generate unique code if not provided
        if (empty($data['code'])) {
            $data['code'] = $this->generateWarehouseCode($companyId, $data['type'] ?? 'warehouse');
        }

        return Warehouse::create($data);
    }

    /**
     * Update warehouse information
     */
    public function updateWarehouse(Warehouse $warehouse, array $data): Warehouse
    {
        $warehouse->update($data);
        return $warehouse->fresh();
    }

    /**
     * Generate a unique warehouse code
     */
    private function generateWarehouseCode(int $companyId, string $type): string
    {
        $prefix = match($type) {
            'warehouse' => 'WH',
            'store' => 'ST',
            'outlet' => 'OT',
            'distribution_center' => 'DC',
            default => 'WH'
        };

        $count = Warehouse::where('company_id', $companyId)
                     ->where('type', $type)
                     ->count() + 1;

        return $prefix . str_pad($count, 3, '0', STR_PAD_LEFT);
    }
}
