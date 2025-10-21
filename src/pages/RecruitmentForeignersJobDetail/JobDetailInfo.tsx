import Skeleton from "@/components/Skeleton";
import React from "react";
import { useRecruitmentJobDetail } from "./useRecruitmentForeignersJobDetail";

const JobDetailInfo: React.FC = () => {
    const { job, loading } = useRecruitmentJobDetail();
    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-1" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <div className="relative rounded-lg bg-white p-4 shadow-lg mt-6">
                    <Skeleton className="absolute left-0 top-0 w-full h-1 rounded-t-lg bg-orange-300" />
                    <Skeleton className="h-5 w-1/2 mb-2 mt-2" />
                    <ul className="space-y-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <li key={i}><Skeleton className="h-4 w-full" /></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
    if (!job) return null;
    const detail = job?.detailjob?.[0];
    return (
        <div className="space-y-4 p-4">
            <div className="font-bold text-xl mb-4 text-gray-800">{job.title}</div>
            <div className="text-base text-gray-700 font-semibold mb-1 flex items-center">{job.companyname}</div>
            <div className="text-gray-500 text-sm mb-4">Ngày đăng: {job.publishdate}</div>
            <div className="relative rounded-lg bg-white p-4 shadow-lg mt-6" style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.15)' }}>
                <div className="absolute left-0 top-0 w-full h-1 rounded-t-lg bg-orange-500" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }} />
                <div className="font-bold text-orange-500 mb-2 mt-2">{detail?.position || "Chi tiết công việc"}</div>
                <ul className="text-gray-800 text-sm space-y-1">
                    {detail && (
                        <>
                            <li><b>Chức danh công việc:</b> {detail.jobtitle}</li>
                            <li><b>Số lượng:</b> {detail.quantity}</li>
                            <li><b>Thời hạn làm việc:</b> {detail.workingtime}</li>
                            <li><b>Địa điểm làm việc:</b> {detail.location}</li>
                            <li><b>Trình độ:</b> {detail.level}</li>
                            <li><b>Lương:</b> {detail.salary}</li>
                            <li><b>Kinh nghiệm:</b> {detail.experience}</li>
                            <li><b>Mô tả:</b> <span dangerouslySetInnerHTML={{ __html: detail.summary }} /></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default JobDetailInfo;
