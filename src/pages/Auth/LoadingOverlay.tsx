import React from "react";

const LoadingOverlay: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
        <div className="text-white text-xl font-bold">{message}</div>
    </div>
);

export default LoadingOverlay;
