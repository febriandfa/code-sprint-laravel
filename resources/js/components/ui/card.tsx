import { ArrowRight } from 'lucide-react';
import Book from '../icons/book';
import Button from './button';
import { Link } from '@inertiajs/react';
import Subtitle from './subtitle';

type CardProps = {
    title: string;
    content: string;
    routeShow: string;
    children: React.ReactNode;
};
export default function Card({ title, content, children, routeShow }: CardProps) {
    return (
        <div className="space-y-4 rounded-lg bg-white p-3">
            <span className="*:text-primary flex items-center gap-3">
                <Book />
                <p className="text-lg capitalize">{content}</p>
            </span>
            <Subtitle subtitle={title} />
            <div className='*:text-slate-400 space-y-2'>
                {children}
            </div>
            <Link href={routeShow}>
                <Button className="w-full">
                    Detail {content} <ArrowRight />
                </Button>
            </Link>
        </div>
    );
}
