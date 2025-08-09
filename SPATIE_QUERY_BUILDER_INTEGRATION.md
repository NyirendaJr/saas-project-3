# Spatie Query Builder Integration

This document explains how filtering and sorting has been updated to work with Spatie's Laravel Query Builder package.

## Overview

The system now uses Spatie Query Builder for consistent and powerful filtering, sorting, and pagination. This provides:

- **Consistent API**: Standardized query parameter format
- **Powerful Filtering**: Multiple filter types (exact, partial, scope, custom)
- **Flexible Sorting**: Multi-column sorting with direction control
- **Built-in Pagination**: Automatic pagination handling
- **Global Search**: Search across multiple fields
- **Field Selection**: Select specific fields to return
- **Relationship Loading**: Include related models

## Query Parameters

### Filtering

Spatie Query Builder uses the `filter[field_name]` format for filters:

```
GET /api/v1/permissions?filter[name]=admin&filter[guard_name]=web
```

**Available Filters for Permissions:**

- `filter[id]` - Exact match on ID
- `filter[name]` - Partial match on name
- `filter[guard_name]` - Exact match on guard name
- `filter[module]` - Exact match on module
- `filter[description]` - Partial match on description
- `filter[display_name]` - Partial match on display name
- `filter[global]` - Global search across multiple fields

### Sorting

Sorting uses the `sort` parameter:

```
GET /api/v1/permissions?sort=name,-created_at
```

- `sort=name` - Sort by name ascending
- `sort=-name` - Sort by name descending
- `sort=name,-created_at` - Sort by name ascending, then created_at descending

**Available Sort Fields:**

- `id`, `name`, `display_name`, `guard_name`, `module`, `description`, `created_at`, `updated_at`

### Pagination

Standard Laravel pagination parameters:

```
GET /api/v1/permissions?page=1&per_page=15
```

### Global Search

Global search searches across multiple fields defined in the model:

```
GET /api/v1/permissions?filter[global]=admin
```

This searches in: `name`, `display_name`, `module`, `description`

## Frontend Implementation

### Updated PermissionFilters Interface

```typescript
export interface PermissionFilters {
    // Global search (uses the 'global' filter)
    global?: string;
    // Exact filters
    id?: number;
    name?: string;
    guard_name?: string;
    module?: string;
    description?: string;
    // Sorting (Spatie uses 'sort' parameter)
    sort?: string;
    // Pagination
    per_page?: number;
    page?: number;
    // Includes (for relationships)
    include?: string;
    // Fields (for selecting specific fields)
    fields?: string;
}
```

### API Data Table Component

The component now converts table state to Spatie Query Builder parameters:

```typescript
// Convert table state to API filters for Spatie Query Builder
const apiFilters: PermissionFilters = {
    ...currentFilters,
    page: currentFilters.page || 1,
    per_page: currentFilters.per_page || 15,
};

// Add sorting if available (Spatie uses 'sort' parameter)
if (sorting.length > 0) {
    const sort = sorting[0];
    apiFilters.sort = sort.desc ? `-${sort.id}` : sort.id;
}

// Add global search if available
const searchFilter = columnFilters.find((f) => f.id === 'name');
if (searchFilter?.value) {
    apiFilters.global = searchFilter.value as string;
}

// Add exact filters
const guardFilter = columnFilters.find((f) => f.id === 'guard_name');
if (guardFilter?.value) {
    apiFilters.guard_name = guardFilter.value as string;
}
```

### Utility Functions

The `spatie-query-builder.ts` utility provides helper functions:

```typescript
import { toSpatieSort, buildSpatieParams, parseSpatieResponse } from '@/utils/spatie-query-builder';

// Convert sort to Spatie format
const sortString = toSpatieSort('name', 'desc'); // Returns "-name"

// Build query parameters
const params = buildSpatieParams({ global: 'search term', guard_name: 'web' }, { field: 'name', direction: 'asc' }, 1, 15);

// Parse API response
const data = parseSpatieResponse(response);
```

## Backend Implementation

### Permission Model

