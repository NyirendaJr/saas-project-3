# Brand Management Implementation Pattern

This document outlines the standardized pattern used for implementing the Brand Management system, which should be followed for all future module implementations (Categories, Products, Suppliers, etc.).

## 🏗️ Architecture Overview

The implementation follows a clean architecture pattern with clear separation between:

- **API Layer**: Controllers, Resources, Routes
- **Business Logic**: Services
- **Data Access**: Repositories
- **Frontend**: React Components with Context API
- **Multi-tenancy**: Warehouse-scoped operations

## 📁 Backend Structure

### 1. **Controller** (`app/Http/Controllers/Api/Internal/BrandController.php`)

```php
class BrandController extends BaseApiController
{
    public function __construct(
        private readonly BrandServiceInterface $brandService,
        private readonly PermissionHelperServiceInterface $permissionHelper
    ) {}

    public function index(Request $request): JsonResponse
    public function all(): JsonResponse
    public function show(string $id): JsonResponse
    public function store(Request $request): JsonResponse
    public function update(Request $request, string $id): JsonResponse
    public function destroy(string $id): JsonResponse
    public function toggleStatus(string $id): JsonResponse
    public function getByStatus(Request $request): JsonResponse
}
```

**Key Patterns:**

- ✅ Extends `BaseApiController` (uses `ApiResponse` trait)
- ✅ Dependency injection for Service and PermissionHelper
- ✅ Permission checks on every method
- ✅ Consistent error handling with try-catch
- ✅ Returns JSON responses using `successResponse()`, `errorResponse()`, etc.
- ✅ Additional utility endpoints (all, toggle-status, by-status)

### 2. **API Resource** (`app/Http/Resources/Api/Brand/BrandResource.php`)

```php
class BrandResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            // ... all model attributes
            'warehouse' => [
                'id' => $this->warehouse->id,
                'name' => $this->warehouse->name,
                'code' => $this->warehouse->code,
            ],
            'products_count' => $this->when(
                $this->relationLoaded('products'),
                fn() => $this->products->count()
            ),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
```

**Key Patterns:**

- ✅ Consistent field naming (snake_case)
- ✅ Include related models (warehouse info)
- ✅ Conditional fields using `when()`
- ✅ ISO date formatting
- ✅ Count relationships when loaded

### 3. **Service** (`app/Services/Concretes/BrandService.php`)

```php
class BrandService extends BaseService implements BrandServiceInterface
{
    public function __construct(protected BrandRepositoryInterface $brandRepository)
    {
        $this->setRepository($brandRepository);
    }

    public function getFilteredBrands(?Request $request = null, int $perPage = 15): LengthAwarePaginator
    public function getAllBrandsForCurrentWarehouse(): Collection
    public function getBrandById(string $id): ?Model
    public function createBrand(array $data): Model
    public function updateBrand(string $id, array $data): Model
    public function deleteBrand(string $id): bool
    public function toggleBrandStatus(string $id): Model
    public function getBrandsByStatus(bool $isActive): Collection
    public function searchBrands(string $query): Collection
}
```

**Key Patterns:**

