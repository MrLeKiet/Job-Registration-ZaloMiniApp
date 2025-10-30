import { getSettings, laborerSignUp, signIn } from "@/api/registerApi";
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
    Venus
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAccessToken, getPhoneNumber, getUserID } from "zmp-sdk/apis";
import {
    Box,
    DatePicker,
    Input,
    Text,
    useNavigate
} from "zmp-ui";

import InputBox from "../../components/InputBox";
import Select from "../../components/Select";
import SkeletonList from "../../components/SkeletonList";
import { useRegisterForm } from "../../hooks/useRegister";

const PersonalInfoRow1: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleDateChange,
    settings,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
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
                label={undefined}
            />
        </InputBox>
        <InputBox
            label="Giới tính"
            icon={<Venus size={18} />}
            error={touched.gender && !!formData.errors?.gender}
            errorMessage={touched.gender ? formData.errors?.gender : undefined}
        >
            <Select
                type="single"
                options={settings?.ListGenderUser || []}
                value={formData.gender}
                onChange={option => handleSelectChange("gender")(option?.label ?? option)}
                placeholder="Chọn giới tính"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow2: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleDateChange,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
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
                label={undefined}
            />
        </InputBox>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow3: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    settings,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
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
                label={undefined}
                className="input-field"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
            />
        </InputBox>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox
            label="Dân tộc"
            icon={<GraduationCap size={18} />}
            error={touched.ethnicity && !!formData.errors?.ethnicity}
            errorMessage={touched.ethnicity ? formData.errors?.ethnicity : undefined}
        >
            <Select
                type="single"
                options={settings?.ListEthnicity || []}
                value={formData.ethnicity}
                onChange={option => handleSelectChange("ethnicity")(option?.label ?? option)}
                placeholder="Chọn dân tộc"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow4: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    settings
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox
            label="Trình độ CMKT cao nhất"
            icon={<GraduationCap size={18} />}
            error={touched.cmktLevel && !!formData.errors?.cmktLevel}
            errorMessage={touched.cmktLevel ? formData.errors?.cmktLevel : undefined}
        >
            <Select
                type="single"
                options={settings?.TechnicalLevel || []}
                value={formData.cmktLevel}
                onChange={option => handleSelectChange("cmktLevel")(option?.label ?? option)}
                placeholder="Chọn trình độ CMKT"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow5: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    settings,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
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
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox
            label="Ngành nghề mong muốn"
            icon={<Briefcase size={18} />}
            error={touched.desiredJob && !!formData.errors?.desiredJob}
            errorMessage={touched.desiredJob ? formData.errors?.desiredJob : undefined}
        >
            <Select
                type="multi"
                options={settings?.ListJob || []}
                value={formData.desiredJob}
                onChange={(selected) => handleSelectChange("desiredJob")(selected)}
                max={2}
                placeholder="Chọn ngành nghề (tối đa 2)"
            />
        </InputBox>
    </div>
);

