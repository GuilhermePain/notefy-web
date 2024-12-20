interface ICardNotesProps {
    id: string;
    title: string;
    onClick: () => void;
}

const CardNotes = ({ title, id, onClick }: ICardNotesProps) => {
    return (
        <div
            key={id}
            onClick={onClick}
            className="
                border-2 text-xl p-5 text-center w-full h-[120px] flex items-center justify-center rounded-2xl transition-all border-[#6E3AB6]
                hover:bg-[#6E3AB6] cursor-pointer hover:text-white
            "
        >
            <h3 className="truncate">{title}</h3>
        </div>
    )
}

export default CardNotes;