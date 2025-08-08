# Laravel Pagination Integration

This document explains how the API data table components have been updated to handle Laravel's standard pagination format.

## Laravel Pagination Format

Laravel's pagination response includes the following structure:

```json
{
    "data": [...],
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
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/v1/permissions?page=1",
                "label": "1",
                "active": true
            }
        ],
        "path": "http://127.0.0.1:8000/api/v1/permissions",
        "per_page": 15,
        "to": 15,
        "total": 115
    }
}
```

## Updated Components

### 1. API Service (`permissionsApiService.ts`)

The service now expects and handles Laravel's pagination format:

```typescript
export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}
```

### 2. API Data Table (`api-data-table.tsx`)

The main data table component now:

- Uses `PaginationMeta` instead of `PaginationData`
- Extracts pagination information from `response.meta`
- Includes built-in pagination component

```typescript
// The component now handles Laravel pagination automatically
<ApiDataTable
    columns={columns}
    initialFilters={{ page: 1, per_page: 15 }}
    onPaginationChange={(pagination) => {
        console.log('Pagination changed:', pagination);
    }}
    showPagination={true} // Enable built-in pagination
/>
```

### 3. Laravel Pagination Component (`laravel-pagination.tsx`)

A new pagination component specifically designed for Laravel's format:

```typescript
<LaravelPagination
    pagination={pagination}
    onPageChange={(page) => {
        // Handle page change
        setFilters(prev => ({ ...prev, page }));
    }}
/>
```

Features:

- Shows current page and total pages
- Displays "Showing X to Y of Z results"
- Handles ellipsis for large page counts
- Responsive design with proper button states

### 4. API Pagination Component (`api-pagination.tsx`)

Updated to work with `PaginationMeta` and includes:

- Page size selector
- First/Last page buttons
- Previous/Next buttons
- Current page indicator

## Usage Examples

### Basic Usage with Built-in Pagination

```typescript
import { ApiDataTable } from '@/components/api-data-table';

function PermissionsTable() {
    const columns = [
        // Your column definitions
    ];

    return (
        <ApiDataTable
            columns={columns}
            initialFilters={{ page: 1, per_page: 15 }}
            showPagination={true}
            onPaginationChange={(pagination) => {
                console.log('Current page:', pagination.current_page);
                console.log('Total pages:', pagination.last_page);
            }}
        />
    );
}
```

### Advanced Usage with Custom Pagination

```typescript
import { ApiDataTable } from '@/components/api-data-table';
import { ApiPagination } from '@/components/api-pagination';
import { useState } from 'react';

function PermissionsTable() {
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
        from: 0,
        to: 0,
        path: '',
        links: [],
    });

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, current_page: page }));
    };

    const handlePageSizeChange = (pageSize: number) => {
        setPagination(prev => ({
            ...prev,
            per_page: pageSize,
            current_page: 1,
        }));
    };

    return (
        <div className="space-y-4">
            <ApiDataTable
                columns={columns}
                initialFilters={{
                    page: pagination.current_page,
                    per_page: pagination.per_page,
                }}
                onPaginationChange={setPagination}
                showPagination={false} // Disable built-in pagination
            />
            <ApiPagination
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
}
```

### Using the Combined Component

```typescript
import { ApiDataTableWithPagination } from '@/components/api-data-table-with-pagination';

function PermissionsTable() {
    return (
        <ApiDataTableWithPagination
            columns={columns}
            initialFilters={{ page: 1, per_page: 15 }}
            emptyMessage="No permissions found"
        />
    );
}
```

## Migration from Old Format

If you were using the old pagination format, update your code:

### Before (Old Format)

```typescript
interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

// Response format
{
    data: [...],
    pagination: PaginationData
}
```

### After (Laravel Format)

```typescript
interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    path: string;
    links: Array<{...}>;
}

// Response format
{
    data: [...],
    links: {...},
    meta: PaginationMeta
}
```

## Key Benefits

1. **Standard Laravel Format**: Works seamlessly with Laravel's built-in pagination
2. **Rich Pagination Data**: Access to links, meta information, and more
3. **Flexible Components**: Choose between built-in or custom pagination
4. **Type Safety**: Full TypeScript support for all pagination interfaces
5. **Responsive Design**: Pagination components work well on all screen sizes

## Error Handling

The components include robust error handling:

```typescript
// If the API response doesn't match expected format
const validPagination =
    response.meta && typeof response.meta === 'object'
        ? response.meta
        : {
              current_page: 1,
              last_page: 1,
              per_page: 15,
              total: 0,
              from: 0,
              to: 0,
              path: '',
              links: [],
          };
```

This ensures the components continue to work even if the API response format changes or errors occur.
