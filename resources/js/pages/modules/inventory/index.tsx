import { PageLayout } from '@/components';
import { getModuleSidebar } from '@/data/module-sidebars';
import { type Module } from '@/types/modules';
import { Head } from '@inertiajs/react';

interface SalesModuleProps {
    module: Module;
    userPermissions: string[];
}

export default function SalesModule({ module, userPermissions }: SalesModuleProps) {
    const sidebarData = getModuleSidebar('inventory');
    console.log(module)

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
                title="Sales Dashboard"
                description="Monitor sales performance and customer insights."
                module={module}
                sidebarData={sidebarData}
            >
                <div className="space-y-6">
                    {/* Sales Overview Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                    <p className="text-2xl font-bold">$124,500</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                                    <p className="text-2xl font-bold">1,234</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                                    <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Open Deals</p>
                                    <p className="text-2xl font-bold">89</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                    <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                                    <p className="text-2xl font-bold">23.5%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Sales Activity */}
                    <div className="rounded-lg border bg-card">
                        <div className="border-b p-6">
                            <h2 className="text-lg font-semibold">Recent Sales Activity</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[
                                    { id: 1, customer: 'Acme Corp', amount: '$12,500', status: 'Closed', date: '2024-01-15' },
                                    { id: 2, customer: 'TechStart Inc', amount: '$8,750', status: 'Pending', date: '2024-01-14' },
                                    { id: 3, customer: 'Global Solutions', amount: '$15,200', status: 'Closed', date: '2024-01-13' },
                                    { id: 4, customer: 'Innovation Labs', amount: '$6,300', status: 'Negotiation', date: '2024-01-12' },
                                    { id: 5, customer: 'Future Systems', amount: '$22,100', status: 'Closed', date: '2024-01-11' },
                                ].map((sale) => (
                                    <div
                                        key={sale.id}
                                        className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`h-2 w-2 rounded-full ${
                                                    sale.status === 'Closed'
                                                        ? 'bg-green-500'
                                                        : sale.status === 'Pending'
                                                          ? 'bg-yellow-500'
                                                          : 'bg-blue-500'
                                                }`}
                                            ></div>
                                            <div>
                                                <p className="font-medium">{sale.customer}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {sale.amount} • {sale.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground">{sale.date}</div>
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
                                <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Create New Deal</span>
                            </button>
                            <button className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span>Add Customer</span>
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
                                <span>Generate Report</span>
                            </button>
                        </div>
                    </div>

                    {/* Sales Pipeline */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">Sales Pipeline</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="rounded-lg border p-4">
                                <h3 className="mb-2 font-medium text-muted-foreground">Leads</h3>
                                <p className="text-2xl font-bold">156</p>
                                <p className="text-sm text-green-600">+12% from last month</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="mb-2 font-medium text-muted-foreground">Qualified</h3>
                                <p className="text-2xl font-bold">89</p>
                                <p className="text-sm text-green-600">+8% from last month</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="mb-2 font-medium text-muted-foreground">Proposal</h3>
                                <p className="text-2xl font-bold">45</p>
                                <p className="text-sm text-yellow-600">+5% from last month</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="mb-2 font-medium text-muted-foreground">Closed</h3>
                                <p className="text-2xl font-bold">23</p>
                                <p className="text-sm text-green-600">+15% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    );
}
