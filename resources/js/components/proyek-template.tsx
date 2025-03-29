import { Kelompok, Proyek } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';
import DataTables from './data-tables';
import Button from './ui/button';
import LabelStatus from './ui/label-status';
import RichText from './ui/rich-text';
import Title from './ui/title';

type ProyekTemplateProps = {
    proyek: Proyek;
    kelompok?: Kelompok;
    columns: any[];
    data: any[];
    searchBy: string[];
    view?: boolean;
};

export default function ProyekTemplate({ proyek, kelompok, columns, data, searchBy, view }: ProyekTemplateProps) {
    let totalAnggota = '';
    let isFull = false;
    if (kelompok) {
        totalAnggota = `${kelompok.anggotas.length}/${kelompok.jumlah_anggota}`;
        isFull = kelompok.anggotas.length === kelompok.jumlah_anggota;
    }

    return (
        <React.Fragment>
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
                            {view && (
                                <p className="flex justify-between pr-4">
                                    Nilai <span>:</span>
                                </p>
                            )}
                            <p className="flex justify-between pr-4">
                                Status <span>:</span>
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p>{proyek?.nama}</p>
                            <p>{proyek?.tenggat}</p>
                            {view && <p>-</p>}
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
                    {view ? (
                        <Link href={route('siswa.proyek.syntaxOne', proyek?.id)}>
                            <Button variant="primary" className="w-full">
                                Kerjakan Proyek
                            </Button>
                        </Link>
                    ) : (
                        <Button variant={proyek?.status === 'belum' ? 'primary' : 'danger'} className="w-full">
                            {proyek?.status === 'belum' ? 'Mulai Proyek' : 'Akhiri Proyek'}
                        </Button>
                    )}
                </div>
            </div>
            <div className="mt-4 rounded-lg bg-white p-8">
                <div className="flex items-center gap-4">
                    <Title title={kelompok ? `Anggota ${kelompok.nama}` : 'Data Kelompok'} />
                    {view && kelompok && <LabelStatus variant={isFull ? 'danger' : 'success'} size="small" status={`Kuota: ${totalAnggota}`} />}
                </div>
                <div className="mb-6 flex justify-end">
                    {view ? (
                        <Link href={route('siswa.proyek.kelompok', proyek?.id)}>
                            <Button>Daftar Kelompok</Button>
                        </Link>
                    ) : (
                        <Link href={route('guru.proyek.kelompokCreate', proyek?.id)}>
                            <Button>Tambah Kelompok</Button>
                        </Link>
                    )}
                </div>
                <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
            </div>
        </React.Fragment>
    );
}
