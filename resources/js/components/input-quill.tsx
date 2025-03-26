import InputError from './ui/input-error';
import QuillEditor from './ui/quill-editor';

type InputQuillProps = {
    id: string;
    label: string;
    placeholder: string;
    error?: string;
    value: string;
    required?: boolean;
    onChange: (value: string) => void;
};

export default function InputQuill({ id, label, placeholder, error, value, required = false, onChange }: InputQuillProps) {
    return (
        <div>
            <label htmlFor={id} className="text-lg capitalize">
                {label}
                {required && <span className="text-danger font-medium">*</span>}
            </label>
            <QuillEditor id={id} placeholder={placeholder} value={value} onChange={onChange} />
            <InputError message={error} />
        </div>
    );
}
