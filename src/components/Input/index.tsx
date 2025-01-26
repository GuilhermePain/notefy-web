interface IIpuntProps {
    type: string;
    placeholder?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    icon?: JSX.Element;
}

const Input = ({ type, placeholder, value, onChange, width, icon }: IIpuntProps) => {
    return (
        <div className={`${width} flex shadow-lg rounded-md`}>
            <input
                className={`w-full p-4 rounded-l-md outline-none`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <div className="flex items-center justify-center pr-3 bg-white rounded-r-md text-[#6F3AB6] text-2xl">
                {icon}
            </div>
        </div>
    )
}

export default Input;