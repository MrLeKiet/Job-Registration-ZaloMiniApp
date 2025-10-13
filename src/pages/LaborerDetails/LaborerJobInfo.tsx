import React from "react";
import { Briefcase, GraduationCap, Target, History, Wrench } from "lucide-react";
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

    const skills = laborer.skills || [];

    return (
        <div className="p-4">
            <SectionCard title="Mục tiêu nghề nghiệp" icon={<Target className="w-5 h-5 text-blue-500" />}>
                <div
                    className=" text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: laborer.objectivedescription || "Chưa có thông tin.",
                    }}
                />
            </SectionCard>
            <SectionCard title="Kỹ năng" icon={<Wrench className="w-5 h-5 text-blue-500" />}>
                <div className="space-y-2">
                    {skills.length > 0 ? (
                        skills.map((skill: any, index: number) => (
                            <SkillItem key={index} name={skill.name} level={skill.level} />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Chưa có thông tin.</p>
                    )}
                </div>
            </SectionCard>
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
            <SectionCard title="Trình độ học vấn" icon={<GraduationCap className="w-5 h-5 text-blue-500" />}>
                {laborer.education && laborer.education.trim() !== ""
                    ? <p className="text-gray-800">{laborer.education}</p>
                    : <p className="text-gray-500 italic">Chưa có thông tin.</p>}
            </SectionCard>
            <SectionCard title="Kinh nghiệm làm việc" icon={<History className="w-5 h-5 text-blue-500" />}>
                <div className=" text-gray-800 leading-relaxed">
                    {laborer.experience ? (
                        <div dangerouslySetInnerHTML={{ __html: laborer.experience }} />
                    ) : (
                        "Chưa có thông tin."
                    )}
                </div>
            </SectionCard>
        </div>
    );
};

export default LaborerJobInfo;

// Simple SkillItem component definition
const SkillItem: React.FC<{ name: string; level: string }> = ({ name, level }) => (
    <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{level}</span>
    </div>
);

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
