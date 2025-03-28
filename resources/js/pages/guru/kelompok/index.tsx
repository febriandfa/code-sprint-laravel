import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import LabelStatus from '@/components/ui/label-status';
import RichText from '@/components/ui/rich-text';
import Title from '@/components/ui/title';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexKelompok() {
    const { proyek, kelompoks } = usePage().props as { proyek?: Proyek; kelompoks?: Kelompok[] };

    console.log('kelompoks', kelompoks);

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
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 rounded-lg bg-white p-8">
                    <Title title="Deskripsi Proyek" />
                    <RichText content={proyek?.deskripsi} />
                </div>
                <div className="space-y-4 rounded-lg bg-white p-8">
                    <Title title="Detail Proyek" />
                    <div className="grid grid-cols-2">
                        <div className="space-y-2">
                            <p className="flex justify-between pr-4">
                                Nama Proyek <span>:</span>
                            </p>
                            <p className="flex justify-between pr-4">
                                Tenggat <span>:</span>
                            </p>
                            <p className="flex justify-between pr-4">
                                Status <span>:</span>
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p>{proyek?.nama}</p>
                            <p>{proyek?.tenggat}</p>
                            <span>
                                {proyek?.status ? (
                                    proyek?.status === 'selesai' ? (
                                        <LabelStatus variant="success" size="small" status="Selesai" />
                                    ) : proyek?.status === 'berjalan' ? (
                                        <LabelStatus variant="warning" size="small" status="Berjalan" />
                                    ) : (
                                        <LabelStatus variant="info" size="small" status="Belum Dimulai" />
                                    )
                                ) : (
                                    <LabelStatus variant="default" size="small" status="-" />
                                )}
                            </span>
                        </div>
                    </div>
                    <Button variant={proyek?.status === 'belum' ? 'primary' : 'danger'} className="w-full">
                        {proyek?.status === 'belum' ? 'Mulai Proyek' : 'Akhiri Proyek'}
                    </Button>
                </div>
            </div>
            <div className="mt-4 rounded-lg bg-white p-8">
                <Title title="Data Kelompok" />
                <div className="mb-6 flex justify-end">
                    <Link href={route('guru.proyek.kelompokCreate', proyek?.id)}>
                        <Button>Tambah Kelompok</Button>
                    </Link>
                </div>
                <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
            </div>
        </AuthLayout>
    );
}
