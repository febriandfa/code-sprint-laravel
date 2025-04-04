import InputField from '@/components/input-field';
import Button from '@/components/ui/button';
import Container from '@/components/ui/container';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';
import { convertSecondsToTime } from '@/lib/helper';
import { Auth } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, User as UserIcon } from 'lucide-react';
import { useRef } from 'react';

type ProfileForm = {
    _method: 'PATCH' | 'POST';
    name: string;
    email: string;
    foto: File | null;
    password: string;
    password_confirmation: string;
};

export default function Profile() {
    const { auth } = usePage().props as { auth?: Auth };

    const user = auth?.user;

    const { data, setData, post, processing, errors } = useForm<Required<ProfileForm>>({
        _method: 'PATCH',
        name: user?.name ?? '',
        email: user?.email ?? '',
        foto: null,
        password: '',
        password_confirmation: '',
    });

    const fotoRef = useRef<HTMLInputElement | null>(null);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('profile.update'), {
            onSuccess: () => {},
        });
    };

    return (
        <AuthLayout title="Profil" siswa>
            <Container className="mb-6">
                <Subtitle subtitle="Data Diri" />
                <div className="flex gap-6">
                    {user?.user_detail?.foto ? (
                        <img src={user?.user_detail?.foto} alt="foto profil" className="size-40 rounded-lg object-cover" />
                    ) : (
                        <div className="flex size-40 items-center justify-center rounded-lg bg-gray-200">
                            <UserIcon size={96} className="text-gray-500" />
                        </div>
                    )}
                    <div>
                        <p className="text-2xl font-medium">{user?.name}</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-64 gap-y-4">
                            <div>
                                <p className="text-sm text-slate-400">Kelas</p>
                                <p className="text-lg font-medium">{user?.user_detail?.kelas?.nama}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">No Absen</p>
                                <p className="text-lg font-medium">{user?.user_detail?.no_absen}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Email</p>
                                <p className="text-lg font-medium">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Login</p>
                                <p className="text-lg font-medium">{convertSecondsToTime(user?.active_time ?? 0)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <form onSubmit={handleOnSubmit} className="space-y-6">
                    <InputField
                        id="name"
                        label="Nama Lengkap"
                        placeholder="Masukkan nama lengkap anda"
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                    />
                    <InputField
                        id="foto"
                        label="Foto"
                        type="file"
                        ref={fotoRef}
                        onChange={(e) => setData('foto', e.target.files?.[0] ?? null)}
                        error={errors.foto}
                    />
                    <InputField
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Masukkan email anda"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                    />
                    <InputField
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Masukkan password anda"
                        autoComplete="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                    />
                    <InputField
                        id="password_confirmation"
                        type="password"
                        label="Konfirmasi Password"
                        placeholder="Masukkan password lagi anda"
                        autoComplete="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        error={errors.password_confirmation}
                    />
                    <div className="mt-3 w-fit">
                        <Button type="submit" disabled={processing} className="w-full">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </div>
                </form>
            </Container>
        </AuthLayout>
    );
}
