import { Warehouse, warehouseApiService } from '@/services/warehouseService';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface WarehouseContextType {
    currentWarehouse: Warehouse | null;
    availableWarehouses: Warehouse[];
    loading: boolean;
    switchWarehouse: (warehouseId: string) => Promise<boolean>;
    refreshWarehouses: () => Promise<void>;
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

interface WarehouseProviderProps {
    children: ReactNode;
    auth?: any;
}

export function WarehouseProvider({ children, auth }: WarehouseProviderProps) {
    const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
    const [availableWarehouses, setAvailableWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(true);

    const loadWarehouses = async () => {
        // Don't load warehouses if user is not authenticated
        if (!auth?.user) {
            setLoading(false);
            setAvailableWarehouses([]);
            setCurrentWarehouse(null);
            return;
        }

        try {
            setLoading(true);
            const response = await warehouseApiService.getWarehouses();
            console.log('Warehouses API Response:', response);

            setAvailableWarehouses(response.warehouses || []);

            // Set current warehouse
            const current = response.warehouses?.find((warehouse) => warehouse.is_current);
            setCurrentWarehouse(current || null);
        } catch (error) {
            console.error('Failed to load warehouses:', error);
            console.error('Error details:', error.response?.data || error.message);

            // Check if it's an authentication error
            if (error.response?.status === 401) {
                console.warn('User not authenticated. Warehouse switcher will be hidden.');
                // Don't show error toast for authentication issues
            } else {
                toast.error('Failed to load warehouse information');
            }

            // Set empty state on error
            setAvailableWarehouses([]);
            setCurrentWarehouse(null);
        } finally {
            setLoading(false);
        }
    };

    const switchWarehouse = async (warehouseId: string): Promise<boolean> => {
        // Don't switch if user is not authenticated
        if (!auth?.user) {
            return false;
        }

        try {
            const response = await warehouseApiService.switchWarehouse(warehouseId);

            // Update current warehouse
            setCurrentWarehouse(response.current_warehouse);

            // Update is_current flag in available warehouses
            setAvailableWarehouses((prev) =>
                prev.map((warehouse) => ({
                    ...warehouse,
                    is_current: warehouse.id === warehouseId,
                })),
            );

            toast.success(response.message);

            // Reload the page to refresh all warehouse-scoped data
            window.location.reload();

            return true;
        } catch (error) {
            console.error('Failed to switch warehouse:', error);
            toast.error('Failed to switch warehouse');
            return false;
        }
    };

    const refreshWarehouses = async () => {
        await loadWarehouses();
    };

    useEffect(() => {
        loadWarehouses();
    }, [auth?.user]);

    const value: WarehouseContextType = {
        currentWarehouse,
        availableWarehouses,
        loading,
        switchWarehouse,
        refreshWarehouses,
    };

    return <WarehouseContext.Provider value={value}>{children}</WarehouseContext.Provider>;
}

export function useWarehouse(): WarehouseContextType {
    const context = useContext(WarehouseContext);
    if (context === undefined) {
        throw new Error('useWarehouse must be used within a WarehouseProvider');
    }
    return context;
}
