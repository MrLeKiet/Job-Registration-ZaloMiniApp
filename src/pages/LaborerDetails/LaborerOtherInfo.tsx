import Skeleton from "@/components/Skeleton";
import { BadgeInfo } from "lucide-react";
import React from "react";
import SectionCard from "./SectionCard";
import { useLaborerDetail } from "./useLaborerDetails";

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
        <div className="space-y-6 px-2 pb-6">
            <SectionCard title="Thông tin khác" icon={<BadgeInfo className="w-5 h-5 text-blue-500" />}> 
                <div className=" rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-800 text-base">
                    <div><span className="font-semibold text-gray-700">Ngành nghề:</span> <span>{laborer.desiredjobtitle || "Chưa cập nhật"}</span></div>
                    <div><span className="font-semibold text-gray-700">Vị trí mong muốn:</span> <span>{laborer.locationjob || "Chưa cập nhật"}</span></div>
                    <div><span className="font-semibold text-gray-700">Mức lương mong muốn:</span> <span>{laborer.desired_salary ? `${laborer.desired_salary.toLocaleString()} VND` : "Chưa cập nhật"}</span></div>
                    <div><span className="font-semibold text-gray-700">Hình thức làm việc:</span> <span>{laborer.work_type || "Chưa cập nhật"}</span></div>
                </div>
            </SectionCard>
        </div>
    );
};

export default LaborerOtherInfo;
