import Skeleton from "@/components/Skeleton";
import React from "react";
import FilterBar from "./FilterBar";
import RecruitmentCard from "./RecruitmentCard";
import { useRecruitmentJobs } from "./useRecruitmentForeigners";

const RecruitmentForeignersSection: React.FC = () => {
    const {
        search,
        setSearch,
        selectedFilter,
        setSelectedFilter,
        jobs,
        loading
    } = useRecruitmentJobs();

    let content: React.ReactNode;
    if (loading) {
        content = (
            <div>
                <div className="flex flex-col gap-2 mb-2">
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
    } else if (jobs.length > 0) {
        content = (
            <ul className="space-y-3">
                {jobs.map((job) => (
                    <RecruitmentCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        thumbnail={job.thumbnail}
                        company={job.company}
                        publishdate={job.publishdate}
                    />
                ))}
            </ul>
        );
    } else {
        content = <p>Không có dữ liệu tuyển dụng.</p>;
    }

    return (
        <div>
            <div className="flex flex-col gap-2 mb-2 sticky top-0 z-30 bg-white p-2 shadow-sm">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm việc làm..."
                        className="bg-white h-8 w-full rounded-lg px-3 border border-gray-300 text-sm transition focus:outline-none"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {loading && (
                        <span className="absolute right-3 top-2 text-xs text-blue-600 animate-pulse">Đang tìm...</span>
                    )}
                </div>
                <div className="mb-4">
                    <FilterBar
                        value={selectedFilter}
                        onChange={setSelectedFilter}
                        placeholder="Chọn doanh nghiệp"
                    />
                </div>
            </div>
            {content}
        </div>
    );
};

export default RecruitmentForeignersSection;
