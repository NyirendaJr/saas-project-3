<?php

namespace App\Repositories\Brand\Concretes;

use App\Models\Brand;
use App\Repositories\Base\Concretes\QueryableRepository;
use App\Repositories\Brand\Contracts\BrandRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BrandRepository extends QueryableRepository implements BrandRepositoryInterface
{
    /**
     * Current warehouse ID for scoping
     */
    protected ?string $currentWarehouseId = null;

    /**
     * Specify Model class name
     */
    protected function model(): string
    {
        return Brand::class;
    }

    /**
     * Configure allowed filters and sorts for query builder
     */
    public function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('is_active'),
            AllowedFilter::partial('name'),
            AllowedFilter::partial('description'),
            AllowedFilter::partial('slug'),
            AllowedFilter::exact('warehouse_id'),
        ];
    }

    /**
     * Configure allowed sorts for query builder
     */
    public function getAllowedSorts(): array
    {
        return [
            'name',
            'slug',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }

    /**
     * Configure default sort
     */
    protected function getDefaultSort(): string
    {
        return 'name';
    }

    /**
     * Ensure queries are scoped to the current warehouse when set
     */
    public function query(): QueryBuilder
    {
        $query = parent::query();

        if ($this->currentWarehouseId) {
            $query->where('warehouse_id', $this->currentWarehouseId);
        }

        return $query;
    }

    /**
     * Scope repository queries to a specific warehouse
     */
    public function scopeToWarehouse(string $warehouseId): void
    {
        $this->currentWarehouseId = $warehouseId;
    }

    // Removed applyScopes override; scoping is enforced in query()

    /**
     * Get brands by status for current warehouse
     */
    public function getByStatus(bool $isActive): Collection
    {
        $query = $this->model->where('is_active', $isActive);
        
        if ($this->currentWarehouseId) {
            $query->where('warehouse_id', $this->currentWarehouseId);
        }
        
        return $query->orderBy('name')->get();
    }

    /**
     * Search brands by query for current warehouse
     */
    public function searchByQuery(string $query): Collection
    {
        $queryBuilder = $this->model->where(function ($builder) use ($query) {
            $builder->where('name', 'like', "%{$query}%")
                   ->orWhere('description', 'like', "%{$query}%")
                   ->orWhere('slug', 'like', "%{$query}%");
        });
        
        if ($this->currentWarehouseId) {
            $queryBuilder->where('warehouse_id', $this->currentWarehouseId);
        }
        
        return $queryBuilder->orderBy('name')->get();
    }

    /**
     * Check if slug exists in warehouse (excluding specific brand ID)
     */
    public function slugExistsInWarehouse(string $slug, string $warehouseId, ?string $excludeId = null): bool
    {
        $query = $this->model->where('slug', $slug)
                           ->where('warehouse_id', $warehouseId);
        
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }
        
        return $query->exists();
    }

    /**
     * Get related models to load with the brand
     */
    protected function getWith(): array
    {
        return ['warehouse'];
    }
}