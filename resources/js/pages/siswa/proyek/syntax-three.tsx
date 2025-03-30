import InputField from '@/components/input-field';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { getFileName, getProyekAnswerStatusInfo } from '@/lib/helper';
import { SwalSuccess } from '@/lib/swal';
import { JoinedKelompok, Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useRef } from 'react';

type SyntaxThreeForm = {
    _method: 'PATCH' | 'POST';
    jadwal_proyek: File | null;
};

export default function SyntaxThreeProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const siswaStatus = joinedKelompok?.status ?? 'anggota';
    const rencanaProyekRef = useRef<HTMLInputElement | null>(null);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm<Required<SyntaxThreeForm>>({
        _method: 'PATCH',
        jadwal_proyek: null,
    });

    const handleOnSubmit = () => {
        post(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 6 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil mengirimkan jawaban!' });
            },
        });
    };

    const handleDownload = () => {
        const fileUrl = `/assets/downloads/gantt-chart-example.xlsx`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'gantt-chart-example.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <div className="space-y-3">
                    <LabelStatus status="PERHATIAN!" />
                    <p className="text-justify text-lg">
                        Pada Sinatks 3 : Menyusun Jadwal, peserta didik berdiskusi tentang penyusunan jadwan yang akan dikerjakan dalam mengerjakan
                        studi kasus, untuk jawaban hanya diinputkan oleh ketua kelompok.
                        <br />
                        <br />
                        Jadwal dibuat dengan mengunakan metode GanttChart, dapat dilihat pada contoh.
                    </p>
                    <Button variant="outline-primary" onClick={handleDownload}>
                        Unduh Contoh GanttChart
                    </Button>
                </div>
                <div>
                    <InputField
                        id="jadwal_proyek"
                        label="Upload Jadwal Proyek"
                        type="file"
                        ref={rencanaProyekRef}
                        required
                        onChange={(e) => setData('jadwal_proyek', e.target.files?.[0] ?? null)}
                        error={errors.jadwal_proyek}
                    />
                    {data.jadwal_proyek && typeof data.jadwal_proyek === 'object' && (
                        <p className="text-sm text-slate-500">File terpilih: {data.jadwal_proyek.name}</p>
                    )}
                    {jawaban && jawaban.jawaban_tahap_6 && (
                        <p className="text-sm text-slate-500">File Saat Ini: {getFileName(jawaban.jawaban_tahap_6, 'jadwal_proyek')}</p>
                    )}
                </div>
                <div>
                    <Label id={`status_tahap_6`} label="Status Pengerjaan" />
                    <LabelStatus variant={getProyekAnswerStatusInfo(6, jawaban).variant} status={getProyekAnswerStatusInfo(6, jawaban).text} />
                </div>
                {jawaban && jawaban.feedback_tahap_6 && (
                    <div>
                        <RichTextView label="Feedback Guru" value={jawaban.feedback_tahap_6} />
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
