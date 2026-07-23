import AppLogo from '@/components/app-logo';
import Button from '@/components/ui/button';
import { Auth } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { auth } = usePage().props as { auth?: Auth };
    const [isAuth, setIsAuth] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsAuth(!!auth?.user);
    }, [auth]);

    const menuItems = [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Fitur', href: '#fitur' },
        { label: 'Tentang PJBL', href: '#tentang' },
        { label: 'Panduan', href: '#demo' },
    ];

    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 shadow-sm transition-all duration-300 md:px-12 lg:px-32">
            <AppLogo />

            {/* Hamburger Menu (Mobile) */}
            <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Menu */}
            <ul className="ml-auto hidden items-center gap-8 md:flex">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.href}
                            className="cursor-pointer text-sm text-slate-800 transition-all duration-300 hover:font-medium hover:text-blue-500 hover:underline hover:underline-offset-4"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
                <li>
                    <Link href={route(isAuth ? 'dashboard' : 'login')}>
                        <Button>{isAuth ? 'Dashboard' : 'Login'}</Button>
                    </Link>
                </li>
            </ul>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-20 left-0 z-50 w-full bg-white shadow-md md:hidden">
                    <ul className="flex flex-col items-start gap-4 px-8 py-4">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="cursor-pointer text-sm text-slate-800 transition-all duration-300 hover:font-medium hover:text-blue-500 hover:underline hover:underline-offset-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Link href={route(isAuth ? 'dashboard' : 'login')}>
                                <Button>{isAuth ? 'Dashboard' : 'Login'}</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
