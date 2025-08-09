<?php

namespace App\Http\Controllers\Api\Internal;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\Api\Role\RoleResource;
use App\Services\Contracts\RoleServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends BaseApiController
{
    public function __construct(
        private readonly RoleServiceInterface $roleService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->all();
        $filters['per_page'] = $request->get('per_page', 15);
        $roles = $this->roleService->getRoles($filters);

        return $this->successResponse(RoleResource::collection($roles));
    }

    /**
     * Get all guards.
     */
    public function guards(): JsonResponse
    {
        $guards = $this->roleService->getGuards();

        return $this->successResponse($guards);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $role = $this->roleService->getRole($id);
            return $this->successResponse(new RoleResource($role));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Role not found', 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'guard_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        $role = $this->roleService->createRole($validated);

        return $this->successResponse(new RoleResource($role), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255|unique:roles,name,' . $id,
                'guard_name' => 'sometimes|string|max:255',
                'description' => 'nullable|string|max:500',
            ]);

            $role = $this->roleService->updateRole($id, $validated);

            return $this->successResponse(new RoleResource($role));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Role not found', 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->roleService->deleteRole($id);
            return $this->successResponse(['message' => 'Role deleted successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Role not found', 404);
        }
    }

    /**
     * Assign permissions to role.
     */
    public function assignPermissions(Request $request, int $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'permissions' => 'required|array',
                'permissions.*' => 'integer|exists:permissions,id',
            ]);

            // TODO: Implement permission assignment logic
            return $this->errorResponse('Permission assignment not implemented yet', 501);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Role not found', 404);
        }
    }

    /**
     * Remove permissions from role.
     */
    public function removePermissions(Request $request, int $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'permissions' => 'required|array',
                'permissions.*' => 'integer|exists:permissions,id',
            ]);

            // TODO: Implement permission removal logic
            return $this->errorResponse('Permission removal not implemented yet', 501);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Role not found', 404);
        }
    }
}
