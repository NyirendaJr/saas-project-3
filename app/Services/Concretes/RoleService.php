<?php

namespace App\Services\Concretes;

use App\Repositories\Role\Contracts\RoleRepositoryInterface;
use App\Services\Contracts\RoleServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class RoleService implements RoleServiceInterface
{
    public function __construct(
        private RoleRepositoryInterface $roleRepository
    ) {
    }

    public function getRoles(array $filters = []): LengthAwarePaginator
    {
        $perPage = $filters['per_page'] ?? 10;
        unset($filters['per_page']);

        return $this->roleRepository->paginate($perPage);
    }

    public function getRole(int $id)
    {
        return $this->roleRepository->findOrFail($id);
    }

    public function createRole(array $data)
    {
        return $this->roleRepository->create($data);
    }

    public function updateRole(int $id, array $data)
    {
        return $this->roleRepository->update($id, $data);
    }

    public function deleteRole(int $id): bool
    {
        return $this->roleRepository->delete($id);
    }

    public function deleteMultipleRoles(array $ids): bool
    {
        // For now, delete one by one since the base repository doesn't have bulk delete
        $deleted = 0;
        foreach ($ids as $id) {
            if ($this->roleRepository->delete($id)) {
                $deleted++;
            }
        }
        return $deleted > 0;
    }

    public function getRolesByGuard(string $guard): Collection
    {
        // For now, get all and filter since the base repository doesn't have where method
        $allRoles = $this->roleRepository->all();
        return $allRoles->filter(function ($role) use ($guard) {
            return $role->guard_name === $guard;
        });
    }

    public function getGuards(): array
    {
        // For now, get all and extract unique guards since the base repository doesn't have distinct method
        $allRoles = $this->roleRepository->all();
        return $allRoles->pluck('guard_name')->unique()->values()->toArray();
    }
}
