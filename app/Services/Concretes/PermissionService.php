<?php

namespace App\Services\Concretes;

use App\Repositories\Permission\Contracts\PermissionRepositoryInterface;
use App\Services\Base\Concretes\BaseService;
use App\Services\Contracts\PermissionServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PermissionService extends BaseService implements PermissionServiceInterface
{
    /**
     * PermissionService constructor.
     */
    public function __construct(protected PermissionRepositoryInterface $permissionRepository)
    {
        $this->setRepository($permissionRepository);
    }

    /**
     * Get filtered permissions with pagination
     */
    public function getFilteredPermissions(?Request $request = null, int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginateFiltered($perPage);
    }

    /**
     * Get permission by ID
     */
    public function getPermissionById(int $id): ?Model
    {
        try {
            return $this->repository->findOrFail($id);
        } catch (ModelNotFoundException) {
            throw new ModelNotFoundException('Permission not found');
        }
    }

    /**
     * Create permission
     */
    public function createPermission(array $data): Model
    {
        $this->validatePermissionData($data);
        return $this->repository->create($data);
    }

    /**
     * Update permission
     */
    public function updatePermission(int $id, array $data): Model
    {
        $this->validatePermissionData($data, $id);
        
        try {
            return $this->repository->update($id, $data);
        } catch (ModelNotFoundException) {
            throw new ModelNotFoundException('Permission not found');
        }
    }

    /**
     * Delete permission
     */
    public function deletePermission(int $id): bool
    {
        try {
            $this->repository->delete($id);
            return true;
        } catch (ModelNotFoundException) {
            throw new ModelNotFoundException('Permission not found');
        }
    }

    /**
     * Delete multiple permissions
     */
    public function deleteMultiplePermissions(array $ids): bool
    {
        if (empty($ids)) {
            return false;
        }

        $deletedCount = $this->permissionRepository->deleteMultiple($ids);
        return $deletedCount > 0;
    }

    /**
     * Get permissions by module
     */
    public function getPermissionsByModule(string $module): Collection
    {
        return $this->permissionRepository->getByModule($module);
    }

    /**
     * Get permissions by guard
     */
    public function getPermissionsByGuard(string $guard): Collection
    {
        return $this->permissionRepository->getByGuard($guard);
    }

    /**
     * Get all available modules
     */
    public function getModules(): array
    {
        return $this->permissionRepository->getModules();
    }

    /**
     * Get all available guards
     */
    public function getGuards(): array
    {
        return $this->permissionRepository->getGuards();
    }

    /**
     * Validate permission data
     */
    private function validatePermissionData(array $data, ?int $id = null): void
    {
        $rules = [
            'name' => 'required|string|max:255|unique:permissions,name' . ($id ? ",{$id}" : ''),
            'guard_name' => 'required|string|max:255',
            'module' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
} 