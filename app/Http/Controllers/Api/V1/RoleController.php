<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\Api\Role\RoleResource;
use App\Services\Contracts\RoleServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends BaseApiController
{
    public function __construct(
        private RoleServiceInterface $roleService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $roles = $this->roleService->getRoles($request->all());

        return $this->successResponse(RoleResource::collection($roles));
    }

    public function show(int $id): JsonResponse
    {
        $role = $this->roleService->getRole($id);

        if (!$role) {
            return $this->notFoundResponse('Role not found');
        }

        return $this->successResponse(new RoleResource($role));
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $role = $this->roleService->createRole($request->all());

            return $this->createdResponse(new RoleResource($role));
        } catch (\Exception $e) {
            return $this->validationErrorResponse($e->getMessage());
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $role = $this->roleService->updateRole($id, $request->all());

            return $this->successResponse(new RoleResource($role));
        } catch (\Exception $e) {
            return $this->validationErrorResponse($e->getMessage());
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $deleted = $this->roleService->deleteRole($id);

            if (!$deleted) {
                return $this->notFoundResponse('Role not found');
            }

            return $this->noContentResponse();
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    /**
     * Remove multiple roles from storage.
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:roles,id'
        ]);

        try {
            $deleted = $this->roleService->deleteMultipleRoles($request->ids);

            if (!$deleted) {
                return $this->errorResponse('No roles were deleted', 400);
            }

            return $this->successResponse(['message' => 'Roles deleted successfully']);
        } catch (\Exception $e) {
            return $this->validationErrorResponse($e->getMessage());
        }
    }

    /**
     * Get roles by guard.
     */
    public function byGuard(string $guard): JsonResponse
    {
        try {
            $roles = $this->roleService->getRolesByGuard($guard);

            return $this->successResponse(RoleResource::collection($roles));
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
            $guards = $this->roleService->getGuards();

            return $this->successResponse($guards);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
