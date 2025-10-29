import Select from "@/components/Select";
import React, { useState } from "react";
import { Box, Button, DatePicker, Input, Text } from "zmp-ui";
import { useSettings } from "./useRecruitment";

const RecruitmentPostPage: React.FC = () => {
    type PostType = {
        id: number;
        companyName: string;
        content: string;
        requirements: string;
        endDate: Date;
        image: File | null;
        benefits: string[];
        jobType: string;
        salary: string;
        position: string;
        quantity: string;
        gender: string;
        workingTime: string;
        degree: string;
        experience: string;
        job: string;
        companyNameTextarea: string;
        companyAddress: string;
        companyScale: string;
    };
    const { settings } = useSettings();
    const [form, setForm] = useState<{
        companyName: string;
        content: string;
        requirements: string;
        endDate: Date;
        image: File | null;
        benefits: string[];
        jobType: string;
        salary: string;
        position: string;
        quantity: string;
        gender: string;
        workingTime: string;
        degree: string;
        experience: string;
        job: string;
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
        job: "",
        companyNameTextarea: "Công ty ABC",
        companyAddress: "123 Đường A, Quận B, TP. C",
        companyScale: "100-200 người",
    });
    const [posts, setPosts] = useState<PostType[]>(() => {
        try {
            const stored = localStorage.getItem("recruitmentPosts");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });
    React.useEffect(() => {
        localStorage.setItem("recruitmentPosts", JSON.stringify(posts));
    }, [posts]);
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (field: string) => (value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setForm((prev) => ({ ...prev, image: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPosts(prev => [...prev, { ...form, id: Date.now() }]);
        setMessage("Recruitment post submitted!");
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
                                <label htmlFor="image-upload" className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    {form.image ? (
                                        <img
                                            src={form.image ? URL.createObjectURL(form.image) : ''}
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
                                {form.image && <Text className="text-xs mt-1">{(form.image as File).name}</Text>}
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