- ✅ Extends `BaseService` with repository injection
- ✅ All operations are warehouse-scoped
- ✅ Automatic warehouse context validation
- ✅ Business logic like slug generation
- ✅ Validation for business rules (e.g., can't delete brands with products)
- ✅ Comprehensive CRUD + utility methods

### 4. **Repository** (`app/Repositories/Brand/Concretes/BrandRepository.php`)

```php
class BrandRepository extends QueryableRepository implements BrandRepositoryInterface
{
    protected function model(): string { return Brand::class; }

    protected function getAllowedFilters(): array
    protected function getAllowedSorts(): array
    protected function getDefaultSort(): string
    public function scopeToWarehouse(string $warehouseId): void
    protected function applyScopes($query)

    // Warehouse-specific methods
    public function getByStatus(bool $isActive): Collection
    public function searchByQuery(string $query): Collection
    public function slugExistsInWarehouse(string $slug, string $warehouseId, ?string $excludeId = null): bool
}
```

**Key Patterns:**

- ✅ Extends `QueryableRepository` for filtering/sorting
- ✅ Warehouse scoping functionality
- ✅ Spatie QueryBuilder integration
- ✅ Domain-specific query methods

### 5. **Routes** (`routes/api.php`)

```php
Route::prefix('brands')->name('brands.')->group(function () {
    Route::get('/', [BrandController::class, 'index'])->name('index');
    Route::get('/all', [BrandController::class, 'all'])->name('all');
    Route::get('/{brand}', [BrandController::class, 'show'])->name('show');
    Route::post('/', [BrandController::class, 'store'])->name('store');
    Route::put('/{brand}', [BrandController::class, 'update'])->name('update');
    Route::delete('/{brand}', [BrandController::class, 'destroy'])->name('destroy');
    Route::post('/{brand}/toggle-status', [BrandController::class, 'toggleStatus'])->name('toggle-status');
    Route::get('/by-status/{status}', [BrandController::class, 'getByStatus'])->name('by-status');
});
```

**Key Patterns:**

- ✅ RESTful resource routes
- ✅ Additional utility routes
- ✅ Consistent naming convention
- ✅ Protected by `auth:sanctum` middleware

## 🎨 Frontend Structure

### 1. **API Service** (`resources/js/services/brandsApiService.ts`)

```typescript
export interface Brand {
    /* TypeScript interface */
}
export interface BrandFilters {
    /* Filter interface */
}
export interface PaginationMeta {
    /* Pagination interface */
}

class BrandsApiService {
    private baseUrl = '/api/brands';

    async getBrands(filters: BrandFilters = {}): Promise<BrandsResponse>;
    async getAllBrands(): Promise<Brand[]>;
    async getBrand(id: string): Promise<Brand>;
    async createBrand(data: CreateBrandData): Promise<Brand>;
    async updateBrand(id: string, data: UpdateBrandData): Promise<Brand>;
    async deleteBrand(id: string): Promise<void>;
    async toggleBrandStatus(id: string): Promise<Brand>;
    async getBrandsByStatus(isActive: boolean): Promise<Brand[]>;
}
```

**Key Patterns:**

- ✅ TypeScript interfaces for type safety
- ✅ Axios-based HTTP client
- ✅ Consistent method naming
- ✅ Comprehensive CRUD operations
- ✅ URL construction with query parameters

### 2. **Context Provider** (`resources/js/pages/modules/inventory/brands/context/brands-context.tsx`)

```typescript
interface BrandsContextType {
    selectedBrands: string[];
    setSelectedBrands: (brands: string[]) => void;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    isCreateDialogOpen: boolean;
    setIsCreateDialogOpen: (open: boolean) => void;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    editingBrand: Brand | null;
    setEditingBrand: (brand: Brand | null) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string | null) => void;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}
```

**Key Patterns:**

- ✅ Centralized state management
- ✅ Dialog state management
- ✅ Selection management
- ✅ Error/success message handling
- ✅ Loading state management
- ✅ Flash message support

### 3. **Data Table Columns** (`resources/js/pages/modules/inventory/brands/components/brands-columns.tsx`)

```typescript
export const columns: ColumnDef<Brand>[] = [
    // Selection column
    { id: 'select', header: ({ table }) => <Checkbox ... />, cell: ({ row }) => <Checkbox ... /> },

    // Data columns with sorting
    { accessorKey: 'name', header: ({ column }) => <Button onClick={() => column.toggleSorting()} .../> },

    // Actions column
    { id: 'actions', cell: ({ row }) => <BrandActionsCell brand={row.original} /> },
];
```

**Key Patterns:**

- ✅ TanStack Table integration
- ✅ Row selection support
- ✅ Sortable columns
- ✅ Actions dropdown menu
- ✅ Custom cell rendering

### 4. **Dialog Components** (`resources/js/pages/modules/inventory/brands/components/brands-dialogs.tsx`)

```typescript
export function BrandsDialogs() {
    return (
        <>
            <CreateBrandDialog />
            <EditBrandDialog />
            <DeleteBrandDialog />
        </>
    );
}
```

**Key Patterns:**

- ✅ Separate dialogs for each action
- ✅ React Hook Form integration
- ✅ Zod schema validation
- ✅ Context-based state management
- ✅ Optimistic UI updates

### 5. **Main Page** (`resources/js/pages/modules/inventory/brands/index.tsx`)

```typescript
export default function BrandsModule({ module, flash }: BrandsModuleProps) {
    const sidebarData = getModuleSidebar('inventory');

    return (
        <BrandsProvider initialFlash={flash}>
            <PageLayout
                title="Brand Management"
                description="Manage your product brands and brand information."
                primaryButtons={<BrandsPrimaryButtons />}
                dialogs={<BrandsDialogs />}
                module={module}
                sidebarData={sidebarData}
            >
                <BrandsDataTableWithPagination
                    columns={columns}
                    toolbar={<DataTableToolbar ... />}
                />
            </PageLayout>
        </BrandsProvider>
    );
}
```

**Key Patterns:**

- ✅ Context provider wrapper
- ✅ PageLayout component
- ✅ Modular component structure
- ✅ Sidebar integration
- ✅ Toolbar with search/filters

## 🔧 Implementation Checklist

### Backend Implementation:

- [ ] Create Model with `HasUuids` and `BelongsToWarehouse` traits
- [ ] Create Migration with proper fields and indexes
- [ ] Create Repository (Interface + Concrete) extending `QueryableRepository`
- [ ] Create Service (Interface + Concrete) extending `BaseService`
- [ ] Create API Resource extending `JsonResource`
- [ ] Create Controller extending `BaseApiController`
- [ ] Register Repository in `RepositoryServiceProvider`
- [ ] Register Service in `ServiceClassProvider`
- [ ] Add API routes with proper middleware

### Frontend Implementation:

- [ ] Create TypeScript interfaces and API service
- [ ] Create Context provider with state management
- [ ] Create Table columns with TanStack Table
- [ ] Create Dialog components (Create, Edit, Delete)
- [ ] Create Primary buttons component
- [ ] Create Data table components (with pagination)
- [ ] Create Main page with PageLayout
- [ ] Update module controller to render page
- [ ] Add sidebar navigation items

### Testing:

- [ ] Test CRUD operations
- [ ] Test multi-tenancy isolation
- [ ] Test permissions
- [ ] Test search and filtering
- [ ] Test pagination
- [ ] Test error handling
- [ ] Test responsive design

## 🎯 Benefits of This Pattern

1. **Consistency**: All modules follow the same structure
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Components can be easily adapted
4. **Type Safety**: Full TypeScript support
5. **Multi-tenancy**: Built-in warehouse scoping
6. **Performance**: Pagination and filtering
7. **User Experience**: Modern, responsive UI
8. **Scalability**: Easy to extend and modify

## 🚀 Next Steps

Use this pattern as a template for implementing:

- **Categories Management**
- **Products Management**
- **Suppliers Management**
- **Customers Management**
- **Purchase Orders**
- **Sales Orders**
- **Stock Management**

Each implementation should follow this exact structure for consistency and maintainability.

