interface ButtonProps {
    text: string | JSX.Element
    width?: string
    padding?: string
    disabled?: boolean
}

const Button = ({ text, width, padding, disabled }: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={`
                    bg-[#6F3AB6] transition-all ${width} ${padding} border-2 border-transparent ${disabled ? 'cursor-not-allowed bg-[#6F3AB6]' : 'cursor-pointer'} text-white rounded-md font-clabFont
                    active:bg-transparent active:border-2 active:border-[#6F3AB6] active:text-[#6F3AB6]
                `
            }
        >
            {text}
        </button>
    )
}

export default Button