import AuthLayout from '@/layouts/auth-layout';

export default function CreateKelas() {
    const breadcrumbs = [
        { title: 'Kelas', link: route('admin.kelas.index') },
        { title: 'Tambah Kelas', link: '/' },
    ];

    return <AuthLayout title="Tambah Kelas" breadcrumbs={breadcrumbs}></AuthLayout>;
}
