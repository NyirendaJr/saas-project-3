<?php

namespace App\Services\Contracts;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface StoreServiceInterface
{
    /**
     * Get all stores for a company
     */
    public function getStoresForCompany(int $companyId): Collection;

    /**
     * Get stores accessible by a user
     */
    public function getStoresForUser(User $user): Collection;

    /**
     * Switch user to a different store
     */
    public function switchUserStore(User $user, Store $store): bool;

    /**
     * Assign user to a store with permissions
     */
    public function assignUserToStore(User $user, Store $store, array $permissions = []): bool;

    /**
     * Remove user from a store
     */
    public function removeUserFromStore(User $user, Store $store): bool;

    /**
     * Update user permissions for a store
     */
    public function updateUserStorePermissions(User $user, Store $store, array $permissions): bool;

    /**
     * Get current store context
     */
    public function getCurrentStore(): ?Store;

    /**
     * Create a new store
     */
    public function createStore(int $companyId, array $data): Store;

    /**
     * Update store information
     */
    public function updateStore(Store $store, array $data): Store;
}
