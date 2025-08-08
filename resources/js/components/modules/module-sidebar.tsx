import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import { useFont } from '@/context/font-context';
import { type ModuleSidebarData } from '@/types/modules';
import { isItemActive } from '@/utils/route-helper';
import { Link, usePage } from '@inertiajs/react';
import { IconSettings, IconShoppingCart } from '@tabler/icons-react';
import { ChevronsUpDown } from 'lucide-react';
import { ReactNode } from 'react';
import { NavUser } from '../layout/nav-user';
import { Badge } from '../ui/badge';

interface ModuleSidebarProps {
    data: ModuleSidebarData;
    className?: string;
    user?: {
        name: string;
        email: string;
        avatar: string;
    };
}

export function ModuleSidebar({ data, className, user }: ModuleSidebarProps) {
    const ModuleIcon = data.moduleIcon;
    const { isMobile } = useSidebar();
    const { currentFont } = useFont();

    return (
        <Sidebar collapsible="icon" variant="floating" className={`font-${currentFont} ${className || ''}`}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <ModuleIcon className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{data.moduleName}</span>
                                        <span className="truncate text-xs">Module Dashboard</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="start"
                                side={isMobile ? 'bottom' : 'right'}
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Available Modules</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href="/modules/sales" className="gap-2 p-2">
                                        <div className="flex size-6 items-center justify-center rounded-sm border">
                                            <IconShoppingCart className="size-4 shrink-0" />
                                        </div>
                                        Sales Management
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/modules/settings" className="gap-2 p-2">
                                        <div className="flex size-6 items-center justify-center rounded-sm border">
                                            <IconSettings className="size-4 shrink-0" />
                                        </div>
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/modules" className="gap-2 p-2">
                                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                            <ChevronsUpDown className="size-4" />
                                        </div>
                                        <div className="font-medium text-muted-foreground">All Modules</div>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {data.navGroups.map((group, groupIndex) => (
                    <SidebarGroup key={groupIndex}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item, itemIndex) => {
                                const key = `${item.title}-${item.url}`;
                                return <SidebarMenuLink key={key} item={item} />;
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

const NavBadge = ({ children }: { children: ReactNode }) => <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>;

const SidebarMenuLink = ({ item }: { item: any }) => {
    const { setOpenMobile } = useSidebar();
    const { url, component } = usePage();
    const isActive = isItemActive(item, url, component);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                <Link href={item.url} onClick={() => setOpenMobile(false)}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.badge && <NavBadge>{item.badge}</NavBadge>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
