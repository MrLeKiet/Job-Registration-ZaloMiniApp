import React from "react";
import { Eye, User, Phone, Mail } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import noImage from "@/images/no_image.png";
import { useLaborerDetail } from "./useLaborerDetails";

const LoadingState: React.FC = () => (
    <section className="bg-white rounded-xl border border-gray-200 p-5 mx-3 mt-3 shadow-sm">
        <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-28 w-28 rounded-full" />
            <div className="w-full space-y-3">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
        </div>
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
        <section className="bg-white rounded-xl border border-gray-200 p-5 mx-3 mt-3 mb-5 shadow-sm">
            <div className="flex flex-col items-center text-center mb-5">
                <img
                    src={laborer.thumbnail || noImage}
                    alt="Ảnh đại diện"
                    className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                    onError={(e) => (e.currentTarget.src = noImage)}
                />
                <h3 className="text-xl font-bold text-gray-900 mt-3">{laborer.fullname}</h3>

                <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-600 mt-2">
                    <User className="w-4 h-4 text-blue-500" />
                    <span>{laborer.gender}</span>
                    <span className="text-gray-400">•</span>
                    <span className="font-medium">CID: {laborer.cid}</span>
                </div>

                <div className="flex justify-center items-center gap-1 text-sm text-gray-500 mt-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span>{laborer.viewcount ?? 0} lượt xem</span>
                </div>
            </div>

            <div className="border-t border-gray-100 my-3" />

            <div className="grid grid-cols-1 gap-3">
                {infoList.map((item) => (
                    <div key={item.label} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2">
                        <div className="text-gray-600 text-sm font-medium">{item.label}</div>
                        <div className="flex items-center gap-2 text-gray-800 text-sm">
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
