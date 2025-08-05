import { DataTable, DataTablePagination, DataTableToolbar, PageLayout } from '@/components';
import { columns } from './components/columns';
import { TasksDialogs } from './components/tasks-dialogs';
import { TasksPrimaryButtons } from './components/tasks-primary-buttons';
import TasksProvider from './context/tasks-context';
import { tasks } from './data/tasks';

export default function Tasks() {
    return (
        <TasksProvider>
            <PageLayout
                title="Tasks"
                description="Here's a list of your tasks for this month!"
                primaryButtons={<TasksPrimaryButtons />}
                dialogs={<TasksDialogs />}
            >
                <DataTable
                    data={tasks}
                    columns={columns}
                    toolbar={
                        <DataTableToolbar
                            searchKey="title"
                            searchPlaceholder="Search tasks..."
                            filters={[
                                {
                                    column: 'status',
                                    title: 'Status',
                                    options: [
                                        { label: 'Todo', value: 'todo' },
                                        { label: 'In Progress', value: 'in progress' },
                                        { label: 'Done', value: 'done' },
                                        { label: 'Canceled', value: 'canceled' },
                                        { label: 'Backlog', value: 'backlog' },
                                    ],
                                },
                                {
                                    column: 'priority',
                                    title: 'Priority',
                                    options: [
                                        { label: 'Low', value: 'low' },
                                        { label: 'Medium', value: 'medium' },
                                        { label: 'High', value: 'high' },
                                    ],
                                },
                            ]}
                        />
                    }
                    pagination={<DataTablePagination />}
                />
            </PageLayout>
        </TasksProvider>
    );
}
