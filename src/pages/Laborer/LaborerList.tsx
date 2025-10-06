import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { useNavigate } from "react-router-dom";
import { useLaborerList } from "./useLaborerList";

const LaborerList = ({ filters }: any) => {
  const { laborers, loading, error } = useLaborerList(filters);
  const navigate = useNavigate();

  if (loading) return <Skeleton />;
  if (error) return <div>Lỗi tải danh sách lao động.</div>;
  if (!laborers.length) return <div>Không có lao động phù hợp.</div>;

  return (
    <div className="flex flex-col gap-2">
      {laborers.map((item: any) => (
        <Card
          key={item.id}
          thumbnail={item.avatar}
          onClick={() => navigate(`/jobs/${item.id}`)}
        >
          <div>{item.name}</div>
          <div>{item.job}</div>
        </Card>
      ))}
    </div>
  );
};

export default LaborerList;
