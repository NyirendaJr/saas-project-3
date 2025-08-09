import { AppSidebar } from '@/components/layout/app-sidebar';
import { ModuleSidebar } from '@/components/modules/module-sidebar';
import SkipToMain from '@/components/skip-to-main';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useFont } from '@/context/font-context';
import { SearchProvider } from '@/context/search-context';
import { cn } from '@/lib/utils';
import { type Module, type ModuleSidebarData } from '@/types/modules';
import { usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';

interface Props {
    children?: React.ReactNode;
    module?: Module;
    sidebarData?: ModuleSidebarData;
}

export function AuthenticatedLayout({ children, module, sidebarData }: Props) {
    const defaultOpen = Cookies.get('sidebar_state') !== 'false';
    const { currentFont } = useFont();

    // Get user data from page props
    const { auth } = usePage().props as any;
    const user = auth?.user;

    return (
        <SearchProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
                <SkipToMain />
                {module && sidebarData ? <ModuleSidebar data={sidebarData} className="w-64" user={user} /> : <AppSidebar />}
                <div
                    id="content"
                    className={cn(
                        `font-${currentFont}`,
                        'ml-auto w-full max-w-full',
                        'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                        'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                        'sm:transition-[width] sm:duration-200 sm:ease-linear',
                        'flex h-svh flex-col',
                        'group-data-[scroll-locked=1]/body:h-full',
                        'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh',
                    )}
                >
                    {children}
                </div>
            </SidebarProvider>
        </SearchProvider>
    );
}
