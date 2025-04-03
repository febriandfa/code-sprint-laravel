import Button from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function Landing() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Link href={route('login')}>
                <Button>Login</Button>
            </Link>
        </div>
    );
}
