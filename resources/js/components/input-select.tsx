import Select, { StylesConfig } from 'react-select';
import InputError from './ui/input-error';

type InputSelectProps = {
    id: string;
    label: string;
    placeholder?: string;
    error?: string;
    value?: string;
    onChange?: (e: any) => void;
    required?: boolean;
    options?: { value: string; label: string }[];
};

export default function InputSelect({ id, label, placeholder, options, error, value, onChange, required }: InputSelectProps) {
    const styles: StylesConfig = {
        control: (styles, { isFocused }) => ({
            ...styles,
            width: '100%',
            borderRadius: '0.375rem',
            border: `1px solid rgb(229, 231, 235)`,
            backgroundColor: 'white',
            padding: '4px 0',
            boxShadow: isFocused ? '0 0 0 2px #3b82f6' : 'none',
        }),
        menu: (styles) => ({
            ...styles,
            borderRadius: '0.375rem',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? 'rgb(59, 130, 246)' : isFocused ? 'rgb(229, 231, 235)' : 'white',
            color: isSelected ? 'white' : 'black',
            '&:active': {
                backgroundColor: 'rgb(37, 99, 235)',
            },
        }),
    };

    return (
        <div>
            <label htmlFor={id} className="text-lg capitalize">
                {label}
            </label>
            <Select
                id={id}
                styles={styles}
                placeholder={placeholder}
                className="basic-single"
                classNamePrefix="select"
                isSearchable
                options={options}
                value={options?.find((option) => option.value === value) || null}
                onChange={onChange}
                required={required}
            />
            <InputError message={error} />
        </div>
    );
}
