import React, { useContext } from "react";
import { Box, Button, DatePicker, Icon, Input, Text } from "zmp-ui";
import Select from "../../components/Select";
import { useRegisterForm } from "../../hooks/useRegister";
import { ZaloAuthContext } from "./ProfileSection";
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
    <Box className="bg-white flex flex-col gap-3 width-full p-4 rounded-lg shadow-lg mb-4">
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
    </Box>
);

const ProfileRegisterLayout: React.FC<{ profileData?: any; signInStatus?: 'idle' | 'success' | 'fail' }> = ({ profileData, signInStatus }) => {
    // Default signInStatus to 'fail' if not provided
    const effectiveSignInStatus = signInStatus ?? 'fail';
    // Get Zalo auth context at top level (fix hook error)
    const zaloAuth = useContext(ZaloAuthContext);
    // Always use the token from signIn response for updateProfile
    const signInAccessToken = profileData?.accessToken;
    const getCompletionPercent = () => {
        // List all required fields
        const requiredFields = [
            'fullName', 'birthDate', 'gender', 'idCard', 'issueDate', 'issuePlace',
            'phone', 'email', 'ethnicity', 'address', 'educationLevel', 'cmktLevel',
            'major', 'school', 'desiredJob'
        ];
        // Only require summary if effectiveSignInStatus is 'success'
        if (effectiveSignInStatus === 'success') {
            requiredFields.push('summary');
        }
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

    const {
        formData,
        touched,
        errors,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
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
        if (effectiveSignInStatus === 'success' && profileData) {
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
    }, [effectiveSignInStatus, profileData, setFormData]);

    const handleLaboreSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('[DEBUG] handleLaboreSignUp called with formData:', formData);
        const isValid = validateForm();
        if (!isValid) {
            setTouched((prev) => {
                const allTouched: { [key: string]: boolean } = { ...prev };
                const fields = [
                    "fullName", "birthDate", "gender", "idCard", "issueDate", "issuePlace", "phone", "email", "ethnicity", "address", "educationLevel", "cmktLevel", "major", "school", "desiredJob"
                ];
                // Only require summary if effectiveSignInStatus is 'success'
                if (effectiveSignInStatus === 'success') {
                    fields.push("summary");
                }
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
                Email: typeof formData.email === 'string' ? formData.email.toLowerCase() : formData.email,
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

            if (effectiveSignInStatus === 'success') {
                // Always use the token from signIn response for updateProfile
                const Accesstoken = signInAccessToken;
                // Map frontend fields to backend fields for sign up
                const payload = {
                    Accesstoken,
                    ...updatePayload,
                };
                const { updateProfile } = await import('@/api/registerApi');
                const res = await updateProfile(payload, Accesstoken);
                if (res?.StatusResult?.Code === 0) {
                    setShowToast(true);
                    setErrorMessage("");
                    setTimeout(() => setShowToast(false), 2000);
                    const { getProfileWithToken } = await import('./api');
                    await getProfileWithToken(Accesstoken || '');
                } else {
                    console.error('[DEBUG] updateProfile API error:', res);
                    apiError = res?.StatusResult?.Message || "Cập nhật thông tin thất bại.";
                    // If token expired, show specific message
                    if (apiError.includes('hết hạn') || apiError.toLowerCase().includes('expired')) {
                        setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                    } else {
                        setErrorMessage(apiError);
                    }
                }
            }

            // Only run LaboreSignUp if effectiveSignInStatus is 'fail'
            if (effectiveSignInStatus === 'fail') {
                // Always fetch fresh Zalo credentials before sign up
                const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
                const Accesstoken = await getAccessToken();
                const phoneRes = await getPhoneNumber();
                const Code = phoneRes?.token || "";
                const ZaloId = await getUserID();
                // Optionally update context if needed
                if (zaloAuth && zaloAuth.Accesstoken !== Accesstoken) {
                    zaloAuth.Accesstoken = Accesstoken;
                    zaloAuth.Code = Code;
                    zaloAuth.ZaloId = ZaloId;
                }
                // Map frontend fields to backend fields for sign up
                const payload = {
                    Accesstoken,
                    Code,
                    ZaloId,
                    ...updatePayload,
                };
                const { laborerSignUp } = await import('@/api/registerApi');
                const res = await laborerSignUp(payload);
                console.log("LaboreSignUp response:", res);
                if (res?.StatusResult?.Code === 0) {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                    // Call logout handler from context after successful sign-up
                    if (zaloAuth && typeof zaloAuth.logout === 'function') {
                        zaloAuth.logout();
                    }
                } else {
                    setShowToast(false);
                    setErrorMessage(res?.StatusResult?.Message || "Đăng ký thất bại.");
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

    return (
        <div className="min-h-screen">
            <div className="max-w-md mx-auto pt">
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
                    {showToast && (
                        <div className="text-green-600 text-center mb-2 font-semibold">Đăng ký tài khoản thành công</div>
                    )}
                    {errorMessage && (
                        <div className="text-red-600 text-center mb-2 font-semibold">{errorMessage}</div>
                    )}
                    {effectiveSignInStatus === 'success' ? (
                        <Button
                            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mt-6"
                            loading={laboreSignUpLoading}
                            onClick={e => {
                                console.log('[DEBUG] Button clicked');
                                handleLaboreSignUp(e);
                            }}
                        >
                            Cập nhật hồ sơ cá nhân
                        </Button>
                    ) : (
                        <Button
                            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mt-2 mb-8"
                            loading={laboreSignUpLoading}
                            onClick={e => {
                                console.log('[DEBUG] Button clicked');
                                handleLaboreSignUp(e);
                            }}
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