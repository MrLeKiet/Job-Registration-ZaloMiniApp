import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import noImage from "@/images/no_image.png";
import { Eye } from "lucide-react";
import React from "react";
import { useLaborerDetail } from "./useLaborerDetails";

const FieldRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex text-base flex-col items-start">{children}</div>
);
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-base text-gray-500 font-semibold mb-1">{children}</span>
);

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
            <section className=" rounded-xl border border-gray-200 p-5 mx-3 mt-3 text-center text-red-500">
                Không thể tải dữ liệu
            </section>
        );


    return (
        <div className="flex flex-col shadow rounded-xl gap-3">
            <div className="flex flex-col gap-4 p-4 shadow-sm">
                <div className="flex space-x-6 items-center">
                    <img src={laborer.thumbnail || noImage} alt="Ảnh đại diện" className="w-20 h-20 object-cover rounded-full border" onError={e => (e.currentTarget.src = noImage)} />
                    <div className="flex flex-col">
                        <div className="font-bold text-xl text-gray-900 mb-1">{laborer.fullname}</div>
                        <div className="flex flex-col sm:flex-row gap-2 mt-1">
                            <span className="text-sm text-gray-700 bg-gray-100  font-semibold rounded w-fit px-2 py-1">
                                CID: {laborer.cid || '-'}
                            </span>
                            <span className="text-sm text-gray-700 bg-gray-100 font-semibold rounded w-fit px-2 py-1">
                                Giới tính: {laborer.gender || '-'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 relative pl-1">
                    <Eye className="absolute top-1 left-1 w-4 h-4 text-blue-500" />
                    <span className="text-gray-800 pl-5 text-sm">{laborer.viewcount ?? 0} lượt xem</span>
                </div>
            </div>
            <div className="border-b border-gray-200" />
            <div className="flex flex-col bg-white p-4 shadow-sm">
                <span className="text-lg font-semibold text-gray-900 mb-3 border-b border-blue-600 w-fit">THÔNG TIN CÁ NHÂN</span>
                <div className="grid grid-cols-2 gap-4">
                    <FieldRow>
                        <Label>Tuổi:</Label>
                        {laborer.age || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Ngày sinh:</Label>
                        {laborer.birthdate || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Địa chỉ:</Label>
                        {laborer.address || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Dân tộc:</Label>
                        {laborer.ethnicity || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Quốc tịch:</Label>
                        {laborer.nationality || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Số điện thoại:</Label>
                        {laborer.phone || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Email:</Label>
                        {laborer.email || "Chưa cập nhật"}
                    </FieldRow>
                </div>
            </div>
            <div className="flex flex-col bg-white p-4 shadow-sm">
                <span className="text-lg font-bold text-gray-900 mb-3 border-b border-blue-600 w-fit">THÔNG TIN HỒ SƠ</span>
                <div className="grid grid-cols-2 gap-4">
                    <FieldRow>
                        <Label>Công việc:</Label>
                        {(() => {
                            if (!laborer.job) return "Chưa cập nhật";
                            if (Array.isArray(laborer.job)) return laborer.job.join(" & ");
                            return laborer.job.replaceAll(" ", " & ");
                        })()}
                    </FieldRow>
                    <FieldRow>
                        <Label>Kinh nghiệm:</Label>
                        {laborer.experience || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Trình độ học vấn:</Label>
                        {laborer.traininglevel || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Bằng cấp:</Label>
                        {laborer.educationqualifications || "Chưa cập nhật"}
                    </FieldRow>
                    <FieldRow>
                        <Label>Vị trí làm việc:</Label>
                        {laborer.locationjob || "Chưa cập nhật"}
                    </FieldRow>
                </div>
            </div>
            <div className="flex gap-3 pb-4 px-4">
                <button
                    className="flex-1 font-bold text-white py-3 shadow-sm rounded-lg flex items-center justify-center gap-2 text-base transition"
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