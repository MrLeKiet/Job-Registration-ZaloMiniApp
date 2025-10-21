// LaborerSkills.tsx (Updated for consistency and better mobile layout)
import React from "react";
import { Wrench, Star } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";
import SectionCard from "./SectionCard";

const LaborerSkills: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading)
        return (
            <SectionCard title="Kỹ năng" icon={<Wrench className="w-5 h-5 text-blue-500" />}>
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </SectionCard>
        );

    if (error || !laborer)
        return (
            <SectionCard title="Kỹ năng" icon={<Wrench className="w-5 h-5 text-blue-500" />}>
                Không thể tải dữ liệu
            </SectionCard>
        );

    const skills = laborer.skills || [];

    if (skills.length === 0)
        return (
            <SectionCard title="Kỹ năng" icon={<Wrench className="w-5 h-5 text-blue-500" />}>
                Chưa có kỹ năng nào được thêm.
            </SectionCard>
        );

    return (
        <SectionCard title="Kỹ năng" icon={<Wrench className="w-5 h-5 text-blue-500" />}>
            <div className="space-y-3">
                {skills.map((skill: any, index: number) => (
                    <SkillItem key={index} name={skill.name} level={skill.level} />
                ))}
            </div>
        </SectionCard>
    );
};

export default LaborerSkills;

const SkillItem = ({ name, level }: { name: string; level?: number }) => (
    <div className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0">
        <span className="text-gray-700 font-medium text-base">{name}</span>
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={`${name}-star-${i}`}
                    className={`w-5 h-5 ${i < (level || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    </div>
);