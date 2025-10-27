import { FileText } from "lucide-react";
import React from "react";
import ProfileRegisterLayout from "./ProfileRegisterLayout";

const QuickActions: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
    const handleUploadCV = () => onNavigate?.('/profile/cv');

    return (
        <div>
            <div className="bg-white rounded-lg">
                <button
                    onClick={handleUploadCV}
                    className="w-full flex items-center p-3 gap-3 hover:bg-gray-50 rounded-lg border border-gray-200 active:scale-95 transition-transform duration-150"
                    aria-label="Tải lên CV"
                >
                    <div className="w-10 h-10 bg-[#E3F2FD] text-[#1565C0] rounded-md flex items-center justify-center">
                        <FileText size={18} />
                    </div>
                    <div className="text-sm text-gray-700">Tải lên CV</div>
                </button>
            </div>
            <div className="mt-3">
                <ProfileRegisterLayout />
            </div>
        </div>
    );
};

export default QuickActions;
