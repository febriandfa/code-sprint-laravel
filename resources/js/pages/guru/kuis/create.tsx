import InputField from '@/components/input-field';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Materi } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type KuisForm = {
    judul: string;
    materi_id: string;
    durasi: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
};

export default function CreateKuis() {
    const breadcrumbs = [
        { title: 'Kuis', link: route('guru.kuis.index') },
        { title: 'Tambah Kuis', link: '#' },
    ];

    const { materis } = usePage().props as { materis?: Materi[] };

    const materiOptions = materis?.map((materi) => ({
        value: materi.id,
        label: materi.judul,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<KuisForm>>({
        judul: '',
        materi_id: '',
        durasi: 0,
        tanggal_mulai: '',
        tanggal_selesai: '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.kuis.store'), {
            onSuccess: () => {
                SwalSuccess({ content: 'kuis' });
                reset();
            },
        });
    };

    return (
        <AuthLayout title="Tambah Kuis" breadcrumbs={breadcrumbs}>
            <form className="space-y-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="judul"
                    label="Judul"
                    placeholder="Masukkan judul kuis"
                    required
                    autoFocus
                    autoComplete="judul"
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                    error={errors.judul}
                />
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
                    id="durasi"
                    label="Durasi Kuis"
                    placeholder="Masukkan durasi kuis"
                    type="number"
                    required
                    value={data.durasi}
                    onChange={(e) => setData('durasi', Number(e.target.value))}
                    error={errors.durasi}
                />
                <InputField
                    id="tanggal_mulai"
                    label="Tanggal Mulai"
                    placeholder="Masukkan tanggal mulai kuis"
                    type="datetime-local"
                    required
                    value={data.tanggal_mulai}
                    onChange={(e) => setData('tanggal_mulai', e.target.value)}
                    error={errors.tanggal_mulai}
                />
                <InputField
                    id="tanggal_selesai"
                    label="Tanggal Selesai"
                    placeholder="Masukkan tanggal selesai kuis"
                    type="datetime-local"
                    required
                    value={data.tanggal_selesai}
                    onChange={(e) => setData('tanggal_selesai', e.target.value)}
                    error={errors.tanggal_selesai}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Kuis
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
