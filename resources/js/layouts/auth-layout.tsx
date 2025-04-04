import FlashMessage from '@/components/flash-message';
import Header from '@/components/header';
import NoData from '@/components/no-data';
import Sidebar from '@/components/sidebar';
import Breadcrumb from '@/components/ui/breadcrumb';
import Title from '@/components/ui/title';
import { Auth, BreadcrumbItem, UserRole } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title: string;
    breadcrumbs?: BreadcrumbItem[];
    index?: boolean;
    siswa?: boolean;
    isEmpty?: boolean;
}

export default function AuthLayout({
    children,
    title,
    breadcrumbs,
    index = false,
    siswa = false,
    isEmpty = false,
}: PropsWithChildren<AuthLayoutProps>) {
    const { auth } = usePage().props as { auth?: Auth };

    const userRole: UserRole = auth?.user.role ?? 'siswa';

    return (
        <React.Fragment>
            <Head title={title} />
            <FlashMessage />
            <div className="min-h-screen bg-gray-200">
                <Sidebar userRole={userRole} />
                <Header user={auth?.user} />
                <main className="pl-72">
                    <div className="p-4">
                        {!index && <Title title={title} />}

                        <Breadcrumb items={breadcrumbs} />
                        <div className={`rounded-lg ${siswa ? '' : 'bg-white p-8'}`}>
                            {index && <Title title={title} />}
                            {isEmpty ? (
                                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 18rem)' }}>
                                    <NoData />
                                </div>
                            ) : (
                                <div className={`${index ? 'my-6' : ''} `}>{children}</div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}
