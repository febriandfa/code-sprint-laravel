import { cn } from '@/lib/utils';

export default function Title({ title, className }: { title: string | number; className?: string }) {
    return <h1 className={cn('text-2xl font-semibold text-gray-600', className)}>{title}</h1>;
}
