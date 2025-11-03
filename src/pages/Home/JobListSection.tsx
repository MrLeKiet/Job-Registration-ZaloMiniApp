import Card from "@/components/Card";
import CardList from "@/components/CardList";
import SectionHeader from "@/components/SectionHeader";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import { useUrgentJobs } from "@/pages/Home/useHome";
import React from "react";
import { useNavigate } from "zmp-ui";

const JobListSection: React.FC = () => {
    const { jobs, loading, error } = useUrgentJobs();
    const navigate = useNavigate();

    if (loading) return (
        <div className="">
            <SectionHeader
                title="VIỆC LÀM MỚI NHẤT"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/jobs")}
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
    if (error) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;
    return (
        <div className="flex flex-col gap-2 mb-2">
            <SectionHeader
                title="VIỆC LÀM MỚI NHẤT"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/jobs")}
            />
            <CardList
                items={jobs}
                emptyMessage="Không có việc làm nào được tìm thấy."
                renderItem={(job) => {
                    const j = job;
                    return (
                        <Card
                            key={j.id || j.jodId || j.jobId}
                            thumbnail={j.thumbnail}
                            onClick={() => {
                                const id = j.id || j.jodId || j.jobId;
                                if (id) {
                                    navigate(`/jobs/${id}`);
                                } else {
                                    alert("Không tìm thấy id công việc!");
                                }
                            }}
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

export default JobListSection;
