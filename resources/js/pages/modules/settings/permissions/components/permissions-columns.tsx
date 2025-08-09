import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Permission } from '@/services/permissionsApiService';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Shield } from 'lucide-react';

export const columns: ColumnDef<Permission>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Permission" />,
        cell: ({ row }) => {
            const permission = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{permission.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'module',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Module" />,
        cell: ({ row }) => {
            const module = row.getValue('module') as string;
            return (
                <Badge variant="secondary" className="capitalize">
                    {module}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'guard_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Guard" />,
        cell: ({ row }) => {
            const guard = row.getValue('guard_name') as string;
            return <Badge variant={guard === 'web' ? 'default' : 'outline'}>{guard.toUpperCase()}</Badge>;
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
            return <div className="max-w-[300px] truncate text-sm text-muted-foreground">{description}</div>;
        },
    },
    {
        accessorKey: 'roles_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Roles" />,
        cell: ({ row }) => {
            const rolesCount = row.getValue('roles_count') as number;
            return (
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{rolesCount}</span>
                    <span className="text-xs text-muted-foreground">roles</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'));
            return <div className="text-sm text-muted-foreground">{date.toLocaleDateString()}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const permission = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(permission.name)}>Copy permission name</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit permission</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete permission</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
