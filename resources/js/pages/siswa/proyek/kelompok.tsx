import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import LabelStatus from '@/components/ui/label-status';
import Title from '@/components/ui/title';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek } from '@/types';
import { usePage } from '@inertiajs/react';

export default function KelompokProyek() {
    const { kelompoks, proyek } = usePage().props as { kelompoks?: Kelompok[]; proyek?: Proyek };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
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
            cell: (row: Kelompok) => <LabelStatus variant={row.is_full ? 'danger' : 'success'} size="small" status={row.jumlah_anggota.toString()} />,
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
        ketua: kelompok.ketua,
        is_full: kelompok.anggotas?.length === kelompok.jumlah_anggota,
        jumlah_anggota: `${kelompok.anggotas?.length ?? 0}/${kelompok.jumlah_anggota}`,
    }));

    const searchBy = ['nama', 'ketua'];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <Title title="Data Kelompok" />
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
