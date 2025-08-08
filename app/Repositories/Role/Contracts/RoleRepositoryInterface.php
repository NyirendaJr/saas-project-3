<?php

namespace App\Repositories\Role\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Permission\Models\Role;

interface RoleRepositoryInterface
{
    public function getModel(): Role;
    public function all(array $columns = ['*']): Collection;
    public function paginate(int|string $perPage = 15, array $columns = ['*']): LengthAwarePaginator;
    public function find(int|string $id, array $columns = ['*']): ?Role;
    public function findByField(string $field, mixed $value, array $columns = ['*']): ?Role;
    public function findOrFail(int|string $id, array $columns = ['*']): Role;
    public function create(array $data): Role;
    public function update(int|string $id, array $data): Role;
    public function delete(int|string $id): bool;
}
