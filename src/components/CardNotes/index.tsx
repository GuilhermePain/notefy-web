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
                border-2 text-2xl p-8 text-center w-[170px] rounded-2xl transition-all border-[#6E3AB6]
                hover:bg-[#6E3AB6] hover:text-white
            "
        >
            <h3>{title}</h3>
        </div>
    )
}

export default CardNotes;