import Cookies from "js-cookie";
import { tokenIsExpired } from "../../utils/tokenIsExpired";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import CardNotes from "../../components/CardNotes";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { IoIosSearch } from "react-icons/io";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa6";


interface INote {
    id: string;
    title: string;
    body: string;
}

const MyNotes = () => {
    const token = Cookies.get('token');
    const [notes, setNotes] = useState<INote[]>([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');

    const getNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/2', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotes(response.data.notes);
        } catch (error) {
            console.log("Erro ao buscar suas notas");
        }
    }

    const handleRedirect = (nota: string) => {
        navigate(`/minhasnotas/${nota}`);
    }

    useEffect(() => {
        tokenIsExpired(token);
        getNotes();
    }, []);

    return (
        <div>
            <Header />
            <main className="p-5">
                <div className="w-full flex justify-between items-center">
                    <Input
                        type="text"
                        placeholder="Buscar..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        icon={<IoIosSearch />}
                        width="w-[250px]"
                    />
                    <Button
                        text={<FaPlus size={24}/>}
                        padding="px-3 py-3"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full place-items-center mt-5">
                    {
                        notes.map((notes) => (
                            <CardNotes
                                id={notes.id}
                                title={notes.title}
                                onClick={() => handleRedirect(notes.id)}
                            />
                        ))
                    }
                </div>
            </main>
        </div>
    )
}

export default MyNotes;