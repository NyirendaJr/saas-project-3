<?php

namespace App\Http\Controllers\Api\Internal;

use App\Http\Controllers\Api\BaseApiController;
use App\Services\Contracts\WarehouseServiceInterface;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class WarehouseController extends BaseApiController
{
    public function __construct(
        private WarehouseServiceInterface $warehouseService
    ) {}

    /**
     * Get warehouses accessible by current user
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();
        $warehouses = $this->warehouseService->getWarehousesForUser($user);

        return response()->json([
            'warehouses' => $warehouses->map(function ($warehouse) {
                return [
                    'id' => $warehouse->id,
                    'name' => $warehouse->name,
                    'code' => $warehouse->code,
                    'type' => $warehouse->type,
                    'address' => $warehouse->address,
                    'is_current' => $warehouse->id === Auth::user()->current_warehouse_id,
                ];
            }),
            'current_warehouse_id' => $user->current_warehouse_id,
        ]);
    }

    /**
     * Switch to a different warehouse
     */
    public function switch(Request $request): JsonResponse
    {
        $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
        ]);

        $user = Auth::user();
        $warehouse = Warehouse::findOrFail($request->warehouse_id);

        if ($this->warehouseService->switchUserWarehouse($user, $warehouse)) {
            return response()->json([
                'message' => 'Successfully switched to ' . $warehouse->name,
                'current_warehouse' => [
                    'id' => $warehouse->id,
                    'name' => $warehouse->name,
                    'code' => $warehouse->code,
                    'type' => $warehouse->type,
                ],
            ]);
        }

        return $this->errorResponse('Unable to switch to the selected warehouse', 403);
    }

    /**
     * Get current warehouse information
     */
    public function current(): JsonResponse
    {
        $user = Auth::user();
        $warehouse = $this->warehouseService->getCurrentWarehouse($user);

        if (!$warehouse) {
            return $this->errorResponse('No current warehouse selected', 404);
        }

        return $this->successResponse([
            'warehouse' => [
                'id' => $warehouse->id,
                'name' => $warehouse->name,
                'code' => $warehouse->code,
                'type' => $warehouse->type,
                'address' => $warehouse->address,
                'phone' => $warehouse->phone,
                'email' => $warehouse->email,
                'operating_hours' => $warehouse->operating_hours,
                'settings' => $warehouse->settings,
            ],
        ]);
    }

    /**
     * Get warehouse details
     */
    public function show(Warehouse $warehouse): JsonResponse
    {
        $user = Auth::user();

        // Verify user has access to this warehouse
        if (!$user->hasAccessToWarehouse($warehouse)) {
            return $this->errorResponse('Access denied to this warehouse', 403);
        }

        return $this->successResponse([
            'warehouse' => [
                'id' => $warehouse->id,
                'name' => $warehouse->name,
                'code' => $warehouse->code,
                'type' => $warehouse->type,
                'address' => $warehouse->address,
                'phone' => $warehouse->phone,
                'email' => $warehouse->email,
                'operating_hours' => $warehouse->operating_hours,
                'settings' => $warehouse->settings,
                'is_current' => $warehouse->id === $user->current_warehouse_id,
            ],
        ]);
    }
}
