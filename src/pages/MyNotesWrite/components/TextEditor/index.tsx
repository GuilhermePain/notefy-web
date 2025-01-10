import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ITextEditorProps {
    value: string;
    onChange?: (value: string) => void;
}


const TextEditor = ({ value, onChange }: ITextEditorProps) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link'],
            ['color', 'background'],
            ['script', 'formula'],
            ['code-block'],
            ['clean']
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align', 'color', 'background',
        'script', 'formula',
        'code-block'
    ];

    return (
        <ReactQuill
            theme="snow"
            formats={formats}
            modules={modules}
            value={value}
            onChange={(content) => onChange && onChange(content)}
        />
    );

}

export default TextEditor;