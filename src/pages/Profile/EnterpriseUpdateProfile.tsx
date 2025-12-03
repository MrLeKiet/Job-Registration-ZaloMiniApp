import { enterpriseUpdateProfile } from "@/api/enterpriseApi";
import { ChevronDown, ChevronUp, User, Camera } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "zmp-ui";
import Select from "../../components/Select";
import { getProfileWithToken } from "./api";
import { useProfile } from "./useProfile";

const sectionDefs = [
    { key: "company", title: "1. Thông tin doanh nghiệp", defaultOpen: true },
    { key: "contact", title: "2. Thông tin liên hệ", defaultOpen: true },
];

const EnterpriseUpdateProfile: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [editProfile, setEditProfile] = useState<any>(null);
    const [expanded, setExpanded] = useState(() => sectionDefs.map(s => s.defaultOpen));
    const [saving, setSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const { settings } = useProfile();
    const accessToken = localStorage.getItem("accessToken") || "";

    useEffect(() => {
        async function fetchProfile() {
            if (!accessToken) return;
            const res = await getProfileWithToken(accessToken);
            const data = res?.Data || {};
            setProfile(data);
            setEditProfile(prev => ({
                ...data,
            }));
        }
        fetchProfile();
    }, [accessToken]);

    const handleExpand = idx => {
        setExpanded(expanded => expanded.map((v, i) => (i === idx ? !v : v)));
    };

    const handleInput = (field: string, value: any) => {
        setEditProfile((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleUpdateProfile = async () => {
        setSaving(true);
        setShowToast(false);
        setErrorMessage("");
        setFieldErrors({});
        try {
            const updatePayload = {
                Email: editProfile?.email,
                CompanyName: editProfile?.companyname,
                CompanyEmail: editProfile?.companyemail,
                CompanyAddress : editProfile?.address,
                CompanyPhone : editProfile?.companyphone,
                BusinessSize : editProfile?.businesssize,
            };
            const res = await enterpriseUpdateProfile(updatePayload, accessToken);
            if (res?.StatusResult?.Code === 0 && res?.Data?.IsUpdated === true) {
                setShowToast(true);
                setErrorMessage("");
                setFieldErrors({});
                setTimeout(() => setShowToast(false), 2000);
                const profileRes = await getProfileWithToken(accessToken);
                setProfile(profileRes?.Data || {});
                setEditProfile(profileRes?.Data || {});
            } else if (Array.isArray(res?.Errors) && res.Errors.length > 0) {
                const errors: Record<string, string> = {};
                for (const err of res.Errors) {
                    errors[err.Field] = err.Message;
                }
                setFieldErrors(errors);
                setErrorMessage("Có lỗi dữ liệu. Vui lòng kiểm tra lại các trường thông tin.");
            } else {
                setErrorMessage(res?.StatusResult?.Message || res?.Message || "Cập nhật thất bại!");
            }
        } catch (err: any) {
            console.error("EnterpriseUpdateProfile error:", err);
            setErrorMessage("Có lỗi xảy ra khi cập nhật!");
        } finally {
            setSaving(false);
        }
    };

    return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-50">

        {/* Header đẹp hơn */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 pt-12 pb-20 px-6 rounded-b-3xl shadow-xl">
            <div className="flex flex-col items-center text-white -mt-6">
                <div className="relative">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                        <img
                            src={editProfile?.avatar || "/default-avatar.png"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button className="absolute bottom-1 right-1 bg-white text-blue-600 rounded-full p-3 shadow-xl hover:scale-110 transition">
                        <Camera size={20} />
                    </button>
                </div>
                <Text className="mt-4 text-2xl font-bold">{editProfile?.companyname || "Tên doanh nghiệp"}</Text>
                <Text className="text-blue-100 text-sm mt-1">Cập nhật hồ sơ doanh nghiệp</Text>
            </div>
        </div>

        {/* Form */}
        <div className="px-5 -mt-12">
            <div className="space-y-5">

                {sectionDefs.map((section, idx) => (
                    <div key={section.key} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <button
                            className={`w-full flex justify-between items-center px-6 py-5 text-white font-bold text-lg transition-all ${
                                idx === 0 
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700" 
                                    : "bg-gradient-to-r from-emerald-600 to-teal-600"
                            }`}
                            onClick={() => handleExpand(idx)}
                        >
                            <span>{section.title}</span>
                            {expanded[idx] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </button>

                        {expanded[idx] && (
                            <div className="px-6 py-6">
                                <SectionContent
                                    section={section.key}
                                    profile={editProfile}
                                    onInput={handleInput}
                                    fieldErrors={fieldErrors}
                                    settings={settings}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Thông báo thành công / lỗi */}
            <div className="mt-6 space-y-4">
                {showToast && (
                    <div className="bg-green-100 border border-green-300 text-green-700 px-6 py-4 rounded-xl text-center font-semibold flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        Cập nhật thông tin thành công!
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl text-center font-medium">
                        {errorMessage}
                    </div>
                )}
            </div>

            {/* Nút lưu ĐÃ ĐƯA LÊN TRÊN ĐỂ BẠN THẤY NGAY, KHÔNG CẦN CUỘN XUỐNG */}
            <div className="mt-8 px-5 pb-3">
                <Button
                    fullWidth
                    size="large"
                    loading={saving}
                    disabled={saving}
                    onClick={handleUpdateProfile}
                    className=" text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl"
                >
                    Cập nhật thông tin doanh nghiệp
                </Button>
            </div>
        </div>
    </div>
);
};

function SectionContent({ section, profile, onInput, fieldErrors, settings }) {
    switch (section) {
        case "company":
            return (
                <Box className="flex flex-col gap-5">
                    <Input
                        label="Tên doanh nghiệp"
                        value={profile?.companyname || ""}
                        onChange={e => onInput("companyname", e.target.value)}
                        placeholder="Tên doanh nghiệp"
                        status={fieldErrors.companyname ? "error" : undefined}
                        errorText={fieldErrors.companyname}
                    />
                    <Input
                        label="Email doanh nghiệp"
                        value={profile?.companyemail || ""}
                        onChange={e => onInput("companyemail", e.target.value)}
                        placeholder="Email doanh nghiệp"
                        status={fieldErrors.companyemail ? "error" : undefined}
                        errorText={fieldErrors.companyemail}
                    />
                    <div>
                        <Text className="text-sm font-medium mb-2">Chọn quy mô doanh nghiệp</Text>
                        <Select
                            type="single"
                            options={settings?.BusinessSize || []}
                            value={profile?.businesssize || ""}
                            onChange={option => onInput("businesssize", option?.value ?? option)}
                            placeholder="Quy mô doanh nghiệp"
                            status={fieldErrors.BusinessSize ? "error" : undefined}
                            errorText={fieldErrors.BusinessSize}
                        />
                    </div>
                </Box>
            );
        case "contact":
            return (
                <Box className="flex flex-col gap-5">
                    <Input
                        label="Email cá nhân liên hệ"
                        value={profile?.email || ""}
                        onChange={e => onInput("email", e.target.value)}
                        placeholder="Email cá nhân liên hệ"
                        status={fieldErrors.email ? "error" : undefined}
                        errorText={fieldErrors.email}
                    />
                    <Input
                        label="Địa chỉ doanh nghiệp"
                        value={profile?.address || ""}
                        onChange={e => onInput("address", e.target.value)}
                        placeholder="Địa chỉ doanh nghiệp"
                        status={fieldErrors.address ? "error" : undefined}
                        errorText={fieldErrors.address}
                    />
                    <Input
                        label="Số điện thoại doanh nghiệp"
                        value={profile?.companyphone || ""}
                        onChange={e => onInput("companyphone", e.target.value)}
                        placeholder="Số điện thoại doanh nghiệp"
                        status={fieldErrors.companyphone ? "error" : undefined}
                        errorText={fieldErrors.companyphone}
                    />
                </Box>
            );
        default:
            return null;
    }
}

export default EnterpriseUpdateProfile;