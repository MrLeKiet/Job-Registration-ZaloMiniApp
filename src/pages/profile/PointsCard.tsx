import React from "react";

const PointsCard: React.FC<{ points?: number }> = ({ points = 1200 }) => {
    const nextLevel = 2000;
    const pct = Math.min(100, Math.round((points / nextLevel) * 100));
    return (
        <div className="bg-white rounded-lg p-4 shadow mb-3">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm text-gray-500">Điểm thành viên</div>
                    <div className="text-2xl font-semibold text-[#1565C0]">{points.toLocaleString()}</div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">Mốc tiếp theo</div>
                    <div className="text-sm font-medium">{nextLevel.toLocaleString()} điểm</div>
                </div>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-[#1565C0]" style={{ width: `${pct}%` }} />
            </div>
            <div className="text-sm text-gray-500 mt-2">{pct}% đến mốc tiếp theo</div>
        </div>
    );
};

export default PointsCard;
