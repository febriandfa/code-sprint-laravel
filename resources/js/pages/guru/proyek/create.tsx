import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelas, Mapel } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type ProyekForm = {
    kelas_id: string;
    mapel_id: string;
    nama: string;
    deskripsi: string;
    tenggat: string;
};

export default function CreateProyek() {
    const breadcrumbs = [
        { title: 'Proyek', link: route('guru.proyek.index') },
        { title: 'Tambah Proyek', link: '#' },
    ];

    const { kelases, mapels } = usePage().props as { kelases?: Kelas[]; mapels?: Mapel[] };

    const kelasOptions = kelases?.map((kelas) => ({
        value: kelas.id,
        label: kelas.nama,
    }));

    const mapelOptions = mapels?.map((mapel) => ({
        value: mapel.id,
        label: mapel.nama,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<ProyekForm>>({
        kelas_id: '',
        mapel_id: '',
        nama: '',
        deskripsi: '',
        tenggat: '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.proyek.store'), {
            onSuccess: () => {
                SwalSuccess({ content: 'proyek' });
                reset();
            },
        });
    };

    return (
        <AuthLayout title="Tambah Proyek" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                <InputSelect
                    id={'kelas_id'}
                    label={'Kelas'}
                    placeholder={'Pilih kelas'}
                    required
                    options={kelasOptions}
                    value={data.kelas_id}
                    onChange={(e) => setData('kelas_id', e.value)}
                    error={errors.kelas_id}
                />
                <InputSelect
                    id={'mapel_id'}
                    label={'Mata Pelajaran'}
                    placeholder={'Pilih mata pelajaran'}
                    required
                    options={mapelOptions}
                    value={data.mapel_id}
                    onChange={(e) => setData('mapel_id', e.value)}
                    error={errors.mapel_id}
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
