import React from "react";
import { Briefcase } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerJobInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading)
        return (
            <SectionCard title="Thông tin nghề nghiệp" icon={<Briefcase className="w-5 h-5 text-blue-500" />}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-2/3 mb-2" />
                ))}
            </SectionCard>
        );

    if (error || !laborer)
        return (
            <SectionCard title="Thông tin nghề nghiệp" icon={<Briefcase className="w-5 h-5 text-blue-500" />}>
                Không thể tải dữ liệu
            </SectionCard>
        );

    return (
        <SectionCard title="Thông tin nghề nghiệp" icon={<Briefcase className="w-5 h-5 text-blue-500" />}>
            <div className="space-y-1 text-gray-800">
                <p>
                    <span className="font-medium text-gray-700">Công việc mong muốn: </span>
                    {laborer.desiredjobtitle || "—"}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Ngành nghề: </span>
                    {laborer.industry || "—"}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Nơi làm việc: </span>
                    {laborer.workplace || "—"}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Lương mong muốn: </span>
                    {laborer.expectedsalary || "Chưa có thông tin."}
                </p>
            </div>
        </SectionCard>
    );
};

export default LaborerJobInfo;

// ✅ Reusable section wrapper
const SectionCard = ({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) => (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
            {icon}
            <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
        </div>
        {children}
    </section>
);
