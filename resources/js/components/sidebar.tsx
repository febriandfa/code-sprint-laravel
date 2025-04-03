import { sidebarMenus } from '@/lib/sidebar-menu';
import { UserRole } from '@/types';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';
import Exit from './icons/exit';
import Guide from './icons/guide';

export default function Sidebar({ userRole = 'siswa' }: { userRole: UserRole }) {
    const menus = sidebarMenus(userRole);

    return (
        <aside className="fixed left-0 z-10 flex h-screen w-72 flex-col items-center gap-9 border-r border-gray-200 bg-white p-8">
            <AppLogo />
            <div className="flex h-full w-full flex-col justify-between">
                <nav className="w-full">
                    <p className="text-lg text-slate-400">Menu Siswa</p>
                    <ul className="space-y-2">
                        {menus.map((menu, index) => (
                            <li>
                                <Link
                                    key={index}
                                    href={menu.link ?? '#'}
                                    className="hover:bg-primary-50 hover:*:text-primary flex items-center gap-3 rounded-lg p-4 *:text-slate-400"
                                >
                                    {menu.icon}
                                    <p className="text-lg">{menu.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <nav className="w-full">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href=""
                                className="hover:bg-primary-50 hover:*:text-primary flex items-center gap-3 rounded-lg p-4 *:text-slate-400"
                            >
                                <Guide />
                                <p className="text-lg">Panduan</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="hover:bg-primary-50 hover:*:text-primary flex w-full cursor-pointer items-center gap-3 rounded-lg p-4 *:text-slate-400"
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                <Exit />
                                <p className="text-lg">Logout</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
