import React from "react";
import { History } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerExperience: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading)
        return (
            <SectionCard title="Kinh nghiệm làm việc" icon={<History className="w-5 h-5 text-blue-500" />}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-3/4 mb-2" />
                ))}
            </SectionCard>
        );

    if (error || !laborer)
        return (
            <SectionCard title="Kinh nghiệm làm việc" icon={<History className="w-5 h-5 text-blue-500" />}>
                Không thể tải dữ liệu
            </SectionCard>
        );

    return (
        <SectionCard title="Kinh nghiệm làm việc" icon={<History className="w-5 h-5 text-blue-500" />}>
            <div className=" text-gray-800 leading-relaxed">
                {laborer.experience ? (
                    <div dangerouslySetInnerHTML={{ __html: laborer.experience }} />
                ) : (
                    "Chưa có thông tin."
                )}
            </div>
        </SectionCard>
    );
};

export default LaborerExperience;

// ✅ Reusable SectionCard
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
