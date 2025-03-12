import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <img src="/assets/images/app-logo.png" alt="app logo" className="size-9" />
            <p className="text-primary text-3xl font-medium italic">Code Sprint</p>
        </Link>
    );
}
