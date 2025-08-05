import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconSearch, IconX } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table?: Table<TData>;
    searchKey?: string;
    searchPlaceholder?: string;
    filters?: Array<{
        column: string;
        title: string;
        options: Array<{ label: string; value: string; icon?: React.ComponentType<{ className?: string }> }>;
    }>;
}

export function DataTableToolbar<TData>({ table, searchKey, searchPlaceholder = 'Search...', filters = [] }: DataTableToolbarProps<TData>) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
        if (searchKey && table) {
            table.getColumn(searchKey)?.setFilterValue(value);
        }
    };

    const clearSearch = () => {
        setSearchValue('');
        if (searchKey && table) {
            table.getColumn(searchKey)?.setFilterValue('');
        }
    };

    const isFiltered = table ? table.getState().columnFilters.length > 0 || searchValue.length > 0 : false;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {searchKey && (
                    <div className="relative">
                        <IconSearch className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(event) => handleSearch(event.target.value)}
                            className="h-8 w-[150px] pl-8 lg:w-[250px]"
                        />
                        {searchValue && (
                            <Button variant="ghost" size="sm" className="absolute top-0 right-0 h-8 w-8 p-0" onClick={clearSearch}>
                                <IconX className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}
                {filters.map((filter) => (
                    <DataTableFacetedFilter
                        key={filter.column}
                        column={table?.getColumn(filter.column)}
                        title={filter.title}
                        options={filter.options}
                    />
                ))}
                {isFiltered && table && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            setSearchValue('');
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
