import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type?: "button" | "submit";
    variant?: "primary" | "danger" | "warning" | "success";
}

export default function Button({ children, variant, type = "button", className, ...props }: ButtonProps) {
    const buttonVariant = cva("cursor-pointer px-4 py-2 rounded-md capitalize w-full disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center gap-1", {
        variants: {
            variant: {
                primary: "bg-primary text-white",
                danger: "bg-danger text-white",
                warning: "bg-warning text-white",
                success: "bg-success text-white",
            },
        },
        defaultVariants: {
            variant: "primary"
        }
    })

    return (
        <button type={type} className={cn(buttonVariant({variant, className}))} {...props}>{children}</button>
    );
}
