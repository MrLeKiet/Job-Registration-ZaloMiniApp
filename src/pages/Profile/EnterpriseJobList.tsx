import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import { AlertCircle, Briefcase, DollarSign, Edit3, MapPin, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnterpriseJobList } from "../../api/enterpriseApi";

const EnterpriseJobList: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCountdown, setDeleteCountdown] = useState(5);
    const [jobToDelete, setJobToDelete] = useState<any>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const accessToken = localStorage.getItem("accessToken") || "";
    const navigate = useNavigate();

    const handleClick = (job: any) => navigate(`/jobs/${job.id}`);
    const handleUpdate = (job: any) => navigate(`/update-job/${job.id}`);

    const handleDelete = (job: any) => {
        setJobToDelete(job);
        setShowDeleteModal(true);
        setDeleteCountdown(5);
        setDeleteError(null);
        setDeleteSuccess(false);
    };

    useEffect(() => {
        async function fetchJobs() {
            setLoading(true);
            setError(null);
            try {
                const res = await getEnterpriseJobList(accessToken);
                if (res?.StatusResult?.Code === 1) {
                    setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
                    setJobs([]);
                } else {
                    setJobs(res?.Data?.Data || []);
                }
            } catch (err) {
                setError("Không thể tải danh sách tin tuyển dụng.");
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [accessToken]);

    useEffect(() => {
        if (showDeleteModal && deleteCountdown > 0) {
            const timer = setTimeout(() => setDeleteCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [showDeleteModal, deleteCountdown]);

    // Skeleton đẹp hơn
    if (loading) {
        return (
            <div className="space-y-4 p-4">
                <SkeletonList count={4} renderSkeleton={() => (
                    <div className="bg-white rounded-2xl shadow-md p-5 animate-pulse">
                        <div className="flex gap-4">
                            <Skeleton className="w-20 h-20 rounded-xl" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-6 w-3/4 rounded-lg" />
                                <Skeleton className="h-4 w-1/2 rounded" />
                                <Skeleton className="h-4 w-2/3 rounded" />
                            </div>
                        </div>
                    </div>
                )} />
            </div>
        );
    }

    // Không có tin
    if (!loading && jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-6 shadow-inner">
                    <Briefcase size={56} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Chưa có tin tuyển dụng nào</h3>
                <p className="text-gray-600 mb-6">Hãy tạo tin tuyển dụng đầu tiên của bạn ngay hôm nay!</p>
                <button
                    onClick={() => navigate("/RecruitmentPost")}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all hover:shadow-xl"
                >
                    Tạo tin tuyển dụng mới
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            {jobs.map((job) => (
                <Card
                    key={job.id}
                    thumbnail={job.thumbnail}
                    onClick={() => handleClick(job)}
                >
                    <div className="flex gap-5 justify-center items-center">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col">
                                <div className="card-title">{job.title}</div>
                                <div className="card-subtitle">Khu vực: {job.location || "Chưa cập nhật"}</div>
                                <div className="card-meta">Mức lương: {job.salary || "Thỏa thuận"}</div>
                                <div className="">{job.status}</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdate(job);
                                }}
                                className="p-3 bg-blue-600 text-white rounded-xl font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                            >
                                <Edit3 size={18} />
                            </button>
                            {job.status === "Lưu nháp" && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(job);
                                    }}
                                    className="p-3 bg-red-600 text-white rounded-xl font-medium shadow-md hover:bg-red-700 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </Card>
            ))}

            {showDeleteModal && jobToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4" onClick={() => !deleting && setShowDeleteModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 text-center">
                            <AlertCircle size={48} className="mx-auto mb-3" />
                            <h3 className="text-2xl font-bold">Xóa tin tuyển dụng?</h3>
                            <p className="mt-2 opacity-90">Hành động này không thể hoàn tác</p>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <p className="font-semibold text-lg text-gray-900 line-clamp-2">{jobToDelete.title}</p>
                                <p className="text-sm text-gray-600 mt-1">{jobToDelete.location || "Không rõ địa điểm"}</p>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-700 mb-3">
                                    Bạn có thể xóa sau <span className="text-3xl font-bold text-red-600">{deleteCountdown}</span> giây
                                </p>
                                <div className="flex justify-center">
                                    <div className="w-20 h-20 rounded-full border-8 border-gray-200 relative overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-red-500 transition-all duration-1000"
                                            style={{ transform: `rotate(${(5 - deleteCountdown) * 72}deg)`, transformOrigin: "bottom" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {deleteError && (
                                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3">
                                    <AlertCircle size={20} />
                                    <span>{deleteError}</span>
                                </div>
                            )}

                            {deleteSuccess && (
                                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-center font-bold">
                                    Xóa thành công!
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 p-6 bg-gray-50 border-t">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleting}
                                className="flex-1 py-4 rounded-xl bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 transition"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                disabled={deleteCountdown > 0 || deleting}
                                onClick={async () => {
                                    if (!jobToDelete) return;
                                    setDeleting(true);
                                    setDeleteError(null);
                                    try {
                                        const { deleteRecruitmentEnterprise } = await import("../../api/DeleteRecruitmentEnterprise");
                                        const res = await deleteRecruitmentEnterprise(jobToDelete.id, accessToken);
                                        if (res?.StatusResult?.Code === 0) {
                                            setDeleteSuccess(true);
                                            setTimeout(() => {
                                                setShowDeleteModal(false);
                                                setJobs(prev => prev.filter(j => j.id !== jobToDelete.id));
                                            }, 1500);
                                        } else {
                                            setDeleteError(res?.StatusResult?.Message || "Xóa thất bại");
                                        }
                                    } catch (err) {
                                        setDeleteError("Lỗi kết nối. Vui lòng thử lại.");
                                    } finally {
                                        setDeleting(false);
                                    }
                                }}
                                className={`flex-1 py-4 rounded-xl font-bold transition-all ${deleteCountdown > 0 || deleting
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700 shadow-lg"
                                    }`}
                            >
                                {deleting ? "Đang xóa..." : `Xóa ngay (${deleteCountdown}s)`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnterpriseJobList;