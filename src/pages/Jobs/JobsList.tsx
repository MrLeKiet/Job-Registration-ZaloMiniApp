import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobsList } from "./useJobsList";

const JobsList = ({ filters, setFilters }) => {
  const { jobs, loading, error } = useJobsList(filters);
  const navigate = useNavigate();

  function handleClick(job: any): void {
    navigate(`/jobs/${job.id}`);
  }

  if (error) {
    let errorMsg = "Đã xảy ra lỗi tải việc làm.";
    if (typeof error === "string") errorMsg = error;
    else if (typeof error === "object" && error !== null && "message" in error)
      errorMsg = (error as any).message;
    return <div className="text-center text-muted py-8 select-none font-lg">Lỗi: {errorMsg}</div>;
  }

  const isEmpty = !Array.isArray(jobs) || jobs.length === 0;
  let content;
  if (loading) {
    content = (
      <SkeletonList
        count={3}
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
    );
  } else if (isEmpty) {
    content = (
      <div className={`flex flex-col items-center justify-center py-6 px-4 text-center select-none `}>
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Briefcase className="w-10 h-10 text-gray-400" />
        </div>

        <p className="text-lg font-medium text-gray-700 mb-1">
          không có việc làm nào được tìm thấy.
        </p>
        <p className="text-sm text-gray-500">
          Hãy thử tìm kiếm hoặc quay lại sau
        </p>
      </div>
    );
  } else {
    content = jobs.map((job: any) => (
      <Card
        key={job.id}
        thumbnail={job.thumbnail}
        onClick={() => handleClick(job)}
      >
        <div className="card-title font-bold line-clamp-2">{job.title}</div>
        <div className="card-meta truncate">Địa chỉ: {job.location || "Thỏa thuận"}</div>
        <div className="card-meta truncate">Lương: {job.salary || "Thỏa thuận"}</div>
      </Card>
    ));
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="font-lg font-bold mb-1 text-primary">
        VIỆC LÀM MỚI NHẤT
      </div>
      {content}
    </div>
  );
};

export default JobsList;
