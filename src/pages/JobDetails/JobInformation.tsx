import Skeleton from "@/components/Skeleton";
import {
    Briefcase,
    Building2,
    CalendarDays,
    Clock,
    FileText,
    GraduationCap,
    MapPin,
    User,
    Users,
} from "lucide-react";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobInformation: React.FC = () => {
    const { job, loading, error } = useJobDetail();

    const skeletonKeys = React.useMemo(
        () => Array.from({ length: 7 }, () => crypto.randomUUID()),
        []
    );

    if (loading) {
        return (
            <div className="border rounded-xl p-4 shadow-sm bg-white">
                <Skeleton className="h-6 w-1/2 mb-3" />
                {skeletonKeys.map(key => (
                    <Skeleton key={key} className="h-4 w-3/4 mb-2" />
                ))}
            </div>
        );
    }

    if (error || !job) return <div>Error loading job details.</div>;

    return (
        <aside
            id="job-information"
            className="rounded-md p-4 shadow-sm"
        >
            <h2 className="font-bold text-gray-800 text-lg mb-3">
                THÔNG TIN CHUNG
            </h2>

            <ul className="text-base text-gray-700 space-y-2 flex flex-col gap-2 px-2">
                <InfoItem icon={<CalendarDays />} label="Ngày đăng tin" value={job.publishdate} />
                <InfoItem icon={<MapPin />} label="Vị trí (mới)" value={job.location} />
                <InfoItem icon={<User />} label="Cấp bậc" value={job.position} />
                <InfoItem icon={<FileText />} label="Yêu cầu giới tính" value={job.gender || "Không yêu cầu giới tính"} />
                <InfoItem icon={<Users />} label="Số lượng tuyển" value={job.numofrecruitment} />
                <InfoItem icon={<Clock />} label="Thời gian làm việc" value={job.workingtime || "Giờ hành chính"} />
                <InfoItem icon={<GraduationCap />} label="Yêu cầu bằng cấp" value={job.degreerequired || "Không yêu cầu"} />
                <InfoItem icon={<Briefcase />} label="Kinh nghiệm" value={job.experience || "Không yêu cầu kinh nghiệm"} />
                <InfoItem icon={<Building2 />} label="Ngành nghề" value={job.job} />
                <InfoItem icon={<Building2 />} label="Tên công ty" value={job.companyname} />
                <InfoItem icon={<MapPin />} label="Địa chỉ" value={job.companyaddress} />
                <InfoItem icon={<Users />} label="Quy mô" value={job.companyscale} />
            </ul>

            {/* Deadline highlight */}
            <div className="mt-4 bg-blue-100 text-blue-800 rounded-lg p-4 text-center font-semibold flex items-center justify-center gap-2">
                <CalendarDays className="text-blue-700" size={18} />
                <span>Hạn nộp hồ sơ: {job.deadline}</span>
            </div>
        </aside>
    );
};

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
    <li className="flex items-start gap-2">
        <div className="text-blue-500 mt-0.5">{icon}</div>
        <div>
            <span className="font-semibold text-gray-800">{label}: </span>
            <span className="text-base">{value}</span>
        </div>
    </li>
);

export default JobInformation;
