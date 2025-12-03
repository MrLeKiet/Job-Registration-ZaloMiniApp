import { enterpriseSignUp } from "@/api/enterpriseApi";
import { User } from "lucide-react";
import React from "react";
import { Box, Input, Text } from "zmp-ui";


const EnterpriseSignUpSection: React.FC = () => {
    const [form, setForm] = React.useState({
        Accesstoken: "",
        Code: "",
        ZaloId: "",
        Email: "",
        CompanyName: "",
        CompanyEmail: "",
        CompanyAddress: "",
        CompanyPhone: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [showToast, setShowToast] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    // Auto-fetch Zalo credentials on mount (like ProfileSection)
    React.useEffect(() => {
        const fetchZaloAuth = async () => {
            try {
                const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
                const Accesstoken = await getAccessToken();
                const phoneRes = await getPhoneNumber();
                const Code = phoneRes?.token || "";
                const ZaloId = await getUserID();
                setForm((prev) => ({ ...prev, Accesstoken, Code, ZaloId }));
            } catch (e) {
                // TODO: Handle Zalo credential fetch error if needed
            }
        };
        fetchZaloAuth();
    }, []);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setShowToast(false);
        try {
            const res = await enterpriseSignUp(form);
            if (res?.StatusResult?.Code === 0) {
                setShowToast(true);
                setErrorMessage("");
                setTimeout(() => setShowToast(false), 2000);
            } else {
                setShowToast(false);
                setErrorMessage(res?.StatusResult?.Message || "Đăng ký thất bại.");
            }
        } catch (err) {
            // TODO: Handle enterpriseSignUp error if needed
            setShowToast(false);
            setErrorMessage("Đăng ký thất bại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="max-w-md mx-auto pt-6">
                <Box className="bg-white flex flex-col gap-3 width-full p-4 rounded-lg shadow-lg mb-4">
                    <Text className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                        <span className="mr-2"><User size={20} /></span>{" "}
                        Thông tin doanh nghiệp
                    </Text>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3+">
                        <Input
                            label="Email"
                            name="Email"
                            value={form.Email}
                            onChange={handleChange("Email")}
                            placeholder="Email"
                            aria-label="Email"
                        />
                        <Input
                            label="Tên công ty"
                            name="CompanyName"
                            value={form.CompanyName}
                            onChange={handleChange("CompanyName")}
                            placeholder="Tên công ty"
                            aria-label="Tên công ty"
                        />
                        <Input
                            label="Email công ty"
                            name="CompanyEmail"
                            value={form.CompanyEmail}
                            onChange={handleChange("CompanyEmail")}
                            placeholder="Email công ty"
                            aria-label="Email công ty"
                        />
                        <Input
                            label="Địa chỉ công ty"
                            name="CompanyAddress"
                            value={form.CompanyAddress}
                            onChange={handleChange("CompanyAddress")}
                            placeholder="Địa chỉ công ty"
                            aria-label="Địa chỉ công ty"
                        />
                        <Input
                            label="Số điện thoại công ty"
                            name="CompanyPhone"
                            value={form.CompanyPhone}
                            onChange={handleChange("CompanyPhone")}
                            placeholder="Số điện thoại công ty"
                            aria-label="Số điện thoại công ty"
                        />
                        {showToast && (
                            <div className="text-green-600 text-center mb-2 font-semibold">Đăng ký doanh nghiệp thành công</div>
                        )}
                        {errorMessage && (
                            <div className="text-red-600 text-center mb-2 font-semibold">{errorMessage}</div>
                        )}
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mt-6 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
