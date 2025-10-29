import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useLaborer } from "./useHome";

const LaborerSection: React.FC = () => {
    const { laborers, loading, error } = useLaborer();
    const navigate = useNavigate();

    const handleClick = (laborer: any) => {
        const id = laborer.id || laborer.laboreId || laborer.laboreId;
        if (id) {
            navigate(`/laborer/${id}`);
        } else {
            alert("Không tìm thấy id công việc!");
        }
    };


    if (loading) return (
        <div className="">
            <div className="flex items-center justify-between mb-1">
                <div className="font-lg font-bold text-primary truncate">ỨNG VIÊN MỚI NHẤT</div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/laborer")}
                >
                    Xem tất cả &gt;
                </button>
            </div>
            <div className="flex flex-col gap-2 mb-2">
                {Array.from({ length: 3 }).map((_, i) => {
                    const uniqueKey = `skeleton-${Date.now()}-${i}`;
                    return (
                        <div key={uniqueKey} className="flex gap-3 items-center bg-white/5 rounded p-2 w-full">
                            <Skeleton className="w-16 h-16" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-2/3 mb-2" />
                                <Skeleton className="h-3 w-1/2 mb-1" />
                                <Skeleton className="h-3 w-1/3" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    if (error)
        return (
            <div>
                Lỗi: {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
            </div>
        );
    const isEmpty = !Array.isArray(laborers) || laborers.length === 0;
    return (
        <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center justify-between mb-1">
                <div className="font-lg font-bold text-primary">ỨNG VIÊN MỚI NHẤT</div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/laborer")}
                >
                    Xem tất cả &gt;
                </button>
            </div>
            <div className="flex flex-col gap-2 mb-2">
                {isEmpty ? (
                    <div className="text-center text-muted py-8 select-none font-lg">
                        Không có ứng viên nào được tìm thấy.
                    </div>
                ) : (
                    laborers.map((laborer) => (
                        <Card
                            key={laborer.id}
                            thumbnail={laborer.thumbnail}
                            onClick={() => handleClick(laborer)}
                        >
                            <div className="card-title">{laborer.fullname}</div>
                            <div className="card-subtitle">Ngành nghề: {Array.isArray(laborer.job) ? laborer.job.join(", ") : (laborer.job || "Chưa cập nhật")}</div>
                            <div className="card-meta">Nơi làm việc: {laborer.location || "Thỏa thuận"}</div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default LaborerSection;
