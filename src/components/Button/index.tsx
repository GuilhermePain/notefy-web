interface ButtonProps {
    type?: string;
    text?: string | JSX.Element;
    width?: string;
    position?: string;
    rounded?: string;
    padding?: string;
    disabled?: boolean;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    onClick?: () => void;
}

const Button = ({ type, text, iconLeft, iconRight, width, rounded,position, padding, disabled, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={
                `
                    ${type === 'primary' ? 'bg-[#6F3AB6] text-white border-2 border-transparent active:bg-transparent active:border-[#6F3AB6] active:text-[#6F3AB6]' : 'bg-transparent border-[#6F3AB6] border-2 text-[#6F3AB6] active:bg-[#6F3AB6] active:text-white'}
                     flex items-center justify-center gap-1 transition-all ${width} ${padding} ${disabled ? 'cursor-not-allowed bg-[#6F3AB6]' : 'cursor-pointer'} ${rounded} ${position} left rounded-md font-clabFont
                    
                `
            }
        >
            {iconLeft}{text}{iconRight}
        </button>
    )
}

export default Button;