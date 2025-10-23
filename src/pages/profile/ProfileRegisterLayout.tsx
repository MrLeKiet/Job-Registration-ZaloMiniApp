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
import { Box, Button, DatePicker, Input, Text } from "zmp-ui";
import InputBox from "../../components/InputBox";
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
    <Box className="bg-white">
        <Text className="text-lg font-semibold text-gray-700">Thông tin cá nhân</Text>

        {/* Full Name */}
        <InputBox
            label="Họ và Tên"
            icon={<User size={18} />}
            error={touched.fullName && !!formData.errors?.fullName}
            errorMessage={touched.fullName ? formData.errors?.fullName : undefined}
        >
            <Input
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={handleInputChange("fullName")}
                onBlur={handleInputBlur("fullName")}
                className="w-full rounded-md border-transparent border-gray-300"
            />
        </InputBox>

        {/* Birth Date */}
        <InputBox
            label="Ngày sinh"
            icon={<Calendar size={18} />}
            error={touched.birthDate && !!formData.errors?.birthDate}
            errorMessage={touched.birthDate ? formData.errors?.birthDate : undefined}
        >
            <DatePicker
                value={formData.birthDate}
                onChange={handleDateChange("birthDate")}
                placeholder="Chọn ngày"
                
            />
        </InputBox>

        {/* Gender */}
        <InputBox
            label="Giới tính"
            icon={<Venus size={18} />}
            error={touched.gender && !!formData.errors?.gender}
            errorMessage={touched.gender ? formData.errors?.gender : undefined}
        >
            <SingleSelect
                options={settings?.ListGenderUser || []}
                value={formData.gender}
                onChange={option => handleSelectChange("gender")((option as any)?.label ?? option)}
                placeholder="Chọn giới tính"
                
            />
        </InputBox>

        {/* ID Card */}
        <InputBox
            label="Căn Cước Công Dân"
            icon={<IdCard size={18} />}
            error={touched.idCard && !!formData.errors?.idCard}
            errorMessage={touched.idCard ? formData.errors?.idCard : undefined}
        >
            <Input
                placeholder="Nhập số CCCD"
                value={formData.idCard}
                onChange={handleInputChange("idCard")}
                onBlur={handleInputBlur("idCard")}
                className="w-full rounded-md border-transparent border-gray-300"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
            />
        </InputBox>

        {/* Issue Date */}
        <InputBox
            label="Ngày cấp"
            icon={<Calendar size={18} />}
            error={touched.issueDate && !!formData.errors?.issueDate}
            errorMessage={touched.issueDate ? formData.errors?.issueDate : undefined}
        >
            <DatePicker
                value={formData.issueDate}
                onChange={handleDateChange("issueDate")}
                placeholder="Chọn ngày"
                
            />
        </InputBox>

        {/* Issue Place */}
        <InputBox
            label="Nơi cấp"
            icon={<MapPin size={18} />}
            error={touched.issuePlace && !!formData.errors?.issuePlace}
            errorMessage={touched.issuePlace ? formData.errors?.issuePlace : undefined}
        >
            <Input
                placeholder="Nơi cấp"
                value={formData.issuePlace}
                onChange={handleInputChange("issuePlace")}
                onBlur={handleInputBlur("issuePlace")}
                className="w-full rounded-md border-transparent border-gray-300"
            />
        </InputBox>

        {/* Phone */}
        <InputBox
            label="Số điện thoại"
            icon={<Phone size={18} />}
            error={touched.phone && !!formData.errors?.phone}
            errorMessage={touched.phone ? formData.errors?.phone : undefined}
        >
            <Input
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                onBlur={handleInputBlur("phone")}
                className="w-full rounded-md border-transparent border-gray-300"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
            />
        </InputBox>

        {/* Email */}
        <InputBox
            label="Email"
            icon={<Mail size={18} />}
            error={touched.email && !!formData.errors?.email}
            errorMessage={touched.email ? formData.errors?.email : undefined}
        >
            <Input
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleInputChange("email")}
                onBlur={handleInputBlur("email")}
                className="w-full rounded-md border-transparent border-gray-300"
            />
        </InputBox>

        {/* Ethnicity */}
        <InputBox
            label="Dân tộc"
            icon={<GraduationCap size={18} />}
            error={touched.ethnicity && !!formData.errors?.ethnicity}
            errorMessage={touched.ethnicity ? formData.errors?.ethnicity : undefined}
        >
            <SingleSelect
                options={settings?.ListEthnicity || []}
                value={formData.ethnicity}
                onChange={option => handleSelectChange("ethnicity")((option as any)?.label ?? option)}
                placeholder="Chọn dân tộc"
                
            />
        </InputBox>

        {/* Address */}
        <InputBox
            label="Địa chỉ liên lạc"
            icon={<MapPin size={18} />}
            error={touched.address && !!formData.errors?.address}
            errorMessage={touched.address ? formData.errors?.address : undefined}
        >
            <Input
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={handleInputChange("address")}
                onBlur={handleInputBlur("address")}
                className="w-full rounded-md border-transparent border-gray-300"
            />
        </InputBox>

        {/* Education Level */}
        <InputBox
            label="Trình độ học vấn"
            icon={<GraduationCap size={18} />}
            error={touched.educationLevel && !!formData.errors?.educationLevel}
            errorMessage={touched.educationLevel ? formData.errors?.educationLevel : undefined}
        >
            <Input
                placeholder="Nhập trình độ học vấn"
                value={formData.educationLevel}
                onChange={handleInputChange("educationLevel")}
                onBlur={handleInputBlur("educationLevel")}
                className="w-full rounded-md border-transparent border-gray-300"
            />
        </InputBox>

        {/* CMKT Level */}
        <InputBox
            label="Trình độ CMKT cao nhất"
            icon={<GraduationCap size={18} />}
            error={touched.cmktLevel && !!formData.errors?.cmktLevel}
            errorMessage={touched.cmktLevel ? formData.errors?.cmktLevel : undefined}
        >
            <SingleSelect
                options={settings?.TechnicalLevel || []}
                value={formData.cmktLevel}
                onChange={option => handleSelectChange("cmktLevel")((option as any)?.label ?? option)}
                placeholder="Chọn trình độ CMKT"
                
            />
        </InputBox>

        {/* Major */}
        <InputBox
            label="Chuyên ngành đào tạo"
            icon={<GraduationCap size={18} />}
            error={touched.major && !!formData.errors?.major}
            errorMessage={touched.major ? formData.errors?.major : undefined}
        >
            <Input
                placeholder="Nhập chuyên ngành đào tạo"
                value={formData.major}
                onChange={handleInputChange("major")}
                onBlur={handleInputBlur("major")}
                className="w-full rounded-md border-transparent border-gray-300"
            />
        </InputBox>

        {/* School */}
        <InputBox
            label="Tên trường tốt nghiệp"
            icon={<Building size={18} />}
            error={touched.school && !!formData.errors?.school}
            errorMessage={touched.school ? formData.errors?.school : undefined}
        >
            <Input
                placeholder="Nhập tên trường"
                value={formData.school}
                onChange={handleInputChange("school")}
                onBlur={handleInputBlur("school")}
                className="w-full rounded-md border-transparent border-gray-300"
            />
        </InputBox>

        {/* Desired Job */}
        <InputBox
            label="Ngành nghề mong muốn"
            icon={<Briefcase size={18} />}
            error={touched.desiredJob && !!formData.errors?.desiredJob}
            errorMessage={touched.desiredJob ? formData.errors?.desiredJob : undefined}
        >
            <MultiSelect
                options={settings?.ListJob || []}
                value={formData.desiredJob}
                onChange={(selected) => handleSelectChange("desiredJob")(selected)}
                max={2}
                placeholder="Chọn ngành nghề (tối đa 2)"
                
            />
        </InputBox>
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
        // potaotes to to go popo amd thing to go with othe rthing

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
                <div className="px-4 py-4 flex justify-end">
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