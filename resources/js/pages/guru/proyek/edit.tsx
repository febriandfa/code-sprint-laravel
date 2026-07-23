import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Materi, Proyek } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

type ProyekForm = {
    materi_id: string;
    nama: string;
    deskripsi: string;
    tenggat: string;
    nama_pertemuan_1: string;
    tanggal_mulai_1: string;
    tanggal_selesai_1: string;
    nama_pertemuan_2: string;
    tanggal_mulai_2: string;
    tanggal_selesai_2: string;
    nama_pertemuan_3: string;
    tanggal_mulai_3: string;
    tanggal_selesai_3: string;
    nama_pertemuan_4: string;
    tanggal_mulai_4: string;
    tanggal_selesai_4: string;
};

export default function EditProyek() {
    const breadcrumbs = [
        { title: 'Proyek', link: route('guru.proyek.index') },
        { title: 'Edit Proyek', link: '#' },
    ];

    const { proyek, materis } = usePage().props as { proyek?: Proyek; materis?: Materi[] };

    const materiOptions = materis?.map((materi) => ({
        value: materi.id,
        label: materi.judul,
    }));

    const { data, setData, patch, processing, errors } = useForm<Required<ProyekForm>>({
        materi_id: proyek?.materi_id.toString() ?? '',
        nama: proyek?.nama ?? '',
        deskripsi: proyek?.deskripsi ?? '',
        tenggat: proyek?.tenggat ?? '',
        nama_pertemuan_1: proyek?.pertemuan?.nama_pertemuan_1 ?? '',
        tanggal_mulai_1: proyek?.pertemuan?.tanggal_mulai_1 ?? '',
        tanggal_selesai_1: proyek?.pertemuan?.tanggal_selesai_1 ?? '',
        nama_pertemuan_2: proyek?.pertemuan?.nama_pertemuan_2 ?? '',
        tanggal_mulai_2: proyek?.pertemuan?.tanggal_mulai_2 ?? '',
        tanggal_selesai_2: proyek?.pertemuan?.tanggal_selesai_2 ?? '',
        nama_pertemuan_3: proyek?.pertemuan?.nama_pertemuan_3 ?? '',
        tanggal_mulai_3: proyek?.pertemuan?.tanggal_mulai_3 ?? '',
        tanggal_selesai_3: proyek?.pertemuan?.tanggal_selesai_3 ?? '',
        nama_pertemuan_4: proyek?.pertemuan?.nama_pertemuan_4 ?? '',
        tanggal_mulai_4: proyek?.pertemuan?.tanggal_mulai_4 ?? '',
        tanggal_selesai_4: proyek?.pertemuan?.tanggal_selesai_4 ?? '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('guru.proyek.update', proyek?.id), {
            onSuccess: () => {},
        });
    };

    return (
        <AuthLayout title="Edit Proyek" breadcrumbs={breadcrumbs}>
            <form className="space-y-6" onSubmit={handleOnSubmit}>
                <InputSelect
                    id={'materi_id'}
                    label={'Materi'}
                    placeholder={'Pilih materi'}
                    required
                    options={materiOptions}
                    value={data.materi_id}
                    onChange={(e) => setData('materi_id', e.value)}
                    error={errors.materi_id}
                />
                <InputField
                    id="nama"
                    label="Nama Proyek"
                    placeholder="Masukkan nama proyek"
                    required
                    autoFocus
                    autoComplete="nama"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    error={errors.nama}
                />
                <InputQuill
                    id="deskripsi"
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi proyek"
                    required
                    value={data.deskripsi}
                    onChange={(value: string) => setData('deskripsi', value)}
                    error={errors.deskripsi}
                />
                <InputField
                    id="tenggat"
                    label="Tenggat"
                    placeholder="Masukkan tenggat proyek"
                    type="datetime-local"
                    required
                    value={data.tenggat}
                    onChange={(e) => setData('tenggat', e.target.value)}
                    error={errors.tenggat}
                />
                <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <React.Fragment key={i}>
                            <InputField
                                id={`nama_pertemuan_${i}`}
                                label={`Nama Pertemuan ${i}`}
                                placeholder={`Masukkan nama pertemuan ke-${i}`}
                                required
                                value={data[`nama_pertemuan_${i}` as keyof ProyekForm]}
                                onChange={(e) => setData(`nama_pertemuan_${i}` as keyof ProyekForm, e.target.value)}
                                error={errors[`nama_pertemuan_${i}` as keyof ProyekForm]}
                            />
                            <InputField
                                id={`tanggal_mulai_${i}`}
                                label={`Tanggal Mulai ${i}`}
                                placeholder={`Masukkan tanggal mulai pertemuan ke-${i}`}
                                type="datetime-local"
                                required
                                value={data[`tanggal_mulai_${i}` as keyof ProyekForm]}
                                onChange={(e) => setData(`tanggal_mulai_${i}` as keyof ProyekForm, e.target.value)}
                                error={errors[`tanggal_mulai_${i}` as keyof ProyekForm]}
                            />
                            <InputField
                                id={`tanggal_selesai_${i}`}
                                label={`Tanggal Selesai ${i}`}
                                placeholder={`Masukkan tanggal selesai pertemuan ke-${i}`}
                                type="datetime-local"
                                required
                                value={data[`tanggal_selesai_${i}` as keyof ProyekForm]}
                                onChange={(e) => setData(`tanggal_selesai_${i}` as keyof ProyekForm, e.target.value)}
                                error={errors[`tanggal_selesai_${i}` as keyof ProyekForm]}
                            />
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Ubah Proyek
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
