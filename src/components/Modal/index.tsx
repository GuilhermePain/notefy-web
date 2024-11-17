interface IModalProps {
    children: React.ReactNode;
    // onClick: () => void;
}

const Modal = ({ children }: IModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-[#0000005c] z-50">
            <div className="bg-white w-[300px] h-auto rounded-xl shadow-xl p-6 flex flex-col gap-6">
                {children}
            </div>
        </div>
    )
}

export default Modal;