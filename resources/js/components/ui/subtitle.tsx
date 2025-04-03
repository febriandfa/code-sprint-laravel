import { cn } from '@/lib/utils';

export default function Subtitle({ subtitle, className }: { subtitle: string; className?: string }) {
    return <h2 className={cn('text-xl font-medium text-gray-600', className)}>{subtitle}</h2>;
}
