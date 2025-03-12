import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputError from "./input-error";

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    type?: "email" | "text" | "password";
    error?: string;
};

export default function InputText({ id, placeholder, label, type = "text", error, ...props }: InputTextProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <label htmlFor={id} className="capitalize text-lg">{label}</label>
            <div className="relative">
                <input
                    id={id}
                    type={type === "password" && showPassword ? "text" : type}
                    className="border border-gray-200 rounded-md px-4 py-2 w-full bg-white"
                    placeholder={placeholder}
                    {...props}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            <InputError message={error} />
        </div>
    );
}
