import { FontSwitcher } from '@/components/font-switcher';
import { ModuleSidebar } from '@/components/modules/module-sidebar';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useFont } from '@/context/font-context';
import { SearchProvider } from '@/context/search-context';
import { ThemeProvider } from '@/context/theme-context';
import { cn } from '@/lib/utils';
import { type ModuleDashboardProps } from '@/types/modules';
import { Link, usePage } from '@inertiajs/react';
import { IconArrowLeft, IconSettings, IconShoppingCart } from '@tabler/icons-react';

// Icon mapping function
const getModuleIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        IconShoppingCart: IconShoppingCart,
        IconSettings: IconSettings,
    };
    return iconMap[iconName] || IconSettings; // Default to IconSettings if not found
};

export function ModuleLayout({ module, sidebarData, children }: ModuleDashboardProps) {
    // Handle both string (from backend) and component (from frontend) icon types
    const ModuleIcon = typeof module.icon === 'string' ? getModuleIcon(module.icon) : module.icon;

    // Get user data from page props
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const { currentFont } = useFont();

    return (
        <ThemeProvider>
            <SearchProvider>
                <SidebarProvider>
                    {/* Module Sidebar */}
                    <ModuleSidebar data={sidebarData} className="w-64" user={user} />

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
                        {/* Header */}
                        <header className="flex h-16 items-center justify-between border-b bg-background p-4">
                            {/* Left side */}
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/modules"
                                    className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <IconArrowLeft className="h-4 w-4" />
                                    <span>Back to Modules</span>
                                </Link>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center space-x-4">
                                <Search />
                                <FontSwitcher />
                                <ThemeSwitch />
                                <ProfileDropdown />
                            </div>
                        </header>
                        {/* Main Content */}
                        {/* Module Header */}
                        {/* <div className="mb-6">
                            <div className="mb-2 flex items-center space-x-3">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${module.color || 'bg-gray-500'}`}
                                >
                                    <ModuleIcon className="h-4 w-4" />
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight">{module.name}</h1>
                            </div>
                            <p className="text-muted-foreground">{module.description}</p>
                        </div> */}
                        {/* Page Content */}
                        <div className="flex-1 overflow-auto p-6">{children}</div>
                    </div>
                </SidebarProvider>
            </SearchProvider>
        </ThemeProvider>
    );
}
