import { useQuery } from "react-query";
import { getProfile } from "./api";

export function useProfile() {
    const { data, isLoading, error } = useQuery(["profile"], getProfile, {
        staleTime: 2 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
    return { profile: data?.Data?.Data || null, loading: isLoading, error };
}
