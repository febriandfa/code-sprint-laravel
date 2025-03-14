import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { Auth, UserRole } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title: string;
}

export default function AuthLayout({ children, title }: PropsWithChildren<AuthLayoutProps>) {
    const { auth } = usePage().props as { auth?: Auth };

    const userRole: UserRole = auth?.user.role ?? 'siswa';
    const userName: string = auth?.user.name ? auth.user.name.split(' ').slice(0, 2).join(' ') : 'Not Authenticated';

    return (
        <React.Fragment>
            <Head title={title} />
            <div className="min-h-screen bg-gray-200">
                <Sidebar userRole={userRole} />
                <Header userName={userName} />
                <main className="pl-80">
                    <div className="p-4">
                        <div className="rounded-lg bg-white p-8">{children}</div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}
