import { cn } from '@/lib/utils';

export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('rounded-lg bg-white p-8', className)}>{children}</div>;
}
