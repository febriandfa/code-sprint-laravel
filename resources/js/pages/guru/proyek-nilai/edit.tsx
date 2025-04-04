import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type NilaiForm = {
    nilai_orientasi_masalah: number;
    nilai_kerja_sama: number;
    nilai_proses: number;
    nilai_waktu: number;
    nilai_hasil_proyek: number;
    evaluasi: string;
    nilai: number;
    [key: string]: string | number;
};

export default function EditProyekNilai() {
    const { currentSyntax, proyek, kelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('guru.proyek.show', proyek?.id) },
        { title: `Progress Kelompok ${kelompok?.nama}`, link: '#' },
    ];

    const poinOptions = Array.from({ length: 6 }, (_, i) => ({
        value: i,
        label: i.toString(),
    }));

    const { data, setData, patch, processing, errors } = useForm<Required<NilaiForm>>({
        kelompok_id: nilai?.kelompok_id ?? '',
        nilai_orientasi_masalah: nilai?.nilai_orientasi_masalah ?? 0,
        nilai_kerja_sama: nilai?.nilai_kerja_sama ?? 0,
        nilai_proses: nilai?.nilai_proses ?? 0,
        nilai_waktu: nilai?.nilai_waktu ?? 0,
        nilai_hasil_proyek: nilai?.nilai_hasil_proyek ?? 0,
        evaluasi: nilai?.evaluasi ?? '',
        nilai: nilai?.nilai ?? 0,
    });

    const handleOnChange = (field: string, value: number | string) => {
        const updatedData = { ...data, [field]: value };

        if (field !== 'evaluasi' && field !== 'nilai') {
            const fields = ['nilai_orientasi_masalah', 'nilai_kerja_sama', 'nilai_proses', 'nilai_waktu', 'nilai_hasil_proyek'];

            const allFieldsFilled = fields.every((f) => updatedData[f] !== '');

            if (allFieldsFilled) {
                const totalNilai = (fields.reduce((sum, f) => sum + Number(updatedData[f]), 0) / fields.length) * 20;
                updatedData.nilai = Number(totalNilai.toFixed(2));
            }
        }

        setData(updatedData);
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('guru.proyek.nilaiUpdate', { proyekId: proyek?.id, id: nilai?.id }), {
            onSuccess: () => {},
        });
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} view />
            <form onSubmit={handleOnSubmit} className="my-5 w-full space-y-4">
                <Subtitle subtitle={nilai?.siswa ?? ''} />
                <div className="space-y-6">
                    <div className="grid grid-cols-5 gap-4">
                        <InputSelect
                            id={'nilai_orientasi_masalah'}
                            label={'Orientasi Masalah'}
                            placeholder={'Pilih nilai'}
                            options={poinOptions}
                            value={data.nilai_orientasi_masalah}
                            onChange={(e) => handleOnChange('nilai_orientasi_masalah', e.value)}
                            error={errors.nilai_orientasi_masalah}
                        />
                        <InputSelect
                            id={'nilai_kerja_sama'}
                            label={'Kerja Sama'}
                            placeholder={'Pilih nilai'}
                            options={poinOptions}
                            value={data.nilai_kerja_sama}
                            onChange={(e) => handleOnChange('nilai_kerja_sama', e.value)}
                            error={errors.nilai_kerja_sama}
                        />
                        <InputSelect
                            id={'nilai_proses'}
                            label={'Proses'}
                            placeholder={'Pilih nilai'}
                            options={poinOptions}
                            value={data.nilai_proses}
                            onChange={(e) => handleOnChange('nilai_proses', e.value)}
                            error={errors.nilai_proses}
                        />
                        <InputSelect
                            id={'nilai_waktu'}
                            label={'Waktu'}
                            placeholder={'Pilih nilai'}
                            options={poinOptions}
                            value={data.nilai_waktu}
                            onChange={(e) => handleOnChange('nilai_waktu', e.value)}
                            error={errors.nilai_waktu}
                        />
                        <InputSelect
                            id={'nilai_hasil_proyek'}
                            label={'Hasil Proyek'}
                            placeholder={'Pilih nilai'}
                            options={poinOptions}
                            value={data.nilai_hasil_proyek}
                            onChange={(e) => handleOnChange('nilai_hasil_proyek', e.value)}
                            error={errors.nilai_hasil_proyek}
                        />
                    </div>
                    <InputField
                        id={'nilai'}
                        label="Nilai"
                        placeholder="Masukkan nilai"
                        type="number"
                        value={data.nilai}
                        error={errors.nilai}
                        disabled
                    />
                    <InputQuill
                        id={'evaluasi'}
                        label="Evaluasi"
                        placeholder="Masukkan evaluasi anda"
                        value={data.evaluasi}
                        onChange={(value: string) => handleOnChange('evaluasi', value)}
                        error={errors.evaluasi}
                    />
                </div>
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Ubah Nilai
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
