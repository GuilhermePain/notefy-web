import React from "react";
import { formatData } from "../../utils/formatData";
import Button from "../Button";
import { HiPencil } from "react-icons/hi2";

interface ICardNotesProps {
    id: string;
    title: string;
    createdAt: string;
    onDestination: () => void;
    onEditNoteTitle: () => void;
}

const CardNotes = ({ id, title, createdAt, onDestination, onEditNoteTitle }: ICardNotesProps) => {

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEditNoteTitle();
    };

    return (
        <div
            key={id}
            onClick={onDestination}
            className="
                 text-xl p-5 text-center w-full h-[120px] flex flex-col items-start rounded-2xl shadow-lg transition-all
                hover:bg-[#6E3AB6] cursor-pointer hover:text-white
                active:bg-[#6E3AB6] active:hover:text-white group
            "
        >
            <div className="w-full flex justify-between">
                <h3 className="truncate w-full text-start">{title}</h3>
                <Button
                    type="third"
                    size="onlyContent"
                    text={<HiPencil />}
                    onClick={() => handleEditClick}
                />
            </div>
            <div className="flex flex-col text-sm items-start w-full">
                <p className="text-gray-400 group-hover:text-white">Criado em</p>
                <span className="text-gray-400 group-hover:text-white">{formatData(createdAt)}</span>
            </div>
        </div>
    )
}

export default CardNotes;