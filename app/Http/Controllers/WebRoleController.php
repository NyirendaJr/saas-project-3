<?php

namespace App\Http\Controllers;

use App\Services\Contracts\RoleServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class WebRoleController extends Controller
{
    public function __construct(
        private RoleServiceInterface $roleService
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('modules/settings/roles/index');
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $role = $this->roleService->createRole($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Role created successfully',
                'data' => $role
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $role = $this->roleService->getRole($id);

            if (!$role) {
                return response()->json([
                    'success' => false,
                    'message' => 'Role not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $role
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $role = $this->roleService->updateRole($id, $request->all());

            return response()->json([
                'success' => true,
                'message' => 'Role updated successfully',
                'data' => $role
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $deleted = $this->roleService->deleteRole($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Role not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Role deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroyMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:roles,id'
        ]);

        try {
            $deleted = $this->roleService->deleteMultipleRoles($request->ids);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'No roles were deleted'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Roles deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function getGuards(): JsonResponse
    {
        try {
            $guards = $this->roleService->getGuards();

            return response()->json([
                'success' => true,
                'data' => $guards
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
