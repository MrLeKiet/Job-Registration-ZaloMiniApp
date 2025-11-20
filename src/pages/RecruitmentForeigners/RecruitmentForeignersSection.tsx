import Skeleton from "@/components/Skeleton";
import React from "react";
import FilterBar from "./FilterBar";
import RecruitmentCard from "./RecruitmentCard";
import { useRecruitmentJobs } from "./useRecruitmentForeigners";
import { Search } from "lucide-react";
import Searchbar from "@/components/Searchbar";

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
            <div className="p-4 flex flex-col gap-2 mb-2">
                <div className="font-lg font-bold mb-1 text-primary">
                    VIỆC LÀM NƯỚC NGOÀI MỚI NHẤT
                </div>
                {content}
            </div>
        </div>
    );
};

export default RecruitmentForeignersSection;
