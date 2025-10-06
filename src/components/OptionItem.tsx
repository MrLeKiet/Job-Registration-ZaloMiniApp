import { Square, SquareCheck } from "lucide-react";
import React from "react";

interface OptionItemProps {
    selectKey: string;
    option: { label: string; value: string };
    selected: boolean;
    onChange: (key: string, value: string) => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ selectKey, option, selected, onChange }) => (
    <button
        type="button"
        key={option.value}
        className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${selected
            ? "text-blue-600 font-semibold bg-blue-50"
            : "cursor-pointer hover:bg-gray-100"
        }`}
        onClick={() => onChange(selectKey, selected ? "" : option.value)}
    >
        <span className="flex-1">{option.label}</span>
        {selected ? (
            <SquareCheck size={20} className="text-blue-600 ml-2" />
        ) : (
            <Square size={20} className="text-gray-400 ml-2" />
        )}
    </button>
);

export default OptionItem;
