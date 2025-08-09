export interface Module {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
    route: string;
    permissions: string[];
    isActive: boolean;
    order: number;
}

export interface ModuleNavItem {
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
    badge?: string;
    items?: ModuleNavItem[];
}

export interface ModuleSidebarData {
    moduleId: string;
    moduleName: string;
    moduleIcon: React.ComponentType<{ className?: string }>;
    navGroups: Array<{
        title: string;
        items: ModuleNavItem[];
    }>;
}

export interface UserPermissions {
    modules: string[];
    permissions: string[];
}

export interface ModuleDashboardProps {
    module: Module;
    sidebarData: ModuleSidebarData;
    children: React.ReactNode;
}
