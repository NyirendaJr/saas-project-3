import { type Module } from '@/types/modules';
import { IconSettings, IconShoppingCart } from '@tabler/icons-react';

export const availableModules: Module[] = [
    {
        id: 'sales',
        name: 'Sales Management',
        description: 'Sales and customer management system',
        icon: IconShoppingCart,
        color: 'bg-emerald-500',
        route: '/modules/sales',
        permissions: ['view_sales', 'create_sales', 'manage_sales'],
        isActive: true,
        order: 1,
    },
    {
        id: 'settings',
        name: 'Settings',
        description: 'System configuration and preferences',
        icon: IconSettings,
        color: 'bg-slate-500',
        route: '/modules/settings',
        permissions: ['view_settings', 'manage_settings'],
        isActive: true,
        order: 2,
    },
];

export const getModuleById = (id: string): Module | undefined => {
    return availableModules.find((module) => module.id === id);
};

export const getModulesByPermissions = (userPermissions: string[]): Module[] => {
    return availableModules.filter((module) => module.isActive && module.permissions.some((permission) => userPermissions.includes(permission)));
};

export const getModulesForUser = (userPermissions: string[]): Module[] => {
    return getModulesByPermissions(userPermissions).sort((a, b) => a.order - b.order);
};
