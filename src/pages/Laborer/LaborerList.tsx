
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LaborerFilter from "./LaborerFilter";
import { useLaborerList } from "./useLaborerList";

const LaborerList = () => {
  const [filters, setFilters] = useState({ job: "", ward: "", age: "", gender: "" });
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
  const isEmpty = !Array.isArray(laborers) || laborers.length === 0;
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
    content = laborers.map((laborer) => (
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
    <>
      <LaborerFilter filters={filters} setFilters={setFilters} />
      <div className="px-4 flex flex-col gap-2 mb-2">
        <div className="font-lg font-bold mb-1 text-primary">ỨNG VIÊN MỚI NHẤT</div>
        {content}
      </div>
    </>
  );
};

export default LaborerList;
