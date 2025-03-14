import ActionButton from '@/components/action-button';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Kelas } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

export default function KelasIndex() {
    DataTable.use(DT);

    const { kelases } = usePage().props as { kelases?: Kelas[] };

    const columns = [{ title: 'Nama Kelas' }, { title: 'Wali Kelas' }, { title: 'Aksi' }];

    return (
        <AuthLayout title="Kelas" index>
            <h1 className="text-2xl font-semibold text-gray-600">Data Kelas</h1>
            <div className="my-6 flex justify-end">
                <Link href={route('admin.kelas.create')}>
                    <Button>Tambah Kelas</Button>
                </Link>
            </div>
            <DataTable>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.title}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {kelases?.map((kelas) => {
                        return (
                            <tr key={kelas.id}>
                                <td>{kelas.nama}</td>
                                <td>{kelas.wali_kelas}</td>
                                <td>
                                    <ActionButton
                                        routeEdit={route('admin.kelas.edit', kelas.id)}
                                        routeDelete={route('admin.kelas.destroy', kelas.id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </DataTable>
        </AuthLayout>
    );
}
