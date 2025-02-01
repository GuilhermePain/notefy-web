import { useEffect } from "react";
import Header from "../../components/Header";
import CardNotes from "../../components/CardNotes";
import Input from "../../components/Input";
import { IoIosSearch } from "react-icons/io";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../components/Modal";
import { MdStickyNote2 } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IoLogOut } from "react-icons/io5";
import useMyNotes from "../../hooks/useMyNotes";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
    const navigate = useNavigate();

    const { token,
        decodedToken,
        isExpired,
        userId,
        // setUserId,
        userName,
        userNameEdited,
        setUserNameEdited,
        userEmail,
        notes,
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
        loading,
        getUserBySession,
        getNotes,
        createNotes,
        handleRedirect,
        logout,
        editUserName,
        handleCloseModalEditUserName } = useMyNotes();

    // useEffect(() => {
    //     if (!token || isExpired) {
    //         navigate("/entrar");
    //         return;
    //     }
    //     if (decodedToken && decodedToken.sub) {
    //         setUserId(decodedToken.sub);
    //     }
    // }, [decodedToken, isExpired, navigate]);

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
                buttonRight={<Button onClick={() => setIsOpenModalUser(true)} text={userName} />}
            />
            <main className="flex-grow p-5">
                <div className="w-full flex justify-between items-center md:justify-end gap-2">
                    <Input
                        type="text"
                        placeholder="Buscar..."
                        value={noteTitle}
                        icon={<IoIosSearch />}
                        width="w-full md:w-[300px]"
                    />
                    <Button
                        text={<FaPlus size={22} />}
                        size="square"
                        onClick={() => { setIsOpenModalCreateNote(true) }}
                    />
                </div>
                {
                    notes.length > 0 ?
                        <div className="flex flex-col md:grid md:grid-cols-5 gap-3 w-full md:place-items-center mt-5">
                            {notes.map((notes) => (
                                <CardNotes
                                    key={notes.id}
                                    id={notes.id}
                                    title={notes.title}
                                    createdAt={notes.createdAt}
                                    onDestination={() => handleRedirect(notes.id)}
                                    onEditNoteTitle={() => setIsOpenModalEditNoteTitle(true)}
                                />
                            ))}
                        </div> : <p className="text-center mt-10">Nenhuma nota encontrada.</p>
                }
                {
                    loading && (<LoadingSpinner />)
                }
                {
                    isOpenModalUser && (
                        <Modal onClick={() => setIsOpenModalUser(false)}>
                            <div className="flex flex-col items-center justify-center gap-2">
                                {
                                    !isOpenInputEditUsername && (
                                        <>
                                            <div className="flex gap-1">
                                                <h2 className="text-center font-bold text-xl">{userName}</h2>
                                                <Button
                                                    type="third"
                                                    size="onlyContent"
                                                    text={<HiPencil size={18} />}
                                                    onClick={() => setIsOpenInputEditUsername(true)}
                                                />
                                            </div>
                                            <span className="text-center">{userEmail}</span>
                                            <Button onClick={logout} text="Sair" iconRight={<IoLogOut />} />
                                        </>
                                    )
                                }
                                {
                                    isOpenInputEditUsername && (
                                        <>
                                            <h2 className="text-center font-bold text-xl">Editar nome</h2>
                                            <Input
                                                type="text"
                                                placeholder="Digite seu novo nome..."
                                                value={userNameEdited}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserNameEdited(e.target.value)}
                                            />
                                            {
                                                errorMessage !== null && (
                                                    <span className="text-red-500 text-center">
                                                        {errorMessage}
                                                    </span>
                                                )
                                            }
                                            <div className="flex gap-4 mt-2">
                                                <Button
                                                    text="Cancelar"
                                                    type="secondary"
                                                    onClick={handleCloseModalEditUserName}
                                                />
                                                <Button
                                                    text="Editar"
                                                    iconRight={<HiPencil />}
                                                    onClick={() => editUserName()}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </Modal>
                    )
                }
                {isOpenModalCreateNote && (
                    <Modal onClick={() => setIsOpenModalCreateNote(false)}>
                        <h2 className="text-center text-xl font-bold">Criar uma nota</h2>
                        <Input type="text" width="w-full" placeholder={"Título da nota..."} value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} icon={<MdStickyNote2 />} />
                        {
                            errorMessage !== null && (
                                <span className="text-red-500 text-center">
                                    {errorMessage}
                                </span>
                            )
                        }
                        <Button
                            text="Criar"
                            iconRight={<FaPlus />}
                            onClick={createNotes}
                        />
                    </Modal>
                )}
                {
                    isOpenModalEditNoteTitle && (
                        <Modal onClick={() => setIsOpenModalEditNoteTitle(false)}>
                            <h1>Olá</h1>
                        </Modal>
                    )
                }
            </main>
        </div>
    )
}

export default MyNotes;