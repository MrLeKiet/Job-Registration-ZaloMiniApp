import { getSettings } from "@/api/registerApi";
import { useQuery } from "react-query";
import { getProfileWithToken } from "./api";
import { getEnterpriseJobApplyList } from "../JobDetails/api";
import React from "react";

export function useProfile(token?: string) {
    // Only fetch profile if token is provided
    const isSignedIn = !!token;
    const { data, isLoading, error } = useQuery([
        "profile",
        token
    ], () => getProfileWithToken(token!), {
        enabled: isSignedIn,
    });

    const { data: settingsData } = useQuery(["settings"], getSettings, {});

    return {
        profile: data?.Data?.Data || null,
        settings: settingsData || null,
        loading: isLoading,
        error,
    };
}

export function useLaborerJobApplyList(accessToken: string) {
    const [jobs, setJobs] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchJobs() {
            setLoading(true);
            setError(null);
            try {
                const res = await getEnterpriseJobApplyList(accessToken, 0, 20);
                setJobs(res?.Data?.Data || []);
            } catch (err) {
                setError("Không thể tải danh sách việc đã ứng tuyển.");
            } finally {
                setLoading(false);
            }
        }
        if (accessToken) fetchJobs();
    }, [accessToken]);

    return { jobs, loading, error };
}