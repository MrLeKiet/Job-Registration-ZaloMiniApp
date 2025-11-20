
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import React from 'react';
import { useNavigate } from "react-router-dom";
import LaborerFilter from "./LaborerFilter";
import { useLaborerList } from "./useLaborerList";

const LaborerList = () => {
  const [filters, setFilters] = React.useState({ job: "", ward: "", age: "", gender: "", keyword: "" });
  const { laborers, loading, error } = useLaborerList(filters);
  const navigate = useNavigate();

  function handleClick(laborer: any): void {
    navigate(`/laborer/${laborer.id}`);
  }

  if (error) {
    let errorMsg = "Đã xảy ra lỗi.";
    if (typeof error === 'string') errorMsg = error;
    else if (typeof error === 'object' && error !== null && 'message' in error) errorMsg = (error as any).message;
    return <div>Lỗi: {errorMsg}</div>;
  }
  // Client-side filter by Laborer name if keyword is present
  const filteredLaborers = Array.isArray(laborers) && filters.keyword
    ? laborers.filter(l =>
        l.fullname?.toLowerCase().includes(filters.keyword.toLowerCase())
      )
    : laborers;

  const isEmpty = !Array.isArray(filteredLaborers) || filteredLaborers.length === 0;
  let content;
  if (loading) {
    content = (
      <div className="flex flex-col gap-2 mb-2">
        {Array.from({ length: 3 }).map((_, i) => {
          const uniqueKey = `skeleton-${Date.now()}-${i}`;
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
    );
  } else if (isEmpty) {
    content = (
      <div className="text-center text-muted py-8 select-none font-lg">
        Không có ứng viên nào được tìm thấy.
      </div>
    );
  } else {
    content = filteredLaborers.map((laborer) => (
      <Card
        key={laborer.id}
        thumbnail={laborer.thumbnail}
        onClick={() => handleClick(laborer)}
      >
        <div className="card-title">{laborer.fullname}</div>
        <div className="card-subtitle">Ngành nghề: {Array.isArray(laborer.job) ? laborer.job.join(", ") : (laborer.job || "Chưa cập nhật")}</div>
        <div className="card-meta">Nơi làm việc: {laborer.location || "Thỏa thuận"}</div>
      </Card>
    ));
  }
  return (
      <div className="flex flex-col h-full">
        {/* Fixed Top */}
        <div className="shrink-0">
            <LaborerFilter filters={filters} setFilters={setFilters} />
          <div className="font-lg font-bold text-primary px-4 py-2 bg-white border-b">
            Ứng viên mới nhất
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#fafafa]">
          <div className="flex flex-col pt-3 pb-3 gap-3"> {/* pb-20 to avoid navbar overlap */}
            {content}
          </div>
        </div>
      </div>
  );
};

export default LaborerList;
