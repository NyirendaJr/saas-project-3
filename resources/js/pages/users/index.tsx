import { DataTable, DataTablePagination, DataTableToolbar, PageLayout } from '@/components';
import { columns } from './components/users-columns';
import { UsersDialogs } from './components/users-dialogs';
import { UsersPrimaryButtons } from './components/users-primary-buttons';
import UsersProvider from './context/users-context';
import { userListSchema } from './data/schema';
import { users } from './data/users';

export default function Users() {
    // Parse user list
    const userList = userListSchema.parse(users);

    return (
        <UsersProvider>
            <PageLayout
                title="User List"
                description="Manage your users and their roles here."
                primaryButtons={<UsersPrimaryButtons />}
                dialogs={<UsersDialogs />}
            >
                <DataTable
                    data={userList}
                    columns={columns}
                    toolbar={
                        <DataTableToolbar
                            searchKey="username"
                            searchPlaceholder="Search users..."
                            filters={[
                                {
                                    column: 'status',
                                    title: 'Status',
                                    options: [
                                        { label: 'Active', value: 'active' },
                                        { label: 'Inactive', value: 'inactive' },
                                        { label: 'Invited', value: 'invited' },
                                        { label: 'Suspended', value: 'suspended' },
                                    ],
                                },
                                {
                                    column: 'role',
                                    title: 'Role',
                                    options: [
                                        { label: 'Super Admin', value: 'superadmin' },
                                        { label: 'Admin', value: 'admin' },
                                        { label: 'Cashier', value: 'cashier' },
                                        { label: 'Manager', value: 'manager' },
                                    ],
                                },
                            ]}
                        />
                    }
                    pagination={<DataTablePagination />}
                />
            </PageLayout>
        </UsersProvider>
    );
}
