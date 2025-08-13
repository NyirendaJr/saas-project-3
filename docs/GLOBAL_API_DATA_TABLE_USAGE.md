# Global ApiDataTableWithPagination Component Usage

The `ApiDataTableWithPagination` component is a globally reusable component that provides a complete data table solution with server-side pagination, filtering, and search capabilities. It's designed to work with any API service that follows the established pattern.

## Component Features

- **Server-side pagination** with Laravel-style pagination
- **Global search** across specified fields
- **Column filtering** with customizable filter options
- **Row selection** (optional)
- **Loading states** with skeleton rows
- **Error handling** with retry functionality
- **Responsive design** with proper mobile support
- **TypeScript support** with generic types

## Basic Usage

```tsx
import { ApiDataTableWithPagination, DataTableToolbar, PageLayout } from '@/components';
import { yourApiService } from '@/services/yourApiService';
import { columns } from './components/your-columns';

export default function YourPage() {
    return (
        <PageLayout title="Your Page Title" description="Your page description">
            <ApiDataTableWithPagination
                columns={columns}
                apiService={yourApiService}
                searchField="global"
                filterFields={['status', 'category']}
                toolbar={
                    <DataTableToolbar
                        searchKey="name"
                        searchPlaceholder="Search items..."
                        filters={[
                            {
                                column: 'status',
                                title: 'Status',
                                options: [
                                    { label: 'Active', value: 'true' },
                                    { label: 'Inactive', value: 'false' },
                                ],
                            },
                            {
                                column: 'category',
                                title: 'Category',
                                options: [
                                    { label: 'Category A', value: 'category_a' },
                                    { label: 'Category B', value: 'category_b' },
                                ],
                            },
                        ]}
                    />
                }
            />
        </PageLayout>
    );
}
```

## Required Props

### `columns`

Array of column definitions using TanStack Table's `ColumnDef` type.

```tsx
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<YourDataType>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
    },
    // ... more columns
];
```

### `apiService`

Your API service that implements the `GenericApiService` interface.

```tsx
// services/yourApiService.ts
import { type GenericApiService, type BaseFilters } from '@/types/api';

export interface YourFilters extends BaseFilters {
    status?: string;
    category?: string;
    // ... other filter fields
}

export const yourApiService: GenericApiService<YourDataType, YourFilters> = {
    index: async (filters: YourFilters) => {
        const response = await axios.get('/api/your-endpoint', { params: filters });
        return response.data;
    },
    // ... other methods
};
```

## Optional Props

### `enableRowSelection`

Enable/disable row selection. Default: `true`

### `toolbar`

Custom toolbar component with search and filters.

### `emptyMessage`

Custom message when no data is available. Default: `'No results.'`

### `loadingRows`

Number of skeleton rows to show while loading. Default: `5`

### `initialFilters`

Initial filter values to apply.

### `searchField`

Field to use for global search. Default: `'global'`

### `filterFields`

Array of field names that support filtering.

## Implementation Examples

### 1. Brands Page

```tsx
// pages/modules/inventory/brands/index.tsx
<ApiDataTableWithPagination
    columns={columns}
    apiService={brandsApiService}
    searchField="global"
    filterFields={['is_active']}
    toolbar={
        <DataTableToolbar
            searchKey="name"
            searchPlaceholder="Search brands..."
            filters={[
                {
                    column: 'is_active',
                    title: 'Status',
                    options: [
                        { label: 'Active', value: 'true' },
                        { label: 'Inactive', value: 'false' },
                    ],
                },
            ]}
        />
    }
/>
```

### 2. Roles Page

```tsx
// pages/modules/settings/roles/index.tsx
<ApiDataTableWithPagination
    columns={columns}
    apiService={rolesApiService}
    searchField="global"
    filterFields={['guard_name']}
    toolbar={
        <DataTableToolbar
            searchKey="name"
            searchPlaceholder="Search roles..."
            filters={[
                {
                    column: 'guard_name',
                    title: 'Guard',
                    options: [
                        { label: 'Web', value: 'web' },
                        { label: 'API', value: 'api' },
                    ],
                },
            ]}
        />
    }
/>
```

### 3. Permissions Page

```tsx
// pages/modules/settings/permissions/index.tsx
<ApiDataTableWithPagination
    columns={columns}
    apiService={permissionsApiService}
    searchField="global"
    filterFields={['guard_name', 'module']}
    toolbar={
        <DataTableToolbar
            searchKey="name"
            searchPlaceholder="Search permissions..."
            filters={[
                {
                    column: 'guard_name',
                    title: 'Guard',
                    options: [
                        { label: 'Web', value: 'web' },
                        { label: 'API', value: 'api' },
                    ],
                },
                {
                    column: 'module',
                    title: 'Module',
                    options: [
                        { label: 'Users', value: 'users' },
                        { label: 'Settings', value: 'settings' },
                        { label: 'Sales', value: 'sales' },
                        { label: 'Reports', value: 'reports' },
                    ],
                },
            ]}
        />
    }
/>
```

## Creating New Pages

To create a new page using this component:

1. **Create your columns definition** in `components/your-columns.tsx`
2. **Create your API service** implementing `GenericApiService`
3. **Import and use the component** with your specific configuration
4. **Add any custom toolbar or filters** as needed

## Type Safety

The component uses TypeScript generics to ensure type safety:

- `TData`: Your data type
- `TValue`: Column value type (usually `unknown`)
- `TFilters`: Your filters interface extending `BaseFilters`

## Best Practices

1. **Consistent naming**: Use consistent naming patterns for your API services and columns
2. **Reusable filters**: Create reusable filter configurations for common fields
3. **Error handling**: Ensure your API service handles errors gracefully
4. **Loading states**: Use appropriate loading row counts for your data
5. **Search optimization**: Choose appropriate search fields based on your data structure

## Troubleshooting

### Common Issues

1. **Type errors**: Ensure your API service implements the correct interface
2. **Filter not working**: Check that filter fields are included in `filterFields` array
3. **Search not working**: Verify the `searchField` matches your API's expected parameter
4. **Pagination issues**: Ensure your API returns proper pagination metadata

### Debug Tips

- Check the browser console for any JavaScript errors
- Verify API responses match expected data structure
- Use React DevTools to inspect component state
- Check network tab for API request/response details
