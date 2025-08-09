<?php

namespace App\Http\Controllers\Api\Internal;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\Api\Permission\PermissionResource;
use App\Services\Contracts\PermissionServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class PermissionController extends BaseApiController
{
    public function __construct(
        private readonly PermissionServiceInterface $permissionService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $permissions = $this->permissionService->getFilteredPermissions($request, $request->get('per_page', 15));

        return $this->successResponse(PermissionResource::collection($permissions));
    }

    /**
     * Get all permissions (without pagination).
     */
    public function all(): JsonResponse
    {
        $permissions = $this->permissionService->all();

        return $this->successResponse(PermissionResource::collection($permissions));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $permission = $this->permissionService->getPermissionById($id);
            return $this->successResponse(new PermissionResource($permission));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Permission not found', 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
            'guard_name' => 'required|string|max:255',
            'module' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        $permission = $this->permissionService->createPermission($validated);

        return $this->successResponse(new PermissionResource($permission), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255|unique:permissions,name,' . $id,
                'guard_name' => 'sometimes|string|max:255',
                'module' => 'sometimes|string|max:255',
                'description' => 'nullable|string|max:500',
            ]);

            $permission = $this->permissionService->updatePermission($id, $validated);

            return $this->successResponse(new PermissionResource($permission));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Permission not found', 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->permissionService->deletePermission($id);
            return $this->successResponse(['message' => 'Permission deleted successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->errorResponse('Permission not found', 404);
        }
    }

    /**
     * Get permissions by module.
     */
    public function getByModule(string $module): JsonResponse
    {
        $permissions = $this->permissionService->getPermissionsByModule($module);

        return $this->successResponse(PermissionResource::collection($permissions));
    }

    /**
     * Get permissions by guard.
     */
    public function getByGuard(string $guard): JsonResponse
    {
        $permissions = $this->permissionService->getPermissionsByGuard($guard);

        return $this->successResponse(PermissionResource::collection($permissions));
    }

    /**
     * Get all modules.
     */
    public function getModules(): JsonResponse
    {
        $modules = $this->permissionService->getModules();

        return $this->successResponse($modules);
    }

    /**
     * Get all guards.
     */
    public function getGuards(): JsonResponse
    {
        $guards = $this->permissionService->getGuards();

        return $this->successResponse($guards);
    }
}
