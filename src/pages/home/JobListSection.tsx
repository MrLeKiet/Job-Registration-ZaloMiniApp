import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { useUrgentJobs } from "@/pages/Home/useHome";
import React from "react";
import { useNavigate } from "zmp-ui";

const JobListSection: React.FC = () => {
    const { jobs, loading, error } = useUrgentJobs();
    const navigate = useNavigate();

    const handleClick = (job: any) => {
        const id = job.id || job.jodId || job.jobId;
        if (id) {
            navigate(`/jobs/${id}`);
        } else {
            alert("Không tìm thấy id công việc!");
        }
    };

    if (loading) return (
        <div className="mx-2">
            <div className="flex items-center justify-between mb-1">
                <div className="font-lg font-bold text-primary truncate">VIỆC LÀM MỚI NHẤT</div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/jobs")}
                >
                    Xem tất cả &gt;
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => {
                    const uniqueKey = `skeleton-${i}-${Math.random().toString(36).slice(2, 11)}`;
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
    if (error) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;
    const isEmpty = !Array.isArray(jobs) || jobs.length === 0;
    return (
        <div className="mx-2">
            <div className="flex items-center justify-between mb-1">
                <div className="font-lg font-bold text-primary">VIỆC LÀM MỚI NHẤT</div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/jobs")}
                >
                    Xem tất cả &gt;
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {isEmpty ? (
                    <div className="text-center text-muted py-8 select-none font-lg">
                        Không có việc làm nào được tìm thấy.
                    </div>
                ) : (
                    jobs.map((job) => (
                        <Card
                            key={job.id || job.jodId || job.jobId}
                            thumbnail={job.thumbnail}
                            onClick={() => handleClick(job)}
                        >
                            <div className="card-title">{job.title}</div>
                            <div className="card-subtitle">Khu vực: {job.location || "Chưa cập nhật"}</div>
                            <div className="card-meta">Mức lương: {job.salary || "Thỏa thuận"}</div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobListSection;
