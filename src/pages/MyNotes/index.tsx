import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import CardNotes from "../../components/CardNotes";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { IoIosSearch } from "react-icons/io";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa6";
import { useJwt } from "react-jwt";
import Modal from "../../components/Modal";
import { MdStickyNote2 } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { toast } from "sonner";
import { nullField } from "../../utils/fieldsValidation";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IDecodedToken, INote } from "../../@types/types";

const MyNotes = () => {
    const token = Cookies.get('token');
    const { decodedToken, isExpired } = useJwt<IDecodedToken>(token || "");
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [notes, setNotes] = useState<INote[]>([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [search, setSearch] = useState<string>('');
    const [isOpenModalCreateNote, setIsOpenModalCreateNote] = useState<boolean>(false);
    const [isOpenModalUser, setIsOpenModalUser] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || isExpired) {
            navigate("/entrar");
            return;
        }

        if (decodedToken && decodedToken.sub) {
            setUserId(decodedToken.sub);
        }
    }, [decodedToken, isExpired, navigate]);

    const getUserBySession = async () => {
        try {
            const response = await axios.get(`https://conservative-violette-guilhermerocha-4c0b4e6a.koyeb.app/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserName(response.data.name);
            setUserEmail(response.data.email);
        } catch (error) {
            console.log("Erro ao buscar nome do usuário da sessão.");
        }
    }

    const getNotes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://conservative-violette-guilhermerocha-4c0b4e6a.koyeb.app/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setNotes(response.data.notes);
        } catch (error) {
            console.log("Erro ao buscar suas notas");
        } finally {
            setLoading(false);
        }
    }

    const createNotes = async () => {
        const title = noteTitle;
        const titleError = nullField(title, "Título da nota é obrigatório.");

        if (titleError) {
            setErrorMessage(titleError);
            return;
        }

        try {
            setIsOpenModalCreateNote(false);
            setLoading(true);
            const response = await axios.post('https://conservative-violette-guilhermerocha-4c0b4e6a.koyeb.app/notes/createnote', { title, body: "" }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const noteId = response.data.id;

            handleRedirect(noteId);

            toast.success("Nota criada com sucesso!");

        } catch (error) {
            toast.error("Erro ao criar nota.");
            console.log("Erro ao criar a nota");
        } finally {
            setLoading(false);
        }
    };

    const closeModalCreateNote = () => {
        setIsOpenModalCreateNote(false);
        setErrorMessage(null)
    }

    const handleRedirect = (nota: string) => {
        navigate(`/minhasnotas/${nota}`);
    }

    const logout = () => {
        Cookies.remove('token');
        window.location.href = '/minhasnotas';
    };

    useEffect(() => {
        if (userId) {
            getNotes();
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            getUserBySession();
        }
    }, [userId]);

    return (
        <div className="h-screen">
            <Header
                buttonRight={<Button onClick={() => setIsOpenModalUser(true)} type="primary" text={userName} padding="px-4 py-1" />}
            />
            <main className="flex-grow p-5">
                <div className="w-full flex justify-between items-center md:justify-end gap-2">
                    <Input
                        type="text"
                        placeholder="Buscar..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        icon={<IoIosSearch />}
                        width="w-full md:w-[300px]"
                    />
                    <Button
                        text={<FaPlus size={24} />}
                        padding="px-3 py-3"
                        type="primary"
                        onClick={() => { setIsOpenModalCreateNote(true) }}
                    />
                </div>
                {
                    notes.length > 0 ?
                        <div className="grid grid-cols-2 gap-3 w-full place-items-center mt-5 md:grid-cols-5">
                            {notes.map((notes) => (
                                <CardNotes
                                    key={notes.id}
                                    id={notes.id}
                                    title={notes.title}
                                    onClick={() => handleRedirect(notes.id)}
                                />
                            ))}
                        </div> : <p className="text-center mt-10">Nenhuma nota encontrada.</p>
                }
                {
                    loading && (<LoadingSpinner />)
                }
                {
                    isOpenModalUser && (
                        <Modal>
                            <div className="flex items-center justify-center gap-2">
                                <h2 className="text-center font-bold text-xl">{userName}</h2>
                                <Button
                                    text={<HiPencil size={18} />}
                                />
                            </div>
                            <span className="text-center">{userEmail}</span>
                            <div className="w-full flex justify-center gap-4 items-center">
                                <Button onClick={() => setIsOpenModalUser(false)} text="Fechar" padding="py-1 px-6" />
                                <Button onClick={logout} text="Sair" type="primary" padding="py-1 px-6" />
                            </div>
                        </Modal>
                    )
                }
                {isOpenModalCreateNote && (
                    <Modal>
                        <h2 className="text-center text-xl font-bold">Criar uma nota</h2>
                        <Input type="text" width="w-full" placeholder={"titulo da nota"} value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} icon={<MdStickyNote2 />} />
                        {
                            errorMessage !== null && (
                                <span className="text-red-500 text-center">
                                    {errorMessage}
                                </span>
                            )
                        }
                        <div className="w-full flex justify-center items-center gap-6">
                            <Button
                                text="Cancelar"
                                padding="py-1 px-6"
                                onClick={closeModalCreateNote}
                            />
                            <Button
                                text="Criar"
                                iconRight={<FaPlus />}
                                padding="py-1 px-6"
                                type="primary"
                                onClick={createNotes}
                            />
                        </div>
                    </Modal>
                )}
            </main>
        </div>
    )
}

export default MyNotes;