const PersonalInfoSection: React.FC<any> = (props) => (
    <Box className="space-y-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
            Thông tin cá nhân
        </Text>
        <PersonalInfoRow1 {...props} settings={props.settings} />
        <PersonalInfoRow2 {...props} settings={props.settings} />
        <PersonalInfoRow3 {...props} settings={props.settings} />
        <PersonalInfoRow4 {...props} settings={props.settings} />
        <PersonalInfoRow5 {...props} settings={props.settings} />
    </Box>
);

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [phoneToken, setPhoneToken] = useState("");
    const [userID, setUserID] = useState<string>("");
    // Fetch phone token on mount
    useEffect(() => {
        async function fetchPhoneToken() {
            try {
                const phoneToken = await getPhoneNumber();
                setPhoneToken(phoneToken.token ?? "");
                console.log("Token:", phoneToken.token);
            } catch (err) {
                console.error("Error fetching phone token:", err);
            }
        }
        fetchPhoneToken();
    }, []);
    const {
        formData,
        touched,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
        setFormData,
        setTouched,
        validateForm,
    } = useRegisterForm();

    useEffect(() => {
        async function fetchAccessToken() {
            try {
                const accessToken = await getAccessToken();
                setAccessToken(accessToken ?? null);
            } catch (err) {
                console.error("Error fetching access token:", err);
            }
        }
        fetchAccessToken();
    }, []);

    useEffect(() => {
        async function fetchUserId() {
            try {
                const userID = await getUserID();
                setUserID(userID ?? "");
                console.log("UserID:", userID);
            } catch (err) {
                console.error("Error fetching user ID:", err);
            }
        }
        fetchUserId();
    }, []);

    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Pre-fill form with user info from navigation state
    useEffect(() => {
        // Pre-fill all text input fields with example/default values
        setFormData((prev: any) => ({
            ...prev,
            idCard: prev.idCard || "123456789012",
            issuePlace: prev.issuePlace || "Hanoi",
            phone: prev.phone || "0987654321",
            email: prev.email || "example@email.com",
            address: prev.address || "123 Main St, Hanoi",
            educationLevel: prev.educationLevel || "Đại học",
            major: prev.major || "Công nghệ thông tin",
            school: prev.school || "ĐH Bách Khoa",
        }));
    }, [setFormData]);

    // Fetch settings for select options
    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (err) {
                console.error("Error fetching settings:", err);
                setMessage("Không thể tải dữ liệu settings");
            }
        }
        fetchSettings();
    }, []);

    // Map formData to API body for LaborerSignUp
    function buildLaborerSignUpBody(formData: any) {
        // Send DesiredCareer as an array of job IDs (strings)
        const desiredCareer = Array.isArray(formData.desiredJob)
            ? formData.desiredJob.map((id: string) => String(id))
            : [];
        console.log("DesiredCareer payload:", desiredCareer);
        return {
            Accesstoken: accessToken || "",
            Code: phoneToken || "",
            ZaloId: userID || "",
            FullName: formData.fullName || "",
            DateOfBirth: formData.birthDate ? new Date(formData.birthDate).toISOString().slice(0, 10) : "",
            Gender: formData.gender || "",
            CID: formData.idCard || "",
            CIDDate: formData.issueDate ? new Date(formData.issueDate).toISOString().slice(0, 10) : "",
            CIDAddress: formData.issuePlace || "",
            Phone: formData.phone || "",
            Email: formData.email || "",
            Ethnicity: formData.ethnicity || "",
            Address: formData.address || "",
            Study: formData.educationLevel || "",
            TechnicalLevel: formData.cmktLevel || "",
            TrainingMajor: formData.major || "",
            GraduateSchool: formData.school || "",
            DesiredCareer: desiredCareer
        };
    }

    // Handle form submit
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        // Validate all fields before submitting
        const isValid = validateForm();
        if (!isValid) {
            // Mark all required fields as touched to show errors
            setTouched((prev: any) => {
                const allTouched: { [key: string]: boolean } = { ...prev };
                [
                    "fullName", "birthDate", "gender", "idCard", "issueDate", "issuePlace",
                    "phone", "email", "ethnicity", "address", "educationLevel", "cmktLevel",
                    "major", "school", "desiredJob"
                ].forEach((field) => {
                    allTouched[field] = true;
                });
                return allTouched;
            });
            setLoading(false);
            return;
        }
        try {
            const body = buildLaborerSignUpBody(formData);
            console.log("Sending access token:", accessToken);
            const res = await laborerSignUp(body);
            if (res.StatusResult?.Code === 0) {
                setMessage("Đăng ký thành công!");
                try {
                    const loginData = await signIn({
                        Accesstoken: accessToken || "",
                        Code: phoneToken || "",
                        ZaloId: userID || ""
                    });
                    if (loginData.StatusResult?.Code === 0) {
                        navigate("/home");
                    } else {
                        setMessage("Đăng nhập tự động thất bại. Vui lòng thử lại.");
                    }
                } catch (loginErr) {
                    console.error("Login error:", loginErr);
                    setMessage("Đăng nhập tự động thất bại. Vui lòng thử lại.");
                }
            } else {
                setMessage(res.data.StatusResult?.Message || "Đăng ký thất bại");
            }
        } catch (err: any) {
            if (err.response) {
                console.error("Registration error response:", err.response);
                setMessage(`Lỗi khi gửi đăng ký: ${err.response.data?.StatusResult?.Message || err.response.statusText}`);
            } else if (err.request) {
                console.error("Registration error request:", err.request);
                setMessage("Lỗi khi gửi đăng ký: Không nhận được phản hồi từ máy chủ");
            } else {
                console.error("Registration error:", err.message);
                setMessage(`Lỗi khi gửi đăng ký: ${err.message}`);
            }
            setMessage("Lỗi khi gửi đăng ký");
        }
        setLoading(false);
    }

    if (loading || !settings) {
        return (
            <Box className="mb-12">
                <SkeletonList count={1} renderSkeleton={() => (
                    <Box className="card-section">
                        <Box className="flex justify-center mb-6 sm:mb-8">
                            <Box className="flex items-center space-x-2">
                                <div className="h-8 w-8 bg-gray-200 rounded-full" />
                                <div className="h-8 w-2/3 bg-gray-200 rounded" />
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Box key={`skeleton-row-${idx}`} className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, jdx) => (
                                        <div key={`skeleton-field-${idx}-${jdx}`} className="h-6 w-full bg-gray-200 rounded mb-2" />
                                    ))}
                                </Box>
                            ))}
                        </Box>
                        <div className="h-10 w-full bg-gray-200 rounded mt-8" />
                    </Box>
                )} />
            </Box>
        );
    }
    // ...existing code...
};

export default RegisterPage;