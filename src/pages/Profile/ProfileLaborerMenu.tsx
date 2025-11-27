import { updateProfile } from "@/api/registerApi";
import { ChevronDown, ChevronUp, FileText, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, DatePicker, Input, Text } from "zmp-ui";
import Select from "../../components/Select";
import { getProfileWithToken } from "./api";
import { useProfile } from "./useProfile";

const sectionDefs = [
    { key: "personal", title: "1. Thông tin cá nhân", defaultOpen: true },
    { key: "idcard", title: "2. CCCD / CMND", defaultOpen: false },
    { key: "education", title: "3. Trình độ học vấn & Chuyên môn", defaultOpen: false },
    { key: "career", title: "4. Ngành nghề mong muốn", defaultOpen: false },
    { key: "summary", title: "5. Tóm tắt bản thân", defaultOpen: false },
    { key: "cv", title: "6. File CV đính kèm", defaultOpen: false },
];

const ProfileLaborerMenu: React.FC<{ accessToken: string }> = ({ accessToken }) => {
        const [showToast, setShowToast] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");
    const [profile, setProfile] = useState<any>(null);
    const [editProfile, setEditProfile] = useState<any>(null);
    const [expanded, setExpanded] = useState(() => sectionDefs.map(s => s.defaultOpen));
    const [saving, setSaving] = useState(false);
    const { settings } = useProfile();
    const [cvFile, setCvFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            const res = await getProfileWithToken(accessToken);
            const data = res?.Data || {};
            setProfile(data);
            setEditProfile(data);
            // Load avatar from localStorage if exists, else use from profile
            const localAvatar = localStorage.getItem("laborer_avatar");
            setAvatarPreview(localAvatar || data.avatar || null);
        }
        fetchProfile();
    }, [accessToken]);

    const handleExpand = idx => {
        setExpanded(expanded => expanded.map((v, i) => (i === idx ? !v : v)));
    };

    const handleInput = (field: string, value: any) => {
        setEditProfile((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSelect = (field: string) => (option: any) => {
        setEditProfile((prev: any) => ({ ...prev, [field]: option?.label ?? option }));
    };

    const handleMultiSelect = (field: string) => (selected: any) => {
        setEditProfile((prev: any) => ({ ...prev, [field]: Array.isArray(selected) ? selected.map(opt => opt?.label ?? opt) : [] }));
    };

    const handleDateChange = (field: string) => (date: any) => {
        setEditProfile((prev: any) => ({ ...prev, [field]: date }));
    };

    const handleUploadCV = () => {
        if (!cvFile && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpdateProfile = async () => {
        setSaving(true);
        setShowToast(false);
        setErrorMessage("");
        try {
            let avatarUrl = avatarPreview || editProfile?.avatar || "";
            if (avatarFile && avatarPreview) {
                localStorage.setItem("laborer_avatar", avatarPreview);
                avatarUrl = avatarPreview;
            }
            const safeDateString = (val: any) => {
                if (!val) return undefined;
                if (val instanceof Date && !Number.isNaN(val.getTime())) {
                    return val.toISOString().slice(0, 10);
                }
                if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
                const match = typeof val === "string" ? val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/) : null;
                if (match) {
                    const [_, dd, mm, yyyy] = match;
                    return `${yyyy}-${mm}-${dd}`;
                }
                const d = new Date(val);
                return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
            };
            const updatePayloadRaw = {
                FullName: editProfile?.fullname,
                DateOfBirth: safeDateString(editProfile?.dateofbirth),
                Gender: editProfile?.gender,
                CID: editProfile?.cid,
                CIDDate: safeDateString(editProfile?.ciddate),
                CIDAddress: editProfile?.cidaddress,
                Phone: editProfile?.phone,
                Email: typeof editProfile?.email === 'string' ? editProfile.email.toLowerCase() : editProfile?.email,
                Ethnicity: editProfile?.ethnicity,
                Address: editProfile?.address,
                Study: editProfile?.traininglevel,
                TechnicalLevel: editProfile?.highestlevelofexpertise,
                cpskill: editProfile?.cpskill,
                RecruitmentType: editProfile?.recruitmentType,
                TrainingMajor: editProfile?.trainingmajor,
                GraduateSchool: editProfile?.schoolgraduate,
                DesiredCareer: Array.isArray(editProfile?.desiredcareer)
                    ? editProfile.desiredcareer.map((job: any) => typeof job === 'object' ? (job.value || job.label || job) : job)
                    : [],
                Summary: editProfile?.summary,
                interviewformat: editProfile?.interviewformat,
                ExperienceSummary: editProfile?.experienceSummary,
                Salary: editProfile?.salary || "",
                CVPath: editProfile?.cvPath || "",
                avatar: avatarUrl,
            };
            const updatePayload = { ...updatePayloadRaw };
            if (updatePayload.DateOfBirth === undefined) delete updatePayload.DateOfBirth;
            if (updatePayload.CIDDate === undefined) delete updatePayload.CIDDate;
            const res = await updateProfile(updatePayload, accessToken);
            if (res?.StatusResult?.Code === 0) {
                setShowToast(true);
                setErrorMessage("");
                setTimeout(() => setShowToast(false), 2000);
            } else {
                setErrorMessage(res?.StatusResult?.Message || res?.Message || "Cập nhật thất bại!");
            }
            const profileRes = await getProfileWithToken(accessToken);
            setProfile(profileRes?.Data || {});
            setEditProfile(profileRes?.Data || {});
            setAvatarPreview(localStorage.getItem("laborer_avatar") || profileRes?.Data?.avatar || null);
            setAvatarFile(null);
        } catch (err: any) {
            setErrorMessage("Có lỗi xảy ra khi cập nhật!");
        } finally {
            setSaving(false);
        }
    };

    // Avatar and name
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="flex flex-col items-center pt-6">
                <div className="relative">
                    <img
                        src={avatarPreview || editProfile?.avatar || "/default-avatar.png"}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
                        style={{ aspectRatio: "1/1" }}
                        onClick={() => avatarInputRef.current?.click()}
                        onError={e => {
                            (e.target as HTMLImageElement).src = "/default-avatar.png";
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={avatarInputRef}
                        style={{ display: "none" }}
                        onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setAvatarFile(file);
                                const reader = new FileReader();
                                reader.onload = ev => {
                                    setAvatarPreview(ev.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow" title="Đổi ảnh đại diện" onClick={() => avatarInputRef.current?.click()}>
                        <User size={18} />
                    </button>
                </div>
                <Text className="mt-2 text-xl font-bold">{editProfile?.fullname || "Họ tên"}</Text>
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
                                    onSelect={handleSelect}
                                    onMultiSelect={handleMultiSelect}
                                    onDateChange={handleDateChange}
                                    settings={settings}
                                    cvFile={cvFile}
                                    setCvFile={setCvFile}
                                    fileInputRef={fileInputRef}
                                    handleUploadCV={handleUploadCV}
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
                    onClick={handleUpdateProfile}
                >
                    Cập nhật thông tin cá nhân
                </Button>
            </div>
        </div>
    );
};

function SectionContent({ section, profile, onInput, onSelect, onMultiSelect, onDateChange, settings, cvFile, setCvFile, fileInputRef, handleUploadCV }) {
    // Helper to parse DD/MM/YYYY or YYYY-MM-DD to Date
    const parseDate = (str) => {
        if (!str || typeof str !== 'string') return undefined;
        // DD/MM/YYYY
        const match = str.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/);
        if (match) {
            const [_, dd, mm, yyyy] = match;
            return new Date(`${yyyy}-${mm}-${dd}`);
        }
        // YYYY-MM-DD
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(str)) {
            return new Date(str);
        }
        // fallback
        return new Date(str);
    };
    switch (section) {
        case "personal":
            return (
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
                    <Input
                        label="Nhập họ và tên"
                        value={profile?.fullname || ""}
                        onChange={e => onInput("fullname", e.target.value)}
                        placeholder="Họ và tên của bạn"
                        maxLength={20}
                        showCount
                    />
                    <DatePicker
                        value={profile?.dateofbirth ? parseDate(profile.dateofbirth) : undefined}
                        onChange={onDateChange("dateofbirth")}
                        label="Chọn ngày sinh"
                    />
                    <div>
                        <Text className="text-sm text-[#141415] mb-2">Chọn giới tính</Text>
                        <Select
                            type="single"
                            options={settings?.ListGenderUser || []}
                            value={profile?.gender || ""}
                            onChange={onSelect("gender")}
                            placeholder="Giới tính"
                        />
                    </div>
                    <div>
                        <Text className="text-sm text-[#141415] mb-2">Chọn dân tộc</Text>
                        <Select
                            type="single"
                            options={settings?.ListEthnicity || []}
                            value={profile?.ethnicity || ""}
                            onChange={onSelect("ethnicity")}
                            placeholder="Dân tộc"
                        />
                    </div>
                    <Input
                        label="SĐT"
                        value={profile?.phone || ""}
                        onChange={e => onInput("phone", e.target.value)}
                        inputMode="tel"
                        maxLength={15}
                        placeholder="Số điện thoại liên hệ"
                    />
                    <Input
                        label="Email"
                        value={profile?.email || ""}
                        onChange={e => onInput("email", e.target.value)}
                        placeholder="Email của bạn"
                    />
                    <Input
                        label="Địa chỉ liên lạc"
                        value={profile?.address || ""}
                        onChange={e => onInput("address", e.target.value)}
                        placeholder="Địa chỉ liên lạc"
                    />
                </Box>
            );
        case "idcard":
            return (
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
                    <Input
                        label="Nhập số CCCD"
                        value={profile?.cid || ""}
                        onChange={e => onInput("cid", e.target.value)}
                        inputMode="numeric"
                        maxLength={15}
                        placeholder="Số căn cước công dân"
                    />
                    <DatePicker
                        value={profile?.ciddate ? parseDate(profile.ciddate) : undefined}
                        onChange={onDateChange("ciddate")}
                        label="Chọn ngày cấp"
                    />
                    <Input
                        label="Nhập nơi cấp"
                        value={profile?.cidaddress || ""}
                        onChange={e => onInput("cidaddress", e.target.value)}
                        placeholder="Nơi cấp căn cước"
                    />
                </Box>
            );
        case "education":
            return (
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
                    <Input
                        label="Nhập trình độ học vấn"
                        value={profile?.traininglevel || ""}
                        onChange={e => onInput("traininglevel", e.target.value)}
                        placeholder="Trình độ học vấn"
                    />
                    <div>
                        <Text className="text-sm text-[#141415] mb-2">Chọn trình độ CMKT</Text>
                        <Select
                            type="single"
                            options={settings?.TechnicalLevel || []}
                            value={profile?.highestlevelofexpertise || ""}
                            onChange={onSelect("highestlevelofexpertise")}
                            placeholder="Trình độ CMKT"
                        />
                    </div>
                    <div>
                        <Text className="text-sm text-[#141415] mb-2">Chọn trình độ Tin học</Text>
                        <Select
                            type="single"
                            options={settings?.ComputerSkill || []}
                            value={profile?.cpskill || ""}
                            onChange={onSelect("cpskill")}
                            placeholder="Trình độ Tin học"
                        />
                    </div>
                    <div>
                        <Text className="text-sm text-[#141415] mb-2">Chọn hình thức tuyển dụng</Text>
                        <Select
                            type="single"
                            options={settings?.InterviewFormats || []}
                            value={profile?.interviewformat || ""}
                            onChange={onSelect("interviewformat")}
                            placeholder="Hình thức tuyển dụng"
                        />
                    </div>
                    <Input
                        label="Nhập chuyên ngành đào tạo"
                        value={profile?.trainingmajor || ""}
                        onChange={e => onInput("trainingmajor", e.target.value)}
                        placeholder="Chuyên ngành đào tạo"
                    />
                    <Input
                        label="Nhập tên trường tốt nghiệp"
                        value={profile?.schoolgraduate || ""}
                        onChange={e => onInput("schoolgraduate", e.target.value)}
                        placeholder="Tên trường tốt nghiệp"
                    />
                </Box>
            );
        case "career":
            return (
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
                    <div>
                        <Text className="text-sm text-[#141415] mb-2">Chọn ngành nghề (tối đa 2)</Text>
                        <Select
                            type="multi"
                            options={settings?.ListJob || []}
                            value={profile?.desiredcareer || []}
                            onChange={onMultiSelect("desiredcareer")}
                            max={2}
                            placeholder="Ngành nghề"
                        />
                    </div>
                    <Input
                        label="Mức lương mong muốn"
                        value={profile?.salary || ""}
                        onChange={e => onInput("salary", e.target.value)}
                        placeholder="Mức lương mong muốn"
                    />
                </Box>
            );
        case "summary":
            return (
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
                    <Box className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Tóm tắt bản thân</label>
                        <textarea
                            value={profile?.summary || ""}
                            onChange={e => onInput("summary", e.target.value)}
                            rows={4}
                            placeholder="Giới thiệu bản thân (tối đa 500 ký tự)"
                            maxLength={500}
                            className="w-full min-h-[80px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                    </Box>
                    <Box className="flex flex-col gap-1 mt-3">
                        <label className="text-sm font-medium text-gray-700">Mô tả kinh nghiệm làm việc</label>
                        <textarea
                            value={profile?.experienceSummary || ""}
                            onChange={e => onInput("experienceSummary", e.target.value)}
                            rows={4}
                            placeholder="Mô tả kinh nghiệm làm việc (tối đa 500 ký tự)"
                            maxLength={500}
                            className="w-full min-h-[80px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                    </Box>
                </Box>
            );
        case "cv":
            return (
                <Box className="bg-white flex flex-col gap-3 width-full p-2 rounded-lg">
                    <button
                        onClick={handleUploadCV}
                        className="w-full flex items-center p-3 gap-3 hover:bg-gray-50 rounded-lg border border-gray-200 active:scale-95 transition-transform duration-150"
                        aria-label="Tải lên CV"
                        disabled={!!cvFile}
                    >
                        <div className="w-10 h-10 bg-[#E3F2FD] text-[#1565C0] rounded-md flex items-center justify-center">
                            <FileText size={18} />
                        </div>
                        <div className="text-sm text-gray-700">Tải lên CV</div>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={e => {
                            const file = e.target.files?.[0] ?? null;
                            if (file) setCvFile(file);
                        }}
                        disabled={!!cvFile}
                    />
                    {cvFile && (
                        <div className="flex items-center justify-between bg-gray-100 rounded px-3 py-2 mt-2">
                            <span className="text-sm font-medium text-gray-800 truncate mr-2">{cvFile.name}</span>
                            <button
                                type="button"
                                className="text-red-500 text-lg font-bold px-2 py-0.5 rounded hover:bg-red-100"
                                onClick={() => setCvFile(null)}
                                aria-label="Xóa CV"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </Box>
            );
        default:
            return null;
    }
}

export default ProfileLaborerMenu;
