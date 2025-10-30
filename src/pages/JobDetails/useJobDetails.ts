import { useQuery } from "react-query";
import { useParams } from "zmp-ui";
import { getJobDetails } from "./api";

function mapLocalJobToApiFormat(localJob: any) {
    if (!localJob) return null;
    const formatDate = (date: any) => {
        const d = typeof date === "string" ? new Date(date) : date;
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const thumbnail =
        localJob.image && typeof localJob.image === "string"
            ? localJob.image
            : undefined;

    return {
        id: localJob.id,
        title: localJob.job || localJob.position || "Bài đăng nội bộ",
        companyname: localJob.companyNameTextarea || localJob.companyName || "Chưa cập nhật",
        salary: localJob.salary || "Thỏa thuận",
        experience: localJob.experience || "Không yêu cầu",
        job: localJob.job || "Không xác định",
        degreerequired: localJob.degree || "Không yêu cầu",
        location: localJob.companyAddress || "Chưa cập nhật",
        position: localJob.position || "Chưa cập nhật",
        gender: localJob.gender || "Không yêu cầu",
        numofrecruitment: localJob.quantity || "1",
        workingtime: localJob.workingTime || "Giờ hành chính",
        companyaddress: localJob.companyAddress || "Chưa cập nhật",
        companyscale: localJob.companyScale || "Chưa cập nhật",
        deadline: localJob.endDate ? formatDate(localJob.endDate) : "Chưa cập nhật",
        publishdate: localJob.id ? new Date(localJob.id).toLocaleDateString() : "Chưa cập nhật",
        summary: localJob.content || "Chưa có mô tả.",
        jobrequirements: localJob.requirements || "Chưa có yêu cầu.",
        benefits: Array.isArray(localJob.benefits) ? localJob.benefits.join(", ") : (localJob.benefits || "Chưa có thông tin."),
        thumbnail,
    };
}

export function useJobDetail() {
    const params = useParams();
    const id = params.id;
    let localJob: any = null;
    if (id) {
        try {
            const stored = localStorage.getItem("recruitmentPosts");
            if (stored) {
                const posts = JSON.parse(stored);
                localJob = posts.find((post: any) => String(post.id) === String(id));
            }
        } catch {}
    }
    const fetchJobDetail = () => {
        if (localJob) {
            return localJob;
        }
        if (id) {
            return getJobDetails(id);
        }
        return Promise.resolve(null);
    };

    const { data, isLoading: loading, error } = useQuery(
        ["job-detail", id],
        fetchJobDetail,
        {
            enabled: !!id,
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        }
    );
    if (localJob) {
        const mappedJob = mapLocalJobToApiFormat(localJob);
        return { job: mappedJob, loading: false, error: null };
    }
    return { job: data?.Data?.Data || null, loading, error };
}