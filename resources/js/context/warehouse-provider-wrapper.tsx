import { usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { WarehouseProvider } from './warehouse-context';

interface WarehouseProviderWrapperProps {
    children: ReactNode;
}

export function WarehouseProviderWrapper({ children }: WarehouseProviderWrapperProps) {
    // Get authentication state from Inertia page props
    const { auth } = usePage().props as any;

    return <WarehouseProvider auth={auth}>{children}</WarehouseProvider>;
}
