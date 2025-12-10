import React from "react";

export function useEnterpriseRegisterForm() {
    const [formData, setFormData] = React.useState<any>({
        Accesstoken: "",
        Code: "",
        ZaloId: "",
        Email: "",
        CompanyName: "",
        CompanyEmail: "",
        CompanyAddress: "",
        CompanyPhone: "",
    });
    const [touched, setTouched] = React.useState<{ [key: string]: boolean }>({});
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const requiredFields: { [key: string]: string } = {
        Email: "Vui lòng nhập email",
        CompanyName: "Vui lòng nhập tên công ty",
        CompanyEmail: "Vui lòng nhập email công ty",
        CompanyAddress: "Vui lòng nhập địa chỉ công ty",
        CompanyPhone: "Vui lòng nhập số điện thoại công ty",
    };

    function validateField(field: string, value: any) {
        let error = "";
        if (requiredFields[field]) {
            if (!value || String(value).trim() === "") {
                error = requiredFields[field];
            }
            if (field === "Email" || field === "CompanyEmail") {
                if (value && !/^\S+@\S+\.\S+$/.test(value)) {
                    error = "Email không hợp lệ";
                }
            }
            if (field === "CompanyPhone") {
                if (value && !/^0\d{9,10}$/.test(value)) {
                    error = "Số điện thoại công ty không hợp lệ";
                }
            }
        }
        return error;
    }

    function validateForm() {
        const newErrors: { [key: string]: string } = {};
        for (const field of Object.keys(requiredFields)) {
            newErrors[field] = validateField(field, formData[field]);
        }
        setErrors(newErrors);
        return Object.values(newErrors).every((err) => !err);
    }

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev: any) => ({ ...prev, [field]: e.target.value }));
        setErrors((prev) => ({ ...prev, [field]: validateField(field, e.target.value) }));
    };

    const handleInputBlur = (field: string) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
    };

    return {
        formData,
        setFormData,
        touched,
        setTouched,
        errors,
        handleInputChange,
        handleInputBlur,
        validateForm,
    };
}