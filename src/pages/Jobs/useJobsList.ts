import { useQuery } from "react-query";
import { getJobList, getSettings, getWards } from "./api";

export function useJobsList(filters: any) {
    const params: Record<string, string> = {};
    Object.keys(filters).forEach(key => {
        if (filters[key] !== "") {
            params[key] = filters[key];
        }
    });

    const { data, isLoading, error } = useQuery([
        "jobs",
        params,
    ], () => getJobList(params), {
        keepPreviousData: true,
        staleTime: 2 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    return {
        jobs: data || [],
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