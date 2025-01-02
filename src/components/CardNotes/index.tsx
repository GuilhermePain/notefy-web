import { formatData } from "../../utils/formatData";

interface ICardNotesProps {
    id: string;
    title: string;
    createdAt: string;
    onClick: () => void;
}

const CardNotes = ({ id, title, createdAt, onClick }: ICardNotesProps) => {
    return (
        <div
            key={id}
            onClick={onClick}
            className="
                 text-xl p-5 text-center w-full h-[120px] flex flex-col items-start rounded-2xl shadow-lg transition-all
                hover:bg-[#6E3AB6] cursor-pointer hover:text-white
                active:bg-[#6E3AB6] active:hover:text-white
            "
        >
            <h3 className="truncate w-full text-start">{title}</h3>
            <div className="flex flex-col text-sm items-start w-full">
                <p className="text-gray-400">Criado em</p>
                <span className="text-gray-400">{formatData(createdAt)}</span>
            </div>
        </div>
    )
}

export default CardNotes;