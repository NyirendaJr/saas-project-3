<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseApiController;
use App\Services\Contracts\StoreServiceInterface;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class StoreController extends BaseApiController
{
    public function __construct(
        private StoreServiceInterface $storeService
    ) {}

    /**
     * Get stores accessible by current user
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();
        $stores = $this->storeService->getStoresForUser($user);

        return response()->json([
            'stores' => $stores->map(function ($store) {
                return [
                    'id' => $store->id,
                    'name' => $store->name,
                    'code' => $store->code,
                    'type' => $store->type,
                    'address' => $store->address,
                    'is_current' => $store->id === Auth::user()->current_store_id,
                ];
            }),
            'current_store_id' => $user->current_store_id,
        ]);
    }

    /**
     * Switch to a different store
     */
    public function switch(Request $request): JsonResponse
    {
        $request->validate([
            'store_id' => 'required|exists:stores,id',
        ]);

        $user = Auth::user();
        $store = Store::findOrFail($request->store_id);

        if ($this->storeService->switchUserStore($user, $store)) {
            return response()->json([
                'message' => 'Successfully switched to ' . $store->name,
                'current_store' => [
                    'id' => $store->id,
                    'name' => $store->name,
                    'code' => $store->code,
                    'type' => $store->type,
                ],
            ]);
        }

        return $this->errorResponse('Unable to switch to the selected store', 403);
    }

    /**
     * Get current store information
     */
    public function current(): JsonResponse
    {
        $user = Auth::user();
        $store = $this->storeService->getCurrentStore($user);

        if (!$store) {
            return $this->errorResponse('No current store selected', 404);
        }

        return $this->successResponse([
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'code' => $store->code,
                'type' => $store->type,
                'address' => $store->address,
                'phone' => $store->phone,
                'email' => $store->email,
                'operating_hours' => $store->operating_hours,
                'settings' => $store->settings,
            ],
        ]);
    }

    /**
     * Get store details
     */
    public function show(Store $store): JsonResponse
    {
        $user = Auth::user();

        // Verify user has access to this store
        if (!$user->hasAccessToStore($store)) {
            return $this->errorResponse('Access denied to this store', 403);
        }

        return $this->successResponse([
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'code' => $store->code,
                'type' => $store->type,
                'address' => $store->address,
                'phone' => $store->phone,
                'email' => $store->email,
                'operating_hours' => $store->operating_hours,
                'settings' => $store->settings,
                'is_current' => $store->id === $user->current_store_id,
            ],
        ]);
    }
}
