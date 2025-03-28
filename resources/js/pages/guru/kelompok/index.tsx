import ActionButton from '@/components/action-button';
import ProyekTemplate from '@/components/proyek-template';
import Button from '@/components/ui/button';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexKelompok() {
    const { proyek, kelompoks } = usePage().props as { proyek?: Proyek; kelompoks?: Kelompok[] };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: '#' },
    ];

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
            name: 'Progress',
            cell: (row: Kelompok) => <Button onClick={() => console.log(row.id)}>Lihat</Button>,
        },
        {
            name: 'Aksi',
            cell: (row: Kelompok) => (
                <ActionButton
                    routeEdit={route('guru.proyek.kelompokEdit', { proyekId: proyek?.id, kelompokId: row.id })}
                    routeDelete={route('guru.proyek.kelompokDestroy', { proyekId: proyek?.id, kelompokId: row.id })}
                    routeShow={route('guru.proyek.kelompokShow', { proyekId: proyek?.id, kelompokId: row.id })}
                />
            ),
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
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs} siswa>
            {proyek && kelompoks && <ProyekTemplate proyek={proyek} columns={columns} data={data ?? []} searchBy={searchBy} />}
        </AuthLayout>
    );
}
