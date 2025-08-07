import { ApiDataTableWithPagination, DataTableToolbar, PageLayout } from '@/components';
import { getModuleSidebar } from '@/data/module-sidebars';
import { type Module } from '@/types/modules';
import { Head } from '@inertiajs/react';
import { columns } from './components/permissions-columns';
import { PermissionsDialogs } from './components/permissions-dialogs';
import { PermissionsPrimaryButtons } from './components/permissions-primary-buttons';
import PermissionsProvider from './context/permissions-context';

interface PermissionsModuleProps {
    module?: Module;
    userPermissions?: string[];
    permissions?: any[];
    filters?: any;
    pagination?: any;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function PermissionsModule({
    module,
    userPermissions = [],
    permissions = [],
    filters = {},
    pagination = {},
    flash,
}: PermissionsModuleProps) {
    const sidebarData = getModuleSidebar('settings');

    if (!module || !sidebarData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold">Module Not Found</h1>
                    <p className="text-muted-foreground">The requested module is not available.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`${module.name} - Permissions`} />

            <PermissionsProvider initialFlash={flash}>
                <PageLayout
                    title="Permissions"
                    description="Manage system permissions and access controls."
                    primaryButtons={<PermissionsPrimaryButtons />}
                    dialogs={<PermissionsDialogs />}
                    module={module}
                    sidebarData={sidebarData}
                >
                    <ApiDataTableWithPagination
                        columns={columns}
                        toolbar={
                            <DataTableToolbar
                                searchKey="name"
                                searchPlaceholder="Search permissions..."
                                filters={[
                                    {
                                        column: 'guard_name',
                                        title: 'Guard',
                                        options: [
                                            { label: 'Web', value: 'web' },
                                            { label: 'API', value: 'api' },
                                        ],
                                    },
                                    {
                                        column: 'module',
                                        title: 'Module',
                                        options: [
                                            { label: 'Users', value: 'users' },
                                            { label: 'Settings', value: 'settings' },
                                            { label: 'Sales', value: 'sales' },
                                            { label: 'Reports', value: 'reports' },
                                        ],
                                    },
                                ]}
                            />
                        }
                    />
                </PageLayout>
            </PermissionsProvider>
        </>
    );
}
