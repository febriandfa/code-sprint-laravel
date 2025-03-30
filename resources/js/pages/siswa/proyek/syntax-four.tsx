import ModalJadwalForm from '@/components/modal-jadwal-form';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { getFileName, getProyekAnswerStatusInfo } from '@/lib/helper';
import { SwalSuccess } from '@/lib/swal';
import { Auth, JoinedKelompok, Kelompok, Proyek, ProyekJadwal, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FileText, LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';

export default function SyntaxTwoProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban, jadwals, auth, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
        jadwals?: ProyekJadwal[];
        auth?: Auth;
        nilai?: ProyekNilai;
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentJadwal, setCurrentJadwal] = useState<ProyekJadwal | null>(null);
    const siswaStatus = joinedKelompok?.status ?? 'anggota';

    console.log('kelompok', kelompok);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const { patch, processing } = useForm();

    const handleOnSubmit = () => {
        patch(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 7 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil mengirimkan jawaban!' });
            },
        });
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
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} />
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
                    <LabelStatus variant={getProyekAnswerStatusInfo(7, jawaban).variant} status={getProyekAnswerStatusInfo(7, jawaban).text} />
                </div>
                {jawaban && jawaban.feedback_tahap_7 && (
                    <div>
                        <RichTextView label="Feedback Guru" value={jawaban.feedback_tahap_7} />
                    </div>
                )}

                <div className="flex justify-end">
                    {siswaStatus === 'ketua' && (
                        <div className="flex gap-2">
                            <Button variant="outline-primary">Edit</Button>
                            <Button onClick={handleOnSubmit} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Kirim
                            </Button>
                        </div>
                    )}
                </div>
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
