import InputQuill from '@/components/input-quill';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { JoinedKelompok, Kelompok, Proyek, ProyekJawaban } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

type SyntaxTwoForm = {
    rencana_proyek: string;
};

export default function SyntaxTwoProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
    };

    const siswaStatus = joinedKelompok?.status ?? 'anggota';

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const { data, setData, patch, processing, errors } = useForm<Required<SyntaxTwoForm>>({
        rencana_proyek: '',
    });

    const handleOnSubmit = () => {
        patch(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, answerId: jawaban?.id, step: 5 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil mengirimkan jawaban!' });
            },
        });
    };

    useEffect(() => {
        if (jawaban) {
            setData((prev) => ({
                ...prev,
                rencana_proyek: jawaban.jawaban_tahap_5 || '',
            }));
        }
    }, [jawaban]);

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

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <InputQuill
                    id="rencana_proyek"
                    label="Merencanakan Proyek"
                    placeholder="Masukkan jawaban anda"
                    value={data.rencana_proyek}
                    onChange={(value: string) => setData('rencana_proyek', value)}
                    error={errors.rencana_proyek}
                />
                <div>
                    <Label id={`status_tahap_5`} label="Status Pengerjaan" />
                    <LabelStatus variant={getStatusInfo(5).variant} status={getStatusInfo(5).text} />
                </div>
                {jawaban && jawaban.feedback_tahap_5 && (
                    <div>
                        <RichTextView label="Feedback Guru" value={jawaban.feedback_tahap_5} />
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
        </AuthLayout>
    );
}
