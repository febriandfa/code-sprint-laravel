import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek, ProyekJawaban } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

type Nilai = {
    user_id: string;
    kelompok_id: number;
    nilai_orientasi_masalah: number;
    nilai_kerja_sama: number;
    nilai_proses: number;
    nilai_waktu: number;
    nilai_hasil_proyek: number;
    evaluasi: string;
    nilai: number;
    [key: string]: string | number;
};

// Definisikan tipe untuk form data
type FormData = {
    nilais: Nilai[];
};

export default function CreateProyekNilai() {
    const { currentSyntax, proyek, kelompok, jawaban } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
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

    const { data, setData, post, processing, errors } = useForm<Required<FormData>>({
        nilais:
            kelompok?.anggotas.map((anggota) => ({
                user_id: anggota.anggota_id,
                kelompok_id: kelompok?.id,
                nilai_orientasi_masalah: 0,
                nilai_kerja_sama: 0,
                nilai_proses: 0,
                nilai_waktu: 0,
                nilai_hasil_proyek: 0,
                evaluasi: '',
                nilai: 0,
            })) || [],
    });

    const handleOnChange = (index: number, field: string, value: string) => {
        const updatedNilais = [...data.nilais];
        updatedNilais[index][field] = value;

        if (field !== 'evaluasi' && field !== 'nilai') {
            const nilai = updatedNilais[index];
            const fields = ['nilai_orientasi_masalah', 'nilai_kerja_sama', 'nilai_proses', 'nilai_waktu', 'nilai_hasil_proyek'];

            const allFieldsFilled = fields.every((f) => nilai[f] !== '');

            if (allFieldsFilled) {
                const totalNilai = (fields.reduce((sum, f) => sum + Number(nilai[f]), 0) / fields.length) * 20;
                updatedNilais[index].nilai = Number(totalNilai.toFixed(2));
            }
        }

        setData('nilais', updatedNilais);
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.proyek.nilaiStore', proyek?.id), {
            onSuccess: () => {},
        });
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} view />
            <form onSubmit={handleOnSubmit} className="my-5 w-full space-y-4">
                {kelompok?.anggotas.map((anggota, index) => {
                    return (
                        <React.Fragment key={anggota.anggota_id}>
                            <Subtitle subtitle={anggota.nama_anggota} />
                            <div className="space-y-6">
                                <div className="grid grid-cols-5 gap-4">
                                    <InputSelect
                                        id={'nilais.' + index + '.nilai_orientasi_masalah'}
                                        label={'Orientasi Masalah'}
                                        placeholder={'Pilih nilai'}
                                        options={poinOptions}
                                        value={data.nilais[index].nilai_orientasi_masalah}
                                        onChange={(e) => handleOnChange(index, 'nilai_orientasi_masalah', e.value)}
                                        error={(errors as Record<string, string>)[`nilais.${index}.nilai_orientasi_masalah`]}
                                    />
                                    <InputSelect
                                        id={'nilais.' + index + '.nilai_kerja_sama'}
                                        label={'Kerja Sama'}
                                        placeholder={'Pilih nilai'}
                                        options={poinOptions}
                                        value={data.nilais[index].nilai_kerja_sama}
                                        onChange={(e) => handleOnChange(index, 'nilai_kerja_sama', e.value)}
                                        error={(errors as Record<string, string>)[`nilais.${index}.nilai_kerja_sama`]}
                                    />
                                    <InputSelect
                                        id={'nilais.' + index + '.nilai_proses'}
                                        label={'Proses'}
                                        placeholder={'Pilih nilai'}
                                        options={poinOptions}
                                        value={data.nilais[index].nilai_proses}
                                        onChange={(e) => handleOnChange(index, 'nilai_proses', e.value)}
                                        error={(errors as Record<string, string>)[`nilais.${index}.nilai_proses`]}
                                    />
                                    <InputSelect
                                        id={'nilais.' + index + '.nilai_waktu'}
                                        label={'Waktu'}
                                        placeholder={'Pilih nilai'}
                                        options={poinOptions}
                                        value={data.nilais[index].nilai_waktu}
                                        onChange={(e) => handleOnChange(index, 'nilai_waktu', e.value)}
                                        error={(errors as Record<string, string>)[`nilais.${index}.nilai_waktu`]}
                                    />
                                    <InputSelect
                                        id={'nilais.' + index + '.nilai_hasil_proyek'}
                                        label={'Hasil Proyek'}
                                        placeholder={'Pilih nilai'}
                                        options={poinOptions}
                                        value={data.nilais[index].nilai_hasil_proyek}
                                        onChange={(e) => handleOnChange(index, 'nilai_hasil_proyek', e.value)}
                                        error={(errors as Record<string, string>)[`nilais.${index}.nilai_hasil_proyek`]}
                                    />
                                </div>
                                <InputField
                                    id={'nilais.' + index + '.nilai'}
                                    label="Nilai"
                                    placeholder="Masukkan nilai"
                                    type="number"
                                    value={data.nilais[index].nilai}
                                    error={(errors as Record<string, string>)[`nilais.${index}.nilai`]}
                                    disabled
                                />
                                <InputQuill
                                    id={'nilais.' + index + '.evaluasi'}
                                    label="Evaluasi"
                                    placeholder="Masukkan evaluasi anda"
                                    value={data.nilais[index].evaluasi}
                                    onChange={(value: string) => handleOnChange(index, 'evaluasi', value)}
                                    error={(errors as Record<string, string>)[`nilais.${index}.evaluasi`]}
                                />
                            </div>
                        </React.Fragment>
                    );
                })}
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Simpan Nilai
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
