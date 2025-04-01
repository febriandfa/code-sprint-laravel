import InputField from '@/components/input-field';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { getFileName, getProyekAnswerStatusInfo } from '@/lib/helper';
import { SwalSuccess } from '@/lib/swal';
import { JoinedKelompok, Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

type SyntaxFiveForm = {
    _method: 'PATCH' | 'POST';
    file_proyek: File | null;
    file_laporan: File | null;
};

export default function SyntaxFiveProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const siswaStatus = joinedKelompok?.status ?? 'anggota';
    const fileProyekRef = useRef<HTMLInputElement | null>(null);
    const fileLaporanRef = useRef<HTMLInputElement | null>(null);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm<Required<SyntaxFiveForm>>({
        _method: 'PATCH',
        file_proyek: null,
        file_laporan: null,
    });

    const handleOnSubmit = () => {
        post(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 8 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil mengirimkan jawaban!' });
            },
        });
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <div>
                    <InputField
                        id="file_proyek"
                        label="Upload File Proyek Akhir (ZIP)"
                        type="file"
                        ref={fileProyekRef}
                        required
                        onChange={(e) => setData('file_proyek', e.target.files?.[0] ?? null)}
                        error={errors.file_proyek}
                    />
                    {data.file_proyek && typeof data.file_proyek === 'object' && (
                        <p className="text-sm text-slate-500">File terpilih: {data.file_proyek.name}</p>
                    )}
                    {jawaban && jawaban.file_proyek && (
                        <p className="text-sm text-slate-500">File Saat Ini: {getFileName(jawaban.file_proyek, 'file_proyek')}</p>
                    )}
                </div>
                <div>
                    <InputField
                        id="file_laporan"
                        label="Upload File Laporan/Media Presentasi"
                        type="file"
                        ref={fileLaporanRef}
                        required
                        onChange={(e) => setData('file_laporan', e.target.files?.[0] ?? null)}
                        error={errors.file_laporan}
                    />
                    {data.file_laporan && typeof data.file_laporan === 'object' && (
                        <p className="text-sm text-slate-500">File terpilih: {data.file_laporan.name}</p>
                    )}
                    {jawaban && jawaban.file_laporan && (
                        <p className="text-sm text-slate-500">File Saat Ini: {getFileName(jawaban.file_laporan, 'file_laporan')}</p>
                    )}
                </div>
                <div>
                    <Label id={`status_tahap_8`} label="Status Pengerjaan" />
                    <LabelStatus variant={getProyekAnswerStatusInfo(8, jawaban).variant} status={getProyekAnswerStatusInfo(8, jawaban).text} />
                </div>
                {jawaban && jawaban.feedback_tahap_8 && <RichTextView label="Feedback Guru" value={jawaban.feedback_tahap_8} />}

                {jawaban?.status_tahap_8 !== 'diterima' && <PjblFooter role={siswaStatus} onSubmit={handleOnSubmit} disabled={processing} />}
            </div>
        </AuthLayout>
    );
}
