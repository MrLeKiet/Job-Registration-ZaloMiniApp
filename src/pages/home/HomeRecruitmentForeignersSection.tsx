
import Skeleton from "@/components/Skeleton";
import RecruitmentCard from "@/pages/RecruitmentForeigners/RecruitmentCard";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useRecruitmentForeigners } from "./useHome";

const HomeRecruitmentForeignersSection: React.FC = () => {
    const { jobs, loading, error } = useRecruitmentForeigners();
    const navigate = useNavigate();
    // Consistent layout with other sections
    if (loading) return (
        <div className="mx-2">
            <div className="flex items-center justify-between mb-1">
                <div className="font-lg font-bold text-primary truncate">VIỆC LÀM CHO NGƯỜI NƯỚC NGOÀI</div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/recruitment-foreigners")}
                >
                    Xem tất cả &gt;
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
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
    if (error) return <div className="mx-2 text-red-500">Lỗi tải dữ liệu tuyển dụng.</div>;
    const isEmpty = !Array.isArray(jobs) || jobs.length === 0;
    return (
        <div className="mx-2">
            <div className="flex items-center justify-between mb-1">
                <div className="font-lg font-bold text-primary">VIỆC LÀM CHO NGƯỜI NƯỚC NGOÀI</div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/enterprise")}
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
                        <RecruitmentCard
                            key={job.id}
                            id={job.id}
                            title={job.title}
                            thumbnail={job.thumbnail}
                            company={job.company}
                            publishdate={job.publishdate}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default HomeRecruitmentForeignersSection;
