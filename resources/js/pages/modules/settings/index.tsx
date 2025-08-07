import { PageLayout } from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getModuleSidebar } from '@/data/module-sidebars';
import { type Module } from '@/types/modules';
import { Head } from '@inertiajs/react';

interface SettingsModuleProps {
    module: Module;
    userPermissions: string[];
}

export default function SettingsModule({ module, userPermissions }: SettingsModuleProps) {
    const sidebarData = getModuleSidebar('settings');

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

            <PageLayout
                title="Settings Dashboard"
                description="Manage system settings and configurations."
                primaryButtons={<Button>Export Settings</Button>}
                module={module}
                sidebarData={sidebarData}
            >
                <Tabs orientation="vertical" defaultValue="overview" className="space-y-4">
                    <div className="w-full overflow-x-auto pb-2">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="system">System</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1,247</div>
                                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">System Status</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Healthy</div>
                                    <p className="text-xs text-muted-foreground">All systems operational</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">99.9%</div>
                                    <p className="text-xs text-muted-foreground">+0.1% from last month</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">67%</div>
                                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                            <Card className="col-span-1 lg:col-span-4">
                                <CardHeader>
                                    <CardTitle>System Health Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">CPU Usage</span>
                                            <span className="text-sm text-green-600">35%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-green-600" style={{ width: '35%' }}></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Memory Usage</span>
                                            <span className="text-sm text-yellow-600">78%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-yellow-600" style={{ width: '78%' }}></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Disk Usage</span>
                                            <span className="text-sm text-green-600">67%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-green-600" style={{ width: '67%' }}></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-1 lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest system events and activities.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { action: 'User login', user: 'admin@example.com', time: '2 min ago', status: 'success' },
                                            { action: 'System backup', user: 'System', time: '1 hour ago', status: 'success' },
                                            { action: 'Settings updated', user: 'admin@example.com', time: '3 hours ago', status: 'info' },
                                            { action: 'Failed login', user: 'unknown@example.com', time: '5 hours ago', status: 'warning' },
                                        ].map((activity, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        activity.status === 'success'
                                                            ? 'bg-green-500'
                                                            : activity.status === 'warning'
                                                              ? 'bg-yellow-500'
                                                              : 'bg-blue-500'
                                                    }`}
                                                ></div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium">{activity.action}</p>
                                                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                                                </div>
                                                <div className="text-xs text-muted-foreground">{activity.time}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="system" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Settings</CardTitle>
                                <CardDescription>Configure general system settings and preferences.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <h3 className="font-medium">General Settings</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-lg border p-3">
                                                <div>
                                                    <p className="font-medium">Site Name</p>
                                                    <p className="text-sm text-muted-foreground">My Application</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg border p-3">
                                                <div>
                                                    <p className="font-medium">Timezone</p>
                                                    <p className="text-sm text-muted-foreground">UTC (Coordinated Universal Time)</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg border p-3">
                                                <div>
                                                    <p className="font-medium">Language</p>
                                                    <p className="text-sm text-muted-foreground">English (US)</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-medium">Quick Actions</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            <Button variant="outline" className="justify-start">
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                    />
                                                </svg>
                                                Backup System
                                            </Button>
                                            <Button variant="outline" className="justify-start">
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                                View Logs
                                            </Button>
                                            <Button variant="outline" className="justify-start">
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                                                    />
                                                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                                </svg>
                                                System Maintenance
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage security configurations and access controls.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium">Two-Factor Authentication</p>
                                            <p className="text-sm text-muted-foreground">Enabled for all users</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Configure
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium">Session Timeout</p>
                                            <p className="text-sm text-muted-foreground">8 hours</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium">Password Policy</p>
                                            <p className="text-sm text-muted-foreground">Strong (8+ chars, symbols)</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium">API Access</p>
                                            <p className="text-sm text-muted-foreground">Restricted to authorized IPs</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Manage
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>Manage user accounts and permissions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Total Users</p>
                                            <p className="text-2xl font-bold">1,247</p>
                                        </div>
                                        <Button>Add User</Button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="rounded-lg border p-4">
                                            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                                            <p className="text-2xl font-bold">1,180</p>
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                            <p className="text-2xl font-bold">45</p>
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                                            <p className="text-2xl font-bold">22</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </PageLayout>
        </>
    );
}
