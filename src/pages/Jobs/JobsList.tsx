import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { useNavigate } from "react-router-dom";
import JobsFilter from "./JobsFilter";
import React, { useState } from "react";
import { useJobsList } from "./useJobsList";

const JobsList = () => {
  const [filters, setFilters] = useState({
    job: "",
    ward: "",
    age: "",
    gender: "",
    search: "",
    salary: "",
    workingTime: "",
  });

  const { jobs, loading, error } = useJobsList(filters);
  const navigate = useNavigate();

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  function onCardClick(job: any): void {
    navigate(`/jobs/${job.id}`);
  }


  let content;
  if (loading) {
    content = <Skeleton />;
  } else if (error) {
    content = <div>Lỗi tải danh sách việc làm.</div>;
  } else if (!jobs.length) {
    content = <div>Không có việc làm phù hợp.</div>;
  } else {
    content = (
      <div className="flex flex-col gap-2">
        {jobs.map((job: any) => (
          <Card
            key={job.id}
            thumbnail={job.thumbnail}
            onClick={() => onCardClick(job)}
          >
            <div className="card-title font-bold line-clamp-2">{job.title}</div>
            <div className="card-subtitle truncate line-clamp-2">Ngành nghề: {job.job}</div>
            <div className="card-meta truncate">Địa chỉ: {job.location}</div>
            <div className="card-meta truncate">Lương: {job.salary}</div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <JobsFilter filters={filters} onFilterChange={handleFilterChange} />
      {content}
    </>
  );
};

export default JobsList;
