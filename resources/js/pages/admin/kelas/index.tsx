import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Kelas } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function KelasIndex() {
    const { kelases } = usePage().props as { kelases?: Kelas[] };

    const columns = [
        { title: 'ID', data: 'id' },
        { title: 'Nama Kelas', data: 'nama' },
        { title: 'Wali Kelas', data: 'wali_kelas' },
    ];

    return (
        <AuthLayout title="Kelas" index>
            <h1 className="text-2xl font-semibold text-gray-600">Data Kelas</h1>
            <div className="my-6 flex justify-end">
                <Link href={route('admin.kelas.create')}>
                    <Button>Tambah Kelas</Button>
                </Link>
            </div>
            <DataTables
                columns={columns}
                data={kelases ?? []}
                routeEdit={(id) => route('admin.kelas.edit', { id })}
                routeDelete={(id) => route('admin.kelas.destroy', { id })}
            />
        </AuthLayout>
    );
}
