import { OptionItem } from '@/types';
import Select, { StylesConfig } from 'react-select';
import InputError from './ui/input-error';

type InputSelectProps = {
    id: string;
    label: string;
    placeholder?: string;
    error?: string;
    value?: string | number | (string | number)[];
    onChange?: (e: any) => void;
    required?: boolean;
    disabled?: boolean;
    multi?: boolean;
    options?: OptionItem[];
};

export default function InputSelect({
    id,
    label,
    placeholder,
    multi = false,
    options,
    error,
    value,
    onChange,
    required = false,
    disabled = false,
}: InputSelectProps) {
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

    const getSelectedValue = () => {
        if (multi) {
            if (Array.isArray(value)) {
                return options?.filter((option) => value.includes(option.value));
            }
            return [];
        } else {
            return options?.find((option) => option.value == value) || null;
        }
    };

    return (
        <div>
            <label htmlFor={id} className="text-lg capitalize">
                {label}
                {required && <span className="text-danger font-medium">*</span>}
            </label>
            <Select
                id={id}
                styles={styles}
                placeholder={placeholder}
                className="basic-single"
                classNamePrefix="select"
                isSearchable
                isMulti={multi}
                options={options}
                value={getSelectedValue()}
                onChange={onChange}
                required={required}
                isDisabled={disabled}
            />
            <InputError message={error} />
        </div>
    );
}
