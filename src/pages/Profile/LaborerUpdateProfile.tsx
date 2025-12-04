import { updateProfile } from "@/api/registerApi";
import {
    AlertCircle,
    BookOpen,
    Briefcase,
    Camera,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    FileText,
    GraduationCap,
    IdCard,
    Mail,
    MapPin,
    Phone,
    Target,
    Upload,
    User
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button, DatePicker, Input } from "zmp-ui";
import Select from "../../components/Select";
import { getProfileWithToken } from "./api";
import { useProfile } from "./useProfile";

const sectionDefs = [
    { key: "personal", title: "Thông tin cá nhân", icon: User, defaultOpen: true },
    { key: "idcard", title: "CCCD / CMND", icon: IdCard, defaultOpen: true },
    { key: "education", title: "Học vấn & Chuyên môn", icon: GraduationCap, defaultOpen: false },
    { key: "career", title: "Mục tiêu nghề nghiệp", icon: Target, defaultOpen: false },
    { key: "summary", title: "Giới thiệu bản thân", icon: BookOpen, defaultOpen: false },
    { key: "cv", title: "CV đính kèm", icon: FileText, defaultOpen: false },
];

const LaborerUpdateProfile: React.FC = () => {
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

    const accessToken = localStorage.getItem("accessToken") || "";

    useEffect(() => {
        async function fetchProfile() {
            const res = await getProfileWithToken(accessToken);
            const data = res?.Data || {};
            setProfile(data);
            setEditProfile(data);
            setAvatarPreview(data.avatar || null);
        }
        if (accessToken) fetchProfile();
    }, [accessToken]);

    const toggleSection = (idx: number) => {
        setExpanded(prev => prev.map((v, i) => (i === idx ? !v : v)));
    };

    const handleInput = (field: string, value: any) => {
        setEditProfile((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSelect = (field: string) => (option: any) => {
        const value = option?.label ?? option ?? "";
        setEditProfile((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleMultiSelect = (field: string) => (selected: any[]) => {
        const values = selected.map(opt => opt?.label ?? opt ?? "");
        setEditProfile((prev: any) => ({ ...prev, [field]: values }));
    };

    const handleDateChange = (field: string) => (date: Date | null) => {
        setEditProfile((prev: any) => ({ ...prev, [field]: date }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = () => setAvatarPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleCVUpload = () => fileInputRef.current?.click();

    const handleUpdateProfile = async () => {
        setSaving(true);
        setShowToast(false);
        setErrorMessage("");

        try {
            const safeDateString = (val: any): string | undefined => {
                if (!val) return undefined;
                if (val instanceof Date && !isNaN(val.getTime())) return val.toISOString().slice(0, 10);
                if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
                const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                if (match) return `${match[3]}-${match[2]}-${match[1]}`;
                return undefined;
            };

            const payload: any = {
                FullName: editProfile?.fullname || "",
                DateOfBirth: safeDateString(editProfile?.dateofbirth),
                Gender: editProfile?.gender || "",
                CID: editProfile?.cid || "",
                CIDDate: safeDateString(editProfile?.ciddate),
                CIDAddress: editProfile?.cidaddress || "",
                Phone: editProfile?.phone || "",
                Email: editProfile?.email?.toLowerCase() || "",
                Ethnicity: editProfile?.ethnicity || "",
                Address: editProfile?.address || "",
                Study: editProfile?.traininglevel || "",
                TechnicalLevel: editProfile?.highestlevelofexpertise || "",
                cpskill: editProfile?.cpskill || "",
                RecruitmentType: editProfile?.recruitmentType || "",
                TrainingMajor: editProfile?.trainingmajor || "",
                GraduateSchool: editProfile?.schoolgraduate || "",
                DesiredCareer: Array.isArray(editProfile?.desiredcareer) ? editProfile.desiredcareer : [],
                Summary: editProfile?.summary || "",
                interviewformat: editProfile?.interviewformat || "",
                ExperienceSummary: editProfile?.experienceSummary || "",
                Salary: editProfile?.salary || "",
                avatar: avatarPreview || editProfile?.avatar || "",
            };

            const res = await updateProfile(payload, accessToken);
            if (res?.StatusResult?.Code === 0) {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);

                const fresh = await getProfileWithToken(accessToken);
                setProfile(fresh?.Data);
                setEditProfile(fresh?.Data);
                if (avatarPreview) localStorage.setItem("laborer_avatar", avatarPreview);
            } else {
                setErrorMessage(res?.StatusResult?.Message || "Cập nhật thất bại!");
            }
        } catch (err) {
            setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 pb-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 pt-12 pb-20 px-6 rounded-b-3xl shadow-2xl">
                <div className="text-center text-white">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
                            <img
                                src={profile?.avatar
                                    ? profile.avatar
                                    : "https://ttld.sweetsoft.vn/ImageHandler.aspx?id=fc6d0935-3e70-4d39-b295-3c23f552e86d&t=StaffImage&def=/Images/img/no_avatar.jpg&cache=1&quality=100"}
                                alt="Ảnh đại diện"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={() => avatarInputRef.current?.click()}
                            className="absolute bottom-1 right-1 bg-white text-blue-600 rounded-full p-3 shadow-lg hover:scale-110 transition"
                        >
                            <Camera size={20} />
                        </button>
                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{editProfile?.fullname || "Tên của bạn"}</h2>
                    <p className="mt-2 opacity-90 text-lg">Cập nhật hồ sơ để tăng cơ hội việc làm</p>
                </div>
            </div>

            <div className="px-5 -mt-12">
                <div className="space-y-5 max-w-2xl mx-auto">
                    {sectionDefs.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.key}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                            >
                                <button
                                    onClick={() => toggleSection(idx)}
                                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Icon size={24} className="text-blue-600" />
                                        </div>
                                        <span className="text-lg font-semibold text-gray-800">{section.title}</span>
                                    </div>
                                    {expanded[idx] ? <ChevronUp size={24} className="text-gray-500" /> : <ChevronDown size={24} className="text-gray-500" />}
                                </button>

                                {expanded[idx] && (
                                    <div className="px-6 pb-6 pt-2">
                                        <SectionContent
                                            section={section.key}
                                            profile={editProfile || {}}
                                            onInput={handleInput}
                                            onSelect={handleSelect}
                                            onMultiSelect={handleMultiSelect}
                                            onDateChange={handleDateChange}
                                            settings={settings}
                                            cvFile={cvFile}
                                            setCvFile={setCvFile}
                                            fileInputRef={fileInputRef}
                                            handleUploadCV={handleCVUpload}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {showToast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-green-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-lg">
                        <CheckCircle size={28} />
                        Cập nhật thành công!
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-pulse">
                    <div className="bg-red-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-lg">
                        <AlertCircle size={28} />
                        {errorMessage}
                    </div>
                </div>
            )}

            <div className=" p-4 border-gray-200 shadow-2xl pb-10">
                <Button
                    fullWidth
                    size="large"
                    loading={saving}
                    onClick={handleUpdateProfile}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                >
                    Lưu thay đổi
                </Button>
            </div>
        </div>
    );
};

// Component con - SectionContent (đã làm đẹp cực kỳ)
function SectionContent({ section, profile, onInput, onSelect, onMultiSelect, onDateChange, settings, cvFile, setCvFile, fileInputRef, handleUploadCV }) {
    const parseDate = (str: string) => {
        if (!str) return undefined;
        const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (match) return new Date(`${match[3]}-${match[2]}-${match[1]}`);
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str);
        return undefined;
    };

    const fieldClass = "rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

    switch (section) {
        case "personal":
            return (
                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
                        <Input value={profile.fullname || ""} onChange={e => onInput("fullname", e.target.value)} placeholder="Nguyễn Văn A" className={fieldClass} />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Ngày sinh</label>
                        <DatePicker value={profile.dateofbirth ? parseDate(profile.dateofbirth) : undefined} onChange={onDateChange("dateofbirth")} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Giới tính</label>
                            <Select type="single" options={settings?.ListGenderUser || []} value={profile.gender} onChange={onSelect("gender")} placeholder="Chọn" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Dân tộc</label>
                            <Select type="single" options={settings?.ListEthnicity || []} value={profile.ethnicity} onChange={onSelect("ethnicity")} placeholder="Chọn" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Phone size={18} /> Số điện thoại</label>
                        <Input value={profile.phone || ""} onChange={e => onInput("phone", e.target.value)} placeholder="0901234567" className={fieldClass} />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Mail size={18} /> Email</label>
                        <Input value={profile.email || ""} onChange={e => onInput("email", e.target.value)} placeholder="you@example.com" className={fieldClass} />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><MapPin size={18} /> Địa chỉ</label>
                        <Input value={profile.address || ""} onChange={e => onInput("address", e.target.value)} placeholder="Số nhà, đường, phường..." className={fieldClass} />
                    </div>
                </div>
            );

        case "idcard":
            return (
                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-semibold text-gray-700"><IdCard size={18} /> Số CCCD/CMND</label>
                        <Input value={profile.cid || ""} onChange={e => onInput("cid", e.target.value)} placeholder="012345678901" className={fieldClass} />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Ngày cấp</label>
                        <DatePicker value={profile.ciddate ? parseDate(profile.ciddate) : undefined} onChange={onDateChange("ciddate")} />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Nơi cấp</label>
                        <Input value={profile.cidaddress || ""} onChange={e => onInput("cidaddress", e.target.value)} placeholder="Công an tỉnh..." className={fieldClass} />
                    </div>
                </div>
            );

        case "education":
            return (
                <div className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><BookOpen size={18} /> Học vấn</label>
                        <Select type="single" options={settings?.ListEducation || []} value={profile.recruitmentType} onChange={onSelect("recruitmentType")} placeholder="Chọn học vấn" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Trình độ CMKT</label>
                        <Select type="single" options={settings?.TechnicalLevel || []} value={profile.highestlevelofexpertise} onChange={onSelect("highestlevelofexpertise")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Tin học văn phòng</label>
                        <Select type="single" options={settings?.ComputerSkill || []} value={profile.cpskill} onChange={onSelect("cpskill")} />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Chuyên ngành đào tạo</label>
                        <Input value={profile.trainingmajor || ""} onChange={e => onInput("trainingmajor", e.target.value)} className={fieldClass} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Kinh nghiệm làm việc</label>
                        <input
                            type="number"
                            min={0}
                            value={profile.experience ?? ""}
                            onChange={e => onInput("experience", e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="Nhập số năm kinh nghiệm"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>
                </div>
            );

        case "career":
            return (
                <div className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Briefcase size={18} /> Ngành nghề mong muốn (tối đa 2)</label>
                        <Select type="multi" options={settings?.ListJob || []} value={profile.desiredcareer || []} onChange={onMultiSelect("desiredcareer")} max={2} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"> Mức lương mong muốn</label>
                        <Select type="single" options={settings?.ListSalary || []} value={profile.salary} onChange={onSelect("salary")} />
                    </div>
                </div>
            );

        case "summary":
            return (
                <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Giới thiệu ngắn về bạn</label>
                        <textarea
                            value={profile.summary || ""}
                            onChange={e => onInput("summary", e.target.value)}
                            rows={5}
                            maxLength={500}
                            placeholder="Ví dụ: Kỹ sư phần mềm 3 năm kinh nghiệm, thành thạo React, Node.js..."
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">{(profile.summary || "").length}/500</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Mô tả kinh nghiệm làm việc</label>
                        <textarea
                            value={profile.experienceSummary || ""}
                            onChange={e => onInput("experienceSummary", e.target.value)}
                            rows={5}
                            maxLength={500}
                            placeholder="Mô tả chi tiết công việc đã làm..."
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>
                </div>
            );

        case "cv":
            return (
                <div className="text-center py-8">
                    <button
                        onClick={handleUploadCV}
                        className="w-full max-w-sm mx-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all active:scale-95"
                    >
                        <Upload size={32} className="mx-auto mb-3" />
                        <div className="text-lg font-semibold">Tải lên CV của bạn</div>
                        <p className="text-sm opacity-90 mt-1">PDF, Word, tối đa 5MB</p>
                    </button>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => e.target.files?.[0] && setCvFile(e.target.files[0])} />
                    {cvFile && (
                        <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 py-4 px-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText size={36} className="text-green-600" />
                                <div className="text-left">
                                    <p className="font-semibold text-green-800">{cvFile.name}</p>
                                    <p className="text-xs text-green-600">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button onClick={() => setCvFile(null)} className="text-red-500 font-semibold text-2xl">×</button>
                        </div>
                    )}
                </div>
            );

        default:
            return null;
    }
}

export default LaborerUpdateProfile;