import { Link, usePage } from '@inertiajs/react';
import { Instagram, LucideIcon, MailCheck, Menu, Twitter, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Define the type for the children prop
interface LayoutProps {
    children: React.ReactNode;
}

// Define the type for the page object returned by usePage
// This is a simplified type based on the usage in the component
interface PageProps {
    url: string;
    // Add other properties from usePage if needed elsewhere
}

// Define types for the navigation and social links
interface NavLink {
    href: string;
    label: string;
}

interface SocialLink {
    Icon: LucideIcon; // lucide-react icons are React components
    href: string;
    label: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    // Type the return value of usePage
    const { url } = usePage<PageProps>(); // Equivalent to usePathname in Next.js

    useEffect(() => {
        setIsOpen(false);
    }, [url]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks: NavLink[] = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Macwatson' },
        { href: '/stories', label: 'Stories' },
        { href: '/published', label: 'Published works' },
        { href: '/portraits', label: 'Portraits' },
        { href: '/drone', label: 'Drone shots' },
        { href: '/prints', label: 'Prints' },
        { href: '/contact', label: 'Contact' },
    ];

    const socialLinks: SocialLink[] = [
        { Icon: MailCheck, href: 'mailto:Macwatsonphotos@gmail.com', label: 'Email' },
        { Icon: Instagram, href: 'https://www.instagram.com/macwatsonphotography', label: 'Instagram' },
        { Icon: Instagram, href: 'https://www.instagram.com/aduke_films', label: 'Instagram 2' },
        { Icon: Twitter, href: 'https://x.com/macwatson20', label: 'X (Twitter)' },
    ];

    const thisYear: number = new Date().getFullYear();

    // Define props for NavContent
    interface NavContentProps {
        isMobile?: boolean;
    }

    const NavContent: React.FC<NavContentProps> = ({ isMobile = false }) => (
        <>
            <div className={`mb-12 ${mounted && !isMobile ? 'animate-subtleFade' : ''}`}>
                {!isMobile && (
                    <h1 className="font-exo mb-8 text-2xl font-bold">
                        <Link href="/">Macwatson Photography</Link>
                    </h1>
                )}
                <nav>
                    <ul className="mt-20 space-y-4 sm:mt-4">
                        {navLinks.map((link: NavLink) => (
                            <li key={link.href}>
                                <Link href={link.href} className="font-lato text-black hover:text-gray-700">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className={`mt-auto ${mounted && !isMobile ? 'animate-subtleFade' : ''}`}>
                <div className="mb-4 flex space-x-4">
                    {socialLinks.map((link: SocialLink) => (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            key={link.label}
                            href={link.href}
                            className="transition-colors hover:text-gray-600"
                            aria-label={link.label}
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:-translate-y-1 hover:bg-gray-800">
                                <link.Icon size={16} />
                            </div>
                        </a>
                    ))}
                </div>
                {!isMobile && (
                    <p className="text-xs text-gray-800 hover:text-gray-600">
                        © {thisYear} Macwatson Photography
                        <br />
                        All rights reserved
                    </p>
                )}
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <aside className="fixed hidden h-screen w-[20%] max-w-[300px] min-w-[200px] flex-col border-r border-gray-200 bg-white sm:flex">
                <div className="h-full overflow-y-auto p-8">
                    <NavContent isMobile={false} />
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="fixed z-50 w-full border-b border-gray-200 bg-white sm:hidden">
                <div className="flex items-center justify-between p-4">
                    <h1 className="font-exo text-lg font-bold">
                        <Link href="/">Macwatson Photography</Link>
                    </h1>
                    <div className="flex w-10 items-center justify-center rounded-lg bg-black">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white" aria-label="Toggle menu" aria-expanded={isOpen}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-40 sm:hidden">
                    <div className="absolute inset-0 bg-black opacity-30" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-0 left-0 h-full w-64 bg-white p-8">
                        <NavContent isMobile={true} />
                    </div>
                </div>
            )}

            {/* Main Content wrapper */}
            <div className="w-full min-w-0 sm:pl-[20%]">
                {/* <main className="mx-auto max-w-[1200px] p-4 pt-20 sm:p-8 sm:pt-8">{children}</main> */}
                <main className="container mx-auto max-w-[1200px] p-4 pt-20 sm:p-8 sm:pt-8">{children}</main>
            </div>

            {/* Mobile Footer */}
            <footer className="fixed bottom-0 w-full border-t border-gray-200 bg-white p-4 text-center text-xs text-black sm:hidden">
                © {thisYear} Macwatson Photography. All rights reserved
            </footer>
        </div>
    );
};

export default Layout;
