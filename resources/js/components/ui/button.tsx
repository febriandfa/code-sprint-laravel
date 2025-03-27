import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type?: 'button' | 'submit';
    variant?: 'primary' | 'danger' | 'warning' | 'success';
    size?: 'small' | 'normal';
};

export default function Button({ children, variant, size, type = 'button', className, ...props }: ButtonProps) {
    const buttonVariant = cva(
        'cursor-pointer rounded capitalize disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center gap-1',
        {
            variants: {
                variant: {
                    primary: 'bg-primary text-white hover:bg-primary-700',
                    danger: 'bg-danger text-white hover:bg-danger-700',
                    warning: 'bg-warning text-white hover:bg-warning-700',
                    success: 'bg-success text-white hover:bg-success-700',
                },
                size: {
                    small: 'text-sm px-3 py-1',
                    normal: 'text-md px-4 py-2',
                },
            },
            defaultVariants: {
                variant: 'primary',
                size: 'normal',
            },
        },
    );

    return (
        <button type={type} className={cn(buttonVariant({ variant, size, className }))} {...props}>
            {children}
        </button>
    );
}
