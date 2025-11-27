import { enterpriseUpdateProfile } from "@/api/enterpriseApi";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "zmp-ui";
import Select from "../../components/Select";
import { getProfileWithToken } from "./api";
import { useProfile } from "./useProfile";

const sectionDefs = [
    { key: "company", title: "1. Thông tin doanh nghiệp", defaultOpen: false },
    { key: "contact", title: "2. Thông tin liên hệ", defaultOpen: false },
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
                // Fetch profile again after update
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
            // Optionally log error
            console.error("EnterpriseUpdateProfile error:", err);
            setErrorMessage("Có lỗi xảy ra khi cập nhật!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-gray-50">
            <div className="flex flex-col items-center pt-6">
                <div className="relative">
                    <img
                        src={editProfile?.avatar || "/default-avatar.png"}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow" title="Đổi ảnh đại diện">
                        <User size={18} />
                    </button>
                </div>
                <Text className="mt-2 text-xl font-bold">{editProfile?.companyname || "Tên doanh nghiệp"}</Text>
            </div>
            <div className="mt-4 mx-auto max-w-md">
                {sectionDefs.map((section, idx) => (
                    <div key={section.key} className="mb-4 bg-white rounded-lg shadow">
                        <button
                            className="w-full flex justify-between items-center px-4 py-3 border-b"
                            onClick={() => handleExpand(idx)}
                        >
                            <span className="font-semibold text-gray-700">{section.title}</span>
                            {expanded[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expanded[idx] && (
                            <div className="px-4 py-3">
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
            <div className="mx-auto max-w-md mt-4 flex flex-col items-center gap-2">
                {showToast && (
                    <div className="text-green-600 text-center mb-2 font-semibold">Cập nhật thông tin thành công</div>
                )}
                {errorMessage && (
                    <div className="text-red-600 text-center mb-2 font-semibold">{errorMessage}</div>
                )}
                <Button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    loading={saving}
                    disabled={saving}
                    onClick={handleUpdateProfile}
                >
                    Cập nhật thông tin doanh nghiệp
                </Button>
            </div>
        </div>
    );
};

function SectionContent({ section, profile, onInput, fieldErrors, settings }) {
    switch (section) {
        case "company":
            return (
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
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
                        <Text className="text-sm text-[#141415] mb-2">Chọn quy mô doanh nghiệp</Text>
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
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
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
