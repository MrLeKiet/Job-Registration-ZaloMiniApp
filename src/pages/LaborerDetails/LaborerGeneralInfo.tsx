import React from "react";
import { Eye, User, Phone, Mail } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import noImage from "@/images/no_image.png";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerGeneralInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();

    if (loading) return <LoadingState />;
    if (error || !laborer) return <ErrorState />;

    const infoList = [
        { label: "Tuổi", value: laborer.age },
        { label: "Ngày sinh", value: laborer.birthdate },
        { label: "Địa chỉ", value: laborer.address },
        { label: "Dân tộc", value: laborer.ethnicity },
        { label: "Quốc tịch", value: laborer.nationality },
        { label: "Số điện thoại", value: laborer.phone, icon: <Phone className="w-4 h-4 text-green-500" /> },
        { label: "Email", value: laborer.email, icon: <Mail className="w-4 h-4 text-blue-500" /> },
        { label: "Cập nhật", value: laborer.updatedate },
    ];

    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow p-4 mx-3 mt-3 mb-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center text-center">
                <img
                    src={laborer.thumbnail || noImage}
                    alt="Ảnh đại diện"
                    className="w-24 h-24 rounded-xl object-cover border-2 border-blue-400 shadow-sm"
                    onError={(e) => (e.currentTarget.src = noImage)}
                />
                <h3 className="text-lg font-bold text-gray-900 mt-3">{laborer.fullname}</h3>

                <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-600 mt-1">
                    <User className="w-4 h-4 text-blue-500" />
                    <span>{laborer.gender}</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium">CID: {laborer.cid}</span>
                </div>

                <div className="flex justify-center items-center gap-1 text-xs text-gray-500 mt-1">
                    <Eye className="w-3 h-3 text-blue-500" />
                    <span>{laborer.viewcount ?? 0} lượt xem</span>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-4" />

            {/* Info List */}
            <div className="grid grid-cols-1 gap-3">
                {infoList.map((item) => (
                    <div
                        key={item.label}
                        className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2 shadow-sm"
                    >
                        <div className="text-gray-600 text-sm">{item.label}</div>
                        <div className="flex items-center gap-1 text-gray-800 text-sm font-medium">
                            {item.icon}
                            <span>{item.value || "-"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LaborerGeneralInfo;

/* === States === */
const LoadingState = () => (
    <section className="bg-white rounded-2xl border border-gray-200 shadow p-4 mx-3 mt-3">
        <div className="flex gap-4 items-start">
            <Skeleton className="h-24 w-24 rounded-xl" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    </section>
);

const ErrorState = () => (
    <section className="bg-white rounded-2xl border border-gray-200 shadow p-4 mx-3 mt-3">
        Không thể tải dữ liệu
    </section>
);
