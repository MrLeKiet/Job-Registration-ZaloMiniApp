import { useQuery } from "react-query";
import { getJobList, getSettings, getWards } from "./api";

export function useJobsList(filters: any) {
    const params: Record<string, string> = {};
    for (const key of Object.keys(filters)) {
        if (filters[key] !== "") {
            params[key] = filters[key];
        }
    }

    const { data, isLoading, error } = useQuery([
        "jobs",
        params,
    ], () => getJobList(params), {
        keepPreviousData: true,
        staleTime: 2 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    // Get local posts from localStorage
    let localPosts: any[] = [];
    try {
        const stored = localStorage.getItem("recruitmentPosts");
        if (stored) {
            localPosts = JSON.parse(stored).map((post: any) => ({
                ...post,
                // Map to Card fields
                id: post.id,
                title: post.job || post.position || "Bài đăng nội bộ",
                job: post.job || "Chưa cập nhật",
                location: post.companyAddress || "Thỏa thuận",
                salary: post.salary || "Thỏa thuận",
                // Extract thumbnail logic
                thumbnail: (() => {
                    if (post.image) {
                        if (typeof post.image === "string") {
                            return post.image;
                        }
                    }
                    return undefined;
                })(),
                createdAt: post.id // use id (timestamp) as creation time
            }));
        }
    } catch {}

    // Merge and sort jobs by createdAt (newest first)
    const allJobs = [...localPosts, ...(data || [])].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    return {
        jobs: allJobs,
        loading: isLoading,
        error,
    };
}

export function useSettings() {
    const { data, isLoading: loading, error } = useQuery(
        ["settings"],
        getSettings,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { settings: data || {}, loading, error };
}

export function useWards() {
    const { data, isLoading: loading, error } = useQuery(
        ["wards"],
        getWards,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { wards: data || [], loading, error };
}