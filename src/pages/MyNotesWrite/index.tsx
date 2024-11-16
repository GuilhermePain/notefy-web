import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const MyNotesWrite = () => {
    const token = Cookies.get('token');
    const [noteBody, setNoteBody] = useState<string>("");

    const path = window.location.pathname.split("/");

    const id = path[2];

    const getNote = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const data = response.data;

            console.log(data);
            
            setNoteBody(data.body);

        } catch (error) {
            console.log("Erro ao buscar nota.");
        }
    }

    useEffect(() => {
        getNote();
    }, [])
    

    return (
        <div>
            está é a nota {id}
            <textarea value={noteBody} onChange={(e) => setNoteBody(e.target.value)}></textarea>
        </div>
    )
}

export default MyNotesWrite;