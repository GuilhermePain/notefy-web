import { IoClose } from "react-icons/io5";

interface IModalProps {
    children: React.ReactNode;
    onClick: () => void; // Função para fechar o modal
}

const Modal = ({ children, onClick }: IModalProps) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center w-full h-full bg-[#0000005c] z-50"
            onClick={onClick}
        >
            <div
                className="bg-white w-[300px] h-auto rounded-xl shadow-xl p-6 relative flex flex-col items-center justify-center gap-5"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClick}
                >
                    <IoClose size={24} />
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
