import { getFileName } from '@/lib/helper';
import { SwalSuccess } from '@/lib/swal';
import { ProyekJadwal } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import InputField from './input-field';
import InputSelect from './input-select';
import Button from './ui/button';
import Title from './ui/title';

interface ModalJadwalFormProps {
    isOpen: boolean;
    onClose: () => void;
    anggotaId: number;
    kelompokId: string;
    proyekId: number;
    id?: number | null;
    jadwal?: ProyekJadwal | null;
}

type KegiatanForm = {
    _method: 'POST' | 'PATCH';
    anggota_id: number;
    kelompok_id: string;
    proyek_id: number;
    kegiatan: string;
    tenggat: string;
    status: 'belum' | 'berjalan' | 'selesai';
    file_kegiatan: File | null;
};

export default function ModalJadwalForm({ isOpen, onClose, anggotaId, kelompokId, proyekId, jadwal }: ModalJadwalFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<KegiatanForm>>({
        _method: 'POST',
        anggota_id: anggotaId,
        kelompok_id: kelompokId,
        proyek_id: proyekId,
        kegiatan: '',
        tenggat: '',
        status: 'belum',
        file_kegiatan: null,
    });

    const statusOptions = [
        { value: 'belum', label: 'Rencana' },
        { value: 'berjalan', label: 'Progress' },
        { value: 'selesai', label: 'Selesai' },
    ];

    const fileKegiatanRef = useRef<HTMLInputElement | null>(null);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const routeName = jadwal
            ? route('siswa.proyek.updateJadwal', { proyekId: proyekId, id: jadwal.id })
            : route('siswa.proyek.storeJadwal', proyekId);
        post(routeName, {
            onSuccess: () => {
                SwalSuccess({ type: jadwal ? 'edit' : 'create', content: 'kegiatan' });
                if (fileKegiatanRef.current) fileKegiatanRef.current.value = '';
                reset();
                onClose();
            },
        });
    };

    const handleDeleteOnClick = () => {
        if (jadwal) {
            router.delete(route('siswa.proyek.deleteJadwal', { proyekId: proyekId, id: jadwal.id }));
            onClose();
        }
    };

    useEffect(() => {
        if (jadwal) {
            setData((prev) => ({
                ...prev,
                _method: 'PATCH',
                kegiatan: jadwal?.kegiatan ?? '',
                tenggat: jadwal?.tenggat ?? '',
                status: jadwal?.status ?? 'belum',
                file_kegiatan: null,
            }));
        }
    }, [jadwal]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="relative w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-4">
                    <Title title={`${jadwal ? 'Edit' : 'Tambah'} Kegiatan`} />
                </div>
                <form className="space-y-6" onSubmit={handleOnSubmit}>
                    <InputField
                        id="kegiatan"
                        label="Nama Kegiatan"
                        placeholder="Masukkan nama kegiatan"
                        required
                        autoFocus
                        autoComplete="kegiatan"
                        value={data.kegiatan}
                        onChange={(e) => setData('kegiatan', e.target.value)}
                        error={errors.kegiatan}
                    />
                    <InputField
                        id="tenggat"
                        label="Tenggat Pengerjaan"
                        placeholder="Masukkan tenggat pengerjaan"
                        type="datetime-local"
                        required
                        value={data.tenggat}
                        onChange={(e) => setData('tenggat', e.target.value)}
                        error={errors.tenggat}
                    />
                    <InputSelect
                        id="status"
                        label="Status Pengerjaan"
                        placeholder="Pilih status pengerjaan"
                        required
                        options={statusOptions}
                        value={data.status}
                        onChange={(e) => setData('status', e.value)}
                        error={errors.status}
                    />
                    <div>
                        <InputField
                            id="file_materi"
                            label="File Kegiatan"
                            type="file"
                            ref={fileKegiatanRef}
                            onChange={(e) => setData('file_kegiatan', e.target.files?.[0] ?? null)}
                            error={errors.file_kegiatan}
                        />
                        {jadwal && jadwal.file_kegiatan && (
                            <p className="text-sm text-slate-500">File Saat Ini: {getFileName(jadwal.file_kegiatan, 'file_kegiatan')}</p>
                        )}
                    </div>
                    <div className="mt-3 flex w-full justify-between">
                        <Button variant="danger" onClick={handleDeleteOnClick}>
                            Hapus
                        </Button>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline-primary" onClick={onClose}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {jadwal ? 'Ubah' : 'Tambah'} Kegiatan
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
