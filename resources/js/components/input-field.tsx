import { InputFieldProps } from '@/types';
import InputError from './ui/input-error';
import InputText from './ui/input-text';

export default function InputField({ id, label, type = 'text', error, ...props }: InputFieldProps) {
    return (
        <div className="relative">
            <InputText id={id} label={label} type={type} {...props} />
            <InputError message={error} />
        </div>
    );
}
