<?php

namespace App\Services\Concretes;

use App\Services\Contracts\StoreServiceInterface;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class StoreService implements StoreServiceInterface
{
    /**
     * Get all stores for a company
     */
    public function getStoresForCompany(int $companyId): Collection
    {
        return Store::where('company_id', $companyId)
                   ->where('is_active', true)
                   ->orderBy('name')
                   ->get();
    }

    /**
     * Get stores accessible by a user
     */
    public function getStoresForUser(User $user): Collection
    {
        return $user->activeStores()->orderBy('name')->get();
    }

    /**
     * Switch user to a different store
     */
    public function switchUserStore(User $user, Store $store): bool
    {
        // Verify user has access to the store
        if (!$user->hasAccessToStore($store)) {
            return false;
        }

        // Verify store belongs to user's company
        if ($store->company_id !== $user->company_id) {
            return false;
        }

        return $user->switchToStore($store);
    }

    /**
     * Assign user to a store with permissions
     */
    public function assignUserToStore(User $user, Store $store, array $permissions = []): bool
    {
        // Verify store belongs to user's company
        if ($store->company_id !== $user->company_id) {
            return false;
        }

        // Check if relationship already exists
        if ($user->stores()->where('stores.id', $store->id)->exists()) {
            // Update existing relationship
            $user->stores()->updateExistingPivot($store->id, [
                'permissions' => $permissions,
                'is_active' => true,
            ]);
        } else {
            // Create new relationship
            $user->stores()->attach($store->id, [
                'permissions' => $permissions,
                'is_active' => true,
            ]);
        }

        // If user doesn't have a current store, set this as current
        if (!$user->current_store_id) {
            $user->update(['current_store_id' => $store->id]);
        }

        return true;
    }

    /**
     * Remove user from a store
     */
    public function removeUserFromStore(User $user, Store $store): bool
    {
        // Mark as inactive instead of deleting
        $user->stores()->updateExistingPivot($store->id, [
            'is_active' => false,
        ]);

        // If this was the user's current store, switch to another available store
        if ($user->current_store_id === $store->id) {
            $otherStore = $user->activeStores()->where('stores.id', '!=', $store->id)->first();
            $user->update(['current_store_id' => $otherStore?->id]);
        }

        return true;
    }

    /**
     * Update user permissions for a store
     */
    public function updateUserStorePermissions(User $user, Store $store, array $permissions): bool
    {
        if (!$user->hasAccessToStore($store)) {
            return false;
        }

        $user->stores()->updateExistingPivot($store->id, [
            'permissions' => $permissions,
        ]);

        return true;
    }

    /**
     * Get current store context
     */
    public function getCurrentStore(): ?Store
    {
        $user = Auth::user();
        return $user?->currentStore;
    }

    /**
     * Create a new store
     */
    public function createStore(int $companyId, array $data): Store
    {
        $data['company_id'] = $companyId;
        
        // Generate unique code if not provided
        if (empty($data['code'])) {
            $data['code'] = $this->generateStoreCode($companyId, $data['type'] ?? 'store');
        }

        return Store::create($data);
    }

    /**
     * Update store information
     */
    public function updateStore(Store $store, array $data): Store
    {
        $store->update($data);
        return $store->fresh();
    }

    /**
     * Generate a unique store code
     */
    private function generateStoreCode(int $companyId, string $type): string
    {
        $prefix = match($type) {
            'warehouse' => 'WH',
            'store' => 'ST',
            'outlet' => 'OT',
            'distribution_center' => 'DC',
            default => 'ST'
        };

        $count = Store::where('company_id', $companyId)
                     ->where('type', $type)
                     ->count() + 1;

        return $prefix . str_pad($count, 3, '0', STR_PAD_LEFT);
    }
}
