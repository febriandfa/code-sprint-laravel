import { forwardRef } from 'react';
import Input from './ui/input';
import InputError from './ui/input-error';
import { InputFieldProps } from '@/types';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, type = 'text', error, ...props }, ref) => {
    return (
      <div className="relative">
        <Input id={id} label={label} type={type} {...props} ref={ref} />
        <InputError message={error} />
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
