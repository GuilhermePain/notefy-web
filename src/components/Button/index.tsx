interface ButtonProps {
    type?: string;
    text?: string | JSX.Element;
    width?: string;
    padding?: string;
    disabled?: boolean;
    icon?: JSX.Element;
    onClick?: () => void;
}

const Button = ({ type, text, icon, width, padding, disabled, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                    ${type === 'primary' ? 'bg-[#6F3AB6] text-white' : 'bg-transparent border-[#6F3AB6] text-[#6F3AB6] active:bg-[#6F3AB6] active:text-white'}
                     flex items-center justify-center gap-1 transition-all ${width} ${padding} border-2 border-transparent ${disabled ? 'cursor-not-allowed bg-[#6F3AB6]' : 'cursor-pointer'} rounded-md font-clabFont
                    active:bg-transparent active:border-2 active:border-[#6F3AB6] active:text-[#6F3AB6]
                `
            }
        >
            {text}{icon}
        </button>
    )
}

export default Button