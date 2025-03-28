import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Proyek, User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type KelompokForm = {
    nama: string;
    jumlah_anggota: number;
    ketua_id: string;
    masalah: string;
};

export default function CreateKelompok() {
    const { proyek, ketuaCandidates } = usePage().props as { proyek?: Proyek; ketuaCandidates?: User[] };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('guru.proyek.kelompok', proyek?.id) },
        { title: 'Tambah Kelompok', link: '#' },
    ];

    console.log('ketuaCandidates', ketuaCandidates);

    const ketuaOptions = ketuaCandidates?.map((ketua) => ({
        value: ketua.id,
        label: ketua.name,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<KelompokForm>>({
        nama: '',
        jumlah_anggota: 0,
        ketua_id: '',
        masalah: '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.proyek.kelompokStore', proyek?.id), {
            onSuccess: () => {
                SwalSuccess({ content: 'kelompok' });
                reset();
            },
        });
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <form className="space-y-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="nama"
                    label="Nama Kelompok"
                    placeholder="Masukkan nama kelompok"
                    required
                    autoFocus
                    autoComplete="nama"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    error={errors.nama}
                />
                <InputField
                    id="jumlah_anggota"
                    label="Jumlah Anggota"
                    placeholder="Masukkan jumlah anggota kelompok"
                    type="number"
                    required
                    value={data.jumlah_anggota}
                    onChange={(e) => setData('jumlah_anggota', Number(e.target.value))}
                    error={errors.jumlah_anggota}
                />
                <InputSelect
                    id={'ketua_id'}
                    label={'Ketua Kelompok'}
                    placeholder={'Pilih ketua kelompok'}
                    required
                    options={ketuaOptions}
                    value={data.ketua_id}
                    onChange={(e) => setData('ketua_id', e.value)}
                    error={errors.ketua_id}
                />
                <InputQuill
                    id="masalah"
                    label="Orientasi Masalah"
                    placeholder="Masukkan orientasi masalah"
                    required
                    value={data.masalah}
                    onChange={(value: string) => setData('masalah', value)}
                    error={errors.masalah}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Kelompok
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
