import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import noImage from "@/images/no_image.png";
import { Eye, Mail, Phone } from "lucide-react";
import React from "react";
import { useLaborerDetail } from "./useLaborerDetails";

const LoadingState: React.FC = () => (
    <section className="bg-white rounded-xl border border-gray-200 p-5 mx-3 mt-3 shadow-sm">
        <SkeletonList
            count={1}
            renderSkeleton={() => (
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-28 w-28 rounded-full" />
                    <div className="w-full space-y-3">
                        <Skeleton className="h-5 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                    </div>
                </div>
            )}
        />
    </section>
);

const LaborerGeneralInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading) return <LoadingState />;
    if (error || !laborer)
        return (
            <section className="bg-white rounded-xl border border-gray-200 p-5 mx-3 mt-3 text-center text-red-500">
                Không thể tải dữ liệu
            </section>
        );


    return (
        <div className="bg-white shadow p-4 rounded-xl">
            <div className="flex items-center gap-4 mb-3">
                <img src={laborer.thumbnail || noImage} alt="Ảnh đại diện" className="w-16 h-16 object-cover rounded-full border" onError={e => (e.currentTarget.src = noImage)} />
                <div className="flex-1">
                    <div className="font-bold text-xl text-gray-900 mb-1">{laborer.fullname}</div>
                </div>
            </div>
            <div className="border-b border-gray-200 mb-3" />
            <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Giới tính</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.gender || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Tuổi</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.age || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Ngày sinh</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.birthdate || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Địa chỉ</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.address || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Dân tộc</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.ethnicity || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Quốc tịch</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.nationality || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Số điện thoại</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.phone || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Email</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.email || "-"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Cập nhật</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        {laborer.updatedate || "-"}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                <Eye className="w-4 h-4 text-blue-500" />
                <span className="text-gray-800 text-sm">{laborer.viewcount ?? 0} lượt xem</span>
            </div>
            <div className="flex gap-3 mt-6">
                <button
                    className="flex-1 font-bold text-white py-3 rounded-lg flex items-center justify-center gap-2 text-base transition"
                    style={{ background: '#1565C0' }}
                    onMouseOver={e => e.currentTarget.style.background = '#0d47a1'}
                    onFocus={e => e.currentTarget.style.background = '#0d47a1'}
                    onMouseOut={e => e.currentTarget.style.background = '#1565C0'}
                    onBlur={e => e.currentTarget.style.background = '#1565C0'}
                >
                    <p className="text-white">Ứng tuyển ngay</p>
                </button>
            </div>
        </div>
    );
};

export default LaborerGeneralInfo;