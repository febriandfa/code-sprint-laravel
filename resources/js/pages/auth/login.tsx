import AppLogo from '@/components/app-logo';
import FlashMessage from '@/components/flash-message';
import InputField from '@/components/input-field';
import Button from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
    });

    const handleOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <React.Fragment>
            <Head title={'Login'} />
            <FlashMessage />
            <div className="min-h-svh">
                <div className="grid min-h-svh grid-cols-1 bg-gray-50 md:grid-cols-2">
                    {/* KANAN - Gambar & Teks (Hanya tampil di desktop, dengan animasi fade-in) */}
                    <div className="hidden flex-col items-center justify-center gap-12 opacity-0 transition-all duration-500 ease-in-out md:flex md:opacity-100">
                        <img src="/assets/images/hero-3.svg" alt="illust login" className="size-98" />
                        <div className="space-y-2 text-center">
                            <AppLogo />
                            <p className="text-base">
                                Code Sprint menghadirkan pengalaman belajar
                                <br /> interaktif dengan pendekatan Project-Based Learning (PjBL).
                            </p>
                        </div>
                    </div>

                    {/* KIRI - Form login (Selalu tampil) */}
                    <div className="flex items-center justify-center bg-white shadow transition-all duration-500 ease-in-out md:rounded-l-lg">
                        <div className="flex w-3/4 flex-col">
                            <h4 className="text-3xl font-medium">Selamat Datang CodeSprint!👋🏻</h4>
                            <p className="mb-9 text-base">
                                Silahkan masuk ke akun Anda
                                <br /> dan mulai pembelajaran
                            </p>
                            <form className="space-y-6" onSubmit={handleOnSubmit}>
                                <InputField
                                    id="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Masukkan email anda"
                                    required
                                    autoFocus
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
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={errors.password}
                                />
                                <div className="mt-3 w-full">
                                    <Button type="submit" disabled={processing} className="w-full">
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
