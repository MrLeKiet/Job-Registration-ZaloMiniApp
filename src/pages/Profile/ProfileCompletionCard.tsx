import React from "react";

type Props = {
    percent?: number;
};

const ProfileCompletionCard: React.FC<Props> = ({ percent = 0 }) => {
    const pct = Math.max(0, Math.min(100, Math.round(percent)));

    return (
        <div className="bg-white rounded-lg p-4 shadow mb-3">
            <div className="flex items-center">
                <div>
                    <div className="text-lg font-semibold">Cập nhật hồ sơ cá nhân</div>
                    <div className="text-sm text-gray-500">Tiến độ</div>
                    <div className="text-2xl font-semibold text-[#1565C0]">{pct}%</div>
                </div>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-[#1565C0]" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
};

export default ProfileCompletionCard;
