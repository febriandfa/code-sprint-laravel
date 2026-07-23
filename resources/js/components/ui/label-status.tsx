import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type LabelStatusProps = {
    status: string;
    variant?: 'success' | 'info' | 'warning' | 'danger' | 'default';
    size?: 'small' | 'normal';
};

export default function LabelStatus({ status, variant, size }: LabelStatusProps) {
    const labelVariant = cva('border rounded flex items-center justify-center gap-1 py-1.5 px-3 w-fit', {
        variants: {
            variant: {
                success: 'border-success text-success bg-success-100',
                info: 'border-primary text-primary bg-primary-100',
                warning: 'border-warning text-warning bg-warning-100',
                danger: 'border-danger text-danger bg-danger-100',
                default: 'border-slate-400 text-slate-400 bg-slate-100',
            },
            size: {
                small: 'text-xs',
                normal: 'text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'normal',
        },
    });

    const dotVariant = cva('rounded-full', {
        variants: {
            variant: {
                success: 'bg-success',
                info: 'bg-primary',
                warning: 'bg-warning',
                danger: 'bg-danger',
                default: 'bg-gray-300',
            },
            size: {
                small: 'size-2',
                normal: 'size-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'normal',
        },
    });

    return (
        <span className={cn(labelVariant({ variant: variant, size: size }))}>
            <div className={cn(dotVariant({ variant: variant, size: size }))}></div>
            <p>{status}</p>
        </span>
    );
}
