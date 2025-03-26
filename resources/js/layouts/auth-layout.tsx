import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Auth, BreadcrumbItem, UserRole } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title: string;
    breadcrumbs?: BreadcrumbItem[];
    index?: boolean;
}

export default function AuthLayout({ children, title, breadcrumbs, index = false }: PropsWithChildren<AuthLayoutProps>) {
    const { auth } = usePage().props as { auth?: Auth };

    console.log(auth);

    const userRole: UserRole = auth?.user.role ?? 'siswa';

    return (
        <React.Fragment>
            <Head title={title} />
            <div className="min-h-screen bg-gray-200">
                <Sidebar userRole={userRole} />
                <Header user={auth?.user} />
                <main className="pl-80">
                    <div className="p-4">
                        {!index && <h1 className="text-2xl font-medium">{title}</h1>}
                        <Breadcrumb items={breadcrumbs} />
                        <div className="rounded-lg bg-white p-8">
                            {index && <h1 className="text-2xl font-semibold text-gray-600">{title}</h1>}
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}
