import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface ServerSideSearchToolbarProps<TData> {
    table?: any; // TanStack Table instance
    searchField: string; // The field to use for server-side search
    searchPlaceholder?: string;
    filters?: Array<{
        column: string;
        title: string;
        options: Array<{ label: string; value: string; icon?: React.ComponentType<{ className?: string }> }>;
    }>;
    onSearchChange: (value: string) => void; // Callback for search changes
    onFilterChange: (column: string, value: string) => void; // Callback for filter changes
    searchValue?: string; // Controlled search value
}

export function ServerSideSearchToolbar<TData>({
    table,
    searchField,
    searchPlaceholder = 'Search...',
    filters = [],
    onSearchChange,
    onFilterChange,
    searchValue = '',
}: ServerSideSearchToolbarProps<TData>) {
    const [localSearchValue, setLocalSearchValue] = useState(searchValue);

    // Sync local state with prop
    useEffect(() => {
        setLocalSearchValue(searchValue);
    }, [searchValue]);

    const handleSearch = (value: string) => {
        setLocalSearchValue(value);
        onSearchChange(value);
    };

    const clearSearch = () => {
        setLocalSearchValue('');
        onSearchChange('');
    };

    const handleFilterChange = (column: string, value: string) => {
        onFilterChange(column, value);
    };

    const isFiltered = localSearchValue.length > 0 || (table && table.getState().columnFilters.length > 0);

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="relative">
                    <IconSearch className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={searchPlaceholder}
                        value={localSearchValue}
                        onChange={(event) => handleSearch(event.target.value)}
                        className="h-8 w-[150px] pl-8 lg:w-[250px]"
                    />
                    {localSearchValue && (
                        <Button variant="ghost" size="sm" className="absolute top-0 right-0 h-8 w-8 p-0" onClick={clearSearch}>
                            <IconX className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                {filters.map((filter) => (
                    <DataTableFacetedFilter
                        key={filter.column}
                        column={table?.getColumn(filter.column)}
                        title={filter.title}
                        options={filter.options}
                        onValueChange={(value) => handleFilterChange(filter.column, value)}
                    />
                ))}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            clearSearch();
                            if (table) {
                                table.resetColumnFilters();
                            }
                            // Reset all filters
                            filters.forEach((filter) => {
                                onFilterChange(filter.column, '');
                            });
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <IconX className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {table && <DataTableViewOptions table={table} />}
        </div>
    );
}
