<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\Api\Permission\PermissionResource;
use App\Services\Contracts\PermissionServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PermissionController extends BaseApiController
{
    /**
     * PermissionController constructor.
     */
    public function __construct(
        protected readonly PermissionServiceInterface $permissionService
    ) {}

    /**
     * Display a listing of the permissions with filtering, sorting, and pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $permissions = $this->permissionService->getFilteredPermissions($request);

        return $this->successResponse(PermissionResource::collection($permissions));
    }

    /**
     * Display all permissions.
     */
    public function all(): JsonResponse
    {
        $permissions = $this->permissionService->all();

        return $this->successResponse(PermissionResource::collection($permissions));
    }

    /**
     * Display the specified permission.
     */
    public function show(int $id): JsonResponse
    {
        $permission = $this->permissionService->getPermissionById($id);

        if (!$permission) {
            return $this->notFoundResponse('Permission not found');
        }

        return $this->successResponse(new PermissionResource($permission));
    }

    /**
     * Store a newly created permission in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $permission = $this->permissionService->createPermission($request->all());

            return $this->createdResponse(new PermissionResource($permission));
        } catch (\Exception $e) {
            return $this->validationErrorResponse($e->getMessage());
        }
    }

    /**
     * Update the specified permission in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $permission = $this->permissionService->updatePermission($id, $request->all());

            return $this->successResponse(new PermissionResource($permission));
        } catch (\Exception $e) {
            return $this->validationErrorResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified permission from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $deleted = $this->permissionService->deletePermission($id);

            if (!$deleted) {
                return $this->notFoundResponse('Permission not found');
            }

            return $this->noContentResponse();
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    /**
     * Remove multiple permissions from storage.
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:permissions,id'
        ]);

        try {
            $deleted = $this->permissionService->deleteMultiplePermissions($request->ids);

            if (!$deleted) {
                return $this->errorResponse('No permissions were deleted', 400);
            }

            return $this->successResponse(['message' => 'Permissions deleted successfully']);
        } catch (\Exception $e) {
            return $this->validationErrorResponse($e->getMessage());
        }
    }

    /**
     * Get permissions by module.
     */
    public function byModule(string $module): JsonResponse
    {
        try {
            $permissions = $this->permissionService->getPermissionsByModule($module);

            return $this->successResponse(PermissionResource::collection($permissions));
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    /**
     * Get permissions by guard.
     */
    public function byGuard(string $guard): JsonResponse
    {
        try {
            $permissions = $this->permissionService->getPermissionsByGuard($guard);

            return $this->successResponse(PermissionResource::collection($permissions));
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    /**
     * Get all available modules.
     */
    public function modules(): JsonResponse
    {
        try {
            $modules = $this->permissionService->getModules();

            return $this->successResponse($modules);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    /**
     * Get all available guards.
     */
    public function guards(): JsonResponse
    {
        try {
            $guards = $this->permissionService->getGuards();

            return $this->successResponse($guards);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
} 