import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Materi } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type ProyekForm = {
    materi_id: string;
    nama: string;
    deskripsi: string;
    tenggat: string;
};

export default function CreateProyek() {
    const breadcrumbs = [
        { title: 'Proyek', link: route('guru.proyek.index') },
        { title: 'Tambah Proyek', link: '#' },
    ];

    const { materis } = usePage().props as { materis?: Materi[] };

    const materiOptions = materis?.map((materi) => ({
        value: materi.id,
        label: materi.judul,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<ProyekForm>>({
        materi_id: '',
        nama: '',
        deskripsi: '',
        tenggat: '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.proyek.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthLayout title="Tambah Proyek" breadcrumbs={breadcrumbs}>
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
                        Tambah Proyek
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
