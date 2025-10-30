
import Skeleton from "@/components/Skeleton";
import { BriefcaseBusiness, Clock, GraduationCap, HandCoins, Heart, MapPin } from "lucide-react";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobGeneralInfo: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-2 mb-2">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex gap-4 mb-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-10 w-1/2" />
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="bg-white shadow p-4">
            <div className="flex items-center gap-4 mb-3">
                {job.thumbnail && (
                    <img src={job.thumbnail} alt={job.companyname} className="w-16 h-16 object-cover rounded-full border" />
                )}
                <div className="flex-1">
                    <div className="font-bold text-xl text-gray-900 mb-1">{job.title}</div>
                    <div className="text-gray-600 text-base font-bold">{job.companyname}</div>
                </div>
            </div>
            <div className="border-b border-gray-200 mb-3" />
            {/* 3 chips in a single flex row that wraps */}
            <div className="flex flex-wrap gap-4 mb-4">
                {/* Salary chip */}
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Lương</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <HandCoins size={16} />
                        {job.salary}
                    </div>
                </div>
                {/* Experience chip */}
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Kinh nghiệm</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <BriefcaseBusiness size={16} />
                        {job.experience || "Không yêu cầu"}
                    </div>
                </div>
                {/* Job field chip (Ngành nghề) */}
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Ngành nghề</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <BriefcaseBusiness size={16} />
                        {job.job || "Không xác định"}
                    </div>
                </div>
                {/* Degree chip */}
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Bằng cấp</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <GraduationCap size={16} />
                        {job.degreerequired || "Không yêu cầu"}
                    </div>
                </div>
            </div>

            {/* Location chip below, styled like deadline/viewcount row */}
            <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-gray-700">
                    <MapPin size={16} />
                    <span className="font-bold whitespace-nowrap">Vị trí:</span>
                    <span className="font-normal text-gray-900 pl-1">{job.location}</span>
                </div>
            </div>
            <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-gray-700">
                    <Clock size={16} />
                    <span className="font-bold">Hạn nộp hồ sơ:</span>
                    <span className="font-normal text-gray-900">{job.deadline}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                    <Heart size={16} />
                    <span className="font-normal">{job.viewcount || 0} lượt xem</span>
                </div>
            </div>
            <div className="flex gap-3 mt-2">
                <button
                    className="flex-1 font-bold text-white py-3 rounded-lg flex items-center justify-center gap-2 text-base transition"
                    style={{background:'#1565C0'}}
                    onMouseOver={e => e.currentTarget.style.background='#0d47a1'}
                    onFocus={e => e.currentTarget.style.background='#0d47a1'}
                    onMouseOut={e => e.currentTarget.style.background='#1565C0'}
                    onBlur={e => e.currentTarget.style.background='#1565C0'}
                >
                    <p className="text-white">Ứng tuyển ngay</p>
                </button>
            </div>
        </div>
    );
};

export default JobGeneralInfo;
