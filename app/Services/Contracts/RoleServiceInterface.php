<?php

namespace App\Services\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface RoleServiceInterface
{
    public function getRoles(array $filters = []): LengthAwarePaginator;
    public function getRole(int $id);
    public function createRole(array $data);
    public function updateRole(int $id, array $data);
    public function deleteRole(int $id): bool;
    public function deleteMultipleRoles(array $ids): bool;
    public function getRolesByGuard(string $guard): Collection;
    public function getGuards(): array;
}
