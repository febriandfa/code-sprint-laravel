import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" className="flex w-fit items-center gap-2">
            <img src="/assets/images/app-logo.png" alt="app logo" className="size-8" />
            <p className="text-primary text-xl font-medium italic">Code Sprint</p>
        </Link>
    );
}
