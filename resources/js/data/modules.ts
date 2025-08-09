import { type Module } from '@/types/modules';
import { IconCash, IconPackage, IconSettings, IconShoppingCart } from '@tabler/icons-react';

export const availableModules: Module[] = [
    {
        id: 'inventory',
        name: 'Inventory Management',
        description: 'Complete inventory and stock management system',
        icon: IconPackage,
        color: 'bg-blue-500',
        route: '/modules/inventory',
        permissions: [
            'brand_view',
            'product_view',
            'category_view',
            'unit_view',
            'warehouse_view',
            'supplier_view',
            'customer_view',
        ],
        isActive: true,
        order: 1,
    },
    {
        id: 'sales',
        name: 'Sales Management',
        description: 'Sales and customer management system',
        icon: IconShoppingCart,
        color: 'bg-emerald-500',
        route: '/modules/sales',
        permissions: [
            'sale_view',
            'sale_create',
            'sale_edit',
            'sale_delete',
            'sale_view',
        ],
        isActive: true,
        order: 2,
    },
    {
        id: 'finance',
        name: 'Finance Management',
        description: 'Financial transactions and accounting',
        icon: IconCash,
        color: 'bg-green-500',
        route: '/modules/finance',
        permissions: [
            'account_view',
            'transaction_view',
            'payment_view',
            'expense_view',
        ],
        isActive: true,
        order: 3,
    },
    {
        id: 'settings',
        name: 'Settings',
        description: 'System configuration and preferences',
        icon: IconSettings,
        color: 'bg-slate-500',
        route: '/modules/settings',
        permissions: [
            'permission_view',
            'permission_create',
            'permission_edit',
            'permission_delete',
            'role_view',
            'role_create',
            'role_edit',
            'role_delete',
        ],
        isActive: true,
        order: 4,
    },
];

export const getModuleById = (id: string): Module | undefined => {
    return availableModules.find((module) => module.id === id);
};

export const getModulesByPermissions = (userPermissions: string[]): Module[] => {
    // Ensure userPermissions is an array
    if (!Array.isArray(userPermissions)) {
        console.warn('userPermissions is not an array:', userPermissions);
        return [];
    }

    return availableModules.filter((module) => module.isActive && module.permissions.some((permission) => userPermissions.includes(permission)));
};

export const getModulesForUser = (userPermissions: string[]): Module[] => {
    return getModulesByPermissions(userPermissions).sort((a, b) => a.order - b.order);
};
