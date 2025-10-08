import React from "react";
import { GraduationCap } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerEducation: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading)
        return (
            <SectionCard title="Trình độ học vấn" icon={<GraduationCap className="w-5 h-5 text-blue-500" />}>
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </SectionCard>
        );

    if (error || !laborer)
        return (
            <SectionCard title="Trình độ học vấn" icon={<GraduationCap className="w-5 h-5 text-blue-500" />}>
                Không thể tải dữ liệu
            </SectionCard>
        );

    return (
        <SectionCard title="Trình độ học vấn" icon={<GraduationCap className="w-5 h-5 text-blue-500" />}>
            {laborer.education && laborer.education.trim() !== ""
                ? <p className="text-gray-800">{laborer.education}</p>
                : <p className="text-gray-500 italic">Chưa có thông tin.</p>}
        </SectionCard>
    );
};

export default LaborerEducation;

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
