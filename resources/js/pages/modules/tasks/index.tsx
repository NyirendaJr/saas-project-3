import { getModuleSidebar } from '@/data/module-sidebars';
import { ModuleLayout } from '@/layouts/module-layout';
import { type Module } from '@/types/modules';
import { Head } from '@inertiajs/react';

interface TasksModuleProps {
    module: Module;
    userPermissions: string[];
}

export default function TasksModule({ module, userPermissions }: TasksModuleProps) {
    const sidebarData = getModuleSidebar('tasks');

    if (!sidebarData) {
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
            <Head title={`${module.name} - Dashboard`} />

            <ModuleLayout module={module} sidebarData={sidebarData}>
                <div className="space-y-6">
                    {/* Module Overview Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                                    <p className="text-2xl font-bold">1,234</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                                    <p className="text-2xl font-bold">856</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                                    <p className="text-2xl font-bold">234</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Tasks */}
                    <div className="rounded-lg border bg-card">
                        <div className="border-b p-6">
                            <h2 className="text-lg font-semibold">Recent Tasks</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((task) => (
                                    <div
                                        key={task}
                                        className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <div>
                                                <p className="font-medium">Task #{task}</p>
                                                <p className="text-sm text-muted-foreground">This is a sample task description</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground">Due: {new Date().toLocaleDateString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <button className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Create New Task</span>
                            </button>
                            <button className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>View Completed</span>
                            </button>
                            <button className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                                <span>View Reports</span>
                            </button>
                        </div>
                    </div>
                </div>
            </ModuleLayout>
        </>
    );
}
