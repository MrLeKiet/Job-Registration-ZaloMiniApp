import React from "react";
import { Text } from "zmp-ui";

export type InputBoxProps = {
    label: string;
    icon: React.ReactNode;
    error?: boolean;
    errorMessage?: string;
    children?: React.ReactNode;
};

const InputBox: React.FC<InputBoxProps> = ({ label, icon, error, errorMessage, children }) => (
    <div className="">
        <Text className="text-sm font-medium text-gray-600 mb-1">{label}</Text>
        <div
            className={`flex items-center h-12  bg-white ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} `}
        >
            <span className={` flex items-center ${error ? 'text-red-500' : 'text-gray-400'}`}>{icon}</span>
            {children}
        </div>
    </div>
);

export default InputBox;
