
import React from "react";
import { useLocation } from "zmp-ui";
import RecruitmentCard from "../RecruitmentForeigners/RecruitmentCard";
import Searchbar from "@/components/Searchbar";
import Select from "@/components/Select";
import { useRecruitmentForeignersJobs } from "./useRecruitmentForeignersJobs";
import JobsFilter from "./JobsFilter";
import JobsList from "./JobsList";

export default function JobsPage() {
    const location = useLocation();
    const [mode, setMode] = React.useState<'job' | 'foreigner'>('job');
    // Parse query string for keyword
    const getInitialFilters = () => {
        const params = new URLSearchParams(location.search);
        return {
            job: "",
            ward: "",
            gender: "",
            salary: "",
            workingTime: "",
            keyword: params.get("keyword") || ""
        };
    };
    const [filters, setFilters] = React.useState(getInitialFilters);

    React.useEffect(() => {
        // If the URL changes (user navigates), update filters
        const params = new URLSearchParams(location.search);
        setFilters(f => ({ ...f, keyword: params.get("keyword") || "" }));
    }, [location.search]);

    // Foreigners jobs logic
    const foreigners = useRecruitmentForeignersJobs();

    return (
        <div className="flex flex-col h-full">
            <JobsFilter mode={mode} setMode={setMode} filters={filters} setFilters={setFilters} />
            {mode === 'job' ? (
                <JobsList filters={filters} setFilters={setFilters} />
            ) : (
                <div className="flex flex-col gap-2 p-4 mb-2">
                    {foreigners.loading ? (
                        <div>
                            <div className="flex flex-col gap-2 mb-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex gap-3 items-center bg-white/5 rounded p-2 w-full">
                                        <div className="w-16 h-16 bg-gray-200 rounded" />
                                        <div className="flex-1">
                                            <div className="h-4 w-2/3 mb-2 bg-gray-200 rounded" />
                                            <div className="h-3 w-1/2 mb-1 bg-gray-200 rounded" />
                                            <div className="h-3 w-1/3 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : foreigners.jobs.length > 0 ? (
                        <ul className="space-y-3">
                            {foreigners.jobs.map((job: any) => (
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
                    ) : (
                        <p>Không có dữ liệu tuyển dụng.</p>
                    )}
                </div>
            )}
        </div>
    );
}
