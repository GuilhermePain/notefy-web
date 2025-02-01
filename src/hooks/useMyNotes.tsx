import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useJwt } from "react-jwt";
import { toast } from "sonner";
import { nullField } from "../utils/fieldsValidation";
import { INote } from "../@types/types";
import useToken from "./useToken";

const useMyNotes = () => {

    const { decodedToken, isExpired } = useToken();

    const token = Cookies.get('token');
    // const { decodedToken, isExpired } = useJwt<IToken>(token || "");
    // const [userId, setUserId] = useState<string | null>(null);
    const userId = decodedToken?.sub || "";
    const [userName, setUserName] = useState<string>('');
    const [userNameEdited, setUserNameEdited] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [notes, setNotes] = useState<INote[]>([]);
    const [noteTitle, setNoteTitle] = useState<string>('');
    const [isOpenModalCreateNote, setIsOpenModalCreateNote] = useState<boolean>(false);
    const [isOpenModalUser, setIsOpenModalUser] = useState<boolean>(false);
    const [isOpenModalEditNoteTitle, setIsOpenModalEditNoteTitle] = useState<boolean>(false);
    const [isOpenInputEditUsername, setIsOpenInputEditUsername] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

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
            console.log(response.data.notes);

        } catch (error) {
            console.log("Erro ao buscar suas notas");
        } finally {
            setLoading(false);
        }
    };

    const createNotes = async () => {
        const title = noteTitle;
        const titleError = nullField(title, "Título da nota é obrigatório.");

        if (titleError) {
            setErrorMessage(titleError);
            return;
        }

        setErrorMessage("");

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

    const handleRedirect = (nota: string) => {
        navigate(`/minhasnotas/${nota}`);
    }

    const logout = () => {
        Cookies.remove('token');
        window.location.href = '/minhasnotas';
    };

    const editUserName = async () => {
        let name = userNameEdited;
        const nameError = nullField(name, "O novo nome é obrigatório.");

        if (nameError) {
            setErrorMessage(nameError);
            return;
        }

        setErrorMessage("");

        try {
            setIsOpenModalUser(false);
            setLoading(true);
            await axios.patch(`https://conservative-violette-guilhermerocha-4c0b4e6a.koyeb.app/users/${userId}`, {
                name
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Nome editado com sucesso!');
            console.log('Nome editado com sucesso!');
        } catch (error) {
            toast.error('Erro ao editar nome.');
            console.log('Erro ao editar nome', error);
            setIsOpenModalUser(true);
            setLoading(false);
        } finally {
            setLoading(false);
            setIsOpenInputEditUsername(false);
            setIsOpenModalUser(false);
        }
    };

    const handleCloseModalEditUserName = () => {
        setIsOpenInputEditUsername(false);
        setErrorMessage("");
    };

    return {
        token,
        decodedToken,
        isExpired,
        userId,
        // setUserId,
        userName,
        setUserName,
        userNameEdited,
        setUserNameEdited,
        userEmail,
        setUserEmail,
        notes,
        setNotes,
        noteTitle,
        setNoteTitle,
        isOpenModalCreateNote,
        setIsOpenModalCreateNote,
        isOpenModalUser,
        setIsOpenModalUser,
        isOpenModalEditNoteTitle,
        setIsOpenModalEditNoteTitle,
        isOpenInputEditUsername,
        setIsOpenInputEditUsername,
        errorMessage,
        setErrorMessage,
        loading,
        setLoading,
        getUserBySession,
        getNotes,
        createNotes,
        handleRedirect,
        logout,
        editUserName,
        handleCloseModalEditUserName
    }
}

export default useMyNotes