import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, placeholder, label, type, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <React.Fragment>
            <label htmlFor={id} className="text-lg capitalize">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={type === 'password' && showPassword ? 'text' : type}
                    className={`w-full rounded-md border border-gray-200 bg-white file:mr-3 file:rounded-l-md file:bg-gray-600 file:px-4 file:py-2 file:text-white ${
                        type === 'file' ? 'cursor-pointer pr-4' : 'px-4 py-2'
                    }`}
                    placeholder={placeholder}
                    ref={ref}
                    value={type !== 'file' ? value : undefined}
                    {...props}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {type === "file" && <p className="text-sm text-slate-400">File: {value}</p>}
        </React.Fragment>
    );
});

Input.displayName = 'Input';

export default Input;
