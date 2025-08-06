import { type ModuleSidebarData } from '@/types/modules';
import { IconChartBar, IconChartLine, IconKey, IconLayoutDashboard, IconSettings, IconShoppingCart } from '@tabler/icons-react';

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

    settings: {
        moduleId: 'settings',
        moduleName: 'Settings',
        moduleIcon: IconSettings,
        navGroups: [
            {
                title: 'General Settings',
                items: [
                    {
                        title: 'Roles',
                        url: '/modules/settings/roles',
                        icon: IconSettings,
                    },
                    {
                        title: 'Permissions',
                        url: '/modules/settings/permissions',
                        icon: IconKey,
                    },
                ],
            },
        ],
    },
};

export const getModuleSidebar = (moduleId: string): ModuleSidebarData | undefined => {
    console.log('getModuleSidebar - moduleId:', moduleId);
    return moduleSidebars[moduleId];
};
