import { type PaginationData, type PermissionFilters } from '@/services/permissionsApiService';
import { useCallback, useState } from 'react';
import { ApiDataTable } from './api-data-table';
import { ApiPagination } from './api-pagination';

interface ApiDataTableWithPaginationProps<TData, TValue> {
    columns: any[];
    enableRowSelection?: boolean;
    toolbar?: React.ReactElement;
    emptyMessage?: string;
    loadingRows?: number;
    initialFilters?: PermissionFilters;
}

export function ApiDataTableWithPagination<TData, TValue>({
    columns,
    enableRowSelection = true,
    toolbar,
    emptyMessage = 'No results.',
    loadingRows = 5,
    initialFilters = {},
}: ApiDataTableWithPaginationProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationData>({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
        from: 0,
        to: 0,
    });
    const [loading, setLoading] = useState(false);

    const handlePageChange = useCallback((page: number) => {
        setPagination((prev) => ({ ...prev, current_page: page }));
    }, []);

    const handlePageSizeChange = useCallback((pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            per_page: pageSize,
            current_page: 1, // Reset to first page when changing page size
        }));
    }, []);

    return (
        <div className="space-y-4">
            <ApiDataTable
                columns={columns}
                enableRowSelection={enableRowSelection}
                toolbar={toolbar}
                emptyMessage={emptyMessage}
                loadingRows={loadingRows}
                initialFilters={{
                    ...initialFilters,
                    page: pagination.current_page,
                    per_page: pagination.per_page,
                }}
                onPaginationChange={(newPagination) => {
                    if (newPagination && typeof newPagination === 'object') {
                        setPagination(newPagination);
                    }
                }}
            />
            <ApiPagination pagination={pagination} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} loading={loading} />
        </div>
    );
}
