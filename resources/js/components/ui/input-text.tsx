import { InputProps } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

export default function InputText({ id, placeholder, label, type, ...props }: InputProps) {
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
                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-2"
                    placeholder={placeholder}
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
        </React.Fragment>
    );
}
