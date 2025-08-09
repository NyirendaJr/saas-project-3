import { Store, storeApiService } from '@/services/storeService';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface StoreContextType {
    currentStore: Store | null;
    availableStores: Store[];
    loading: boolean;
    switchStore: (storeId: number) => Promise<boolean>;
    refreshStores: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
    children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
    const [currentStore, setCurrentStore] = useState<Store | null>(null);
    const [availableStores, setAvailableStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);

    const loadStores = async () => {
        try {
            setLoading(true);
            const response = await storeApiService.getStores();
            console.log('Stores API Response:', response);

            setAvailableStores(response.stores || []);

            // Set current store
            const current = response.stores?.find((store) => store.is_current);
            setCurrentStore(current || null);
        } catch (error) {
            console.error('Failed to load stores:', error);
            console.error('Error details:', error.response?.data || error.message);

            // Check if it's an authentication error
            if (error.response?.status === 401) {
                console.warn('User not authenticated. Store switcher will be hidden.');
                // Don't show error toast for authentication issues
            } else {
                toast.error('Failed to load store information');
            }

            // Set empty state on error
            setAvailableStores([]);
            setCurrentStore(null);
        } finally {
            setLoading(false);
        }
    };

    const switchStore = async (storeId: number): Promise<boolean> => {
        try {
            const response = await storeApiService.switchStore(storeId);

            // Update current store
            setCurrentStore(response.current_store);

            // Update is_current flag in available stores
            setAvailableStores((prev) =>
                prev.map((store) => ({
                    ...store,
                    is_current: store.id === storeId,
                })),
            );

            toast.success(response.message);

            // Reload the page to refresh all store-scoped data
            window.location.reload();

            return true;
        } catch (error) {
            console.error('Failed to switch store:', error);
            toast.error('Failed to switch store');
            return false;
        }
    };

    const refreshStores = async () => {
        await loadStores();
    };

    useEffect(() => {
        loadStores();
    }, []);

    const value: StoreContextType = {
        currentStore,
        availableStores,
        loading,
        switchStore,
        refreshStores,
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextType {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
