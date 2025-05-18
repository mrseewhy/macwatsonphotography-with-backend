import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BookOpenCheck, Crosshair, Folder, House, Image, LayoutGrid, PrinterCheck, UserRound, Volume } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/dashboard/users',
        icon: UserRound,
    },
    {
        title: 'Landing Page',
        href: '/dashboard/landing',
        icon: House,
    },
    {
        title: 'Stories',
        href: '/dashboard/stories',
        icon: Volume,
    },
    {
        title: 'Published Works',
        href: '/dashboard/published',
        icon: BookOpenCheck,
    },
    {
        title: 'Portraits',
        href: '/dashboard/portraits',
        icon: Image,
    },
    {
        title: 'Drone shots',
        href: '/dashboard/drones',
        icon: Crosshair,
    },
    {
        title: 'Prints',
        href: '/dashboard/prints',
        icon: PrinterCheck,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
