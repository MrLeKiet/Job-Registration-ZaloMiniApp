import { Briefcase, Globe2, Info, Newspaper, Shield, Users } from "lucide-react";
import React from "react";
import { useNavigate } from "zmp-ui";
import SectionHeader from "@/components/SectionHeader";

const NAV_ITEMS = [
    { label: "Tin tức", icon: Newspaper, path: "/news" },
    { label: "Việc làm", icon: Briefcase, path: "/jobs" },
    { label: "Ứng viên", icon: Users, path: "/laborer" },
    { label: "Bảo hiểm thất nghiệp", icon: Shield, path: "/insurance" },
    { label: "Xuất khẩu lao động", icon: Globe2, path: "/export-labor" },
    { label: "Giới thiệu", icon: Info, path: "/about" },
];

const Navigate: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 p-4 border-y border-gray-200 border-solid">
            <SectionHeader
                title="Khám phá"

            />
            <div className="grid grid-cols-3 justify-space-between gap-3 space-y-1">
                {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
                <button
                    key={label}
                    type="button"
                    className="flex flex-col items-center gap-2 focus:outline-none"
                    onClick={() => navigate(path)}
                >
                    <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shadow-md mb-1">
                        <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs w-[70px] font-medium text-center text-gray-500 break-words">
                        {label}
                    </span>
                </button>
            ))}
            </div>
        </div>
    );
};

export default Navigate;
