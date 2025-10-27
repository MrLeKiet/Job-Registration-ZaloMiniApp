import {
    Briefcase,
    Building,
    Calendar,
    GraduationCap,
    IdCard,
    Mail,
    MapPin,
    Phone,
    User,
    Venus,
} from "lucide-react";
import React, { useEffect } from "react";
import { Box, Button, DatePicker, Input, Text, Icon} from "zmp-ui";
import MultiSelect from "../../components/MultiSelect";
import SingleSelect from "../../components/SingleSelect";
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
}) => (
    <Box className="bg-white flex flex-col gap-2">
        <Text className="text-lg font-semibold text-gray-700">Thông tin cá nhân</Text>

        {/* Full Name */}
        <Input
            label="Nhập họ và tên"
            value={formData.fullName}
            onChange={handleInputChange("fullName")}
            onBlur={handleInputBlur("fullName")}
            aria-label="Họ và Tên"
            helperText="Vui lòng nhập tên người dùng của bạn."
            suffix={<Box pr={4}><Icon icon="zi-info-circle" /></Box>}
        />

        {/* Birth Date */}
        <DatePicker
            value={formData.birthDate}
            onChange={handleDateChange("birthDate")}
            label="Chọn ngày sinh"
            aria-label="Ngày sinh"
        />

        {/* Gender */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn giới tính</Text>
            <SingleSelect
                options={settings?.ListGenderUser || []}
                value={formData.gender}
                onChange={(option) => handleSelectChange("gender")((option as any)?.label ?? option)}
                placeholder="Giới tính"
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
            suffix={<Box pr={4}><Icon icon="zi-info-circle" /></Box>}
        />

        {/* Issue Date */}
        <DatePicker
            value={formData.issueDate}
            onChange={handleDateChange("issueDate")}
            label="Chọn ngày cấp"
            aria-label="Ngày cấp"
        />

        {/* Issue Place */}
        <Input
            label="Nhập nơi cấp"
            value={formData.issuePlace}
            onChange={handleInputChange("issuePlace")}
            onBlur={handleInputBlur("issuePlace")}

            aria-label="Nơi cấp"
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
            suffix={<Box pr={4}><Icon icon="zi-info-circle" /></Box>}
        />

        {/* Email */}
        <Input
            label="Nhập email"
            value={formData.email}
            onChange={handleInputChange("email")}
            onBlur={handleInputBlur("email")}
            aria-label="Email"
            suffix={<Box pr={4}><Icon icon="zi-info-circle" /></Box>}
        />
        {/* Ethnicity */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn dân tộc</Text>
            <SingleSelect
                options={settings?.ListEthnicity || []}
                value={formData.ethnicity}
                onChange={(option) => handleSelectChange("ethnicity")((option as any)?.label ?? option)}
                placeholder="Dân tộc"
            />
        </div>

        {/* Address */}
        <Input
            label="Nhập địa chỉ liên lạc"
            value={formData.address}
            onChange={handleInputChange("address")}
            onBlur={handleInputBlur("address")}

            aria-label="Địa chỉ liên lạc"
        />

        {/* Education Level */}
        <Input
            label="Nhập trình độ học vấn"
            value={formData.educationLevel}
            onChange={handleInputChange("educationLevel")}
            onBlur={handleInputBlur("educationLevel")}

            aria-label="Trình độ học vấn"
        />

        {/* CMKT Level */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn trình độ CMKT</Text>
            <SingleSelect
                options={settings?.TechnicalLevel || []}
                value={formData.cmktLevel}
                onChange={(option) => handleSelectChange("cmktLevel")((option as any)?.label ?? option)}
                placeholder="Trình độ CMKT"
            />

        </div>

        {/* Major */}
        <Input
            label="Nhập chuyên ngành đào tạo"
            value={formData.major}
            onChange={handleInputChange("major")}
            onBlur={handleInputBlur("major")}

            aria-label="Chuyên ngành đào tạo"
        />

        {/* School */}
        <Input
            label="Nhập tên trường tốt nghiệp"
            value={formData.school}
            onChange={handleInputChange("school")}
            onBlur={handleInputBlur("school")}

            aria-label="Tên trường tốt nghiệp"
        />

        {/* Desired Job */}
        <div>
            <Text className="text-sm text-[#141415] mb-2">Chọn ngành nghề (tối đa 2)</Text>
            <MultiSelect
                options={settings?.ListJob || []}
                value={formData.desiredJob}
                onChange={(selected) => handleSelectChange("desiredJob")(selected)}
                max={2}
                placeholder="Ngành nghề"
            />
        </div>

    </Box>
);

const ProfileRegisterLayout: React.FC = () => {
    const {
        formData,
        touched,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
        handleSubmit,
    } = useRegisterForm();

    const { settings } = useProfile();

    useEffect(() => {
        // Initialize form or fetch settings if needed
    }, []);

    return (
        <div className="min-h-screen">
            <div className="max-w-md mx-auto pt-6">
                <PersonalInfoSection
                    formData={formData}
                    touched={touched}
                    handleInputChange={handleInputChange}
                    handleInputBlur={handleInputBlur}
                    handleSelectChange={handleSelectChange}
                    handleDateChange={handleDateChange}
                    settings={settings}
                />
                <div className="flex justify-start">
                    <Button
                        type="highlight"
                        onClick={(e: any) => handleSubmit(e)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileRegisterLayout;