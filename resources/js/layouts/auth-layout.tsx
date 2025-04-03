import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Breadcrumb from '@/components/ui/breadcrumb';
import Title from '@/components/ui/title';
import { Auth, BreadcrumbItem, UserRole } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { PropsWithChildren, useEffect } from 'react';
import Swal from 'sweetalert2';

interface AuthLayoutProps {
    title: string;
    breadcrumbs?: BreadcrumbItem[];
    index?: boolean;
    siswa?: boolean;
}

export default function AuthLayout({ children, title, breadcrumbs, index = false, siswa = false }: PropsWithChildren<AuthLayoutProps>) {
    const { auth, flash } = usePage().props as { auth?: Auth; flash?: { error: string; success: string; warning: string } };

    const userRole: UserRole = auth?.user.role ?? 'siswa';

    useEffect(() => {
        if (flash?.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: flash.error,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }, [flash?.error]);

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: flash.success,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.warning) {
            Swal.fire({
                icon: 'info',
                title: 'Informasi',
                text: flash.warning,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }, [flash?.warning]);

    return (
        <React.Fragment>
            <Head title={title} />
            <div className="min-h-screen bg-gray-200">
                <Sidebar userRole={userRole} />
                <Header user={auth?.user} />
                <main className="pl-72">
                    <div className="p-4">
                        {!index && <Title title={title} />}
                        <Breadcrumb items={breadcrumbs} />
                        <div className={`rounded-lg ${siswa ? '' : 'bg-white p-8'}`}>
                            {index && <Title title={title} />}
                            <div className={`${index ? 'my-6' : ''}`}>{children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}
