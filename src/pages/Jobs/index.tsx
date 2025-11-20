import React from "react";
import RecruitmentForeignersSection from "../RecruitmentForeigners/RecruitmentForeignersSection";
import JobsFilter from "./JobsFilter";
import JobsList from "./JobsList";

export default function JobsPage() {
    const [mode, setMode] = React.useState<'job' | 'foreigner'>('job');
    const [filters, setFilters] = React.useState({ job: "", ward: "", gender: "", salary: "", workingTime: "", keyword: "" });

    return (
        <div className="flex flex-col h-full">
            <JobsFilter mode={mode} setMode={setMode} filters={filters} setFilters={setFilters} />
            {mode === 'job' ? (
                <JobsList filters={filters} setFilters={setFilters} />
            ) : (
                <RecruitmentForeignersSection />
            )}
        </div>
    );
}
