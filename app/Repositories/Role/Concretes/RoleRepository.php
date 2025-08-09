<?php

namespace App\Repositories\Role\Concretes;

use App\Repositories\Role\Contracts\RoleRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepositoryInterface
{
    protected Role $model;

    public function __construct()
    {
        $this->model = new Role();
    }

    public function getModel(): Role
    {
        return $this->model;
    }

    public function all(array $columns = ['*']): Collection
    {
        return $this->model->all($columns);
    }

    public function paginate(int|string $perPage = 15, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->model->paginate($perPage, $columns);
    }

    public function find(int|string $id, array $columns = ['*']): ?Role
    {
        return $this->model->find($id, $columns);
    }

    public function findByField(string $field, mixed $value, array $columns = ['*']): ?Role
    {
        return $this->model->where($field, $value)->first($columns);
    }

    public function findOrFail(int|string $id, array $columns = ['*']): Role
    {
        return $this->model->findOrFail($id, $columns);
    }

    public function create(array $data): Role
    {
        return $this->model->create($data);
    }

    public function update(int|string $id, array $data): Role
    {
        $model = $this->findOrFail($id);
        $model->update($data);
        return $model->fresh();
    }

    public function delete(int|string $id): bool
    {
        $model = $this->findOrFail($id);
        return $model->delete();
    }
}
