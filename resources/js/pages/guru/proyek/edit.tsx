import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Materi, Proyek } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type ProyekForm = {
    materi_id: string;
    nama: string;
    deskripsi: string;
    tenggat: string;
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
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('guru.proyek.update', proyek?.id), {
            onSuccess: () => {
                SwalSuccess({ type: 'edit', content: 'proyek' });
            },
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
