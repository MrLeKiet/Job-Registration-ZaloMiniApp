
import Card from "@/components/Card";
import CardList from "@/components/CardList";
import SectionHeader from "@/components/SectionHeader";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useRecruitmentForeigners } from "./useHome";

const HomeRecruitmentForeignersSection: React.FC = () => {
    const { jobs, loading, error } = useRecruitmentForeigners();
    const navigate = useNavigate();

    if (loading) return (
        <div className="">
            <SectionHeader
                title="VIỆC LÀM CHO NGƯỜI NƯỚC NGOÀI"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/foreignjobs")}
            />
            <SkeletonList
                count={4}
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
    if (error) return <div className=" text-red-500">Lỗi tải dữ liệu tuyển dụng.</div>;
    return (
        <div className="flex flex-col gap-2 mb-2">
            <SectionHeader
                title="VIỆC LÀM CHO NGƯỜI NƯỚC NGOÀI"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/recruitmentForeigners")}
            />
            <CardList
                items={jobs as any[]}
                emptyMessage="Không có việc làm nào được tìm thấy."
                renderItem={(job) => {
                    const j = job as any;
                    return (
                        <Card
                            key={j.id || j.jodId || j.jobId}
                            thumbnail={j.thumbnail}
                            onClick={() => navigate(`/recruitmentForeigners/${j.id || j.jodId || j.jobId}`)}
                        >
                            <div className="card-title">{j.title}</div>
                            <div className="card-subtitle">Khu vực: {j.location || "Chưa cập nhật"}</div>
                            <div className="card-meta">Mức lương: {j.salary || "Thỏa thuận"}</div>
                        </Card>
                    );
                }}
            />
        </div>
    );
};

export default HomeRecruitmentForeignersSection;
