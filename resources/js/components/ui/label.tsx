import { cn } from '@/lib/utils';

type LabelProps = {
    id: string;
    label: string;
    required?: boolean;
    className?: string;
};

export default function Label({ id, label, required, className }: LabelProps) {
    return (
        <label htmlFor={id} className={cn('text-lg capitalize', className)}>
            {label}
            {required && <span className="text-danger font-medium">*</span>}
        </label>
    );
}
