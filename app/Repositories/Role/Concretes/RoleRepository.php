<?php

namespace App\Repositories\Role\Concretes;

use App\Repositories\Base\Concretes\QueryableRepository;
use App\Repositories\Role\Contracts\RoleRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Role;
use Spatie\QueryBuilder\AllowedFilter;

class RoleRepository extends QueryableRepository implements RoleRepositoryInterface
{
    /**
     * Specify Model class name
     */
    protected function model(): string
    {
        return Role::class;
    }

    /**
     * Get roles by guard
     */
    public function getByGuard(string $guard): Collection
    {
        return $this->model->where('guard_name', $guard)->get();
    }

    /**
     * Get all available guards
     */
    public function getGuards(): array
    {
        return $this->model->distinct()->pluck('guard_name')->toArray();
    }

    /**
     * Delete multiple roles
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
            AllowedFilter::partial('description'),
        ];
    }

    /**
     * Get allowed sorts for this repository.
     */
    public function getAllowedSorts(): array
    {
        return ['id', 'name', 'guard_name', 'description', 'created_at', 'updated_at'];
    }

    /**
     * Get allowed includes for this repository.
     */
    public function getAllowedIncludes(): array
    {
        return ['permissions'];
    }

    /**
     * Get allowed fields for this repository.
     */
    public function getAllowedFields(): array
    {
        return ['id', 'name', 'guard_name', 'description', 'created_at', 'updated_at'];
    }
}
