import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Kelas, Mapel } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useRef } from 'react';

type MateriForm = {
    kelas_id: string;
    mapel_id: string;
    judul: string;
    deskripsi: string;
    file_materi: File | null;
    file_modul: File | null;
    video_materi: File | null;
};

export default function CreateMateri() {
    const breadcrumbs = [
        {
            title: 'Materi',
            link: route('guru.materi.index'),
        },
        {
            title: 'Tambah Materi',
            link: '#',
        },
    ];

    const fileMateriRef = useRef<HTMLInputElement | null>(null);
    const fileModulRef = useRef<HTMLInputElement | null>(null);
    const videoMateriRef = useRef<HTMLInputElement | null>(null);

    const { kelases, mapels } = usePage().props as { kelases?: Kelas[]; mapels?: Mapel[] };

    const kelasOptions = kelases?.map((kelas) => ({
        value: kelas.id,
        label: kelas.nama,
    }));

    const mapelOptions = mapels?.map((mapel) => ({
        value: mapel.id,
        label: mapel.nama,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<MateriForm>>({
        kelas_id: '',
        mapel_id: '',
        judul: '',
        deskripsi: '',
        file_materi: null,
        file_modul: null,
        video_materi: null,
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.materi.store'), {
            onSuccess: () => {
                if (fileMateriRef.current) fileMateriRef.current.value = '';
                if (fileModulRef.current) fileModulRef.current.value = '';
                if (videoMateriRef.current) videoMateriRef.current.value = '';
                reset();
            },
        });
    };

    return (
        <AuthLayout title="Tambah Materi" breadcrumbs={breadcrumbs}>
            <form className="space-y-6" onSubmit={handleOnSubmit}>
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
                    id="judul"
                    label="Nama Materi"
                    placeholder="Masukkan judul materi"
                    required
                    autoFocus
                    autoComplete="judul"
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                    error={errors.judul}
                />
                <InputQuill
                    id="deskripsi"
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi materi"
                    required
                    value={data.deskripsi}
                    onChange={(value: string) => setData('deskripsi', value)}
                    error={errors.deskripsi}
                />
                <InputField
                    id="file_materi"
                    label="File Materi"
                    type="file"
                    required
                    ref={fileMateriRef}
                    onChange={(e) => setData('file_materi', e.target.files?.[0] ?? null)}
                    error={errors.file_materi}
                />
                <InputField
                    id="file_modul"
                    label="File Modul"
                    type="file"
                    required
                    ref={fileModulRef}
                    onChange={(e) => setData('file_modul', e.target.files?.[0] ?? null)}
                    error={errors.file_modul}
                />
                <InputField
                    id="video_materi"
                    label="Video Materi"
                    type="file"
                    required
                    ref={videoMateriRef}
                    onChange={(e) => setData('video_materi', e.target.files?.[0] ?? null)}
                    error={errors.video_materi}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Materi
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
