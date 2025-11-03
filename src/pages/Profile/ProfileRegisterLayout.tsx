import React from "react";
import { Box, Button, DatePicker, Icon, Input, Text } from "zmp-ui";
import { FileText } from "lucide-react"
import Select from "../../components/Select";
import { useRegisterForm } from "../../hooks/useRegister";
import ProfileCompletionCard from "./ProfileCompletionCard";
import { useProfile } from "./useProfile";

const PersonalInfoSection: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleDateChange,
    settings,
    errors,
}) => (
    <Box className="bg-white flex flex-col gap-3">
        <Text className="text-lg font-semibold text-gray-700">Thông tin cá nhân</Text>
        {/* Full Name */}
        <Input
            label="Nhập họ và tên"
            value={formData.fullName}
            onChange={handleInputChange("fullName")}
            onBlur={handleInputBlur("fullName")}
            aria-label="Họ và Tên"
            helperText="Vui lòng nhập tên người dùng của bạn."
            placeholder="Họ và tên của bạn"
            maxLength={20}
            showCount
            status={touched?.fullName && errors?.fullName ? "error" : undefined}
            errorText={touched?.fullName ? errors?.fullName : undefined}
        />

        {/* Birth Date */}
        <DatePicker
            value={formData.birthDate}
            onChange={handleDateChange("birthDate")}
            label="Chọn ngày sinh"
            aria-label="Ngày sinh"
            status={touched?.birthDate && errors?.birthDate ? "error" : undefined}
            errorText={touched?.birthDate ? errors?.birthDate : undefined}
        />

        {/* Gender */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn giới tính</Text>
            <Select
                type="single"
                options={settings?.ListGenderUser || []}
                value={formData.gender}
                onChange={(option) => handleSelectChange("gender")(option?.label ?? option)}
                placeholder="Giới tính"
                status={touched?.gender && errors?.gender ? "error" : undefined}
                errorText={touched?.gender ? errors?.gender : undefined}
            />
        </div>

        {/* ID Card */}
        <Input
            label="Nhập số CCCD"
            value={formData.idCard}
            onChange={handleInputChange("idCard")}
            onBlur={handleInputBlur("idCard")}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={15}
            aria-label="Căn Cước Công Dân"
            placeholder="Số căn cước công dân"
            status={touched?.idCard && errors?.idCard ? "error" : undefined}
            errorText={touched?.idCard ? errors?.idCard : undefined}
            onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            helperText="Vui lòng nhập số CCCD gồm 9 hoặc 12 chữ số."
        />

        {/* Issue Date */}
        <DatePicker
            value={formData.issueDate}
            onChange={handleDateChange("issueDate")}
            label="Chọn ngày cấp"
            aria-label="Ngày cấp"
            status={touched?.issueDate && errors?.issueDate ? "error" : undefined}
            errorText={touched?.issueDate ? errors?.issueDate : undefined}
            helperText="Vui lòng chọn ngày cấp căn cước công dân."
        />

        {/* Issue Place */}
        <Input
            label="Nhập nơi cấp"
            value={formData.issuePlace}
            onChange={handleInputChange("issuePlace")}
            onBlur={handleInputBlur("issuePlace")}
            aria-label="Nơi cấp"
            placeholder="Nơi cấp căn cước"
            status={touched?.issuePlace && errors?.issuePlace ? "error" : undefined}
            errorText={touched?.issuePlace ? errors?.issuePlace : undefined}
            helperText="Vui lòng nhập nơi cấp căn cước công dân."
        />
        {/* Phone */}
        <Input
            label="Nhập số điện thoại"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            onBlur={handleInputBlur("phone")}
            inputMode="tel"
            pattern="[0-9]*"
            maxLength={15}
            aria-label="Số điện thoại"
            placeholder="Số điện thoại liên hệ"
            status={touched?.phone && errors?.phone ? "error" : undefined}
            errorText={touched?.phone ? errors?.phone : undefined}
            helperText="Vui lòng nhập số điện thoại liên hệ."
            prefix={<Box pl={4}><Icon icon="zi-call" /></Box>}
        />

        {/* Email */}
        <Input
            label="Nhập email"
            value={formData.email}
            onChange={handleInputChange("email")}
            onBlur={handleInputBlur("email")}
            aria-label="Email"
            placeholder="Email của bạn"
            status={touched?.email && errors?.email ? "error" : undefined}
            errorText={touched?.email ? errors?.email : undefined}
            helperText="Vui lòng nhập địa chỉ email hợp lệ."
        />
        {/* Ethnicity */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn dân tộc</Text>
            <Select
                type="single"
                options={settings?.ListEthnicity || []}
                value={formData.ethnicity}
                onChange={(option) => handleSelectChange("ethnicity")(option?.label ?? option)}
                placeholder="Dân tộc"
                status={touched?.ethnicity && errors?.ethnicity ? "error" : undefined}
                errorText={touched?.ethnicity ? errors?.ethnicity : undefined}
            />
        </div>

        {/* Address */}
        <Input
            label="Nhập địa chỉ liên lạc"
            value={formData.address}
            onChange={handleInputChange("address")}
            onBlur={handleInputBlur("address")}
            aria-label="Địa chỉ liên lạc"
            placeholder="Địa chỉ liên lạc"
            status={touched?.address && errors?.address ? "error" : undefined}
            errorText={touched?.address ? errors?.address : undefined}
        />

        {/* Education Level */}
        <Input
            label="Nhập trình độ học vấn"
            value={formData.educationLevel}
            onChange={handleInputChange("educationLevel")}
            onBlur={handleInputBlur("educationLevel")}
            aria-label="Trình độ học vấn"
            placeholder="Trình độ học vấn"
            status={touched?.educationLevel && errors?.educationLevel ? "error" : undefined}
            errorText={touched?.educationLevel ? errors?.educationLevel : undefined}
        />

        {/* CMKT Level */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn trình độ CMKT</Text>
            <Select
                type="single"
                options={settings?.TechnicalLevel || []}
                value={formData.cmktLevel}
                onChange={(option) => handleSelectChange("cmktLevel")(option?.label ?? option)}
                placeholder="Trình độ CMKT"
                status={touched?.cmktLevel && errors?.cmktLevel ? "error" : undefined}
                errorText={touched?.cmktLevel ? errors?.cmktLevel : undefined}
            />
        </div>
        {/* Major */}
        <Input
            label="Nhập chuyên ngành đào tạo"
            value={formData.major}
            onChange={handleInputChange("major")}
            onBlur={handleInputBlur("major")}
            aria-label="Chuyên ngành đào tạo"
            placeholder="Chuyên ngành đào tạo"
            status={touched?.major && errors?.major ? "error" : undefined}
            errorText={touched?.major ? errors?.major : undefined}
        />

        {/* School */}
        <Input
            label="Nhập tên trường tốt nghiệp"
            value={formData.school}
            onChange={handleInputChange("school")}
            onBlur={handleInputBlur("school")}
            aria-label="Tên trường tốt nghiệp"
            placeholder="Tên trường tốt nghiệp"
            status={touched?.school && errors?.school ? "error" : undefined}
            errorText={touched?.school ? errors?.school : undefined}
        />

        {/* Desired Job */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn ngành nghề (tối đa 2)</Text>
            <Select
                type="multi"
                options={settings?.ListJob || []}
                value={formData.desiredJob}
                onChange={(selected) => handleSelectChange("desiredJob")(selected)}
                max={2}
                placeholder="Ngành nghề"
                status={touched?.desiredJob && errors?.desiredJob ? "error" : undefined}
                errorText={touched?.desiredJob ? errors?.desiredJob : undefined}
            />
        </div>

        {/* Summary */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Giới thiệu bản thân</Text>
            <textarea
                className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                maxLength={500}
                placeholder="Giới thiệu bản thân (tối đa 500 ký tự)"
                value={formData.summary}
                onChange={handleInputChange("summary")}
            />
        </div>
    </Box>
);

const ProfileRegisterLayout: React.FC<{ profileData?: any; signInStatus?: 'idle' | 'success' | 'fail' }> = ({ profileData, signInStatus }) => {
    // Calculate completion percent
    const getCompletionPercent = () => {
        // List all required fields
        const requiredFields = [
            'fullName', 'birthDate', 'gender', 'idCard', 'issueDate', 'issuePlace',
            'phone', 'email', 'ethnicity', 'address', 'educationLevel', 'cmktLevel',
            'major', 'school', 'desiredJob', 'summary'
        ];
        let filled = 0;
        for (const field of requiredFields) {
            const value = formData[field];
            if (Array.isArray(value)) {
                if (value.length > 0) filled++;
            } else if (value instanceof Date) {
                if (!Number.isNaN(value.getTime())) filled++;
            } else if (typeof value === 'string') {
                if (value.trim() !== '') filled++;
            } else if (value) {
                filled++;
            }
        }
        return Math.round((filled / requiredFields.length) * 100);
    };

    React.useEffect(() => {
        console.log('[DEBUG] ProfileRegisterLayout props:', { profileData, signInStatus });
    }, [profileData, signInStatus]);
    // ...existing code...
    const {
        formData,
        touched,
        errors,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
        handleSubmit,
        setTouched,
        setFormData,
        validateForm,
    } = useRegisterForm();

    const [showToast, setShowToast] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [laboreSignUpLoading, setLaboreSignUpLoading] = React.useState(false);
    const { settings } = useProfile();

    // Autofill from profileData after sign in
    React.useEffect(() => {
        if (signInStatus === 'success' && profileData) {
            console.log('[DEBUG] Autofilling form with profileData:', profileData);
            // Convert DD/MM/YYYY to YYYY-MM-DD for ciddate
            const parseDDMMYYYY = (str: string) => {
                if (!str || typeof str !== 'string') return null;
                const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                if (match) {
                    const [_, dd, mm, yyyy] = match;
                    return `${yyyy}-${mm}-${dd}`;
                }
                return str; // fallback to original string
            };
            let parsedIssueDate: string | null = null;
            let parsedBirthDate: string | null = null;
            if (profileData.ciddate) {
                parsedIssueDate = parseDDMMYYYY(profileData.ciddate);
            }
            if (profileData.dateofbirth) {
                parsedBirthDate = parseDDMMYYYY(profileData.dateofbirth);
            }
            setFormData((prev: any) => ({
                ...prev,
                fullName: profileData.fullname || prev.fullName,
                birthDate:
                    parsedBirthDate && typeof parsedBirthDate === 'string'
                        ? new Date(parsedBirthDate)
                        : prev.birthDate,
                gender: profileData.gender || prev.gender,
                idCard: profileData.cid || prev.idCard,
                issueDate:
                    parsedIssueDate && typeof parsedIssueDate === 'string'
                        ? new Date(parsedIssueDate)
                        : prev.issueDate,
                issuePlace: profileData.cidaddress || prev.issuePlace,
                phone: profileData.phone || prev.phone,
                email: profileData.email || prev.email,
                ethnicity: profileData.ethnicity || prev.ethnicity,
                address: profileData.address || prev.address,
                educationLevel: profileData.traininglevel || prev.educationLevel,
                cmktLevel: profileData.highestlevelofexpertise || prev.cmktLevel,
                major: profileData.trainingmajor || prev.major,
                school: profileData.schoolgraduate || prev.school,
                desiredJob: profileData.desiredcareer || prev.desiredJob,
                summary: profileData.summary || prev.summary,
            }));
        }
    }, [signInStatus, profileData, setFormData]);

    const handleLaboreSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            setTouched((prev) => {
                const allTouched: { [key: string]: boolean } = { ...prev };
                const fields = [
                    "fullName", "birthDate", "gender", "idCard", "issueDate", "issuePlace", "phone", "email", "ethnicity", "address", "educationLevel", "cmktLevel", "major", "school", "desiredJob"
                ];
                for (const field of fields) {
                    allTouched[field] = true;
                }
                return allTouched;
            });
            setShowToast(false);
            return;
        }
        setLaboreSignUpLoading(true);
        setErrorMessage("");
        let apiError = "";
        try {
            // Map frontend fields to backend fields for update
            const safeDateString = (val: any) => {
                if (!val) return null;
                if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
                const d = new Date(val);
                return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
            };
            const safeString = (val: any) => {
                if (val === undefined || val === null || (typeof val === "string" && val.trim() === "")) return null;
                return val;
            };
            const updatePayloadRaw = {
                FullName: formData.fullName,
                DateOfBirth: safeDateString(formData.birthDate),
                Gender: formData.gender,
                CID: formData.idCard,
                CIDDate: safeDateString(formData.issueDate),
                CIDAddress: formData.issuePlace,
                Phone: formData.phone,
                Email: formData.email,
                Ethnicity: formData.ethnicity,
                Address: formData.address,
                Study: formData.educationLevel,
                TechnicalLevel: formData.cmktLevel,
                TrainingMajor: formData.major,
                GraduateSchool: formData.school,
                DesiredCareer: Array.isArray(formData.desiredJob)
                    ? formData.desiredJob.map((job: any) => typeof job === 'object' ? (job.value || job.label || job) : job)
                    : [],
                // Add other fields if present in formData
                Summary: safeString(formData.summary),
                Salary: formData.salary || "",
                Experience: formData.experience || 0,
                EducationQualifications: formData.educationQualifications || [],
                Skills: formData.skills || [],
                CPSkill: formData.cpSkill || "",
                FLanguages: formData.fLanguages || [],
                ExperienceSummary: formData.experienceSummary || "",
                InterviewFormat: formData.interviewFormat || "",
                Benefits: formData.benefits || [],
                CVPath: formData.cvPath || "",
            };
            // Remove CIDDate and Summary if they are null or empty
            const updatePayload = { ...updatePayloadRaw };
            if (updatePayload.CIDDate === null || updatePayload.CIDDate === "") {
                delete (updatePayload as any).CIDDate;
            }
            // Always include Summary as null if not provided
            if (updatePayload.Summary === null || updatePayload.Summary === "") {
                updatePayload.Summary = null;
            }

            if (signInStatus === 'success') {
                // Update profile if already signed in
                console.log('[DEBUG] UpdateProfile payload:', updatePayload);
                const { updateProfile } = await import('@/api/registerApi');
                const res = await updateProfile(updatePayload);
                console.log("UpdateProfile response:", res);
                if (res?.StatusResult?.Code === 0) {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                    const { getProfile } = await import('./api');
                    await getProfile(); // fetch profile, parent will update profileData prop
                    // profileData is now managed by parent, do not set here
                } else {
                    console.error('[DEBUG] updateProfile API error:', res);
                    apiError = res?.StatusResult?.Message || "Cập nhật thông tin thất bại.";
                    setErrorMessage(apiError);
                }
            }

            // Only run LaboreSignUp if signInStatus is 'fail'
            if (signInStatus === 'fail') {
                // Fetch Zalo auth fields
                const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
                const Accesstoken = await getAccessToken();
                const phoneRes = await getPhoneNumber();
                const Code = phoneRes?.token || "";
                const ZaloId = await getUserID();

                // Map frontend fields to backend fields for sign up
                const payload = {
                    Accesstoken,
                    Code,
                    ZaloId,
                    ...updatePayload,
                };
                // Call LaboreSignUp
                const { laborerSignUp, signIn } = await import('@/api/registerApi');
                const res = await laborerSignUp(payload);
                console.log("LaboreSignUp response:", res);
                if (res?.Success) {
                    // Try sign in again
                    const signInRes = await signIn({ Accesstoken, Code, ZaloId });
                    console.log("SignIn response:", signInRes);
                    if (signInRes?.Success) {
                        // signInStatus is now managed by parent, do not set here
                        const { getProfile } = await import('./api');
                        await getProfile(); // fetch profile, parent will update profileData prop
                        // profileData is now managed by parent, do not set here
                    }
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                } else {
                    apiError = res?.Message || "Đăng ký thất bại.";
                    setErrorMessage(apiError);
                }
            }
        } catch (err) {
            console.error('[DEBUG] handleLaboreSignUp error:', err);
            setShowToast(false);
            setErrorMessage(apiError || "Có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setLaboreSignUpLoading(false);
        }
    };

    const [cvFile, setCvFile] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleUploadCV = () => {
        if (!cvFile && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-md mx-auto pt">
                {signInStatus === 'success' && (
                    <div className="mb-4">
                        <ProfileCompletionCard percent={getCompletionPercent()} />
                    </div>
                )}
                <div className="bg-white rounded-lg mb-3">
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
                </div>
                <form>
                    <PersonalInfoSection
                        formData={formData}
                        touched={touched}
                        handleInputChange={handleInputChange}
                        handleInputBlur={handleInputBlur}
                        handleSelectChange={handleSelectChange}
                        handleDateChange={handleDateChange}
                        settings={settings}
                        errors={errors}
                    />
                    {/* Only show summary if signed in */}
                    {signInStatus === 'success' && (
                        <div className="mb-4">
                            <Text className="text-sm text-[#141415] mb-2">Giới thiệu bản thân</Text>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                maxLength={500}
                                placeholder="Giới thiệu bản thân (tối đa 500 ký tự)"
                                value={formData.summary}
                                onChange={e => handleInputChange("summary")(e as any)}
                            />
                        </div>
                    )}
                    {showToast && (
                        <div className="text-green-600 text-center mb-2 font-semibold">Cập nhật thông tin thành công</div>
                    )}
                    {errorMessage && (
                        <div className="text-red-600 text-center mb-2 font-semibold">{errorMessage}</div>
                    )}
                    {signInStatus === 'success' ? (
                        <Button
                            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mt-6"
                            loading={laboreSignUpLoading}
                            onClick={handleLaboreSignUp}
                        >
                            Cập nhật hồ sơ cá nhân
                        </Button>
                    ) : (
                        <Button
                            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mt-6"
                            loading={laboreSignUpLoading}
                            onClick={handleLaboreSignUp}
                        >
                            Tạo tài khoản
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfileRegisterLayout;
// Dummy implementation since success message logic is now handled by toast
function setSuccessMessage(_: string) {
    //: success feedback is shown via showToast state
    // No-op
}