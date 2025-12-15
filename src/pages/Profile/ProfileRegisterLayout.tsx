import React, { useContext, useState, useEffect, useRef } from "react";
import { Box, Button, DatePicker, Icon, Input, Text, useNavigate } from "zmp-ui";
import Select from "../../components/Select";
import { useRegisterForm } from "../../hooks/useRegister";
import { ZaloAuthContext } from "./ProfileSection";
import { useProfile } from "./useProfile";

const steps = [
    "Thông tin cá nhân",
    "Căn cước công dân",
    "Liên hệ & dân tộc",
    "Học vấn & chuyên môn",
    "Ngành nghề mong muốn",
] as const;

interface FieldMapping {
    backend: string;
    frontend: keyof ReturnType<typeof useRegisterForm>["formData"];
    step: number;
    label: string;
}

const fieldMapping = [
    { backend: "FullName", frontend: "fullName" as const, step: 0, label: "Họ và tên" },
    { backend: "DateOfBirth", frontend: "birthDate" as const, step: 0, label: "Ngày sinh" },
    { backend: "Gender", frontend: "gender" as const, step: 0, label: "Giới tính" },
    { backend: "CID", frontend: "idCard" as const, step: 1, label: "Số CCCD/CMND" },
    { backend: "CIDDate", frontend: "issueDate" as const, step: 1, label: "Ngày cấp CCCD" },
    { backend: "CIDAddress", frontend: "issuePlace" as const, step: 1, label: "Nơi cấp CCCD" },
    { backend: "Phone", frontend: "phone" as const, step: 2, label: "Số điện thoại" },
    { backend: "Email", frontend: "email" as const, step: 2, label: "Email" },
    { backend: "Ethnicity", frontend: "ethnicity" as const, step: 2, label: "Dân tộc" },
    { backend: "Address", frontend: "address" as const, step: 2, label: "Địa chỉ thường trú" },
    { backend: "Study", frontend: "educationLevel" as const, step: 3, label: "Trình độ học vấn" },
    { backend: "TechnicalLevel", frontend: "cmktLevel" as const, step: 3, label: "Trình độ CMKT" },
    { backend: "TrainingMajor", frontend: "major" as const, step: 3, label: "Chuyên ngành đào tạo" },
    { backend: "GraduateSchool", frontend: "school" as const, step: 3, label: "Tên trường tốt nghiệp" },
    { backend: "DesiredCareer", frontend: "desiredJob" as const, step: 4, label: "Ngành nghề mong muốn" },
] as const;

