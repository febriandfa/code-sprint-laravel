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

    return (
        <React.Fragment>
            <Head title={title} />
            <div className="min-h-screen bg-gray-200">
                <Sidebar userRole={userRole} />
                <header className="h-16 w-full bg-white"></header>
                <main className="pl-80">
                    <div className="p-4">{children}</div>
                </main>
            </div>
        </React.Fragment>
    );
}
