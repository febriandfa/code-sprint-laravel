import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';

type QuillEditorProps = {
    id: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

export default function QuillEditor({ id, value, placeholder, onChange }: QuillEditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillInstance = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: placeholder,
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'blockquote', 'code-block'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['clean'],
                    ],
                },
            });

            quillInstance.current.on('text-change', () => {
                const content = quillInstance.current?.root.innerHTML || '';
                onChange(content);
            });
        }
    }, [onChange, placeholder]);

    useEffect(() => {
        console.log('value', value);
        if (quillInstance.current) {
            const currentContent = quillInstance.current.root.innerHTML;
            if (currentContent !== value) {
                quillInstance.current.root.innerHTML = value;
            }
        }
    }, [value]);

    return (
        <div
            id={id}
            ref={editorRef}
            style={{
                height: '10rem',
                border: '1px solid rgb(229, 231, 235)',
            }}
        />
    );
}
