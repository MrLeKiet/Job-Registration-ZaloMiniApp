import { enterpriseSignUp } from "@/api/enterpriseApi";
import { User } from "lucide-react";
import React from "react";
import { Box, Input, Text, useNavigate } from "zmp-ui";
import { useEnterpriseRegisterForm } from "../../hooks/useEnterpriseRegisterForm";


const EnterpriseSignUpSection: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [showToast, setShowToast] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();
    const {
        formData,
        setFormData,
        touched,
        setTouched,
        errors,
        handleInputChange,
        handleInputBlur,
        validateForm,
    } = useEnterpriseRegisterForm();

    // Auto-fetch Zalo credentials on mount (like ProfileSection)
    React.useEffect(() => {
        const fetchZaloAuth = async () => {
            try {
                const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
                const Accesstoken = await getAccessToken();
                const phoneRes = await getPhoneNumber();
                const Code = phoneRes?.token || "";
                const ZaloId = await getUserID();
                setFormData((prev: any) => ({ ...prev, Accesstoken, Code, ZaloId }));
            } catch (e) {
                // TODO: Handle Zalo credential fetch error if needed
            }
        };
        fetchZaloAuth();
        // Autofill Zalo credentials
        setFormData((prev: any) => ({ ...prev, Accesstoken: "", Code: "", ZaloId: "" }));
    }, []);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(field)(e);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowToast(false);
        setErrorMessage("");
        const isValid = validateForm();
        if (!isValid) {
            setTouched((prev) => {
                const allTouched: { [key: string]: boolean } = { ...prev };
                for (const field of Object.keys(formData)) {
                    allTouched[field] = true;
                }
                return allTouched;
            });
            setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }
        setLoading(true);
        try {
            const res = await enterpriseSignUp(formData);
            if (res?.StatusResult?.Code === 0) {
                setShowToast(true);
                setErrorMessage("");
                setTimeout(() => setShowToast(false), 2000);
                setTimeout(() => navigate(-1), 2000);
            } else {
                setShowToast(false);
                setErrorMessage(res?.StatusResult?.Message || "Đăng ký thất bại.");
            }
        } catch (err) {
            setShowToast(false);
            setErrorMessage("Đăng ký thất bại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="max-w-md mx-auto pt-6">
                <Box className=" flex flex-col gap-3 width-full p-4 rounded-lgmb-4">
                    <Text className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                        <span className="mr-2"><User size={20} /></span>{" "}
                        Thông tin doanh nghiệp
                    </Text>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3+">
                        <Input
                            label="Email"
                            name="Email"
                            value={formData.Email || ""}
                            onChange={handleInputChange("Email")}
                            onBlur={handleInputBlur("Email")}
                            placeholder="Email"
                            aria-label="Email"
                            status={touched.Email && errors.Email ? "error" : undefined}
                            errorText={touched.Email ? errors.Email : undefined}
                        />
                        <Input
                            label="Tên công ty"
                            name="CompanyName"
                            value={formData.CompanyName || ""}
                            onChange={handleInputChange("CompanyName")}
                            onBlur={handleInputBlur("CompanyName")}
                            placeholder="Tên công ty"
                            aria-label="Tên công ty"
                            status={touched.CompanyName && errors.CompanyName ? "error" : undefined}
                            errorText={touched.CompanyName ? errors.CompanyName : undefined}
                        />
                        <Input
                            label="Email công ty"
                            name="CompanyEmail"
                            value={formData.CompanyEmail || ""}
                            onChange={handleInputChange("CompanyEmail")}
                            onBlur={handleInputBlur("CompanyEmail")}
                            placeholder="Email công ty"
                            aria-label="Email công ty"
                            status={touched.CompanyEmail && errors.CompanyEmail ? "error" : undefined}
                            errorText={touched.CompanyEmail ? errors.CompanyEmail : undefined}
                        />
                        <Input
                            label="Địa chỉ công ty"
                            name="CompanyAddress"
                            value={formData.CompanyAddress || ""}
                            onChange={handleInputChange("CompanyAddress")}
                            onBlur={handleInputBlur("CompanyAddress")}
                            placeholder="Địa chỉ công ty"
                            aria-label="Địa chỉ công ty"
                            status={touched.CompanyAddress && errors.CompanyAddress ? "error" : undefined}
                            errorText={touched.CompanyAddress ? errors.CompanyAddress : undefined}
                        />
                        <Input
                            label="Số điện thoại công ty"
                            name="CompanyPhone"
                            value={formData.CompanyPhone || ""}
                            onChange={handleInputChange("CompanyPhone")}
                            onBlur={handleInputBlur("CompanyPhone")}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={15}
                            placeholder="Số điện thoại công ty"
                            aria-label="Số điện thoại công ty"
                            status={touched.CompanyPhone && errors.CompanyPhone ? "error" : undefined}
                            errorText={touched.CompanyPhone ? errors.CompanyPhone : undefined}
                        />
                        {showToast && (
                            <div className="text-green-600 text-center my-2 font-semibold">Đăng ký doanh nghiệp thành công</div>
                        )}
                        {errorMessage && (
                            <div className="text-red-600 text-center my-2 font-semibold">{errorMessage}</div>
                        )}
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mt-3 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading && (
                                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                            )}
                            Đăng ký doanh nghiệp
                        </button>
                    </form>
                </Box>
            </div>
        </div>
    );
}

export default EnterpriseSignUpSection;
