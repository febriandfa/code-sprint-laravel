import InputError from './ui/input-error';
import QuillEditor from './ui/quill-editor';

type InputQuillProps = {
    id: string;
    label: string;
    placeholder: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
};

export default function InputQuill({ id, label, placeholder, error, value, onChange }: InputQuillProps) {
    return (
        <div>
            <label htmlFor={id} className="text-lg capitalize">
                {label}
            </label>
            <QuillEditor id={id} placeholder={placeholder} value={value} onChange={onChange} />
            <InputError message={error} />
        </div>
    );
}
