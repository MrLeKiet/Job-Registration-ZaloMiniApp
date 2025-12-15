import { useQuery } from "react-query";
import { fetchAboutUs } from "./api";

export function useAboutUs() {
    const {
        data,
        isLoading: loading,
        error,
    } = useQuery(["aboutUs"], fetchAboutUs, {
        staleTime: 2 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    // Map the API response to expected info format
    const info = data?.Data?.Data || null;

    return { info, loading, error };
}
