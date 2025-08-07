import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { FontSwitcher } from '@/components/font-switcher';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { AuthenticatedLayout } from '@/layouts/app-layout';
import { type Module, type ModuleSidebarData } from '@/types/modules';
import React from 'react';

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    primaryButtons?: React.ReactNode;
    dialogs?: React.ReactNode;
    headerFixed?: boolean;
    showSearch?: boolean;
    module?: Module;
    sidebarData?: ModuleSidebarData;
}

export function PageLayout({
    children,
    title,
    description,
    primaryButtons,
    dialogs,
    headerFixed = true,
    showSearch = true,
    module,
    sidebarData,
}: PageLayoutProps) {
    return (
        <AuthenticatedLayout module={module} sidebarData={sidebarData}>
            <Header fixed={headerFixed}>
                {showSearch && <Search />}
                <div className="ml-auto flex items-center space-x-4">
                    <FontSwitcher />
                    <AppearanceToggleDropdown />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                    {primaryButtons}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">{children}</div>
            </Main>

            {dialogs}
        </AuthenticatedLayout>
    );
}
