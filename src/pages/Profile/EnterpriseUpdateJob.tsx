import Select from "@/components/Select";
import Skeleton from "@/components/Skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, DatePicker, Input, Text } from "zmp-ui";
import { updateRecruitment } from "../../api/enterpriseApi";
import { useProvinces, useSettings, useWards, useWardsByProvince } from "../RecruitmentPost/useRecruitment";
import { Users, Building2, MapPin, Calendar, Camera, Clock, Target, CheckCircle } from "lucide-react";
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

    const handleDetailInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetailForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleDetailChange = (field: string) => (value: any) => {
        setDetailForm(prev => ({ ...prev, [field]: value }));
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
        <div className="bg-gradient-to-b from-blue-50 to-gray-50">

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 pt-12 pb-20 px-6 rounded-b-3xl shadow-2xl">
                <div className="text-center text-white">
                    <h1 className="text-3xl font-bold">Tạo bài đăng tuyển dụng</h1>
                    <p className="text-blue-100 mt-2 text-lg">Tìm ứng viên chất lượng trong tích tắc</p>
                </div>
            </div>

            <div className="px-5 -mt-12">
                <div className="space-y-6">
                    {showDetailsModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                                <h3 className="text-xl font-bold mb-5 text-center">Thêm yêu cầu nhân sự</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Text className="font-medium mb-2">Giới tính</Text>
                                        <Select type="single" options={genderOptions} value={detailForm.Gender} onChange={handleDetailChange("Gender")} placeholder="Chọn giới tính" />
                                    </div>
                                    <div>
                                        <Text className="font-medium mb-2">Số lượng</Text>
                                        <Input value={detailForm.Quantity} onChange={handleDetailInputChange("Quantity")} placeholder="VD: 5" inputMode="numeric" />
                                    </div>
                                    <div>
                                        <Text className="font-medium mb-2">Độ tuổi</Text>
                                        <Select type="single" options={ageOptions} value={detailForm.Age} onChange={handleDetailChange("Age")} placeholder="Chọn độ tuổi" />
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <Button fullWidth type="highlight" onClick={() => {
                                        if (detailForm.Gender && detailForm.Quantity && detailForm.Age) {
                                            setDetails(prev => [...prev, { Gender: detailForm.Gender, Quantity: Number(detailForm.Quantity), Age: detailForm.Age }]);
                                            setDetailForm({ Gender: "", Quantity: "", Age: "" });
                                            setShowDetailsModal(false);
                                        }
                                    }}>Thêm</Button>
                                    <Button fullWidth type="neutral" onClick={() => { setDetailForm({ Gender: "", Quantity: "", Age: "" }); setShowDetailsModal(false); }}>Hủy</Button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                                <Target size={20} /> Tên vị trí tuyển dụng <span className="text-red-500">*</span>
                            </label>
                            <input type="text" placeholder="VD: Lập trình viên React" value={form.jobName} onChange={handleInputChange("jobName")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition" />
                            {errors.jobName && <p className="text-red-500 text-xs mt-1">{errors.jobName}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                                <Building2 size={20} /> Tên công ty
                            </label>
                            <div className="w-full px-4 py-3 bg-gray-100 rounded-xl font-medium text-gray-800">
                                {form.companyName || profileCompanyName || "Đang tải..."}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Nội dung tuyển dụng <span className="text-red-500">*</span></label>
                                <textarea rows={5} placeholder="Mô tả công việc..." value={form.content} onChange={handleInputChange("content")}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none" />
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Yêu cầu ứng viên <span className="text-red-500">*</span></label>
                                <textarea rows={5} placeholder="Kỹ năng cần có..." value={form.requirements} onChange={handleInputChange("requirements")}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none" />
                                {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                                <Calendar size={20} /> Ngày kết thúc nhận hồ sơ <span className="text-red-500">*</span>
                            </label>
                            <DatePicker value={form.endDate} onChange={handleChange("endDate")} label="Chọn ngày" startDate={new Date()} />
                            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                                <Camera size={20} /> Hình ảnh tuyển dụng
                            </label>
                            <label htmlFor="image-upload" className="block cursor-pointer">
                                <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 hover:border-blue-400 transition">
                                    {form.image ? (
                                        <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                            <Camera size={48} />
                                            <p className="mt-2 text-lg">Nhấn để tải ảnh lên</p>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div><Text className="font-medium mb-2">Phúc lợi</Text><Select type="multi" options={benefitsOptions} value={form.benefits} onChange={handleChange("benefits")} placeholder="Chọn phúc lợi" max={5} /></div>
                            <div><Text className="font-medium mb-2">Loại công việc</Text><Select type="single" options={jobTypeOptions} value={form.jobType} onChange={handleChange("jobType")} placeholder="Chọn loại" /></div>
                            <div><Text className="font-medium mb-2">Mức lương</Text><Select type="single" options={salaryOptions} value={form.salary} onChange={handleChange("salary")} placeholder="Chọn mức lương" /></div>
                            <div><Text className="font-medium mb-2">Vị trí</Text><Select type="single" options={positionOptions} value={form.position} onChange={handleChange("position")} placeholder="Chọn vị trí" /></div>
                            <div><Text className="font-medium mb-2">Giờ làm việc</Text><Select type="single" options={workingTimeOptions} value={form.workingTime} onChange={handleChange("workingTime")} placeholder="Chọn giờ làm" /></div>
                            <div><Text className="font-medium mb-2">Bằng cấp</Text><Select type="single" options={degreeOptions} value={form.degree} onChange={handleChange("degree")} placeholder="Chọn bằng cấp" /></div>
                            <div><Text className="font-medium mb-2">Kinh nghiệm</Text><Select type="single" options={experienceOptions} value={form.experience} onChange={handleChange("experience")} placeholder="Chọn kinh nghiệm" /></div>
                            <div><Text className="font-medium mb-2">Công việc</Text><Select type="single" options={jobTypeOptions} value={form.job} onChange={handleChange("job")} placeholder="Chọn công việc" /></div>
                        </div>
                        <div className="">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                    <Users size={28} className="text-blue-600" />
                                    Yêu cầu nhân sự
                                </h3>
                                <Button type="highlight" size="small" onClick={() => setShowDetailsModal(true)}>
                                    + Thêm mới
                                </Button>
                            </div>
                            {details.length > 0 && (
                                <div className="space-y-3">
                                    {details.map((d, i) => (
                                        <div key={i} className="bg-white border border-blue-100 rounded-xl px-5 py-4 flex items-center justify-between text-sm font-medium text-gray-800">
                                            <div className="flex items-center gap-6 flex-1">
                                                <div className="flex items-center gap-4 text-gray-700">
                                                    <span>{genderOptions.find(g => g.value === d.Gender)?.label || d.Gender}</span>
                                                    <span className="text-gray-400">|</span>
                                                    <span>{d.Quantity} người</span>
                                                    <span className="text-gray-400">|</span>
                                                    <span>{ageOptions.find(a => a.value === d.Age)?.label || d.Age}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setDetails(prev => prev.filter((_, idx) => idx !== i))}
                                                className="w-9 h-9 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                                                aria-label="Xóa yêu cầu này"
                                            >
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                                <MapPin size={20} /> Địa chỉ công ty
                            </label>
                            <textarea rows={2} value={form.companyAddress} onChange={handleInputChange("companyAddress")} placeholder="Số nhà, đường..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div><Text className="font-medium mb-2">Tỉnh/Thành phố</Text><Select type="single" options={provinceOptions} value={selectedProvince} onChange={val => setSelectedProvince(val)} placeholder="Chọn tỉnh/thành" /></div>
                            <div><Text className="font-medium mb-2">Phường/Xã</Text><Select type="single" options={wardsOptions} value={form.wards} onChange={handleChange("wards")} placeholder="Chọn phường/xã" status={errors.Wards ? "error" : undefined} errorText={errors.Wards} /></div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                                <Clock size={20} /> Trạng thái đăng tuyển <span className="text-red-500">*</span>
                            </label>
                            <Select type="single" options={statusOptions} value={form.Status} onChange={handleChange("Status")} />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-center font-bold text-white shadow-lg ${message.includes("thành công") ? "bg-green-600" : "bg-red-600"}`}>
                                <CheckCircle size={24} className="inline mr-2" />
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4">
                <Button
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-xl p-3 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                    Đăng tin tuyển dụng ngay
                </Button>
            </div>
        </div>
    );
};

export default EnterpriseUpdateJob;
