import { type ModuleSidebarData } from '@/types/modules';
import {
    IconBox,
    IconCategory,
    IconChartBar,
    IconChartLine,
    IconKey,
    IconLayoutDashboard,
    IconPackage,
    IconPalette,
    IconSettings,
    IconShoppingCart,
    IconTag,
} from '@tabler/icons-react';

export const moduleSidebars: Record<string, ModuleSidebarData> = {
    sales: {
        moduleId: 'sales',
        moduleName: 'Sales Management',
        moduleIcon: IconShoppingCart,
        navGroups: [
            {
                title: 'Sales Dashboard',
                items: [
                    {
                        title: 'Overview',
                        url: '/modules/sales',
                        icon: IconLayoutDashboard,
                    },
                    {
                        title: 'Analytics',
                        url: '/modules/sales/analytics',
                        icon: IconChartBar,
                    },
                    {
                        title: 'Reports',
                        url: '/modules/sales/reports',
                        icon: IconChartLine,
                    },
                ],
            },
        ],
    },

    inventory: {
        moduleId: 'inventory',
        moduleName: 'Inventory Management',
        moduleIcon: IconPackage,
        navGroups: [
            {
                title: 'Dashboard',
                items: [
                    {
                        title: 'Overview',
                        url: '/modules/inventory',
                        icon: IconLayoutDashboard,
                    },
                    {
                        title: 'Product Manager',
                        icon: IconBox,
                        items: [
                            {
                                title: 'Brands',
                                url: '/modules/inventory/brands',
                                icon: IconTag,
                            },
                            {
                                title: 'Categories',
                                url: '/modules/inventory/categories',
                                icon: IconCategory,
                            },
                            {
                                title: 'Variations',
                                url: '/modules/inventory/variations',
                                icon: IconPalette,
                            },
                            {
                                title: 'Products',
                                url: '/modules/inventory/products',
                                icon: IconBox,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    settings: {
        moduleId: 'settings',
        moduleName: 'Settings',
        moduleIcon: IconSettings,
        navGroups: [
            {
                title: 'General Settings',
                items: [
                    {
                        title: 'Permissions',
                        url: '/modules/settings/permissions',
                        icon: IconKey,
                    },
                    {
                        title: 'Roles',
                        url: '/modules/settings/roles',
                        icon: IconSettings,
                    },
                ],
            },
        ],
    },
};

export const getModuleSidebar = (moduleId: string): ModuleSidebarData | undefined => {
    return moduleSidebars[moduleId];
};
