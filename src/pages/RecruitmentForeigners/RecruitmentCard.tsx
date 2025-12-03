import Card from "@/components/Card";
import React from "react";
import { useNavigate } from "zmp-ui";

interface RecruitmentCardProps {
  id: string;
  title: string;
  thumbnail: string;
  company: string;
  publishdate: string;
}

const RecruitmentCard: React.FC<RecruitmentCardProps> = ({ id, title, thumbnail, company, publishdate }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recruitmentForeigners/${id}`);
  };
  return (
    <Card thumbnail={thumbnail} onClick={handleClick}>
      <div className="flex flex-col">
        <div className="card-title line-clamp-2">{title}</div>
      <div className="card-subtitle truncate line-clamp-2">{company}</div>
      <span className="card-meta truncate">Ngày đăng: {publishdate}</span>
      </div>
    </Card>
  );
};

export default RecruitmentCard;
