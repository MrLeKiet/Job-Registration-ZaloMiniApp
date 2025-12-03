import Card from "@/components/Card";
import CardList from "@/components/CardList";
import SectionHeader from "@/components/SectionHeader";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
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
            <SectionHeader
                title="ỨNG VIÊN MỚI NHẤT"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/laborer")}
            />
            <SkeletonList
                count={3}
                renderSkeleton={() => (
                    <div className="flex gap-3 items-center bg-white/5 rounded p-2 w-full">
                        <Skeleton className="w-16 h-16" />
                        <div className="flex-1">
                            <Skeleton className="h-4 w-2/3 mb-2" />
                            <Skeleton className="h-3 w-1/2 mb-1" />
                            <Skeleton className="h-3 w-1/3" />
                        </div>
                    </div>
                )}
                className="flex flex-col gap-2 mb-2"
            />
        </div>
    );
    if (error)
        return (
            <div>
                Lỗi: {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
            </div>
        );
    return (
        <div className="flex flex-col gap-3 mb-2">
            <SectionHeader
                title="ỨNG VIÊN MỚI NHẤT"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/laborer")}
            />
            <CardList
                items={laborers as any[]}
                emptyMessage="Không có ứng viên nào được tìm thấy."
                renderItem={(laborer) => {
                    const l = laborer as any;
                    return (
                        <Card
                            key={l.id}
                            thumbnail={l.thumbnail}
                            onClick={() => {
                                const id = l.id || l.laboreId || l.laboreId;
                                if (id) {
                                    navigate(`/laborer/${id}`);
                                } else {
                                    alert("Không tìm thấy id công việc!");
                                }
                            }}
                        >
                            <div className="flex flex-col">
                                <div className="card-title">{l.fullname}</div>
                            <div className="card-subtitle">Ngành nghề: {Array.isArray(l.job) ? l.job.join(", ") : (l.job || "Chưa cập nhật")}</div>
                            <div className="card-meta">Nơi làm việc: {l.location || "Thỏa thuận"}</div>
                            </div>
                        </Card>
                    );
                }}
            />
        </div>
    );
};

export default LaborerSection;
