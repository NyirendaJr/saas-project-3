import { ModulesGrid } from '@/components/modules/modules-grid';
import { getModulesForUser } from '@/data/modules';
import { Head } from '@inertiajs/react';

interface ModulesPageProps {
    userPermissions: {
        permissions: string[];
        [key: string]: any;
    };
    modules?: any; // Backend modules data (not used for grid)
}

export default function ModulesPage({ userPermissions, modules }: ModulesPageProps) {
    // Extract the flat permissions array from the complex userPermissions object
    const permissions = userPermissions?.permissions || [];

    // Always use frontend modules data for the grid
    const availableModules = getModulesForUser(permissions);

    return (
        <>
            <Head title="Modules" />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome to Your Dashboard</h1>
                    <p className="text-lg text-muted-foreground">Select a module to get started</p>
                </div>

                {/* Modules Grid */}
                <ModulesGrid modules={availableModules} />

                {/* Empty State */}
                {availableModules.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                            <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">No Modules Available</h3>
                        <p className="text-muted-foreground">
                            You don't have access to any modules at the moment. Please contact your administrator.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
