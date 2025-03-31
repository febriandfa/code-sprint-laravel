import { getFileName } from '@/lib/helper';
import { Auth, JoinedKelompok, Kelompok, Proyek, ProyekJadwal } from '@/types';
import { FileText, Plus } from 'lucide-react';
import React, { useState } from 'react';
import ModalJadwalForm from './modal-jadwal-form';
import Button from './ui/button';
import LabelStatus from './ui/label-status';

export default function PjblJadwal({
    proyek,
    kelompok,
    jadwals,
    auth,
    joinedKelompok,
    view = false,
}: {
    proyek?: Proyek;
    kelompok?: Kelompok;
    jadwals?: ProyekJadwal[];
    auth?: Auth;
    joinedKelompok?: JoinedKelompok;
    view?: boolean;
}) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentJadwal, setCurrentJadwal] = useState<ProyekJadwal | null>(null);

    const handleOpenModal = (jadwal?: ProyekJadwal) => {
        setModalOpen(true);
        setCurrentJadwal(jadwal ?? null);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentJadwal(null);
    };

    return (
        <React.Fragment>
            <div className="w-full overflow-x-auto">
                <div className="flex gap-4 whitespace-nowrap">
                    {kelompok?.anggotas.map((anggota, index) => {
                        const anggotaJadwals = jadwals?.filter((jadwal) => jadwal.anggota_id === anggota.anggota_id) || [];
                        const isCurrentUser = auth?.user?.id === Number(anggota.anggota_id);
                        return (
                            <div className="max-w-72 min-w-72 space-y-2">
                                <div key={index} className="rounded-t border-b-4 border-b-slate-400 bg-gray-200 p-2.5 text-center">
                                    <p className="font-medium">{anggota.nama_anggota}</p>
                                    <p className="text-sm capitalize">{anggota.status}</p>
                                </div>
                                {anggotaJadwals.length > 0 &&
                                    anggotaJadwals.map((jadwal, jIndex) => {
                                        const getStatusInfo = (status: 'selesai' | 'berjalan' | 'belum') => {
                                            const statusMap = {
                                                selesai: { variant: 'success' as const, text: 'Selesai' },
                                                berjalan: { variant: 'warning' as const, text: 'Progress' },
                                                belum: { variant: 'default' as const, text: 'Rencana' },
                                            };

                                            return statusMap[status];
                                        };
                                        return (
                                            <div
                                                key={jIndex}
                                                onClick={!view ? () => handleOpenModal(jadwal) : undefined}
                                                className="hover:border-primary hover:bg-primary-100 cursor-pointer space-y-2 rounded border border-slate-400 p-2.5"
                                            >
                                                <LabelStatus
                                                    variant={getStatusInfo(jadwal.status).variant}
                                                    size="small"
                                                    status={getStatusInfo(jadwal.status).text}
                                                />
                                                <p>{jadwal.kegiatan}</p>
                                                {jadwal.file_kegiatan && (
                                                    <div className="flex items-center gap-1">
                                                        <FileText size={17} />{' '}
                                                        <p className="w-60 truncate">{getFileName(jadwal.file_kegiatan, 'file_kegiatan')}</p>
                                                    </div>
                                                )}
                                                <p className="text-xs">Tenggat: {jadwal.tenggat}</p>
                                            </div>
                                        );
                                    })}
                                {isCurrentUser && !view && (
                                    <Button onClick={() => handleOpenModal()} variant="outline-primary" className="w-full">
                                        <Plus /> Tambah Kegiatan
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {modalOpen && !view && (
                <ModalJadwalForm
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    anggotaId={auth?.user?.id ?? 0}
                    kelompokId={joinedKelompok?.kelompok_id ?? ''}
                    proyekId={proyek?.id ?? 0}
                    jadwal={currentJadwal ?? null}
                />
            )}
        </React.Fragment>
    );
}
