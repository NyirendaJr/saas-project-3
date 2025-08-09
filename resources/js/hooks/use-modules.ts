import { getModuleSidebar } from '@/data/module-sidebars';
import { getModuleById, getModulesForUser } from '@/data/modules';
import { type Module, type ModuleSidebarData } from '@/types/modules';
import { useMemo } from 'react';

interface UseModulesOptions {
    userPermissions: string[];
}

export function useModules({ userPermissions }: UseModulesOptions) {
    const availableModules = useMemo(() => {
        return getModulesForUser(userPermissions);
    }, [userPermissions]);

    const hasModuleAccess = useMemo(() => {
        return (moduleId: string): boolean => {
            const module = getModuleById(moduleId);
            if (!module) return false;

            return module.permissions.some((permission) => userPermissions.includes(permission));
        };
    }, [userPermissions]);

    const getModuleSidebarData = useMemo(() => {
        return (moduleId: string): ModuleSidebarData | undefined => {
            return getModuleSidebar(moduleId);
        };
    }, []);

    const canAccessModule = useMemo(() => {
        return (module: Module): boolean => {
            return module.isActive && module.permissions.some((permission) => userPermissions.includes(permission));
        };
    }, [userPermissions]);

    return {
        availableModules,
        hasModuleAccess,
        getModuleSidebarData,
        canAccessModule,
        userPermissions,
    };
}
