<?php

namespace App\Repositories\Permission\Concretes;

use App\Models\Permission;
use App\Repositories\Base\Concretes\QueryableRepository;
use App\Repositories\Permission\Contracts\PermissionRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\AllowedFilter;

class PermissionRepository extends QueryableRepository implements PermissionRepositoryInterface
{
    /**
     * Specify Model class name
     */
    protected function model(): string
    {
        return Permission::class;
    }

    /**
     * Get permissions by module
     */
    public function getByModule(string $module): Collection
    {
        return $this->model->where('module', $module)->get();
    }

    /**
     * Get permissions by guard
     */
    public function getByGuard(string $guard): Collection
    {
        return $this->model->where('guard_name', $guard)->get();
    }

    /**
     * Get all available modules
     */
    public function getModules(): array
    {
        return $this->model->distinct()->pluck('module')->toArray();
    }

    /**
     * Get all available guards
     */
    public function getGuards(): array
    {
        return $this->model->distinct()->pluck('guard_name')->toArray();
    }

    /**
     * Delete multiple permissions
     */
    public function deleteMultiple(array $ids): int
    {
        return $this->model->whereIn('id', $ids)->delete();
    }

    /**
     * Get allowed filters for this repository.
     */
    public function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('id'),
            AllowedFilter::partial('name'),
            AllowedFilter::exact('guard_name'),
            AllowedFilter::exact('module'),
            AllowedFilter::partial('description'),
            AllowedFilter::partial('display_name'),
        ];
    }

    /**
     * Get allowed sorts for this repository.
     */
    public function getAllowedSorts(): array
    {
        return ['id', 'name', 'display_name', 'guard_name', 'module', 'description', 'created_at', 'updated_at'];
    }

    /**
     * Get allowed includes for this repository.
     */
    public function getAllowedIncludes(): array
    {
        return ['roles'];
    }

    /**
     * Get allowed fields for this repository.
     */
    public function getAllowedFields(): array
    {
        return ['id', 'name', 'display_name', 'guard_name', 'module', 'description', 'created_at', 'updated_at'];
    }
} 