import { FC } from "react";

export type ButtonProps = {
    text: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="text-black bg-white hover:bg-gray-100 hover:scale-110 transition-all font-medium rounded-lg text-sm px-3.5 py-2 shadow-lg"
        >
            {text}
        </button>
    )
}

export default Button;