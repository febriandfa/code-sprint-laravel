import InputField from '@/components/input-field';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelas, UserDetail } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type SiswaForm = {
    name: string;
    email: string;
    kelas_id: string;
};

export default function EditSiswa() {
    const breadcrumbs = [
        { title: 'Siswa', link: route('admin.siswa.index') },
        { title: 'Edit Siswa', link: '#' },
    ];

    const { siswa, kelases } = usePage().props as { siswa?: UserDetail; kelases?: Kelas[] };

    const kelasOptions = kelases?.map((kelas) => ({
        value: kelas.id,
        label: kelas.nama,
    }));

    const { data, setData, patch, processing, errors } = useForm<Required<SiswaForm>>({
        name: siswa?.name ?? '',
        email: siswa?.email ?? '',
        kelas_id: siswa?.kelas_id ?? '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('admin.siswa.update', siswa?.id), {
            onSuccess: () => {
                SwalSuccess({ type: 'edit', content: 'siswa' });
            },
        });
    };

    return (
        <AuthLayout title="Edit Siswa" breadcrumbs={breadcrumbs}>
            <form className="space-y-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="name"
                    label="Nama Siswa"
                    placeholder="Masukkan nama siswa"
                    required
                    autoFocus
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />
                <InputField
                    id="email"
                    label="Email Siswa"
                    placeholder="Masukkan email siswa"
                    type="email"
                    required
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />
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
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Ubah Siswa
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
