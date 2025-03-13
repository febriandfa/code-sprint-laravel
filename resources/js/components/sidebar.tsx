import { sidebarMenus } from '@/lib/sidebar-menu';
import { UserRole } from '@/types';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';

export default function Sidebar({ userRole = 'siswa' }: { userRole: UserRole }) {
    const menus = sidebarMenus(userRole);

    return (
        <aside className="fixed left-0 flex h-screen w-80 flex-col items-center gap-9 border-r border-gray-200 bg-white p-8">
            <AppLogo />
            <nav className="w-full">
                <p className="text-lg text-slate-400">Menu Siswa</p>
                <ul className="flex flex-col gap-2">
                    {menus.map((menu, index) => (
                        <li>
                            <Link key={index} href={menu.link} className="flex items-center gap-3 p-4 *:text-slate-400">
                                {menu.icon}
                                <p className="text-lg">{menu.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
