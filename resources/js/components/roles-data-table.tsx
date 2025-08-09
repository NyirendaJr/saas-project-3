import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rolesApiService, type PaginationMeta, type RoleFilters } from '@/services/rolesApiService';
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type RowData,
    type SortingState,
    type VisibilityState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';

interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
}

interface RolesDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    enableRowSelection?: boolean;
    toolbar?: React.ReactElement<{ table?: any }>;
    emptyMessage?: string;
    loadingRows?: number;
    initialFilters?: RoleFilters;
    onPaginationChange?: (pagination: PaginationMeta) => void;
    showPagination?: boolean;
}

export function RolesDataTable<TData, TValue>({
    columns,
    enableRowSelection = true,
    toolbar,
    emptyMessage = 'No results.',
    loadingRows = 5,
    initialFilters = {},
    onPaginationChange,
    showPagination = true,
}: RolesDataTableProps<TData, TValue>) {
    const [data, setData] = useState<TData[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0,
        path: '',
        links: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<RoleFilters>(initialFilters);

    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    // Fetch data from API
    const fetchData = useCallback(
        async (currentFilters: RoleFilters) => {
            try {
                setLoading(true);
                setError(null);

                // Convert table state to API filters for Spatie Query Builder
                const apiFilters: RoleFilters = {
                    ...currentFilters,
                    page: currentFilters.page || 1,
                    per_page: currentFilters.per_page || 10,
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

                const response = await rolesApiService.getRoles(apiFilters);

                // Ensure we have valid data and pagination
                const validData = Array.isArray(response.data) ? response.data : [];
                const validPagination =
                    response.meta && typeof response.meta === 'object'
                        ? response.meta
                        : {
                              current_page: 1,
                              last_page: 1,
                              per_page: apiFilters.per_page || 10,
                              total: 0,
                              from: 0,
                              to: 0,
                              path: '',
                              links: [],
                          };

                setData(validData as TData[]);
                setPagination(validPagination);
                onPaginationChange?.(validPagination);
            } catch (err) {
                console.error('Error fetching roles:', err);
                setError('Failed to load roles');
                setData([]);
                // Keep the current pagination state on error
                // Don't call onPaginationChange to avoid undefined errors
            } finally {
                setLoading(false);
            }
        },
        [sorting, columnFilters],
    );

    // Update filters when initialFilters prop changes (for external pagination control)
    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    // Fetch data when filters change (for pagination)
    useEffect(() => {
        fetchData(filters);
    }, [filters]);

    // Fetch data when sorting or column filters change
    useEffect(() => {
        fetchData(filters);
    }, [fetchData]);

    // Update filters when table state changes
    useEffect(() => {
        const newFilters: RoleFilters = { ...filters };

        // Update global search
        const searchFilter = columnFilters.find((f) => f.id === 'name');
        if (searchFilter?.value) {
            newFilters.global = searchFilter.value as string;
        } else {
            delete newFilters.global;
        }

        // Update exact filters
        const guardFilter = columnFilters.find((f) => f.id === 'guard_name');
        if (guardFilter?.value) {
            newFilters.guard_name = guardFilter.value as string;
        } else {
            delete newFilters.guard_name;
        }

        // Update sorting (Spatie format)
        if (sorting.length > 0) {
            const sort = sorting[0];
            newFilters.sort = sort.desc ? `-${sort.id}` : sort.id;
        } else {
            delete newFilters.sort;
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
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="text-sm text-muted-foreground">{error}</p>
                        <Button variant="outline" size="sm" onClick={() => fetchData(filters)}>
                            Try Again
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    const renderEmpty = () => {
        return (
            <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    {emptyMessage}
                </TableCell>
            </TableRow>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Search roles..."
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    {table.getColumn('guard_name') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('guard_name')}
                            title="Guard"
                            options={[
                                { label: 'Web', value: 'web' },
                                { label: 'API', value: 'api' },
                            ]}
                        />
                    )}
                </div>
                <DataTableViewOptions table={table} />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading
                            ? renderLoadingRows()
                            : error
                              ? renderError()
                              : table.getRowModel().rows?.length
                                ? table.getRowModel().rows.map((row) => (
                                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                          {row.getVisibleCells().map((cell) => (
                                              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                          ))}
                                      </TableRow>
                                  ))
                                : renderEmpty()}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
