import Skeleton from "@/components/Skeleton";
import { Briefcase, GraduationCap, Star, Target, Wrench } from "lucide-react";
import React from "react";
import SectionCard from "./SectionCard";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerJobInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading)
        return (
            <SectionCard title="Thông tin nghề nghiệp" icon={<Briefcase className="w-5 h-5 text-blue-500" />}>
                {["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"].map((id) => (
                    <Skeleton key={id} className="h-4 w-2/3 mb-2" />
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
        <div className="space-y-6 px-2 pb-6">
            {/* Career Objective */}
            <SectionCard title="Mục tiêu nghề nghiệp" icon={<Target className="w-5 h-5 text-blue-500" />}> 
                <div className=" rounded-lg p-3">
                    <p
                        className="text-gray-800 text-base leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: laborer.objectivedescription || "Chưa có thông tin.",
                        }}
                    />
                </div>
            </SectionCard>

            {/* Skills */}
            <SectionCard title="Kỹ năng" icon={<Wrench className="w-5 h-5 text-blue-500" />}> 
                <div className=" rounded-lg p-3">
                    {skills.length > 0 ? (
                        <div className="space-y-3">
                            {skills.map((skill: any) => (
                                <div
                                    key={skill.id || skill.name}
                                    className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0"
                                >
                                    <span className="text-gray-700 font-semibold text-base">{skill.name}</span>
                                    <div className="flex gap-1">
                                        {new Array(5).fill(null).map((_, i) => (
                                            <Star
                                                key={`${skill.id || skill.name}-star-${i}`}
                                                className={`w-5 h-5 ${
                                                    i < (skill.level || 0)
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
                        <p className="text-gray-500 italic text-base">Chưa có thông tin.</p>
                    )}
                </div>
            </SectionCard>

            {/* Job Info */}
            <SectionCard title="Chi tiết nghề nghiệp" icon={<Briefcase className="w-5 h-5 text-blue-500" />}> 
                <div className=" rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><span className="font-semibold text-gray-700">Công việc mong muốn:</span> <span className="text-gray-800">{laborer.desiredjobtitle || "—"}</span></div>
                    <div><span className="font-semibold text-gray-700">Ngành nghề:</span> <span className="text-gray-800">{laborer.industry || "—"}</span></div>
                    <div><span className="font-semibold text-gray-700">Nơi làm việc:</span> <span className="text-gray-800">{laborer.workplace || "—"}</span></div>
                    <div><span className="font-semibold text-gray-700">Lương mong muốn:</span> <span className="text-gray-800">{laborer.expectedsalary || "Chưa có thông tin."}</span></div>
                </div>
            </SectionCard>

            {/* Education */}
            <SectionCard title="Trình độ học vấn" icon={<GraduationCap className="w-5 h-5 text-blue-500" />}> 
                <div className=" rounded-lg p-3">
                    <span className="font-semibold text-gray-700">{laborer.educationlevel || "Chưa có thông tin."}</span>
                </div>
            </SectionCard>
        </div>
    );
}

export default LaborerJobInfo;