import ActionButton from '@/components/action-button';
import ProyekTemplate from '@/components/proyek-template';
import Button from '@/components/ui/button';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek, ProyekJawaban } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function ShowProyek() {
    const { proyek, kelompoks, jawabans } = usePage().props as { proyek?: Proyek; kelompoks?: Kelompok[]; jawabans?: ProyekJawaban[] };

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
            name: 'Progres Saat Ini',
            cell: (row: Kelompok) => {
                const kelompokJawaban = jawabans?.find((jawaban) => jawaban.kelompok_id == row.id) as ProyekJawaban;

                const progressMap: Record<string, string> = {
                    status_tahap_8: 'Sintaks 5',
                    status_tahap_7: 'Sintaks 4',
                    status_tahap_6: 'Sintaks 3',
                    status_tahap_5: 'Sintaks 2',
                    status_tahap_4: 'Sintaks 1 Tahap 4',
                    status_tahap_3: 'Sintaks 1 Tahap 3',
                    status_tahap_2: 'Sintaks 1 Tahap 2',
                    status_tahap_1: 'Sintaks 1 Tahap 1',
                };

                let progres = 'Sintaks 1 Tahap 1';

                if (kelompokJawaban) {
                    if (proyek?.refleksi && kelompokJawaban.status_tahap_8) {
                        progres = 'Selesai';
                    } else {
                        const latestKey = Object.keys(progressMap).find((key) => kelompokJawaban[key as keyof ProyekJawaban]);
                        if (latestKey) {
                            progres = progressMap[latestKey];
                        }
                    }
                }

                return progres;
            },
            wrap: true,
        },
        {
            name: 'Progres',
            cell: (row: Kelompok) => (
                <Link href={route('guru.proyek.syntaxOne', { proyekId: proyek?.id, kelompokId: row.id })}>
                    <Button>Lihat</Button>
                </Link>
            ),
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
