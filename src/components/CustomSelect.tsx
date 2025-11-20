import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

export interface CustomSelectProps {
    selectedLabel?: string;
    placeholder?: string;
    open?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    chevronSize?: number;
    chevronColor?: string;
    labelClassName?: string;
    labelStyle?: React.CSSProperties;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    selectedLabel,
    placeholder = "Chọn",
    open = false,
    onClick,
    className,
    style,
    chevronSize = 14,
    chevronColor = "#9ca3af",
    labelClassName,
    labelStyle,
}) => {
    const label = selectedLabel || placeholder;
    return (
        <button
            type="button"
            className={` ${className || ""}`}
            style={style}
            onClick={onClick}
            aria-haspopup="listbox"
            aria-expanded={open}
        >
            <span
                className={`whitespace-nowrap overflow-hidden text-ellipsis w-full block text-left ${labelClassName || ""}`}
                style={{ maxWidth: "100%", ...(labelStyle || {}) }}
            >
                {label}
            </span>
            <span className="ml-2 flex items-center" style={{ color: chevronColor }}>
                {open ? (
                    <ChevronUp size={chevronSize} color={chevronColor} />
                ) : (
                    <ChevronDown size={chevronSize} color={chevronColor} />
                )}
            </span>
        </button>
    );
};

export default CustomSelect;
