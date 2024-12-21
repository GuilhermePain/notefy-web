import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { FaChevronLeft } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { toast } from "sonner";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import LoadingSpinner from "../../components/LoadingSpinner";
import FloatButton from "../../components/FloatButton";
import { IoSend } from "react-icons/io5";
import Input from "../../components/Input";
import { IoCopy } from "react-icons/io5";

const MyNotesWrite = () => {
    const token = Cookies.get('token');
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteBody, setNoteBody] = useState<string>("");
    const [originalNoteBody, setOriginalNoteBody] = useState<string>("");
    const [isOpenModalCheckIfChangesWereSaved, setIsOpenModalCheckIfChangesWereSaved] = useState<boolean>(false);
    const [isOpenModalAi, setIsOpenModalAi] = useState<boolean>(false);
    const [promptAi, setPromptAi] = useState<string>("");
    const [conversa, setConversa] = useState([
        {
            remetente: "usuário",
            mensagem: "Crie um treino para iniciante na academia."
        },
        {
            remetente: "assistente",
            mensagem: "Claro, aqui está um treino:"
        },
        {
            remetente: "usuário",
            mensagem: "Crie um treino para iniciante na academia. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            remetente: "assistente",
            mensagem: "Claro, aqui está um treino: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const path = window.location.pathname.split("/");
    const id = path[2];

    const getNote = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNote();
    }, []);

    const normalizeContent = (content: string) => {
        return content.replace(/<p><br><\/p>/g, "").trim();
    };

    const checkIfChangesWereSaved = () => {
        const normalizedNoteBody = normalizeContent(noteBody);
        const normalizedOriginalBody = normalizeContent(originalNoteBody);

        if (normalizedNoteBody === normalizedOriginalBody || normalizedNoteBody === "") {
            navigate("/minhasnotas");
        } else {
            setIsOpenModalCheckIfChangesWereSaved(true);
        }
    };

    const saveNote = async () => {
        setLoading(true);
        const body = noteBody;

        try {
            await axios.patch(`https://conservative-violette-guilhermerocha-4c0b4e6a.koyeb.app/notes/${id}`, { body }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Nota salva com sucesso!");

            setOriginalNoteBody(body);
            setIsOpenModalCheckIfChangesWereSaved(false);
            console.log(setConversa);
            
        } catch (error) {
            toast.error("Erro ao salvar nota!");
            console.log("Erro ao salvar nota", error);
        } finally {
            setLoading(false);
        }
    };

    const discardChanges = () => {
        setIsOpenModalCheckIfChangesWereSaved(false);
        navigate("/minhasnotas");
    };

    return (
        <div className="w-full h-full">
            <Header
                buttonLeft={<Button onClick={checkIfChangesWereSaved} iconLeft={<FaChevronLeft size={12} />} text="Voltar" padding="px-3 py-1" />}
                buttonRight={<Button type="primary" onClick={saveNote} padding="px-4 py-2" text={<FaSave />} />}
                title={noteTitle}
            />

            <TextEditor
                value={noteBody}
                onChange={setNoteBody}
            />

            <FloatButton
                text="✨"
                onClick={() => setIsOpenModalAi(true)}
            />

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
            {
                isOpenModalAi && (
                    <Modal>
                        <h2 className="text-center text-xl font-bold">Assistente de notas✨</h2>
                        <div className="w-full h-[350px] flex flex-col gap-2 overflow-y-auto">
                            {
                                conversa.length === 0 ? (
                                    <p className="text-center">Crie notas e organize ideias rapidamente.</p>
                                ) : (
                                    conversa.map((mensagem) => (
                                        <div className={`${mensagem.remetente === "assistente" ? "self-start border-2 border-[#6F3AB6]" : "self-end bg-[#6F3AB6] text-white"} max-w-[70%] h-auto rounded-md p-2 break-words`}>
                                            <p className="font-bold">{mensagem.remetente}</p>
                                            <p className="text-[0.9rem]">{mensagem.mensagem}</p>
                                            {
                                                mensagem.remetente === "assistente" && (
                                                    <div className="flex gap-1 mt-2">
                                                        <Button
                                                            type="primary"
                                                            text={<IoCopy />}
                                                            padding="p-1"
                                                        />
                                                        <Button
                                                            type="primary"
                                                            text="Inserir na nota"
                                                            size="text-[0.9rem]"
                                                            padding="p-1"

                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                )
                            }
                        </div>
                        <div className="flex justify-center gap-2">
                            <Input
                                type="text"
                                value={promptAi}
                                onChange={(e) => setPromptAi(e.target.value)}
                                placeholder="Ex: Receita para família"
                                width="h-[40px]"
                            />
                            <Button
                                type="primary"
                                text={<IoSend />}
                                width="w-[40px] h-[40px]"
                            />
                        </div>
                        {/* <div className="flex justify-between items-center gap-4">
                                <Button
                                    text="Fechar"
                                    padding="py-1 px-6"

                                />
                                <Button
                                    type="primary"
                                    text="Criar"
                                    padding="py-1 px-6"

                                />
                            </div> */}
                    </Modal>
                )
            }
            {
                loading && (<LoadingSpinner />)
            }
        </div>
    );
};

export default MyNotesWrite;
