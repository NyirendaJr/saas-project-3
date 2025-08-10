import { Button } from '@/components/ui/button';
import { type PaginationMeta } from '@/types/api';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { MoreHorizontal } from 'lucide-react';
import { useCallback } from 'react';

interface ApiPaginationProps {
    pagination: PaginationMeta;
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

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Add first page and ellipsis if needed
        if (startPage > 1) {
            pageNumbers.push(
                <Button key="page-1" variant="outline" size="sm" onClick={() => handlePageChange(1)} className="h-8 w-8 p-0" disabled={loading}>
                    1
                </Button>,
            );

            if (startPage > 2) {
                pageNumbers.push(
                    <Button key="ellipsis-start" variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>,
                );
            }
        }

        // Add visible page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    key={`page-${i}`}
                    variant={i === current_page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(i)}
                    className="h-8 w-8 p-0"
                    disabled={loading}
                >
                    {i}
                </Button>,
            );
        }

        // Add last page and ellipsis if needed
        if (endPage < last_page) {
            if (endPage < last_page - 1) {
                pageNumbers.push(
                    <Button key="ellipsis-end" variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>,
                );
            }

            pageNumbers.push(
                <Button
                    key={`page-${last_page}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(last_page)}
                    className="h-8 w-8 p-0"
                    disabled={loading}
                >
                    {last_page}
                </Button>,
            );
        }

        return pageNumbers;
    };

    // Don't render pagination if there's only one page or no data
    if (last_page <= 1 || total === 0) {
        return (
            <div className="flex items-center justify-between px-2">
                <div className="flex-1 text-sm text-muted-foreground">{loading ? 'Loading...' : `Showing ${from} to ${to} of ${total} results.`}</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">{loading ? 'Loading...' : `Showing ${from} to ${to} of ${total} results.`}</div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <select
                        value={per_page}
                        onChange={(e) => handlePageSizeChange(e.target.value)}
                        disabled={loading}
                        className="h-8 w-[70px] rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
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

                    {/* Page Numbers */}
                    {renderPageNumbers()}

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
