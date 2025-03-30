import ModalJadwalForm from '@/components/modal-jadwal-form';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { getFileName } from '@/lib/helper';
import { Auth, JoinedKelompok, Kelompok, Proyek, ProyekJadwal, ProyekJawaban } from '@/types';
import { usePage } from '@inertiajs/react';
import { FileText, Plus } from 'lucide-react';
import { useState } from 'react';

export default function SyntaxTwoProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban, jadwals, auth } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
        jadwals?: ProyekJadwal[];
        auth?: Auth;
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentJadwal, setCurrentJadwal] = useState<ProyekJadwal | null>(null);

    console.log('kelompok', kelompok);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const getStatusInfo = (step: number) => {
        if (!jawaban || !jawaban[`status_tahap_${step}` as keyof ProyekJawaban]) {
            return { variant: 'default' as const, text: 'Sedang Mengerjakan' };
        }

        const status = jawaban[`status_tahap_${step}` as keyof ProyekJawaban] as keyof typeof statusMap;

        const statusMap = {
            diterima: { variant: 'success' as const, text: 'Jawaban Diterima' },
            ditolak: { variant: 'danger' as const, text: 'Jawaban Ditolak' },
            direvisi: { variant: 'warning' as const, text: 'Perlu Direvisi' },
        };

        return statusMap[status] || { variant: 'info' as const, text: 'Sedang Diproses' };
    };

    const handleOpenModal = (jadwal?: ProyekJadwal) => {
        setModalOpen(true);
        setCurrentJadwal(jadwal ?? null);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentJadwal(null);
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
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
                                                    onClick={() => handleOpenModal(jadwal)}
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
                                    {isCurrentUser && (
                                        <Button onClick={() => handleOpenModal()} variant="outline-primary" className="w-full">
                                            <Plus /> Tambah Kegiatan
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <Label id={`status_tahap_7`} label="Status Pengerjaan" />
                    <LabelStatus variant={getStatusInfo(7).variant} status={getStatusInfo(7).text} />
                </div>
                {jawaban && jawaban.feedback_tahap_7 && (
                    <div>
                        <RichTextView label="Feedback Guru" value={jawaban.feedback_tahap_7} />
                    </div>
                )}
            </div>

            {modalOpen && (
                <ModalJadwalForm
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    anggotaId={auth?.user?.id ?? 0}
                    kelompokId={joinedKelompok?.kelompok_id ?? ''}
                    proyekId={proyek?.id ?? 0}
                    jadwal={currentJadwal ?? null}
                />
            )}
        </AuthLayout>
    );
}
