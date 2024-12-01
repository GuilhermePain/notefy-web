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
import Modal from "../../components/Modal";

const MyNotesWrite = () => {
    const token = Cookies.get('token');
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteBody, setNoteBody] = useState<string>("");
    const { quill, quillRef } = useQuill();
    const isFirstRender = useRef(true);
    const [noteChanges, setNoteChanges] = useState<string | null>(null);
    const [originalNoteBody, setOriginalNoteBody] = useState<string>("");
    const [isOpenModalCheckIfChangesWereSaved, setIsOpenModalCheckIfChangesWereSaved] = useState<boolean>(false);

    const path = window.location.pathname.split("/");
    const id = path[2];

    const getNote = async () => {
        try {
            const response = await axios.get(`https://conservative-violette-guilhermerocha-4c0b4e6a.koyeb.app/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = response.data;
            setNoteTitle(data.title);
            setNoteBody(data.body);
            setOriginalNoteBody(data.body);
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
                setNoteChanges(currentHTML);
            });
        }
    }, [quill]);

    const checkIfChangesWereSaved = () => {
        const normalizeContent = (content: string) => {
            return content.replace(/<p><br><\/p>/g, "").trim();
        };

        if (normalizeContent(noteChanges || "") !== normalizeContent(originalNoteBody)) {
            setIsOpenModalCheckIfChangesWereSaved(true);
        } else {
            window.location.href = "/minhasnotas";
        }
    };


    const saveNote = async () => {
        const body = noteBody;

        try {
            await axios.patch(`https://conservative-violette-guilhermerocha-4c0b4e6a.koyeb.app/notes/${id}`, { body }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Nota salva com sucesso!");

            // Atualizar o estado original após salvar
            setOriginalNoteBody(body);
            setNoteChanges(body);
            setIsOpenModalCheckIfChangesWereSaved(false);
        } catch (error) {
            toast.error("Erro ao salvar nota!");
            console.log("Erro ao salvar nota", error);
        }
    };


    const discardChanges = () => {
        setIsOpenModalCheckIfChangesWereSaved(false);
        window.location.href = "/minhasnotas"
    };

    return (
        <div className="w-full h-full">
            <Header
                buttonLeft={<Button onClick={checkIfChangesWereSaved} iconLeft={<FaChevronLeft size={12} />} text="Voltar" padding="px-3 py-1" />}
                buttonRight={<Button type="primary" onClick={saveNote} padding="px-4 py-2" text={<FaSave />} />}
                title={noteTitle}
            />
            <div ref={quillRef} className="w-full h-full" />

            {isOpenModalCheckIfChangesWereSaved && (
                <Modal>
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold text-xl text-center">Você tem alterações não salvas</h2>
                        <div className="flex gap-4 mt-4">
                            <Button text="Descartar" onClick={discardChanges} padding="px-6 py-1" />
                            <Button text="Salvar" type="primary" padding="px-6 py-1" onClick={saveNote} />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MyNotesWrite;
