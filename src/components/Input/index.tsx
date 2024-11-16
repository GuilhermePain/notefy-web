interface IIpuntProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    width?: string;
    icon: JSX.Element;
}

const Input = ({ type, placeholder, value, onChange, width, icon }: IIpuntProps) => {
    return (
        <div className="flex shadow-lg rounded-md">
            <input
                className={`p-4 ${width} rounded-l-md outline-none`}
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