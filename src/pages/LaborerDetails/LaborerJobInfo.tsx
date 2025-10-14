import React from "react";
import { Briefcase, GraduationCap, Target, History, Wrench, Star } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";
import SectionCard from "./SectionCard";

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
        <div className="px-3 pb-5 space-y-5">
            {/* Career Objective */}
            <SectionCard title="Mục tiêu nghề nghiệp" icon={<Target className="w-5 h-5 text-blue-500" />}>
                <p
                    className="text-gray-800 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: laborer.objectivedescription || "Chưa có thông tin.",
                    }}
                />
            </SectionCard>

            {/* Skills */}
            <SectionCard title="Kỹ năng" icon={<Wrench className="w-5 h-5 text-blue-500" />}>
                {skills.length > 0 ? (
                    <div className="space-y-3">
                        {skills.map((skill: any, index: number) => (
                            <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0">
                                <span className="text-gray-700 font-medium text-sm">{skill.name}</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={`${skill.name}-star-${i}`}
                                            className={`w-4 h-4 ${i < (skill.level || 0)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic text-sm">Chưa có thông tin.</p>
                )}
            </SectionCard>

            {/* Job Info */}
            <SectionCard title="Chi tiết nghề nghiệp" icon={<Briefcase className="w-5 h-5 text-blue-500" />}>
                <div className="space-y-2 text-gray-800 text-sm">
                    <p><span className="font-medium text-gray-700">Công việc mong muốn:</span> {laborer.desiredjobtitle || "—"}</p>
                    <p><span className="font-medium text-gray-700">Ngành nghề:</span> {laborer.industry || "—"}</p>
                    <p><span className="font-medium text-gray-700">Nơi làm việc:</span> {laborer.workplace || "—"}</p>
                    <p><span className="font-medium text-gray-700">Lương mong muốn:</span> {laborer.expectedsalary || "Chưa có thông tin."}</p>
                </div>
            </SectionCard>

            {/* Education */}
            <SectionCard title="Trình độ học vấn" icon={<GraduationCap className="w-5 h-5 text-blue-500" />}>
                <p className="text-gray-800 text-sm">
                    {laborer.education?.trim() ? laborer.education : "Chưa có thông tin."}
                </p>
            </SectionCard>

            {/* Experience */}
            <SectionCard title="Kinh nghiệm làm việc" icon={<History className="w-5 h-5 text-blue-500" />}>
                <div className="text-gray-800 text-sm leading-relaxed">
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
