import { AppSidebar } from '@/components/layout/app-sidebar';
import SkipToMain from '@/components/skip-to-main';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useFont } from '@/context/font-context';
import { SearchProvider } from '@/context/search-context';
import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';

interface Props {
    children?: React.ReactNode;
}

export function AuthenticatedLayout({ children }: Props) {
    const defaultOpen = Cookies.get('sidebar_state') !== 'false';
    const { currentFont } = useFont();
    return (
        <SearchProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
                <SkipToMain />
                <AppSidebar />
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
