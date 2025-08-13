import { ApiDataTableWithPagination, DataTableToolbar, PageLayout } from '@/components';
import { getModuleSidebar } from '@/data/module-sidebars';
import { rolesApiService } from '@/services/rolesApiService';
import { type Module } from '@/types/modules';
import { Head } from '@inertiajs/react';
import { columns } from './components/roles-columns';
import { RolesDialogs } from './components/roles-dialogs';
import { RolesPrimaryButtons } from './components/roles-primary-buttons';
import RolesProvider from './context/roles-context';

interface RolesModuleProps {
    module?: Module;
    userPermissions?: string[];
    roles?: any[];
    filters?: any;
    pagination?: any;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function RolesModule({ module, userPermissions = [], roles = [], filters = {}, pagination = {}, flash }: RolesModuleProps) {
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
            <Head title={`${module.name} - Roles`} />

            <RolesProvider initialFlash={flash}>
                <PageLayout
                    title="Roles"
                    description="Manage system roles and access controls."
                    primaryButtons={<RolesPrimaryButtons />}
                    dialogs={<RolesDialogs />}
                    module={module}
                    sidebarData={sidebarData}
                >
                    <ApiDataTableWithPagination
                        columns={columns}
                        apiService={rolesApiService}
                        searchField="global"
                        filterFields={['guard_name']}
                        toolbar={
                            <DataTableToolbar
                                searchKey="name"
                                searchPlaceholder="Search roles..."
                                filters={[
                                    {
                                        column: 'guard_name',
                                        title: 'Guard',
                                        options: [
                                            { label: 'Web', value: 'web' },
                                            { label: 'API', value: 'api' },
                                        ],
                                    },
                                ]}
                            />
                        }
                    />
                </PageLayout>
            </RolesProvider>
        </>
    );
}
