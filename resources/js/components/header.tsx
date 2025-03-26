import { User } from '@/types';
import { Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import UserIcon from './icons/user-icon';

export default function Header({ user }: { user?: User }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="relative flex h-20 w-full items-center bg-white pl-80">
            <div className="flex w-full items-center justify-between px-8 py-2">
                <div>
                    {user?.role == 'siswa' ? (
                        <h5 className="text-2xl font-medium text-black capitalize">
                            Selamat Datang di {user?.user_detail?.kelas?.nama}, {user?.name}!
                        </h5>
                    ) : (
                        <h5 className="text-2xl font-medium text-black capitalize">Halo, {user?.name}!</h5>
                    )}
                    <p className="text-slate-400">{currentDate}</p>
                </div>
                <div className="relative flex items-center">
                    <Bell className="mr-6 cursor-pointer" />
                    <div className="relative flex cursor-pointer items-center gap-3" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className="rounded bg-slate-100 p-2">
                            <UserIcon />
                        </div>
                        <p className="capitalize">{user?.name}</p>
                        {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-12 right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-md">
                            <ul className="py-2 text-sm text-gray-700">
                                <li>
                                    <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                        Profil
                                    </a>
                                </li>
                                <li>
                                    <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                                        Pengaturan
                                    </a>
                                </li>
                                <li>
                                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => alert('Logout!')}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
