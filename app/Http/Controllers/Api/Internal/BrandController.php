<?php

namespace App\Http\Controllers\Api\Internal;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\Api\Brand\BrandResource;
use App\Services\Contracts\BrandServiceInterface;
use App\Services\Contracts\PermissionHelperServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BrandController extends BaseApiController
{
    public function __construct(
        private readonly BrandServiceInterface $brandService,
        private readonly PermissionHelperServiceInterface $permissionHelper
    ) {}

    /**
     * Display a listing of brands for the current warehouse.
     */
    public function index(Request $request): JsonResponse
    {
        //$this->permissionHelper->checkPermission('brand_view');
        
        try {
            $brands = $this->brandService->getFilteredBrands($request, $request->get('per_page', 15));
            return $this->successResponse(BrandResource::collection($brands));
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch brands: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get all brands (without pagination) for the current warehouse.
     */
    public function all(): JsonResponse
    {
        $this->permissionHelper->checkPermission('brand_view');
        
        try {
            $brands = $this->brandService->getAllBrandsForCurrentWarehouse();
            return $this->successResponse(BrandResource::collection($brands));
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch brands: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified brand.
     */
    public function show(string $id): JsonResponse
    {
        $this->permissionHelper->checkPermission('brand_view');
        
        try {
            $brand = $this->brandService->getBrandById($id);
            return $this->successResponse(new BrandResource($brand));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Brand not found');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch brand: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created brand in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $this->permissionHelper->checkPermission('brand_create');
        
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255',
                'description' => 'nullable|string|max:1000',
                'logo_url' => 'nullable|url|max:500',
                'website_url' => 'nullable|url|max:500',
                'is_active' => 'boolean',
            ]);

            $brand = $this->brandService->createBrand($validated);
            return $this->createdResponse(new BrandResource($brand));
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->validationErrorResponse('Validation failed');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create brand: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update the specified brand in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $this->permissionHelper->checkPermission('brand_edit');
        
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'slug' => 'sometimes|string|max:255',
                'description' => 'nullable|string|max:1000',
                'logo_url' => 'nullable|url|max:500',
                'website_url' => 'nullable|url|max:500',
                'is_active' => 'boolean',
            ]);

            $brand = $this->brandService->updateBrand($id, $validated);
            return $this->successResponse(new BrandResource($brand));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Brand not found');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->validationErrorResponse('Validation failed');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update brand: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified brand from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $this->permissionHelper->checkPermission('brand_delete');
        
        try {
            $this->brandService->deleteBrand($id);
            return $this->successResponse(['message' => 'Brand deleted successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Brand not found');
        } catch (\InvalidArgumentException $e) {
            return $this->validationErrorResponse($e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete brand: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Toggle the active status of the brand.
     */
    public function toggleStatus(string $id): JsonResponse
    {
        $this->permissionHelper->checkPermission('brand_edit');
        
        try {
            $brand = $this->brandService->toggleBrandStatus($id);
            return $this->successResponse(new BrandResource($brand));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Brand not found');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to toggle brand status: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get brands by status.
     */
    public function getByStatus(Request $request): JsonResponse
    {
        $this->permissionHelper->checkPermission('brand_view');
        
        try {
            $validated = $request->validate([
                'status' => 'required|boolean'
            ]);

            $brands = $this->brandService->getBrandsByStatus($validated['status']);
            return $this->successResponse(BrandResource::collection($brands));
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->validationErrorResponse('Invalid status value');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch brands by status: ' . $e->getMessage(), 500);
        }
    }
}