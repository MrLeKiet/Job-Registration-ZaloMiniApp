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
        <div className="flex flex-col gap-2 mb-2 p-4">
            <SectionHeader
                title="Việc làm mới nhất"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/jobs")}
            />
            <SkeletonList
                count={4}
                renderSkeleton={() => (
                    <div className="flex w-full gap-3 p-4 rounded-lg shadow border border-gray-200 bg-white">
                        <div className="flex flex-col items-center justify-center flex-shrink-0">
                            <Skeleton className="object-cover w-[80px] h-[80px] rounded" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <Skeleton className="h-5 w-3/4 mb-2 rounded" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                            <Skeleton className="h-4 w-1/3 rounded" />
                        </div>
                    </div>
                )}
                className="flex flex-col gap-3 mb-2"
            />
        </div>
    );
    if (error) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;
    return (
        <div className="flex flex-col gap-2 mb-2 p-4">
            <SectionHeader
                title="Việc làm mới nhất"
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
                            <div className="flex flex-col">
                                <div className="card-title">{j.title}</div>
                            <div className="card-subtitle">Khu vực: {j.location || "Chưa cập nhật"}</div>
                            <div className="card-meta">Mức lương: {j.salary || "Thỏa thuận"}</div>
                            </div>
                        </Card>
                    );
                }}
            />
        </div>
    );
};

export default JobListSection;
