import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Link, router } from '@inertiajs/react';
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function NavUser({
    user,
}: {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}) {
    const { isMobile } = useSidebar();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    // Option 1: With confirmation dialog (current implementation)
    const handleLogout = () => {
        setShowLogoutDialog(true);
    };

    // Option 2: Direct logout without confirmation (alternative)
    // const handleLogout = () => {
    //     setIsLoggingOut(true);
    //     router.post('/logout', {}, {
    //         onSuccess: () => {
    //             console.log('Logged out successfully');
    //         },
    //         onError: (errors) => {
    //             console.error('Logout failed:', errors);
    //             setIsLoggingOut(false);
    //             alert('Logout failed. Please try again.');
    //         },
    //         onFinish: () => {
    //             setIsLoggingOut(false);
    //         },
    //     });
    // };

    const confirmLogout = () => {
        setIsLoggingOut(true);
        setShowLogoutDialog(false);

        router.post(
            '/logout',
            {},
            {
                onSuccess: () => {
                    // The user will be redirected to the login page by Laravel
                    console.log('Logged out successfully');
                },
                onError: (errors) => {
                    console.error('Logout failed:', errors);
                    setIsLoggingOut(false);
                    // You could show a toast notification here
                    alert('Logout failed. Please try again.');
                },
                onFinish: () => {
                    setIsLoggingOut(false);
                },
            },
        );
    };

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">SN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            side={isMobile ? 'bottom' : 'right'}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">SN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user.name}</span>
                                        <span className="truncate text-xs">{user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Sparkles />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings/account">
                                        <BadgeCheck />
                                        Account
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <CreditCard />
                                        Billing
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings/notifications">
                                        <Bell />
                                        Notifications
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600" disabled={isLoggingOut}>
                                <LogOut className={isLoggingOut ? 'animate-spin' : ''} />
                                {isLoggingOut ? 'Logging out...' : 'Log out'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>

            {/* Logout Confirmation Dialog */}
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>Are you sure you want to log out? You will need to log in again to access your account.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLogoutDialog(false)} disabled={isLoggingOut}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmLogout} disabled={isLoggingOut}>
                            {isLoggingOut ? 'Logging out...' : 'Log out'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
