import { Link, router } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import Book from '../icons/book';
import Button from './button';
import Subtitle from './subtitle';

type CardProps = {
    title: string;
    content: string;
    routeShow: string;
    children: React.ReactNode;
    disabled?: boolean;
    isKuis?: boolean;
};
export default function Card({ title, content, children, routeShow, disabled = false, isKuis = false }: CardProps) {
    const handleKuisStart = () => {
        Swal.fire({
            title: 'Mulai Kuis',
            text: 'Apakah anda yakin ingin memulai kuis ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit(routeShow);
            }
        });
    };

    return (
        <div className="space-y-4 rounded-lg bg-white p-3">
            <span className="*:text-primary flex items-center gap-3">
                <Book />
                <p className="text-lg capitalize">{content}</p>
            </span>
            <Subtitle subtitle={title} />
            <div className="space-y-2 *:text-slate-400">{children}</div>
            {isKuis ? (
                <Button className="w-full" disabled={disabled} onClick={handleKuisStart}>
                    Mulai {content} <ArrowRight />
                </Button>
            ) : disabled ? (
                <Button className="w-full" disabled>
                    Detail {content} <ArrowRight />
                </Button>
            ) : (
                <Link href={routeShow}>
                    <Button className="w-full">
                        Detail {content} <ArrowRight />
                    </Button>
                </Link>
            )}
        </div>
    );
}
