import { cn } from '@/lib/utils';

export default function Title({ title, className }: { title: string | number; className?: string }) {
    return <h1 className={cn('text-xl font-semibold text-gray-700', className)}>{title}</h1>;
}
