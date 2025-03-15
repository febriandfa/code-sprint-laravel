import InputField from '@/components/input-field';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type GuruForm = {
    name: string;
    email: string;
    mapel_id: string;
};

export default function EditSiswa() {
    const breadcrumbs = [
        { title: 'Guru', link: route('admin.guru.index') },
        { title: 'Edit Guru', link: '/' },
    ];

    const { guru, mapels } = usePage().props as { guru?: User; mapels?: { id: string; nama: string }[] };

    console.log(guru);

    const mapelOptions = mapels?.map((mapel) => ({
        value: mapel.id,
        label: mapel.nama,
    }));

    const { data, setData, patch, processing, errors } = useForm<Required<GuruForm>>({
        name: guru?.name ?? '',
        email: guru?.email ?? '',
        mapel_id: guru?.mapel_id ?? '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('admin.guru.update', guru?.id), {
            onSuccess: () => {
                SwalSuccess({ title: 'Berhasil', text: 'Guru berhasil dirubah' });
            },
        });
    };

    return (
        <AuthLayout title="Edit Guru" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="name"
                    label="Nama Guru"
                    placeholder="Masukkan nama guru"
                    required
                    autoFocus
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />
                <InputField
                    id="email"
                    label="Email Guru"
                    placeholder="Masukkan email guru"
                    type="email"
                    required
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />
                <InputSelect
                    id={'kelas_id'}
                    label={'Mata Pelajaran'}
                    placeholder={'Pilih mata pelajaran'}
                    required
                    options={mapelOptions}
                    value={data.mapel_id}
                    onChange={(e) => setData('mapel_id', e.value)}
                    error={errors.mapel_id}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Ubah Guru
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
