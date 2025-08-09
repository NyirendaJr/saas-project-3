import { type PaginationMeta, type PermissionFilters } from '@/services/permissionsApiService';
import { useCallback, useState } from 'react';
import { ApiDataTable } from './api-data-table';
import { ApiPagination } from './api-pagination';

interface ApiDataTableWithPaginationProps<TData, TValue, TFilters extends PermissionFilters = PermissionFilters> {
    columns: any[];
    enableRowSelection?: boolean;
    toolbar?: React.ReactElement<{ table?: any }>;
    emptyMessage?: string;
    loadingRows?: number;
    initialFilters?: TFilters;
}

export function ApiDataTableWithPagination<TData, TValue, TFilters extends PermissionFilters = PermissionFilters>({
    columns,
    enableRowSelection = true,
    toolbar,
    emptyMessage = 'No results.',
    loadingRows = 5,
    initialFilters,
}: ApiDataTableWithPaginationProps<TData, TValue, TFilters>) {
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
    const [loading, setLoading] = useState(false);
    const [currentFilters, setCurrentFilters] = useState<TFilters>({
        ...initialFilters,
        page: 1,
        per_page: 10,
    } as TFilters & { page: number; per_page: number });

    const handlePageChange = useCallback((page: number) => {
        setLoading(true);
        setCurrentFilters((prev) => ({ ...prev, page }));
        setPagination((prev) => ({ ...prev, current_page: page }));
    }, []);

    const handlePageSizeChange = useCallback((pageSize: number) => {
        setLoading(true);
        setCurrentFilters((prev) => ({
            ...prev,
            per_page: pageSize,
            page: 1, // Reset to first page when changing page size
        }));
        setPagination((prev) => ({
            ...prev,
            per_page: pageSize,
            current_page: 1,
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
                showPagination={false}
                initialFilters={currentFilters}
                onPaginationChange={(newPagination) => {
                    if (newPagination && typeof newPagination === 'object') {
                        setPagination(newPagination);
                        setLoading(false);
                    }
                }}
            />
            <ApiPagination pagination={pagination} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} loading={loading} />
        </div>
    );
}
