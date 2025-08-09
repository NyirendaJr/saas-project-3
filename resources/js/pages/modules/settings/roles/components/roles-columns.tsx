import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/utils';
import { type Role } from '@/services/rolesApiService';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Role>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'guard_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Guard" />,
        cell: ({ row }) => {
            const guardName = row.getValue('guard_name') as string;
            return <Badge variant={guardName === 'web' ? 'default' : 'secondary'}>{guardName}</Badge>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        cell: ({ row }) => {
            const description = row.getValue('description') as string;
            return <div className="max-w-[300px] truncate">{description || '-'}</div>;
        },
    },
    {
        accessorKey: 'permissions_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Permissions" />,
        cell: ({ row }) => {
            const count = row.getValue('permissions_count') as number;
            return <Badge variant="outline">{count || 0} permissions</Badge>;
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
        cell: ({ row }) => {
            return <div className="flex items-center">{formatDate(row.getValue('created_at'))}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
