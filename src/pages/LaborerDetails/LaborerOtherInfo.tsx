import React from "react";
import { BadgeInfo } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";
import SectionCard from "./SectionCard";

const LaborerOtherInfo: React.FC = () => {
  const { laborer, loading, error } = useLaborerDetail();

  if (loading)
    return (
      <SectionCard title="Thông tin khác" icon={<BadgeInfo className="w-5 h-5 text-blue-500" />}>
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </SectionCard>
    );

  if (error || !laborer)
    return (
      <SectionCard title="Thông tin khác" icon={<BadgeInfo className="w-5 h-5 text-blue-500" />}>
        Không thể tải dữ liệu
      </SectionCard>
    );

  return (
    <div className="px-3 pb-5 space-y-5">
      <SectionCard title="Thông tin khác" icon={<BadgeInfo className="w-5 h-5 text-blue-500" />}>
        <div className="space-y-3 text-gray-800 text-sm">
          <p><span className="font-medium text-gray-700">Ngành nghề:</span> {laborer.desiredjobtitle || "Chưa cập nhật"}</p>
          <p><span className="font-medium text-gray-700">Vị trí mong muốn:</span> {laborer.locationjob || "Chưa cập nhật"}</p>
          <p><span className="font-medium text-gray-700">Mức lương mong muốn:</span> {laborer.desired_salary ? `${laborer.desired_salary.toLocaleString()} VND` : "Chưa cập nhật"}</p>
          <p><span className="font-medium text-gray-700">Hình thức làm việc:</span> {laborer.work_type || "Chưa cập nhật"}</p>
        </div>
      </SectionCard>
    </div>
  );
};

export default LaborerOtherInfo;
