<?php

namespace App\Services\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface BrandServiceInterface
{
    /**
     * Get filtered brands with pagination for current warehouse
     */
    public function getFilteredBrands(?Request $request = null, int $perPage = 15): LengthAwarePaginator;

    /**
     * Get all brands for current warehouse (without pagination)
     */
    public function getAllBrandsForCurrentWarehouse(): Collection;

    /**
     * Get brand by ID (warehouse scoped)
     */
    public function getBrandById(string $id): ?Model;

    /**
     * Create brand for current warehouse
     */
    public function createBrand(array $data): Model;

    /**
     * Update brand (warehouse scoped)
     */
    public function updateBrand(string $id, array $data): Model;

    /**
     * Delete brand (warehouse scoped)
     */
    public function deleteBrand(string $id): bool;

    /**
     * Toggle brand status (warehouse scoped)
     */
    public function toggleBrandStatus(string $id): Model;

    /**
     * Get brands by status for current warehouse
     */
    public function getBrandsByStatus(bool $isActive): Collection;

    /**
     * Search brands by name for current warehouse
     */
    public function searchBrands(string $query): Collection;
}