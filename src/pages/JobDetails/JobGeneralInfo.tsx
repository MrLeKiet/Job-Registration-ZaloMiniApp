
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import { AlertTriangle, BriefcaseBusiness, CheckCircle2, Clock, GraduationCap, HandCoins, Heart, MapPin, X, XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useJobDetail } from "./useJobDetails";

const JobGeneralInfo: React.FC = () => {
    const { job, loading, error, rawData } = useJobDetail();
    const [hideApply, setHideApply] = React.useState(false);
    const [applyListNotFound, setApplyListNotFound] = React.useState(false);
    const [applying, setApplying] = React.useState(false);
    const [applyResult, setApplyResult] = React.useState<{ type: 'success' | 'error' | 'warning', message: string } | null>(null);
    const [alreadyApplied, setAlreadyApplied] = React.useState(false);
    const accessToken = localStorage.getItem("accessToken") || "";
    const navigate = useNavigate()
    // Hide apply button if job not found (Code 7)
    React.useEffect(() => {
        if (rawData && rawData.StatusResult && rawData.StatusResult.Code === 7) {
            setHideApply(true);
        } else {
            setHideApply(false);
        }
    }, [rawData]);

    React.useEffect(() => {
        async function checkApplied() {
            if (!job?.id || !accessToken) return;
            try {
                const res = await import("./api").then(m => m.getEnterpriseJobApplyList(accessToken, 0, 100));
                if (res?.StatusResult?.Code === 7) {
                    setApplyListNotFound(true);
                    setAlreadyApplied(false);
                    return;
                } else {
                    setApplyListNotFound(false);
                }
                const appliedList = res?.Data?.Data || [];
                const found = appliedList.some((item: any) => String(item.id) === String(job.id));
                setAlreadyApplied(found);
            } catch {
                setApplyListNotFound(true);
                setAlreadyApplied(false);
            }
        }
        checkApplied();
    }, [job?.id, accessToken]);
    const handleApply = async () => {
        if (!job?.id ) return;
        setApplying(true);
        setApplyResult(null);
        try {
            const res = await import("./api").then(m => m.applyForJob(job.id, accessToken));
            if (res?.StatusResult?.Code === 0) {
                setApplyResult({ type: 'success', message: "Ứng tuyển thành công!" });
                setAlreadyApplied(true);
            } else {
                setApplyResult({ type: 'error', message: res?.StatusResult?.Message || "Ứng tuyển thất bại!" });
            }
        } catch {
            setApplyResult({ type: 'error', message: "Có lỗi xảy ra khi ứng tuyển." });
            navigate("/profile");
        } finally {
            setApplying(false);
        }
        
    };
    if (loading) return (
        <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-2 mb-2">
            <SkeletonList
                count={1}
                renderSkeleton={() => (
                    <>
                        <Skeleton className="h-8 w-3/4 mb-2" />
                        <div className="flex gap-4 mb-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <Skeleton className="h-10 w-1/2" />
                    </>
                )}
            />
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="bg-white shadow p-4">
            <div className="flex items-center gap-4 mb-3">
                {job?.thumbnail ? (
                    <img src={job.thumbnail} alt={job.companyname || ""} className="w-16 h-16 object-cover rounded-full border" />
                ) : null}
                <div className="flex-1">
                    <div className="font-bold text-xl text-gray-900 mb-1">{job?.title || "Không có tiêu đề"}</div>
                    <div className="text-gray-600 text-base font-bold">{job?.companyname || "Chưa cập nhật"}</div>
                </div>
            </div>
            <div className="border-b border-gray-200 mb-3" />
            <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Lương</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <HandCoins size={16} />
                        {job?.salary || "Thỏa thuận"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Kinh nghiệm</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <BriefcaseBusiness size={16} />
                        {job?.experience || "Không yêu cầu"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Ngành nghề</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <BriefcaseBusiness size={16} />
                        {job?.job || "Không xác định"}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-bold mb-1">Bằng cấp</span>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm bg-blue-50 text-blue-700 w-fit">
                        <GraduationCap size={16} />
                        {job?.degreerequired || "Không yêu cầu"}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-gray-700">
                    <MapPin size={16} />
                    <span className="font-bold whitespace-nowrap">Vị trí:</span>
                    <span className="font-normal text-gray-900 pl-1">{job?.location || "Chưa cập nhật"}</span>
                </div>
            </div>
            <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-gray-700">
                    <Clock size={16} />
                    <span className="font-bold">Hạn nộp hồ sơ:</span>
                    <span className="font-normal text-gray-900">{job?.deadline || "Chưa cập nhật"}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                    <Heart size={16} />
                    <span className="font-normal">{job?.viewcount || 0} lượt xem</span>
                </div>
            </div>
            <div className="flex gap-3 mt-2">
                {!(hideApply || applyListNotFound) && (
                  alreadyApplied ? (
                    <button
                        className="flex-1 font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-base transition bg-gray-300 text-gray-700 cursor-not-allowed"
                        disabled
                    >
                        <CheckCircle2 size={20} className="text-green-600" />
                        Đã ứng tuyển
                    </button>
                  ) : (
                    <button
                        className="flex-1 font-bold text-white py-3 rounded-lg flex items-center justify-center gap-2 text-base transition"
                        style={{background:'#1565C0'}}
                        onMouseOver={e => e.currentTarget.style.background='#0d47a1'}
                        onFocus={e => e.currentTarget.style.background='#0d47a1'}
                        onMouseOut={e => e.currentTarget.style.background='#1565C0'}
                        onBlur={e => e.currentTarget.style.background='#1565C0'}
                        onClick={handleApply}
                        disabled={applying}
                    >
                        <p className="text-white">{applying ? "Đang ứng tuyển..." : "Ứng tuyển ngay"}</p>
                    </button>
                  )
                )}
            </div>
            {applyResult && (
                <div
                    className={`mt-3 mx-auto flex items-center justify-center gap-2 px-4 py-3 rounded-lg shadow-sm w-fit relative
                        ${applyResult.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : ''}
                        ${applyResult.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
                        ${applyResult.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : ''}
                    `}
                >
                    {applyResult.type === 'success' && <CheckCircle2 size={22} className="mr-1 text-green-600" />}
                    {applyResult.type === 'error' && <XCircle size={22} className="mr-1 text-red-600" />}
                    {applyResult.type === 'warning' && <AlertTriangle size={22} className="mr-1 text-yellow-600" />}
                    <span className="pr-5">{applyResult.message}</span>
                    <button
                        className="ml-2 p-1 rounded hover:bg-gray-200 transition absolute right-2 top-2.5"
                        onClick={() => setApplyResult(null)}
                        aria-label="Đóng thông báo"
                        style={{ lineHeight: 0, background: 'none', border: 'none' }}
                    >
                        <X size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobGeneralInfo;
