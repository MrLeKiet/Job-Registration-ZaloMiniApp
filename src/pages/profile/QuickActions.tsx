import { Bell, Calendar, User } from "lucide-react";
import React from "react";

type Action = {
    id: string;
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
};

const QuickActions: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
    const actions: Action[] = [
        { id: "edit", title: "Chỉnh sửa", icon: <User size={18} />, onClick: () => onNavigate?.("/profile/edit") },
        { id: "history", title: "Lịch sử", icon: <Calendar size={18} />, onClick: () => onNavigate?.("/profile/history") },
    { id: "notifications", title: "Thông báo", icon: <Bell size={18} />, onClick: () => onNavigate?.("/notifications") },
    ];

    return (
        <div className="bg-white rounded-lg mb-3 pt-3">
            <div className="grid grid-cols-3 gap-3">
                {actions.map((a) => (
                    <button
                        key={a.id}
                        onClick={a.onClick}
                        className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200 aspect-square"
                        aria-label={a.title}
                    >
                        <div className="w-10 h-10 bg-[#E3F2FD] text-[#1565C0] rounded-md flex items-center justify-center mb-2">
                            {a.icon}
                        </div>
                        <div className="text-sm text-gray-700">{a.title}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
