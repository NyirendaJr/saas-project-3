import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';

import { isItemActive } from '@/utils/route-helper';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { NavCollapsible, NavLink, type NavGroup } from './types';

export function NavGroup({ title, items }: NavGroup) {
    const { state, isMobile } = useSidebar();
    const { url, component } = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const key = `${item.title}-${item.url || 'collapsible'}`;

                    if (!item.items) return <SidebarMenuLink key={key} item={item} url={url} component={component} />;

                    if (state === 'collapsed' && !isMobile)
                        return <SidebarMenuCollapsedDropdown key={key} item={item} url={url} component={component} />;

                    return <SidebarMenuCollapsible key={key} item={item} url={url} component={component} />;
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

const NavBadge = ({ children }: { children: ReactNode }) => <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>;

const SidebarMenuLink = ({ item, url, component }: { item: NavLink; url: string; component: string }) => {
    const { setOpenMobile } = useSidebar();

    // Check if this item is active using Inertia.js patterns
    const isActive = isItemActive(item, url, component);

    const handleClick = () => {
        setOpenMobile(false);
        // Add smooth scrolling to top when navigating
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                <Link href={item.url} onClick={handleClick}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.badge && <NavBadge>{item.badge}</NavBadge>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

const SidebarMenuCollapsible = ({ item, url, component }: { item: NavCollapsible; url: string; component: string }) => {
    const { setOpenMobile } = useSidebar();

    // Check if any child item is active
    const hasActiveChild = item.items.some((subItem) => isItemActive(subItem, url, component));

    // State for controlling the collapsible - force open when has active child
    const [isOpen, setIsOpen] = useState(hasActiveChild);

    // Keep the menu expanded if it has an active child
    useEffect(() => {
        if (hasActiveChild) {
            setIsOpen(true);
        }
    }, [hasActiveChild]);

    const handleSubItemClick = () => {
        setOpenMobile(false);
        // Add smooth scrolling to top when navigating
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Collapsible asChild open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={hasActiveChild}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent transition-all duration-300 ease-in-out">
                    <SidebarMenuSub>
                        {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={isItemActive(subItem, url, component)}>
                                    <Link href={subItem.url} onClick={handleSubItemClick}>
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.title}</span>
                                        {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};

const SidebarMenuCollapsedDropdown = ({ item, url, component }: { item: NavCollapsible; url: string; component: string }) => {
    // Check if any child item is active
    const hasActiveChild = item.items.some((subItem) => isItemActive(subItem, url, component));

    const handleDropdownItemClick = () => {
        // Add smooth scrolling to top when navigating
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={hasActiveChild}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4} className="transition-all duration-200 ease-in-out">
                    <DropdownMenuLabel>
                        {item.title} {item.badge ? `(${item.badge})` : ''}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items.map((sub) => (
                        <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
                            <Link
                                href={sub.url}
                                onClick={handleDropdownItemClick}
                                className={`transition-colors duration-150 ${isItemActive(sub, url, component) ? 'bg-secondary' : ''}`}
                            >
                                {sub.icon && <sub.icon />}
                                <span className="max-w-52 text-wrap">{sub.title}</span>
                                {sub.badge && <span className="ml-auto text-xs">{sub.badge}</span>}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
};