The model defines searchable fields for global search:

```php
class Permission extends SpatiePermission
{
    /**
     * Fields that can be searched globally
     */
    public array $searchable = [
        'name',
        'display_name',
        'module',
        'description',
    ];
}
```

### Permission Repository

The repository defines allowed filters, sorts, and includes:

```php
class PermissionRepository extends QueryableRepository
{
    public function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('id'),
            AllowedFilter::partial('name'),
            AllowedFilter::exact('guard_name'),
            AllowedFilter::exact('module'),
            AllowedFilter::partial('description'),
            AllowedFilter::partial('display_name'),
        ];
    }

    public function getAllowedSorts(): array
    {
        return ['id', 'name', 'display_name', 'guard_name', 'module', 'description', 'created_at', 'updated_at'];
    }

    public function getAllowedIncludes(): array
    {
        return ['roles'];
    }

    public function getAllowedFields(): array
    {
        return ['id', 'name', 'display_name', 'guard_name', 'module', 'description', 'created_at', 'updated_at'];
    }
}
```

### Base Queryable Repository

The base repository handles the Spatie Query Builder setup:

```php
abstract class QueryableRepository extends BaseRepository
{
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
            ->allowedFilters(array_merge(
                $this->getAllowedFilters(),
                [AllowedFilter::custom('global', new GlobalSearch)]
            ))
            ->allowedSorts($this->getAllowedSorts())
            ->allowedFields($this->getAllowedFields())
            ->allowedIncludes($this->getAllowedIncludes());
    }

    public function paginateFiltered(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator
    {
        $perPage = request()->input('per_page', $perPage) ?? $perPage;
        return $this->query()->paginate($perPage, $columns);
    }
}
```

## Usage Examples

### Basic Filtering

```typescript
// Filter by guard name
const filters = { guard_name: 'web' };

// Filter by module
const filters = { module: 'inventory' };

// Global search
const filters = { global: 'admin' };
```

### Advanced Filtering

```typescript
// Multiple filters
const filters = {
    guard_name: 'web',
    module: 'inventory',
    global: 'brand',
};

// With sorting
const filters = {
    guard_name: 'web',
    sort: '-created_at',
};
```

### Frontend Component Usage

```typescript
<ApiDataTable
    columns={columns}
    initialFilters={{
        guard_name: 'web',
        module: 'inventory',
        sort: 'name',
        per_page: 20
    }}
    onPaginationChange={(pagination) => {
        console.log('Current page:', pagination.current_page);
    }}
/>
```

## API Response Format

The API returns Laravel's standard pagination format:

```json
{
    "data": [
        {
            "id": 1,
            "name": "brands_view",
            "display_name": "Brand View",
            "guard_name": "web",
            "module": "inventory",
            "description": "View brand information"
        }
    ],
    "links": {
        "first": "http://127.0.0.1:8000/api/v1/permissions?page=1",
        "last": "http://127.0.0.1:8000/api/v1/permissions?page=8",
        "prev": null,
        "next": "http://127.0.0.1:8000/api/v1/permissions?page=2"
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 8,
        "per_page": 15,
        "to": 15,
        "total": 115
    }
}
```

## Benefits

1. **Consistent API**: All endpoints follow the same parameter format
2. **Type Safety**: Full TypeScript support for all parameters
3. **Flexible Filtering**: Multiple filter types for different use cases
4. **Global Search**: Search across multiple fields with one parameter
5. **Efficient Queries**: Optimized database queries with proper indexing
6. **Extensible**: Easy to add new filters, sorts, and includes
7. **Documentation**: Self-documenting API with clear parameter names

## Migration from Old Format

### Before (Old Format)

```typescript
// Old filter format
const filters = {
    search: 'admin',
    sort_by: 'name',
    sort_order: 'desc',
};
```

### After (Spatie Format)

```typescript
// New Spatie format
const filters = {
    global: 'admin',
    sort: '-name',
};
```

The new format is more concise and follows Spatie Query Builder conventions, making it easier to work with and more maintainable.
