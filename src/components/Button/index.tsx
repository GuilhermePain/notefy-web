import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
    base: 'bg-[#6F3AB6] text-white border-2 border-transparent active:bg-transparent active:border-[#6F3AB6] active:text-[#6F3AB6] rounded-md font-clabFont flex items-center justify-center gap-1 transition-all group px-4 py-1',
    variants: {
        buttonType: {
            secondary: 'bg-transparent border-[#6F3AB6] border-2 text-[#6F3AB6] active:bg-[#6F3AB6] active:text-white',
            third: 'bg-transparent text-[#6F3AB6] group-hover:text-white'
        },
        size: {
            small: 'px-2 py-1',
            large: 'px-6 py-1',
            square: 'px-4 py-4',
            onlyContent: 'p-1'
        }
    }
});

type ButtonType = VariantProps<typeof button>['buttonType'];
type ButtonSize = VariantProps<typeof button>['size'];

interface IButtonProps {
    type?: ButtonType;
    text?: string | JSX.Element;
    size?: ButtonSize;
    disabled?: boolean;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    onClick?: () => void;
}

const Button = ({ type, text, size, iconLeft, iconRight, disabled, onClick }: IButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={button({ buttonType: type, size })}
        >
            {iconLeft}{text}{iconRight}
        </button>
    )
}

export default Button;