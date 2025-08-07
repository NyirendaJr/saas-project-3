import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as UITable } from '@/components/ui/table';
import { permissionsApiService, type PaginationData, type PermissionFilters } from '@/services/permissionsApiService';
import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    type Table,
} from '@tanstack/react-table';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        className?: string;
    }
}

interface ApiDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    enableRowSelection?: boolean;
    toolbar?: React.ReactElement<{ table?: Table<TData> }>;
    emptyMessage?: string;
    loadingRows?: number;
    initialFilters?: PermissionFilters;
    onPaginationChange?: (pagination: PaginationData) => void;
}

export function ApiDataTable<TData, TValue>({
    columns,
    enableRowSelection = true,
    toolbar,
    emptyMessage = 'No results.',
    loadingRows = 5,
    initialFilters = {},
    onPaginationChange,
}: ApiDataTableProps<TData, TValue>) {
    const [data, setData] = useState<TData[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
        from: 0,
        to: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<PermissionFilters>(initialFilters);

    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    // Fetch data from API
    const fetchData = useCallback(
        async (currentFilters: PermissionFilters) => {
            try {
                setLoading(true);
                setError(null);

                // Convert table state to API filters
                const apiFilters: PermissionFilters = {
                    ...currentFilters,
                    page: currentFilters.page || 1,
                    per_page: currentFilters.per_page || 15,
                };

                // Add sorting if available
                if (sorting.length > 0) {
                    const sort = sorting[0];
                    apiFilters.sort_by = sort.id;
                    apiFilters.sort_order = sort.desc ? 'desc' : 'asc';
                }

                // Add search if available
                const searchFilter = columnFilters.find((f) => f.id === 'name');
                if (searchFilter?.value) {
                    apiFilters.search = searchFilter.value as string;
                }

                // Add other filters
                const guardFilter = columnFilters.find((f) => f.id === 'guard_name');
                if (guardFilter?.value) {
                    apiFilters.guard_name = guardFilter.value as string;
                }

                const moduleFilter = columnFilters.find((f) => f.id === 'module');
                if (moduleFilter?.value) {
                    apiFilters.module = moduleFilter.value as string;
                }

                const response = await permissionsApiService.getPermissions(apiFilters);

                // Ensure we have valid data and pagination
                const validData = Array.isArray(response.data) ? response.data : [];
                const validPagination =
                    response.pagination && typeof response.pagination === 'object'
                        ? response.pagination
                        : {
                              current_page: 1,
                              last_page: 1,
                              per_page: apiFilters.per_page || 15,
                              total: 0,
                              from: 0,
                              to: 0,
                          };

                setData(validData as TData[]);
                setPagination(validPagination);
                onPaginationChange?.(validPagination);
            } catch (err) {
                console.error('Error fetching permissions:', err);
                setError('Failed to load permissions');
                setData([]);
                // Keep the current pagination state on error
                // Don't call onPaginationChange to avoid undefined errors
            } finally {
                setLoading(false);
            }
        },
        [sorting, columnFilters],
    );

    // Fetch data when filters, sorting, or column filters change
    useEffect(() => {
        fetchData(filters);
    }, [fetchData, filters]);

    // Update filters when table state changes
    useEffect(() => {
        const newFilters: PermissionFilters = { ...filters };

        // Update search
        const searchFilter = columnFilters.find((f) => f.id === 'name');
        if (searchFilter?.value) {
            newFilters.search = searchFilter.value as string;
        } else {
            delete newFilters.search;
        }

        // Update other filters
        const guardFilter = columnFilters.find((f) => f.id === 'guard_name');
        if (guardFilter?.value) {
            newFilters.guard_name = guardFilter.value as string;
        } else {
            delete newFilters.guard_name;
        }

        const moduleFilter = columnFilters.find((f) => f.id === 'module');
        if (moduleFilter?.value) {
            newFilters.module = moduleFilter.value as string;
        } else {
            delete newFilters.module;
        }

        // Update sorting
        if (sorting.length > 0) {
            const sort = sorting[0];
            newFilters.sort_by = sort.id;
            newFilters.sort_order = sort.desc ? 'desc' : 'asc';
        } else {
            delete newFilters.sort_by;
            delete newFilters.sort_order;
        }

        setFilters(newFilters);
    }, [columnFilters, sorting]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination: {
                pageIndex: pagination.current_page - 1,
                pageSize: pagination.per_page,
            },
        },
        enableRowSelection,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        // Disable client-side pagination since we're using server-side
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        // Set pagination state
        pageCount: pagination.last_page,
    });

    const renderLoadingRows = () => {
        return Array.from({ length: loadingRows }).map((_, index) => (
            <TableRow key={`loading-${index}`}>
                {columns.map((_, colIndex) => (
                    <TableCell key={`loading-cell-${index}-${colIndex}`}>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ));
    };

    const renderError = () => {
        return (
            <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="text-red-500">
                        {error}
                        <button onClick={() => fetchData(filters)} className="ml-2 text-blue-500 hover:underline">
                            Retry
                        </button>
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <div className="space-y-4">
            {toolbar && React.cloneElement(toolbar, { table } as any)}
            <div className="overflow-hidden rounded-md border">
                <UITable>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="group/row">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan} className={header.column.columnDef.meta?.className ?? ''}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            renderLoadingRows()
                        ) : error ? (
                            renderError()
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="group/row">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={cell.column.columnDef.meta?.className ?? ''}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </UITable>
            </div>
            {/* Pagination will be handled by the parent component */}
        </div>
    );
}
