import React from "react";
import { Target } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerObjective: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading)
        return (
            <SectionCard title="Mục tiêu nghề nghiệp" icon={<Target className="w-5 h-5 text-blue-500" />}>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </SectionCard>
        );

    if (error || !laborer)
        return (
            <SectionCard title="Mục tiêu nghề nghiệp" icon={<Target className="w-5 h-5 text-blue-500" />}>
                Không thể tải dữ liệu
            </SectionCard>
        );

    return (
        <SectionCard title="Mục tiêu nghề nghiệp" icon={<Target className="w-5 h-5 text-blue-500" />}>
            <div
                className=" text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{
                    __html: laborer.objectivedescription || "Chưa có thông tin.",
                }}
            />
        </SectionCard>
    );
};

export default LaborerObjective;

// ✅ Reusable SectionCard (same as other sections)
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
