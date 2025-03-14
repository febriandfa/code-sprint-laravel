import ActionButton from '@/components/action-button';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Mapel } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

export default function MapelIndex() {
    DataTable.use(DT);
    const { mapels } = usePage().props as { mapels?: Mapel[] };

    const columns = [{ title: 'Mata Pelajaran' }, { title: 'Deskripsi' }, { title: 'Semester' }, { title: 'Tahun Ajaran' }, { title: 'Aksi' }];

    return (
        <AuthLayout title="Mata Pelajaran" index>
            <h1 className="text-2xl font-semibold text-gray-600">Data Mata Pelajaran</h1>
            <div className="my-6 flex justify-end">
                <Link href={route('admin.mapel.create')}>
                    <Button>Tambah Mata Pelajaran</Button>
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
                    {mapels?.map((mapel) => {
                        return (
                            <tr key={mapel.id}>
                                <td>{mapel.nama}</td>
                                <td>{mapel.deskripsi}</td>
                                <td>{mapel.semester}</td>
                                <td>{mapel.tahun_ajaran}</td>
                                <td>
                                    <ActionButton
                                        routeEdit={route('admin.mapel.edit', mapel.id)}
                                        routeDelete={route('admin.mapel.destroy', mapel.id)}
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
