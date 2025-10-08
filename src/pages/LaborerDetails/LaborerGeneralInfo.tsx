import React from "react";
import Skeleton from "@/components/Skeleton";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerGeneralInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading)
        return (
            <SectionCard title="Thông tin cá nhân">
                <div className="flex gap-4 items-start">
                    <Skeleton className="h-24 w-24 rounded-lg" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </SectionCard>
        );

    if (error || !laborer)
        return (
            <SectionCard title="Thông tin cá nhân">
                Không thể tải dữ liệu
            </SectionCard>
        );

    return (
        <SectionCard title="Thông tin cá nhân">
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0 mb-4 sm:mb-0 relative group">
                    <img
                        src={laborer.thumbnail || "/images/default-avatar.png"}
                        alt="Ảnh đại diện"
                        className="w-28 h-28 object-cover rounded-lg border border-gray-200 shadow-sm transition group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/40 text-white text-xs flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition">
                        Bấm để đổi ảnh
                    </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-gray-800 flex-1">
                    <InfoRow label="Họ và tên" value={laborer.fullname} />
                    <InfoRow label="Tuổi" value={laborer.age} />
                    <InfoRow label="Giới tính" value={laborer.gender} />
                    <InfoRow label="Ngày sinh" value={laborer.birthdate} />
                    <InfoRow label="Căn cước" value={laborer.cid} />
                    <InfoRow label="Địa chỉ" value={laborer.address} />
                    <InfoRow label="Dân tộc" value={laborer.ethnicity} />
                    <InfoRow label="Quốc tịch" value={laborer.nationality} />
                    <InfoRow label="Số điện thoại" value={laborer.phone} />
                    <InfoRow label="Email" value={laborer.email} />
                    <InfoRow label="Cập nhật" value={laborer.updatedate} />
                    <InfoRow label="Lượt xem" value={laborer.viewcount?.toString()} />
                </div>
            </div>
        </SectionCard>
    );
};

export default LaborerGeneralInfo;

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex items-start gap-1">
        <span className="font-semibold text-gray-700 min-w-[100px]">{label}:</span>
        <span className="text-gray-900 break-words">{value || "—"}</span>
    </div>
);

const SectionCard = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <h2 className="text-lg font-semibold text-blue-600 mb-4 border-l-4 border-blue-500 pl-3">
            {title}
        </h2>
        {children}
    </section>
);
