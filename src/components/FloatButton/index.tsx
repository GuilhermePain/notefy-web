interface IFloatButtonProps {
    text: string | JSX.Element;
    onClick: () => void;
}

const FloatButton = ({ text, onClick }: IFloatButtonProps) => {
  return (
    <button onClick={onClick} className="bg-[#6F3AB6] fixed bottom-10 right-5 p-4 rounded-full">
        {text}
    </button>
  )
}

export default FloatButton;