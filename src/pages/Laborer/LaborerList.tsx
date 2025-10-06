import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LaborerFilter from "./LaborerFilter";
import { useLaborerList } from "./useLaborerList";

const LaborerList = () => {
  const [filters, setFilters] = useState({
    job: "",
    ward: "",
    age: "",
    gender: "",
    salary: "",
    workingTime: "",
  });

  const { laborers, loading, error } = useLaborerList(filters);
  const navigate = useNavigate();

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  function handleClick(laborer: any): void {
    navigate(`/laborer/${laborer.id}`);
  }

  let content;
  if (loading) {
    content = <Skeleton />;
  } else if (error) {
    content = <div>Lỗi tải danh sách lao động.</div>;
  } else if (!laborers.length) {
    content = <div>Không có lao động phù hợp.</div>;
  } else {
    content = (
      <div className="flex flex-col gap-2">
        {laborers.map((laborer: any) => (
          <Card
            key={laborer.id}
            thumbnail={laborer.thumbnail}
            onClick={() => handleClick(laborer)}
          >
            <div className="card-title">{laborer.fullname}</div>
            <div className="card-subtitle">Ngành nghề: {Array.isArray(laborer.laborer) ? laborer.laborer.join(", ") : (laborer.laborer || "Chưa cập nhật")}</div>
            <div className="card-meta">Nơi làm việc: {laborer.location || "Thỏa thuận"}</div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <LaborerFilter filters={filters} onFilterChange={handleFilterChange} />
      {content}
    </>
  );
};

export default LaborerList;
