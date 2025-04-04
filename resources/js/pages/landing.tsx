import AppLogo from '@/components/app-logo';
import Button from '@/components/ui/button';
import { Auth } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppWindow, BookIcon, Smartphone, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Landing() {
    const { auth } = usePage().props as { auth?: Auth };

    console.log(auth);

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(!!auth?.user);
    }, [auth]);

    return (
        <React.Fragment>
            <Head title={'Beranda'} />
            <div className="min-h-screen bg-white">
                <nav className="flex h-20 w-full items-center justify-between px-32">
                    <AppLogo />
                    <ul className="grid w-2/5 grid-cols-4 items-center gap-4">
                        <li>Beranda</li>
                        <li>Tentang</li>
                        <li>Kontak</li>
                        <li>
                            <Link href={route(isAuth ? 'dashboard' : 'login')}>
                                <Button>{isAuth ? 'Dashboard' : 'Login'}</Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <section className="grid grid-cols-2 items-center px-32" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="space-y-7">
                        <h1 className="text-4xl font-semibold">
                            Tingkatkan Kompetensi
                            <br /> Pemrograman dengan
                            <br /> Pembelajaran Berbasis Proyek
                        </h1>
                        <p className="text-xl text-slate-400">
                            Code Sprint menghadirkan pengalaman
                            <br /> belajar interaktif dengan pendekatan
                            <br /> Project-Based Learning (PjBL).
                        </p>
                        <Link href={route(isAuth ? 'dashboard' : 'login')}>
                            <Button>Belajar Sekarang</Button>
                        </Link>
                    </div>
                    <div className="place-self-center">
                        <img src="/assets/images/illust-login.svg" alt="illust login" className="size-96" />
                    </div>
                </section>
                <section className="bg-primary-50 h-fit w-full p-32">
                    <h1 className="text-center text-3xl font-semibold">Kenapa Code Sprint</h1>
                    <div className="bg-primary mx-auto mt-1.5 mb-14 h-1.5 w-32"></div>
                    <div className="grid grid-cols-4 gap-6">
                        <div className="space-y-4">
                            <div className="w-fit rounded-2xl bg-orange-400 p-4">
                                <BookIcon size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold">Materi Terstruktur</h3>
                            <p className="text-lg text-slate-400">
                                Materi dibuat dengan
                                <br /> terstruktur memudahkan
                                <br /> pembelajaran
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-warning-400 w-fit rounded-2xl p-4">
                                <AppWindow size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold">Berbasis Proyek</h3>
                            <p className="text-lg text-slate-400">
                                Belajar Pemrograman
                                <br /> langsung melalui proyek
                                <br /> nyata untuk meningkatkan
                                <br /> keterampilan
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-primary-400 w-fit rounded-2xl p-4">
                                <UsersIcon size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold">Kolaborasi</h3>
                            <p className="text-lg text-slate-400">
                                Bekerja sama dalam tim,
                                <br /> diskusikan solusi, dan
                                <br /> tingkatkan pemahaman
                                <br /> melalui interaksi
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-danger-400 w-fit rounded-2xl p-4">
                                <Smartphone size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold">Akses Mudah</h3>
                            <p className="text-lg text-slate-400">
                                Belajar kapan saja dan di
                                <br /> mana saja dengan platform
                                <br /> berbasis web yang fleksibel
                            </p>
                        </div>
                    </div>
                </section>
                <footer className="flex items-center justify-center p-4">
                    <p>© 2025 Code Sprint. All rights reserved.</p>
                </footer>
            </div>
        </React.Fragment>
    );
}
