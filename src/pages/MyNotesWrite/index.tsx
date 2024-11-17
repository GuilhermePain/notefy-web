import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import Header from "../../components/Header";
import Button from "../../components/Button";
import { FaChevronLeft } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { toast } from "sonner";

const MyNotesWrite = () => {
    const token = Cookies.get('token');
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteBody, setNoteBody] = useState<string>("");
    const { quill, quillRef } = useQuill();
    const isFirstRender = useRef(true);

    const path = window.location.pathname.split("/");
    const id = path[2];

    const getNote = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = response.data;
            setNoteTitle(data.title)
            setNoteBody(data.body);
        } catch (error) {
            console.error("Erro ao buscar nota:", error);
        }
    };

    useEffect(() => {
        getNote();
    }, []);

    useEffect(() => {
        if (quill && noteBody && isFirstRender.current) {
            quill.clipboard.dangerouslyPasteHTML(noteBody);

            const length = quill.getLength();
            quill.setSelection(length - 1, 0);
            isFirstRender.current = false;
        }
    }, [quill, noteBody]);

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                const currentHTML = quill.root.innerHTML;
                setNoteBody(currentHTML);
            });
        }
    }, [quill]);

    // window.addEventListener('beforeunload', (e) => {
    //     e.preventDefault();
    // });

    const saveNote = async () => {
        const body = noteBody;

        try {
            await axios.patch(`http://localhost:3000/notes/${id}`, { body }, {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Nota salva com sucesso!");
            console.log("Nota salva com sucesso.");
        } catch (error) {
            toast.error("Erro ao salvar nota!");
            console.log("Erro ao salvar nota", error);
        }
    };

    return (
        <div className="w-full h-full">
            <Header
                link="/minhasnotas"
                buttonLeft={<FaChevronLeft />}
                buttonRight={<Button type="primary" onClick={saveNote} icon={<FaSave />} padding="px-4 py-2" />}
                title={noteTitle}
            />
            <div ref={quillRef} className="w-full h-full" />
        </div>
    );
};

export default MyNotesWrite;
