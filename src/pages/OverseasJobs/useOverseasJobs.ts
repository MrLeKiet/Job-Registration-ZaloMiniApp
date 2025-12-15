
import { useQuery } from "react-query";
import { fetchOverseasJobs } from "./api";

export function useOverseasJobs() {
    const {
        data,
        isLoading: loading,
        error,
    } = useQuery(["overseasJobs", 0, 5], () => fetchOverseasJobs(0, 5), {
        staleTime: 2 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const items = data?.Data?.Data || [];

    return { items, loading, error };
}
