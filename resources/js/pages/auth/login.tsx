import AppLogo from '@/components/app-logo';
import InputField from '@/components/input-field';
import Button from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

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
        <div className="min-h-svh">
            <div className="grid min-h-svh grid-cols-2 bg-gray-200">
                <div className="flex h-full flex-col items-center justify-center gap-32">
                    <img src="/assets/images/illust-login.svg" alt="illust login" className="size-80" />
                    <div className="space-y-6">
                        <AppLogo />
                        <p className="text-2xl">
                            Code Sprint menghadirkan pengalaman
                            <br /> belajar interaktif dengan pendekatan
                            <br /> Project-Based Learning (PjBL).
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center rounded-l-lg bg-white shadow">
                    <div className="flex w-3/4 flex-col">
                        <h4 className="text-3xl font-medium">Welcome to CodeSprint!👋🏻</h4>
                        <p className="mb-9 text-2xl">
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
    );
}
