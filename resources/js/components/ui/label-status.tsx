import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

type LabelStatusProps = {
    status: string,
    variant?: 'success' | 'info' | 'warning' | 'danger' | 'default',
    size?: 'small' | 'normal'
}

export default function LabelStatus({status, variant, size}: LabelStatusProps) {
    const labelVariant = cva(
        'border rounded flex items-center justify-center gap-1 py-1.5 px-3 w-fit', {
            variants: {
                variant: {
                    success: 'border-success text-success',
                    info: 'border-primary text-primary',
                    warning: 'border-warning text-warning',
                    danger: 'border-danger text-danger',
                    default: 'border-gray-300 text-gray-300'
                },
                size: {
                    small: 'text-xs',
                    normal: 'text-lg'
                }
            },
            defaultVariants: {
                variant: 'default',
                size: 'normal'
            }
        }
    )

    const dotVariant = cva('rounded-full', {
        variants: {
            variant: {
                success: 'bg-success',
                info: 'bg-primary',
                warning: 'bg-warning',
                danger: 'bg-danger',
                default: 'bg-gray-300'
            },
            size: {
                small: 'size-2',
                normal: 'size-4'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'normal'
        }
    })

    return (
        <span className={cn(labelVariant({variant: variant, size: size}))}>
            <div className={cn(dotVariant({variant: variant, size: size}))}></div><p>{status}</p>
        </span>
    )
}
