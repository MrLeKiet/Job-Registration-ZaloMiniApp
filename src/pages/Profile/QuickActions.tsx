import { FileText } from "lucide-react";
import React from "react";
import ProfileRegisterLayout from "./ProfileRegisterLayout";

const QuickActions: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
    const [cvFile, setCvFile] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const handleUploadCV = () => {
        if (!cvFile && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <div className="bg-white rounded-lg">
                <button
                    onClick={handleUploadCV}
                    className="w-full flex items-center p-3 gap-3 hover:bg-gray-50 rounded-lg border border-gray-200 active:scale-95 transition-transform duration-150"
                    aria-label="Tải lên CV"
                    disabled={!!cvFile}
                >
                    <div className="w-10 h-10 bg-[#E3F2FD] text-[#1565C0] rounded-md flex items-center justify-center">
                        <FileText size={18} />
                    </div>
                    <div className="text-sm text-gray-700">Tải lên CV</div>
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => {
                        const file = e.target.files?.[0] ?? null;
                        if (file) setCvFile(file);
                    }}
                    disabled={!!cvFile}
                />
                {cvFile && (
                    <div className="flex items-center justify-between bg-gray-100 rounded px-3 py-2 mt-2">
                        <span className="text-sm font-medium text-gray-800 truncate mr-2">{cvFile.name}</span>
                        <button
                            type="button"
                            className="text-red-500 text-lg font-bold px-2 py-0.5 rounded hover:bg-red-100"
                            onClick={() => setCvFile(null)}
                            aria-label="Xóa CV"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-3">
                <ProfileRegisterLayout />
            </div>
        </div>
    );
};

export default QuickActions;
