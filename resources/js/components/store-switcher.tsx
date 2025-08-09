import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/context/store-context';
import { Building2, Check, ChevronDown, Store as StoreIcon, Warehouse } from 'lucide-react';

interface StoreSwitcherProps {
    className?: string;
}

export function StoreSwitcher({ className }: StoreSwitcherProps) {
    const { currentStore, availableStores, loading, switchStore } = useStore();

    if (loading) {
        return (
            <div className={`flex items-center space-x-2 ${className}`}>
                <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
        );
    }

    if (availableStores.length === 0) {
        return <div className={`text-sm text-muted-foreground ${className}`}>No stores available</div>;
    }

    // If we have stores but no current store, use the first available store
    const displayStore = currentStore || availableStores[0];

    const getStoreIcon = (type: string) => {
        switch (type) {
            case 'warehouse':
                return <Warehouse className="h-4 w-4" />;
            case 'distribution_center':
                return <Building2 className="h-4 w-4" />;
            default:
                return <StoreIcon className="h-4 w-4" />;
        }
    };

    const handleStoreSwitch = async (storeId: number) => {
        if (storeId === displayStore.id) return;
        await switchStore(storeId);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`w-full justify-between ${className}`}>
                    <div className="flex items-center space-x-2">
                        {getStoreIcon(displayStore.type)}
                        <span className="font-medium">{displayStore.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">Switch Store/Warehouse</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {availableStores.map((store) => (
                    <DropdownMenuItem key={store.id} onClick={() => handleStoreSwitch(store.id)} className="cursor-pointer">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {getStoreIcon(store.type)}
                                <span className="font-medium">{store.name}</span>
                            </div>
                            {store.is_current && <Check className="h-4 w-4 text-primary" />}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
