// Utility to decode HTML entities
function decodeHtmlEntities(str) {
    if (!str) return "";
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}
import Select from "@/components/Select";
import Skeleton from "@/components/Skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, DatePicker, Input, Text } from "zmp-ui";
import { updateRecruitment } from "../../api/enterpriseApi";
import { useProvinces, useSettings, useWards, useWardsByProvince } from "../RecruitmentPost/useRecruitment";

const EnterpriseUpdateJob: React.FC = () => {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Get company name from Profile
    const [profileCompanyName, setProfileCompanyName] = useState("");
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            import("./api").then(({ getProfileWithToken }) => {
                getProfileWithToken(accessToken).then(res => {
                    const companyName = res?.Data?.companyname || "";
                    setProfileCompanyName(companyName);
                    setForm(prev => ({ ...prev, companyName: companyName }));
                });
            });
        }
    }, []);
    const [form, setForm] = useState<any>({
        jobName: "",
        companyName: "",
        content: "",
        requirements: "",
        endDate: new Date(),
        image: null,
        benefits: [],
        jobType: "",
        salary: "",
        position: "",
        quantity: "1",
        gender: "",
        workingTime: "",
        degree: "",
        experience: "",
        Status: "",
        wards: "",
        job: "",
        companyAddress: "",
        companyScale: "",
    });
    // Details array and modal state
    const [details, setDetails] = useState<Array<{ Gender: string; Quantity: number; Age: string }>>([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [detailForm, setDetailForm] = useState<{ Gender: string; Quantity: string; Age: string }>({ Gender: "", Quantity: "", Age: "" });
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const { provinces } = useProvinces();
    const provinceOptions = Array.isArray(provinces)
        ? provinces.map(p => ({
            label: p.text || p.label || String(p.value || p.id || p),
            value: String(p.value || p.id || p.text || p)
        }))
        : [];
    const { settings } = useSettings();
    const { wards: allWards } = useWards();
    const { wards: provinceWards } = useWardsByProvince(selectedProvince);
    const [wardsOptions, setWardsOptions] = useState<{ label: string; value: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);
    const accessToken = localStorage.getItem("accessToken") || "";
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchJob() {
            setLoading(true);
            setError(null);
            try {
                const headers = {
                    "Accept": "application/json",
                    "Accept-Language": "2",
                    "Authorization": `Bearer ${accessToken}`,
                };
                const res = await axios.get(
                    "https://chatbot.ttld.sweetsoft.vn/api/v1/GetRecruitmentEnterprise",
                    {
                        params: { jodId: String(id) },
                        headers,
                        timeout: 15000,
                    }
                );
                const jobData = res?.data?.Data?.Data || res?.data?.Data || res?.data;
                if (!jobData) {
                    setError("Không tìm thấy công việc.");
                } else {
                    setJob(jobData);
                }
            } catch (err) {
                setError("Không thể tải dữ liệu công việc.");
            }
            setLoading(false);
        }
        if (id) fetchJob();
    }, [id, accessToken]);

    useEffect(() => {
        if (!job || !settings) return;
        // Directly map API values (encoded GUIDs/IDs) to form state for selects and fields
        setForm(prev => ({
            ...prev,
            RequirementId: job.RequirementId || job.id || job.requirementId || id || "",
            jobName: job.JobPosition || job.title || "",
            companyName: job.companyname || profileCompanyName || "",
            content: job.Summary || job.summary || "",
            requirements: job.JobRequirements || job.jobrequirements || "",
            endDate: job.RecruitmentPeriod ? new Date(job.RecruitmentPeriod.split("|")[1]) : new Date(),
            benefits: Array.isArray(job.Benefits) ? job.Benefits : [],
            jobType: job.Job || "",
            job: job.Job || "",
            salary: job.Salary || "",
            position: job.Position || "",
            workingTime: job.WorkingTime || "",
            degree: job.Qualifications || "",
            experience: job.WorkExperience || "",
            gender: job.Details && job.Details[0] ? job.Details[0].Gender : "",
            companyAddress: job.Address || job.companyaddress || "",
            companyScale: job.companyscale || "",
            quantity: job.Details && job.Details[0] ? job.Details[0].Quantity?.toString() : "1",
            wards: Array.isArray(job.Wards) ? job.Wards[0] : "",
            Status: job.status || "",
        }));
        // Map Details array from API
        if (Array.isArray(job.Details)) {
            setDetails(job.Details.map((d: any) => ({
                Gender: d.Gender || "",
                Quantity: Number(d.Quantity) || 0,
                Age: d.Age || ""
            })));
        }
    }, [job, settings]);
    // Image upload handler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setForm((prev: any) => ({ ...prev, image: typeof reader.result === "string" ? reader.result : null }));
            };
            reader.onerror = () => {
                setForm((prev: any) => ({ ...prev, image: null }));
            };
            reader.readAsDataURL(file);
        } else {
            setForm((prev: any) => ({ ...prev, image: null }));
        }
    };

    // Set wardsOptions based on province selection
    React.useEffect(() => {
        if (!selectedProvince) {
            setWardsOptions(Array.isArray(allWards)
                ? allWards.map(w => ({
                    label: w.text || w.label || String(w.value || w.id || w),
                    value: String(w.value || w.id || w.text || w)
                }))
                : []);
        } else {
            setWardsOptions(Array.isArray(provinceWards)
                ? provinceWards.map(w => ({
                    label: w.text || w.label || String(w.value || w.id || w),
                    value: String(w.value || w.id || w.text || w)
                }))
                : []);
            setForm((prev: any) => ({ ...prev, wards: "" }));
        }
    }, [selectedProvince, allWards, provinceWards]);

    React.useEffect(() => {
        if (settings?.ListStatusJob) {
            const allowedLabels = ["Lưu nháp", "Chờ xét duyệt"];
            const filtered = settings.ListStatusJob.filter(
                (s: any) => allowedLabels.includes(s.label)
            );
            setStatusOptions(filtered.map((s: any) => ({
                label: s.label || s.value || s,
                value: s.value || s.label || s
            })));
            // Set Status to "Chờ xét duyệt" value by default
            const choXetDuyet = filtered.find((s: any) => s.label === "Chờ xét duyệt");
            if (choXetDuyet) {
                setForm((prev: any) => ({ ...prev, Status: choXetDuyet.value }));
            }
        }
    }, [settings]);

    const handleChange = (field: string) => (value: any) => {
        setForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev: any) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        console.log("Submitting updateRecruitment...");
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        setSaving(true);
        setSuccess(false);
        setError(null);
        setMessage(null);
        const formatDate = (d: Date) => {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const newErrors: Record<string, string> = {};
        if (!form.jobName) newErrors.jobName = "Tên tuyển dụng bắt buộc";
        if (!form.companyName) newErrors.companyName = "Tên công ty bắt buộc";
        if (!form.content) newErrors.content = "Nội dung tuyển dụng bắt buộc";
        if (!form.requirements) newErrors.requirements = "Yêu cầu tuyển dụng bắt buộc";
        if (!form.companyAddress) newErrors.companyAddress = "Địa chỉ công ty bắt buộc";
        if (!form.companyScale) newErrors.companyScale = "Quy mô công ty bắt buộc";
        if (!form.quantity) newErrors.quantity = "Số lượng tuyển bắt buộc";
        if (!form.degree) newErrors.degree = "Bằng cấp bắt buộc";
        if (!form.jobType) newErrors.jobType = "Loại công việc bắt buộc";
        if (!form.salary) newErrors.salary = "Mức lương bắt buộc";
        if (!form.position) newErrors.position = "Vị trí bắt buộc";
        if (!form.gender) newErrors.gender = "Giới tính bắt buộc";
        if (!form.workingTime) newErrors.workingTime = "Giờ làm việc bắt buộc";
        if (!form.experience) newErrors.experience = "Kinh nghiệm bắt buộc";
        if (!form.job) newErrors.job = "Công việc bắt buộc";
        if (!form.wards) newErrors.wards = "Phường/Xã bắt buộc";
        if (!form.Status) newErrors.Status = "Trạng thái bắt buộc";
        const today = new Date();
        const end = form.endDate || new Date();
        if (end <= today) newErrors.endDate = "Ngày kết thúc phải lớn hơn hôm nay";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setSaving(false);
            return;
        }
        const recruitmentPeriod = `${formatDate(today)}|${formatDate(end)}`;
        const apiData = {
            RequirementId: form.RequirementId || id,
            JobPosition: form.jobName || "null",
            JobType: form.jobType || "null",
            Job: form.job || "null",
            Position: form.position || "null",
            Qualifications: form.degree || "null",
            WorkingTime: form.workingTime || "null",
            WorkExperience: form.experience || "null",
            Salary: form.salary || "null",
            Benefits: Array.isArray(form.benefits) ? form.benefits.filter((b: any) => b && b.trim() !== "") : [],
            RecruitmentPeriod: recruitmentPeriod,
            Summary: form.content || "null",
            JobRequirements: form.requirements || "null",
            Status: form.Status || "null",
            Details: details.length > 0 ? details : [{
                Gender: form.gender || "null",
                Quantity: Number(form.quantity) || 0,
                Age: "null",
            }],
            Wards: form.wards ? [form.wards] : [],
            Address: form.companyAddress || "null",
            Image: form.image || null,
            CompanyName: form.companyName || "null",
        };
        try {
            console.log("Calling updateRecruitment", apiData);
            const res = await updateRecruitment(apiData, accessToken);
            console.log("API response:", res);
            if (res?.StatusResult?.Code === 0) {
                setSuccess(true);
                setMessage("Cập nhật thành công!");
                setTimeout(() => navigate(-1), 1500);
            } else {
                setError(res?.StatusResult?.Message || "Cập nhật thất bại.");
            }
        } catch (err: any) {
            setError("Có lỗi xảy ra khi cập nhật!");
        }
        setSaving(false);
    };

    if (loading) return <Skeleton className="h-32 w-full" />;
    if (error) return <div className="text-red-600 p-4">{error}</div>;
    if (!job) return null;

    // Use API data directly for select options
    const jobTypeOptions = settings?.ListJob || [];
    const salaryOptions = settings?.ListSalary || [];
    const positionOptions = settings?.ListPosition || [];
    const benefitsOptions = settings?.ListBenefits || [];
    const genderOptions = settings?.ListGenderSearch || [];
    const workingTimeOptions = settings?.ListWorkingTime || [];
    const experienceOptions = settings?.ListExp || [];
    const degreeOptions = settings?.TechnicalLevel || [];
    const ageOptions = settings?.ListAgeRecruitment || [];

    return (
        <div className="p-4">
            <div className="">
                <Box className=" flex flex-col gap-4 rounded">
                    <Text.Header className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">Cập nhật bài đăng tuyển dụng</Text.Header>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Nhân sự section */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between">
                                <Text className="font-semibold text-base">Nhân sự</Text>
                                <Button type="highlight" size="small" onClick={() => setShowDetailsModal(true)}>Thêm mới</Button>
                            </div>
                            {/* List current details */}
                            {details.length > 0 && (
                                <ul className="mt-2">
                                    {details.map((d) => {
                                        const ageLabel = ageOptions.find(a => a.value === d.Age)?.label || d.Age;
                                        const key = `${d.Gender}-${d.Age}-${d.Quantity}`;
                                        return (
                                            <li key={key} className="flex gap-2 items-center text-sm py-1">
                                                <span>Giới tính: {genderOptions.find(g => g.value === d.Gender)?.label || d.Gender}</span>
                                                <span>Số lượng: {d.Quantity}</span>
                                                <span>Độ tuổi: {ageLabel}</span>
                                                <Button type="neutral" size="small" onClick={() => {
                                                    setDetails(prev => prev.filter((item) => `${item.Gender}-${item.Age}-${item.Quantity}` !== key));
                                                }}>Xóa</Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        {/* Details modal */}
                        {showDetailsModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                                    <Text.Header className="text-lg font-bold mb-4">Thêm thông tin nhân sự</Text.Header>
                                    <div className="mb-3">
                                        <Text className="text-sm mb-1">Giới tính</Text>
                                        <Select
                                            type="single"
                                            options={genderOptions}
                                            value={detailForm.Gender}
                                            onChange={val => setDetailForm(f => ({ ...f, Gender: val }))}
                                            placeholder="Chọn giới tính"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Text className="text-sm mb-1">Số lượng</Text>
                                        <Input
                                            value={detailForm.Quantity}
                                            onChange={e => setDetailForm(f => ({ ...f, Quantity: e.target.value }))}
                                            placeholder="Nhập số lượng"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Text className="text-sm mb-1">Độ tuổi</Text>
                                        <Input
                                            value={detailForm.Age}
                                            onChange={e => setDetailForm(f => ({ ...f, Age: e.target.value }))}
                                            placeholder="Nhập độ tuổi"
                                        />
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button
                                            type="highlight"
                                            onClick={() => {
                                                if (detailForm.Gender && detailForm.Quantity && detailForm.Age) {
                                                    setDetails(prev => [...prev, { Gender: detailForm.Gender, Quantity: Number(detailForm.Quantity), Age: detailForm.Age }]);
                                                    setDetailForm({ Gender: "", Quantity: "", Age: "" });
                                                    setShowDetailsModal(false);
                                                }
                                            }}
                                        >Thêm</Button>
                                        <Button
                                            type="neutral"
                                            onClick={() => {
                                                setDetailForm({ Gender: "", Quantity: "", Age: "" });
                                                setShowDetailsModal(false);
                                            }}
                                        >Đóng</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Text className="text-sm text-[#141415] ">Tên việc tuyển dụng</Text>
                        <input
                            type="text"
                            placeholder="Nhập tên tuyển dụng"
                            value={form.jobName}
                            onChange={handleInputChange("jobName")}
                            className="w-full rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        {errors.jobName && <Text className="text-red-600 text-xs">{errors.jobName}</Text>}
                        <Text className="text-sm text-[#141415] ">Tên công ty</Text>
                        <div className="w-full min-h-[40px] rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 bg-gray-100">
                            {form.companyName || profileCompanyName || "Chưa có thông tin công ty"}
                        </div>
                        {errors.companyName && <Text className="text-red-600 text-xs">{errors.companyName}</Text>}
                        <Text className="text-sm text-[#141415] ">Nội dung tuyển dụng</Text>
                        <textarea
                            id="recruitment-content"
                            placeholder="Nhập nội dung"
                            value={form.content}
                            onChange={handleInputChange("content")}
                            rows={4}
                            className="w-full min-h-[80px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        {errors.content && <Text className="text-red-600 text-xs">{errors.content}</Text>}
                        <Text className="text-sm text-[#141415] ">Yêu cầu tuyển dụng</Text>
                        <textarea
                            id="recruitment-requirements"
                            placeholder="Nhập yêu cầu"
                            value={form.requirements}
                            onChange={handleInputChange("requirements")}
                            rows={4}
                            className="w-full min-h-[80px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        {errors.requirements && <Text className="text-red-600 text-xs">{errors.requirements}</Text>}
                        <DatePicker
                            value={form.endDate}
                            onChange={handleChange("endDate")}
                            label="Ngày kết thúc tìm việc"
                            aria-label="Ngày kết thúc tìm việc"
                            startDate={new Date()}
                            defaultValue={new Date()}
                        />
                        {errors.endDate && <Text className="text-red-600 text-xs">{errors.endDate}</Text>}
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
                        {errors.jobType && <Text className="text-red-600 text-xs">{errors.jobType}</Text>}
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
                        {errors.salary && <Text className="text-red-600 text-xs">{errors.salary}</Text>}
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
                        {errors.position && <Text className="text-red-600 text-xs">{errors.position}</Text>}
                        <Input
                            label="Số lượng tuyển"
                            value={form.quantity}
                            onChange={handleInputChange("quantity")}
                            placeholder="Nhập số lượng"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        />
                        {errors.quantity && <Text className="text-red-600 text-xs">{errors.quantity}</Text>}
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
                        {errors.gender && <Text className="text-red-600 text-xs">{errors.gender}</Text>}
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
                        {errors.workingTime && <Text className="text-red-600 text-xs">{errors.workingTime}</Text>}
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Bằng cấp</Text>
                            <Select
                                type="single"
                                options={degreeOptions}
                                value={form.degree}
                                onChange={handleChange("degree")}
                                placeholder="Chọn bằng cấp"
                            />
                        </div>
                        {errors.degree && <Text className="text-red-600 text-xs">{errors.degree}</Text>}
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
                        {errors.experience && <Text className="text-red-600 text-xs">{errors.experience}</Text>}
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
                        {errors.job && <Text className="text-red-600 text-xs">{errors.job}</Text>}
                        <Text className="text-sm text-[#141415] ">Địa chỉ công ty</Text>
                        <textarea
                            id="company-address-textarea"
                            placeholder="Nhập địa chỉ công ty"
                            value={form.companyAddress}
                            onChange={handleInputChange("companyAddress")}
                            rows={2}
                            className="w-full min-h-[40px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        {errors.companyAddress && <Text className="text-red-600 text-xs">{errors.companyAddress}</Text>}
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Tỉnh/Thành</Text>
                            <Select
                                type="single"
                                options={provinceOptions}
                                value={selectedProvince}
                                onChange={val => setSelectedProvince(val)}
                                placeholder="Chọn tỉnh/thành"
                            />
                        </div>
                        <div>
                            <Text className="text-sm text-[#141415] mb-2">Phường/Xã</Text>
                            <Select
                                type="single"
                                options={wardsOptions}
                                value={form.wards}
                                onChange={handleChange("wards")}
                                placeholder="Chọn phường/xã"
                                status={errors.wards ? "error" : "normal"}
                                errorText={errors.wards}
                            />
                        </div>
                        <Text className="text-sm text-[#141415] ">Quy mô công ty</Text>
                        <textarea
                            id="company-scale-textarea"
                            placeholder="Nhập quy mô công ty"
                            value={form.companyScale}
                            onChange={handleInputChange("companyScale")}
                            rows={2}
                            className="w-full min-h-[40px] resize-vertical rounded-lg p-3 border text-base border-[#141415]/30 border-opacity-35 focus:border-[#3b82f6] hover:border-[#3b82f6] focus:outline-none transition-colors"
                        />
                        {errors.companyScale && <Text className="text-red-600 text-xs">{errors.companyScale}</Text>}
                        <div style={{ display: "none" }}>
                            <Text className="text-sm text-[#141415] mb-2">Trạng thái</Text>
                            <Select
                                type="single"
                                options={statusOptions}
                                value={form.Status}
                                onChange={handleChange("Status")}
                                placeholder="Chọn trạng thái"
                            />
                        </div>
                        {message && <Text className="text-green-600">{message}</Text>}
                        {error && <Text className="text-red-600">{error}</Text>}
                        <div className="flex justify-start w-full">
                            <Button
                                type="highlight"
                                className="bg-blue-500 text-white w-full px-6 py-2 rounded-md hover:bg-blue-600"
                                disabled={saving}
                                htmlType="submit"
                            >
                                {saving ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </div>
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default EnterpriseUpdateJob;