const ProfileRegisterLayout: React.FC = () => {
    const navigate = useNavigate();
    const zaloAuth = useContext(ZaloAuthContext);
    const { settings } = useProfile();

    const [currentStep, setCurrentStep] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        formData,
        touched,
        errors: clientErrors,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
        setTouched,
    } = useRegisterForm();

    // Gộp lỗi client + server
    const allErrors = { ...clientErrors, ...serverErrors };

    // Khi có lỗi server → nhảy về bước lỗi đầu tiên + scroll
    useEffect(() => {
        if (Object.keys(serverErrors).length === 0) return;

        const errorSteps = fieldMapping
            .filter((m) => serverErrors[m.frontend])
            .map((m) => m.step);

        if (errorSteps.length > 0) {
            const firstErrorStep = Math.min(...errorSteps);
            setCurrentStep(firstErrorStep);

            setTimeout(() => {
                const firstField = fieldMapping.find((m) => serverErrors[m.frontend])?.frontend;
                if (firstField) {
                    const el = document.querySelector(`[data-field="${firstField}"]`) as HTMLElement;
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 300);
        }
    }, [serverErrors]);

    const validateCurrentStep = () => {
        const fieldsInCurrentStep = fieldMapping
            .filter((m) => m.step <= currentStep)
            .map((m) => m.frontend);

        const newTouched = { ...touched };
        let valid = true;

        fieldsInCurrentStep.forEach((field) => {
            newTouched[field] = true;
            if (clientErrors[field]) valid = false;
        });

        setTouched(newTouched);
        return valid;
    };

    const nextStep = () => {
        if (!validateCurrentStep()) return;
        if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateCurrentStep()) return;

        setLoading(true);
        setServerErrors({});
        setGlobalError("");

        try {
            const safeDateString = (val: any): string | null => {
                if (!val) return null;
                if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
                const d = new Date(val);
                return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
            };

            const payload: any = {
                FullName: formData.fullName?.trim() || null,
                DateOfBirth: safeDateString(formData.birthDate),
                Gender: formData.gender || null,
                CID: formData.idCard || null,
                CIDDate: safeDateString(formData.issueDate),
                CIDAddress: formData.issuePlace || null,
                Phone: formData.phone || null,
                Email: formData.email?.toLowerCase().trim() || null,
                Ethnicity: formData.ethnicity || null,
                Address: formData.address || null,
                Study: formData.educationLevel || null,
                TechnicalLevel: formData.cmktLevel || null,
                TrainingMajor: formData.major || null,
                GraduateSchool: formData.school || null,
                DesiredCareer: Array.isArray(formData.desiredJob)
                    ? formData.desiredJob.map((item: any) => (typeof item === "object" ? item.value || item.label || item : item))
                    : [],
            };

            if (!payload.CIDDate) delete payload.CIDDate;

            const { getAccessToken, getPhoneNumber, getUserID } = await import("zmp-sdk/apis");
            const Accesstoken = await getAccessToken();
            const phoneRes = await getPhoneNumber();
            const Code = phoneRes?.token || "";
            const ZaloId = await getUserID();

            const { laborerSignUp } = await import("@/api/registerApi");
            const res = await laborerSignUp({ Accesstoken, Code, ZaloId, ...payload });

            // === XỬ LÝ THÀNH CÔNG ===
            if (res?.StatusResult?.Code === 0) {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
                setTimeout(() => navigate(-1), 1500);
                zaloAuth?.logout?.();
                return;
            }

            // === XỬ LÝ LỖI VALIDATION (Code 3) ===
            if (res?.StatusResult?.Code === 3 && Array.isArray(res.Errors) && res.Errors.length > 0) {
                const errors: Record<string, string> = {};
                res.Errors.forEach((e: { Field: string; Message: string }) => {
                    const mapping = fieldMapping.find((m) => m.backend === e.Field);
                    if (mapping) {
                        errors[mapping.frontend] = e.Message;
                    }
                });
                setServerErrors(errors);
                return;
            }

            // === LỖI KHÁC ===
            setGlobalError(res?.StatusResult?.Message || "Đăng ký thất bại. Vui lòng thử lại.");

        } catch (err: any) {
            console.error("Signup error:", err);

            // Trường hợp Axios không throw response (rất hay xảy ra trong Zalo)
            const responseData = err?.response?.data || err?.data || null;

            if (responseData?.StatusResult?.Code === 3 && Array.isArray(responseData.Errors)) {
                const errors: Record<string, string> = {};
                responseData.Errors.forEach((e: { Field: string; Message: string }) => {
                    const mapping = fieldMapping.find((m) => m.backend === e.Field);
                    if (mapping) {
                        errors[mapping.frontend] = e.Message;
                    }
                });
                setServerErrors(errors);
            } else {
                setGlobalError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Render lỗi đẹp + chỉ hiện lỗi của bước hiện tại
    const renderErrors = () => {
        const errorsToShow: string[] = [];

        if (globalError) {
            errorsToShow.push(globalError);
        }

        fieldMapping.forEach(({ frontend, label, step }) => {
            const errorMsg = allErrors[frontend];
            if (errorMsg && step === currentStep) {
                errorsToShow.push(`• ${label}: ${errorMsg}`);
            }
        });

        if (errorsToShow.length === 0) return null;

        return (
            <Box mt={3} mb={4} className="bg-red-50 border border-red-300 rounded-xl p-4">
                <Text className="text-red-800 font-semibold flex items-center gap-2 mb-3">
                    <Icon icon="zi-warning" className="text-xl" />
                    Vui lòng sửa các lỗi sau:
                </Text>
                <div className="space-y-1 text-sm text-red-700">
                    {errorsToShow.map((err, i) => (
                        <div key={i}>{err}</div>
                    ))}
                </div>
            </Box>
        );
    };

    return (
        <div className="">
            <div className=" p-4">
                <Box mt={6} mb={6} className="text-center">
                    <Text.Header className="text-2xl font-bold text-blue-600">{steps[currentStep]}</Text.Header>
                    <Text className="text-gray-500 mt-1">Bước {currentStep + 1} / {steps.length}</Text>
                </Box>

                <form onSubmit={handleSubmit}>
                    {/* Bước 1 */}
                    {currentStep === 0 && (
                        <Box className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col gap-4">
                            <Input data-field="fullName" label="Họ và tên *" placeholder="Nguyễn Văn A" value={formData.fullName} onChange={handleInputChange("fullName")} status={allErrors.fullName ? "error" : undefined} errorText={allErrors.fullName} />
                            <DatePicker data-field="birthDate" label="Ngày sinh *" value={formData.birthDate} onChange={handleDateChange("birthDate")} status={allErrors.birthDate ? "error" : undefined} errorText={allErrors.birthDate} />
                            <div>
                                <Text className="text-sm text-gray-700 mb-2">Giới tính *</Text>
                                <div data-field="gender">
                                    <Select type="single" options={settings?.ListGenderUser || []} value={formData.gender} onChange={(opt) => handleSelectChange("gender")(opt?.label ?? opt)} placeholder="Chọn giới tính" status={allErrors.gender ? "error" : undefined} errorText={allErrors.gender} />
                                </div>
                            </div>
                        </Box>
                    )}

                    {/* Bước 2 */}
                    {currentStep === 1 && (
                        <Box className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col gap-4">
                            <Input data-field="idCard" label="Số CCCD/CMND *" placeholder="012345678910" value={formData.idCard} onChange={handleInputChange("idCard")} maxLength={15} inputMode="numeric" status={allErrors.idCard ? "error" : undefined} errorText={allErrors.idCard} />
                            <DatePicker data-field="issueDate" label="Ngày cấp" value={formData.issueDate} onChange={handleDateChange("issueDate")} status={allErrors.issueDate ? "error" : undefined} errorText={allErrors.issueDate} />
                            <Input data-field="issuePlace" label="Nơi cấp" placeholder="Công an tỉnh..." value={formData.issuePlace} onChange={handleInputChange("issuePlace")} status={allErrors.issuePlace ? "error" : undefined} errorText={allErrors.issuePlace} />
                        </Box>
                    )}

                    {/* Bước 3 */}
                    {currentStep === 2 && (
                        <Box className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col gap-4">
                            <Input data-field="phone" label="Số điện thoại *" placeholder="0901234567" value={formData.phone} onChange={handleInputChange("phone")} prefix={<Icon icon="zi-call" />} status={allErrors.phone ? "error" : undefined} errorText={allErrors.phone} />
                            <Input data-field="email" label="Email" placeholder="example@gmail.com" value={formData.email} onChange={handleInputChange("email")} onBlur={handleInputBlur("email")} status={allErrors.email ? "error" : undefined} errorText={allErrors.email} />
                            <div>
                                <Text className="text-sm text-gray-700 mb-2">Dân tộc</Text>
                                <div data-field="ethnicity">
                                    <Select type="single" options={settings?.ListEthnicity || []} value={formData.ethnicity} onChange={(opt) => handleSelectChange("ethnicity")(opt?.label ?? opt)} placeholder="Kinh, Tày, Thái..." status={allErrors.ethnicity ? "error" : undefined} errorText={allErrors.ethnicity} />
                                </div>
                            </div>
                            <Input data-field="address" label="Địa chỉ thường trú" placeholder="Số nhà, đường, xã/phường..." value={formData.address} onChange={handleInputChange("address")} status={allErrors.address ? "error" : undefined} errorText={allErrors.address} />
                        </Box>
                    )}

                    {/* Bước 4 */}
                    {currentStep === 3 && (
                        <Box className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col gap-4">
                            <Input data-field="educationLevel" label="Trình độ học vấn" placeholder="THPT, Cao đẳng, Đại học..." value={formData.educationLevel} onChange={handleInputChange("educationLevel")} status={allErrors.educationLevel ? "error" : undefined} errorText={allErrors.educationLevel} />
                            <div>
                                <Text className="text-sm text-gray-700 mb-2">Trình độ CMKT</Text>
                                <div data-field="cmktLevel">
                                    <Select type="single" options={settings?.TechnicalLevel || []} value={formData.cmktLevel} onChange={(opt) => handleSelectChange("cmktLevel")(opt?.label ?? opt)} placeholder="Chọn trình độ" status={allErrors.cmktLevel ? "error" : undefined} errorText={allErrors.cmktLevel} />
                                </div>
                            </div>
                            <Input data-field="major" label="Chuyên ngành đào tạo" placeholder="Công nghệ thông tin..." value={formData.major} onChange={handleInputChange("major")} status={allErrors.major ? "error" : undefined} errorText={allErrors.major} />
                            <Input data-field="school" label="Tên trường tốt nghiệp" placeholder="ĐH Bách Khoa Hà Nội..." value={formData.school} onChange={handleInputChange("school")} status={allErrors.school ? "error" : undefined} errorText={allErrors.school} />
                        </Box>
                    )}

                    {/* Bước 5 */}
                    {currentStep === 4 && (
                        <Box className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col gap-4">
                            <div>
                                <Text className="text-sm text-gray-700 mb-2">Ngành nghề mong muốn (tối đa 2)</Text>
                                <div data-field="desiredJob">
                                    <Select
                                        type="multi"
                                        options={settings?.ListJob || []}
                                        value={formData.desiredJob}
                                        onChange={(selected) => handleSelectChange("desiredJob")(selected)}
                                        max={2}
                                        placeholder="Chọn ngành nghề"
                                        status={allErrors.desiredJob ? "error" : undefined}
                                        errorText={allErrors.desiredJob}
                                    />
                                </div>
                            </div>
                        </Box>
                    )}

                    {showToast && <Text className="text-center text-green-600 font-bold text-lg my-5">Đăng ký thành công!</Text>}

                    <Box mt={8} className="flex gap-3">
                        {currentStep > 0 && (
                            <Button variant="secondary" onClick={prevStep} className="flex-1">
                                Quay lại
                            </Button>
                        )}
                        <Button
                            className="flex-1 text-lg font-medium"
                            variant="primary"
                            onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                            loading={loading}
                        >
                            {currentStep === steps.length - 1 ? "Hoàn thành" : "Tiếp tục"}
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default ProfileRegisterLayout;