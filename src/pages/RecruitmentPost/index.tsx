import Select from "@/components/Select";
import React, { useState } from "react";
// ...existing code...
import { Box, Button, DatePicker, Input, Text } from "zmp-ui";
import { useSettings } from "./useRecruitment";

const RecruitmentPostPage: React.FC = () => {
    const { settings } = useSettings();
    const [wardsOptions, setWardsOptions] = useState<{ label: string; value: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);

    React.useEffect(() => {
        (async () => {
            const { getWards } = await import("./api");
            const wards = await getWards();
            setWardsOptions(Array.isArray(wards) ? wards : []);
        })();
    }, []);

    React.useEffect(() => {
        if (settings?.ListStatusJob) {
            setStatusOptions(settings.ListStatusJob.map((s: any) => ({ label: s.label || s.value || s, value: s.value || s.label || s })));
        }
    }, [settings]);
    type PostType = {
        id: number;
        companyName: string;
        content: string;
        requirements: string;
        endDate: Date;
        image: string | null;
        benefits: string[];
        jobType: string;
        salary: string;
        position: string;
        quantity: string;
        gender: string;
        Status: string;
        Wards: string;
        workingTime: string;
        degree: string;
        experience: string;
        job: string;
        companyNameTextarea: string;
        companyAddress: string;
        companyScale: string;
    };
    // Removed duplicate declaration of settings
    const [form, setForm] = useState<{
        companyName: string;
        content: string;
        requirements: string;
        endDate: Date;
        image: string | null;
        benefits: string[];
        Wards: string;
        Status: string;
        jobType: string;
        salary: string;
        position: string;
        quantity: string;
        gender: string;
        workingTime: string;
        degree: string;
        experience: string;
        job: string;
        jobName: string;
        companyNameTextarea: string;
        companyAddress: string;
        companyScale: string;
    }>({
        companyName: "Công ty ABC",
        content: "Tuyển dụng vị trí lập trình viên React, lương hấp dẫn, môi trường năng động.",
        requirements: "Có kinh nghiệm React, chăm chỉ, chịu khó.",
        endDate: new Date(),
        image: null,
        benefits: [],
        jobType: "",
        salary: "",
        position: "",
        quantity: "3",
        gender: "",
        workingTime: "",
        degree: "Đại học",
        experience: "",
        Status: "",
        Wards: "",
        job: "",
        jobName: "Lập trình viên React",
        companyNameTextarea: "Công ty ABC",
        companyAddress: "123 Đường A, Quận B, TP. C",
        companyScale: "100-200 người",
    });
    // Removed unused posts and setPosts assignment
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (field: string) => (value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setForm((prev) => ({ ...prev, image: typeof reader.result === "string" ? reader.result : null }));
            };
            reader.onerror = () => {
                setForm((prev) => ({ ...prev, image: null }));
            };
            reader.readAsDataURL(file);
        } else {
            setForm((prev) => ({ ...prev, image: null }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Map form data to API field names
        const today = new Date();
        const end = form.endDate || new Date();
        const formatDate = (d: Date) => d.toISOString().slice(0, 10);
        const recruitmentPeriod = `${formatDate(today)}|${formatDate(end)}`;
        const apiData = {
            JobPosition: form.jobName || "null",
            Job: form.job || "null",
            Position: form.position || "null",
            Qualifications: form.degree || "null",
            WorkingTime: form.workingTime || "null",
            WorkExperience: form.experience || "null",
            Salary: form.salary || "null",
            Benefits: Array.isArray(form.benefits) ? form.benefits.filter(b => b && b.trim() !== "") : [],
            RecruitmentPeriod: recruitmentPeriod,
            Summary: form.content || "null",
            JobRequirements: form.requirements || "null",
            Status: form.Status || "null",
            Details: [{ Content: form.content }],
            Wards: form.Wards ? [form.Wards] : [],
            Address: form.companyAddress || "null"
        };
        try {
            // Get token from localStorage (same as ProfileLaborerMenu)
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setMessage("Không tìm thấy AccessToken. Vui lòng đăng nhập lại.");
                return;
            }
            const { registerRecruitment } = await import("./api");
            const res = await registerRecruitment(apiData, accessToken);
            if (res?.StatusResult?.Code === 0) {
                setMessage("Đăng tuyển dụng thành công!");
            } else {
                setMessage(res?.StatusResult?.Message || "Đăng tuyển dụng thất bại.");
            }
        } catch (err: any) {
            setMessage(err?.response?.data?.StatusResult?.Message || "Có lỗi xảy ra khi đăng tuyển dụng!");
            console.error("Recruitment post error:", err);
        }
        setTimeout(() => setMessage(null), 2000);
    };

    // Use API data directly for select options
    const jobTypeOptions = settings?.ListJob || [];
    const salaryOptions = settings?.ListSalary || [];
    const positionOptions = settings?.ListPosition || [];
    const benefitsOptions = settings?.ListBenefits || [];
    const genderOptions = settings?.ListGenderSearch || [];
    const workingTimeOptions = settings?.ListWorkingTime || [];
    const experienceOptions = settings?.ListExp || [];

    return (
        <div className="p-4">
            <div className="">
                <Box className=" flex flex-col gap-4 rounded">
                    <Text.Header className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">Tạo bài đăng tuyển dụng</Text.Header>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Phường/Xã</Text>
                            <Select
                                type="single"
                                options={wardsOptions}
                                value={form.Wards}
                                onChange={handleChange("Wards")}
                                placeholder="Chọn phường/xã"
                            />
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Trạng thái</Text>
                            <Select
                                type="single"
                                options={statusOptions}
                                value={form.Status}
                                onChange={handleChange("Status")}
                                placeholder="Chọn trạng thái"
                            />
                        </div>
                        <Text className="text-sm text-[#141415] ">Tên tuyển dụng</Text>
                        <input
                            type="text"
                            placeholder="Nhập tên tuyển dụng"
                            value={form.jobName}
                            onChange={handleInputChange("jobName")}
                            className="w-full rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        <Text className="text-sm text-[#141415] ">Tên công ty</Text>
                        <textarea
                            id="company-name-textarea"
                            placeholder="Nhập tên công ty"
                            value={form.companyNameTextarea}
                            onChange={handleInputChange("companyNameTextarea")}
                            rows={2}
                            className="w-full min-h-[40px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        <Text className="text-sm text-[#141415] ">Nội dung tuyển dụng</Text>
                        <textarea
                            id="recruitment-content"
                            placeholder="Nhập nội dung"
                            value={form.content}
                            onChange={handleInputChange("content")}
                            rows={4}
                            className="w-full min-h-[80px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        <Text className="text-sm text-[#141415] ">Yêu cầu tuyển dụng</Text>
                        <textarea
                            id="recruitment-requirements"
                            placeholder="Nhập yêu cầu"
                            value={form.requirements}
                            onChange={handleInputChange("requirements")}
                            rows={4}
                            className="w-full min-h-[80px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        <DatePicker
                            value={form.endDate}
                            onChange={handleChange("endDate")}
                            label="Ngày kết thúc tìm việc"
                            aria-label="Ngày kết thúc tìm việc"
                            startDate={new Date()}
                            defaultValue={new Date()}
                        />
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Thêm ảnh</Text>
                            <div className="flex flex-col items-center">
                                <label htmlFor="image-upload" className="w-full max-h-60 h-60 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    {form.image ? (
                                        <img
                                            src={form.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <>
                                            <span className="text-2xl text-gray-400 mb-1">+</span>
                                            <span className="text-xs text-gray-500">Thêm ảnh</span>
                                        </>
                                    )}
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Phúc lợi</Text>
                            <Select
                                type="multi"
                                options={benefitsOptions}
                                value={form.benefits}
                                onChange={handleChange("benefits")}
                                placeholder="Chọn phúc lợi"
                                max={5}
                            />
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Loại công việc</Text>
                            <Select
                                type="single"
                                options={jobTypeOptions}
                                value={form.jobType}
                                onChange={handleChange("jobType")}
                                placeholder="Chọn loại công việc"
                            />
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Mức lương</Text>
                            <Select
                                type="single"
                                options={salaryOptions}
                                value={form.salary}
                                onChange={handleChange("salary")}
                                placeholder="Chọn mức lương"
                            />
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Vị trí</Text>
                            <Select
                                type="single"
                                options={positionOptions}
                                value={form.position}
                                onChange={handleChange("position")}
                                placeholder="Chọn vị trí"
                            />
                        </div>
                        <Input
                            label="Số lượng tuyển"
                            value={form.quantity}
                            onChange={handleInputChange("quantity")}
                            placeholder="Nhập số lượng"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        />
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Giới tính tuyển dụng</Text>
                            <Select
                                type="single"
                                options={genderOptions}
                                value={form.gender}
                                onChange={handleChange("gender")}
                                placeholder="Chọn giới tính"
                            />
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Giờ làm việc</Text>
                            <Select
                                type="single"
                                options={workingTimeOptions}
                                value={form.workingTime}
                                onChange={handleChange("workingTime")}
                                placeholder="Chọn giờ làm việc"
                            />
                        </div>
                        <Input
                            label="Bằng cấp"
                            value={form.degree}
                            onChange={handleInputChange("degree")}
                            placeholder="Nhập bằng cấp"
                        />
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Kinh nghiệm</Text>
                            <Select
                                type="single"
                                options={experienceOptions}
                                value={form.experience}
                                onChange={handleChange("experience")}
                                placeholder="Chọn kinh nghiệm"
                            />
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Công việc</Text>
                            <Select
                                type="single"
                                options={jobTypeOptions}
                                value={form.job}
                                onChange={handleChange("job")}
                                placeholder="Chọn công việc"
                            />
                        </div>
                        <Text className="text-sm text-[#141415] ">Địa chỉ công ty</Text>
                        <textarea
                            id="company-address-textarea"
                            placeholder="Nhập địa chỉ công ty"
                            value={form.companyAddress}
                            onChange={handleInputChange("companyAddress")}
                            rows={2}
                            className="w-full min-h-[40px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        <Text className="text-sm text-[#141415] ">Quy mô công ty</Text>
                        <textarea
                            id="company-scale-textarea"
                            placeholder="Nhập quy mô công ty"
                            value={form.companyScale}
                            onChange={handleInputChange("companyScale")}
                            rows={2}
                            className="w-full min-h-[40px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        {message && <Text className="text-green-600">{message}</Text>}
                        <div className="flex justify-start w-full mb-4">
                            <Button
                                type="highlight"
                                htmlType="submit"
                                className="bg-blue-500 text-white w-full px-6 py-2 rounded-md hover:bg-blue-600"
                            >
                                Đăng tuyển dụng
                            </Button>
                        </div>
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default RecruitmentPostPage;
