import { type PaginationMeta, type RoleFilters } from '@/services/rolesApiService';
import { useCallback, useState } from 'react';
import { ApiPagination } from './api-pagination';
import { RolesDataTable } from './roles-data-table';

interface RolesDataTableWithPaginationProps<TData, TValue> {
    columns: any[];
    enableRowSelection?: boolean;
    toolbar?: React.ReactElement<{ table?: any }>;
    emptyMessage?: string;
    loadingRows?: number;
    initialFilters?: RoleFilters;
}

export function RolesDataTableWithPagination<TData, TValue>({
    columns,
    enableRowSelection = true,
    toolbar,
    emptyMessage = 'No results.',
    loadingRows = 5,
    initialFilters = {},
}: RolesDataTableWithPaginationProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0,
    });
    const [loading, setLoading] = useState(false);
    const [currentFilters, setCurrentFilters] = useState<RoleFilters>({
        ...initialFilters,
        page: 1,
        per_page: 10,
    });

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
            <RolesDataTable
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
