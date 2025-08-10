import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWarehouse } from '@/context/warehouse-context';
import { Building2, Check, ChevronDown, Store as StoreIcon, Warehouse as WarehouseIcon } from 'lucide-react';

interface WarehouseSwitcherProps {
    className?: string;
}

export function WarehouseSwitcher({ className }: WarehouseSwitcherProps) {
    const { currentWarehouse, availableWarehouses, loading, switchWarehouse } = useWarehouse();

    if (loading) {
        return (
            <div className={`flex items-center space-x-2 ${className}`}>
                <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
        );
    }

    if (availableWarehouses.length === 0) {
        return <div className={`text-sm text-muted-foreground ${className}`}>No warehouses available</div>;
    }

    // If we have warehouses but no current warehouse, use the first available warehouse
    const displayWarehouse = currentWarehouse || availableWarehouses[0];

    const getWarehouseIcon = (type: string) => {
        switch (type) {
            case 'warehouse':
                return <WarehouseIcon className="h-4 w-4" />;
            case 'distribution_center':
                return <Building2 className="h-4 w-4" />;
            default:
                return <StoreIcon className="h-4 w-4" />;
        }
    };

    const handleWarehouseSwitch = async (warehouseId: string) => {
        if (warehouseId === displayWarehouse.id) return;
        await switchWarehouse(warehouseId);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`w-full justify-between ${className}`}>
                    <div className="flex items-center space-x-2">
                        {getWarehouseIcon(displayWarehouse.type)}
                        <span className="font-medium">{displayWarehouse.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">Switch Warehouse</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {availableWarehouses.map((warehouse) => (
                    <DropdownMenuItem key={warehouse.id} onClick={() => handleWarehouseSwitch(warehouse.id)} className="cursor-pointer">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {getWarehouseIcon(warehouse.type)}
                                <span className="font-medium">{warehouse.name}</span>
                            </div>
                            {warehouse.is_current && <Check className="h-4 w-4 text-primary" />}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
