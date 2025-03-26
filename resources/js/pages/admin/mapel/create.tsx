import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type MapelForm = {
    nama: string;
    deskripsi: string;
    semester: string;
    tahun_ajaran: string;
};

export default function CreateMapel() {
    const breadcrumbs = [
        {
            title: 'Mata Pelajaran',
            link: route('admin.mapel.index'),
        },
        {
            title: 'Tambah Mata Pelajaran',
            link: '#',
        },
    ];

    const semesterOptions = [
        { value: 'ganjil', label: 'Ganjil' },
        { value: 'genap', label: 'Genap' },
    ];

    const { data, setData, post, processing, errors, reset } = useForm<Required<MapelForm>>({
        nama: '',
        deskripsi: '',
        semester: '',
        tahun_ajaran: '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.mapel.store'), {
            onSuccess: () => {
                SwalSuccess({ title: 'Berhasil', text: 'Mata pelajaran berhasil ditambahkan' });
                reset();
            },
        });
    };

    return (
        <AuthLayout title="Tambah Mata Pelajaran" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="nama"
                    label="Nama Mata Pelajaran"
                    placeholder="Masukkan nama mata pelajaran"
                    required
                    autoFocus
                    autoComplete="nama-mapel"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    error={errors.nama}
                />
                <InputQuill
                    id="deskripsi"
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi mata pelajaran"
                    required
                    value={data.deskripsi}
                    onChange={(value: string) => setData('deskripsi', value)}
                    error={errors.deskripsi}
                />
                <InputSelect
                    id="semester"
                    label="Semester"
                    placeholder="Pilih semester"
                    required
                    options={semesterOptions}
                    value={data.semester}
                    onChange={(e) => setData('semester', e.value)}
                    error={errors.semester}
                />
                <InputField
                    id="tahun_ajaran"
                    label="Tahun Ajaran"
                    placeholder="Masukkan tahun ajaran"
                    required
                    value={data.tahun_ajaran}
                    onChange={(e) => setData('tahun_ajaran', e.target.value)}
                    error={errors.tahun_ajaran}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Mata Pelajaran
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
