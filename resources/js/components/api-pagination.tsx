import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type PaginationData } from '@/services/permissionsApiService';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { useCallback } from 'react';

interface ApiPaginationProps {
    pagination: PaginationData;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    loading?: boolean;
}

export function ApiPagination({ pagination, onPageChange, onPageSizeChange, loading = false }: ApiPaginationProps) {
    const { current_page, last_page, per_page, total, from, to } = pagination;

    const handlePageSizeChange = useCallback(
        (value: string) => {
            const newPerPage = parseInt(value);
            onPageSizeChange(newPerPage);
        },
        [onPageSizeChange],
    );

    const handlePageChange = useCallback(
        (page: number) => {
            onPageChange(page);
        },
        [onPageChange],
    );

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">{loading ? 'Loading...' : `Showing ${from} to ${to} of ${total} results.`}</div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select value={`${per_page}`} onValueChange={handlePageSizeChange} disabled={loading}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={per_page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {current_page} of {last_page}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange(1)}
                        disabled={current_page <= 1 || loading}
                    >
                        <span className="sr-only">Go to first page</span>
                        <IconChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(current_page - 1)}
                        disabled={current_page <= 1 || loading}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <IconChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(current_page + 1)}
                        disabled={current_page >= last_page || loading}
                    >
                        <span className="sr-only">Go to next page</span>
                        <IconChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange(last_page)}
                        disabled={current_page >= last_page || loading}
                    >
                        <span className="sr-only">Go to last page</span>
                        <IconChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
