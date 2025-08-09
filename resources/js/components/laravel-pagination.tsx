import { Button } from '@/components/ui/button';
import { PaginationMeta } from '@/services/permissionsApiService';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface LaravelPaginationProps {
    pagination: PaginationMeta;
    onPageChange: (page: number) => void;
    className?: string;
}

export function LaravelPagination({ pagination, onPageChange, className = '' }: LaravelPaginationProps) {
    const { current_page, last_page, per_page, total, from, to, links } = pagination;

    // Don't render pagination if there's only one page or no data
    if (last_page <= 1 || total === 0) {
        return null;
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= last_page && page !== current_page) {
            onPageChange(page);
        }
    };

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
                <Button key="page-1" variant="outline" size="sm" onClick={() => handlePageChange(1)} className="h-8 w-8 p-0">
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
                <Button key={`page-${last_page}`} variant="outline" size="sm" onClick={() => handlePageChange(last_page)} className="h-8 w-8 p-0">
                    {last_page}
                </Button>,
            );
        }

        return pageNumbers;
    };

    return (
        <div className={`flex items-center justify-between px-2 ${className}`}>
            <div className="flex-1 text-sm text-muted-foreground">
                Showing {from} to {to} of {total} results
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(current_page - 1)}
                    disabled={current_page <= 1}
                    className="h-8 w-8 p-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(current_page + 1)}
                    disabled={current_page >= last_page}
                    className="h-8 w-8 p-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
