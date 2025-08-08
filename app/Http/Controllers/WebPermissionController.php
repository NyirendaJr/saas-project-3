<?php

namespace App\Http\Controllers;

use App\Services\Contracts\PermissionServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class WebPermissionController extends Controller
{
    public function __construct(
        private PermissionServiceInterface $permissionService
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('modules/settings/permissions/index');
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $permission = $this->permissionService->createPermission($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Permission created successfully',
                'data' => $permission
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
            $permission = $this->permissionService->getPermissionById($id);

            if (!$permission) {
                return response()->json([
                    'success' => false,
                    'message' => 'Permission not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $permission
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
            $permission = $this->permissionService->updatePermission($id, $request->all());

            return response()->json([
                'success' => true,
                'message' => 'Permission updated successfully',
                'data' => $permission
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
            $deleted = $this->permissionService->deletePermission($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Permission not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Permission deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 404);
        }
    }

    public function destroyMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:permissions,id'
        ]);

        try {
            $deleted = $this->permissionService->deleteMultiplePermissions($request->ids);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'No permissions were deleted'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Permissions deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function getModules(): JsonResponse
    {
        try {
            $modules = $this->permissionService->getModules();

            return response()->json([
                'success' => true,
                'data' => $modules
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getGuards(): JsonResponse
    {
        try {
            $guards = $this->permissionService->getGuards();

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

    public function syncPermissions()
    {
        try {
            // Check if user has superadmin permissions
            if (!auth()->check() || !auth()->user()->hasRole('superadmin')) {
                return back()->with('error', 'Unauthorized. Only superadmin can sync permissions.');
            }

            $result = \App\Classes\PermsSeed::syncPermissions();

            return back()->with('success', "Permissions synced successfully. {$result['synced']} new permissions created, {$result['updated']} permissions updated.");
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to sync permissions: ' . $e->getMessage());
        }
    }
} 