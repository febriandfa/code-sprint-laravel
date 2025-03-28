import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok } from '@/types';
import { usePage } from '@inertiajs/react';

export default function KelompokProyek() {
    const { kelompoks } = usePage().props as { kelompoks?: Kelompok[] };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Data Kelompok', link: '#' },
    ];

    const handleJoinKelompok = (kelompokId: number) => () => {
        console.log('Bergabung ke kelompok dengan ID:', kelompokId);
    };

    const columns = [
        {
            name: 'Nama Kelompok',
            selector: (row: Kelompok) => row.nama,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nama Ketua',
            selector: (row: Kelompok) => row.ketua,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Jumlah Anggota',
            cell: (row: Kelompok) => <LabelStatus status={`${row.anggotas.length}/${row.jumlah_anggota.toString()}`} />,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Kelompok) => <Button onClick={handleJoinKelompok(row.id)}>Bergabung</Button>,
            width: '11rem',
        },
    ];

    const data = kelompoks?.map((kelompok) => ({
        id: kelompok.id,
        nama: kelompok.nama,
        nama_ketua: kelompok.ketua,
        jumlah_anggota: kelompok.jumlah_anggota,
    }));

    const searchBy = ['nama'];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
