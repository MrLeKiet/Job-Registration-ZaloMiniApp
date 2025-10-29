import React, { useEffect } from "react";
import { Box, Button, DatePicker, Icon, Input, Text } from "zmp-ui";
import Select from "../../components/Select";
import { useRegisterForm } from "../../hooks/useRegister";
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
            suffix={<Box pr={4}><Icon icon="zi-info-circle" /></Box>}
            status={touched?.idCard && errors?.idCard ? "error" : undefined}
            errorText={touched?.idCard ? errors?.idCard : undefined}
            onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        />

        {/* Issue Date */}
        <DatePicker
            value={formData.issueDate}
            onChange={handleDateChange("issueDate")}
            label="Chọn ngày cấp"
            aria-label="Ngày cấp"
            status={touched?.issueDate && errors?.issueDate ? "error" : undefined}
            errorText={touched?.issueDate ? errors?.issueDate : undefined}
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
            suffix={<Box pr={4}><Icon icon="zi-info-circle" /></Box>}
            status={touched?.phone && errors?.phone ? "error" : undefined}
            errorText={touched?.phone ? errors?.phone : undefined}
        />

        {/* Email */}
        <Input
            label="Nhập email"
            value={formData.email}
            onChange={handleInputChange("email")}
            onBlur={handleInputBlur("email")}
            aria-label="Email"
            placeholder="Email của bạn"
            suffix={<Box pr={4}><Icon icon="zi-info-circle" /></Box>}
            status={touched?.email && errors?.email ? "error" : undefined}
            errorText={touched?.email ? errors?.email : undefined}
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

const ProfileRegisterLayout: React.FC = () => {
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

    // Sync Zalo name to formData.fullName live if available and not already set
    useEffect(() => {
        try {
            const raw = localStorage.getItem('zaloUserInfo');
            const zaloUserInfo = raw ? JSON.parse(raw) : null;
            if (zaloUserInfo?.name && (formData.fullName === "Nguyen Van A" || !formData.fullName)) {
                setFormData((prev: any) => ({ ...prev, fullName: zaloUserInfo.name }));
            }
        } catch {}
    }, [formData.fullName, setFormData]);
    const [showToast, setShowToast] = React.useState(false);

    const { settings } = useProfile();
    useEffect(() => {
        setSuccessMessage("");
    }, [formData]);

    // Load from localStorage on mount, else set dummy data
    useEffect(() => {
        const saved = localStorage.getItem("profileRegisterForm");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Convert date strings back to Date objects
                if (parsed.birthDate) parsed.birthDate = new Date(parsed.birthDate);
                if (parsed.issueDate) parsed.issueDate = new Date(parsed.issueDate);
                setFormData((prev: any) => ({ ...prev, ...parsed }));
                return;
            } catch {}
        }
        setFormData((prev: any) => ({
            ...prev,
            fullName: "Nguyen Van A",
            birthDate: new Date("1990-01-01"),
            idCard: "123456789012",
            issueDate: new Date("2010-05-20"),
            issuePlace: "Hà Nội",
            phone: "0912345678",
                    // Removed success message logic as toast now handles success feedback
            school: "ĐH Bách Khoa",
        }));
    }, [setFormData]);

    // Save to localStorage on formData change
    useEffect(() => {
        // Only save serializable fields
        const toSave = { ...formData };
        if (toSave.birthDate) toSave.birthDate = toSave.birthDate instanceof Date ? toSave.birthDate.toISOString() : toSave.birthDate;
        if (toSave.issueDate) toSave.issueDate = toSave.issueDate instanceof Date ? toSave.issueDate.toISOString() : toSave.issueDate;
        localStorage.setItem("profileRegisterForm", JSON.stringify(toSave));
    }, [formData]);

    // Custom submit handler to show all errors
    // Remove unused handleFormSubmit

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
                        <div className="text-green-600 text-center mb-2 font-semibold">Cập nhật thông tin thành công</div>
                    )}
                    <Button
                        className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mt-6"
                        onClick={(e) => {
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
                            // If valid, call original submit logic
                            handleSubmit(e);
                            // Update Zalo user info in localStorage and header
                            try {
                                const raw = localStorage.getItem('zaloUserInfo');
                                const zaloUserInfo = raw ? JSON.parse(raw) : {};
                                if (formData.fullName && zaloUserInfo?.name !== formData.fullName) {
                                    zaloUserInfo.name = formData.fullName;
                                    localStorage.setItem('zaloUserInfo', JSON.stringify(zaloUserInfo));
                                    // Dispatch storage event for live update
                                    window.dispatchEvent(new Event('storage'));
                                }
                            } catch {}
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 2000);
                        }}
                    >
                        Lưu
                    </Button>
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
