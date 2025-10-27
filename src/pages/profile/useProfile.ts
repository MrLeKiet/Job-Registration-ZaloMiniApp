import { getSettings } from "@/api/registerApi";
import { useQuery } from "react-query";
import { getProfile } from "./api";

export function useProfile() {
    const { data, isLoading, error } = useQuery(["profile"], getProfile, {
        staleTime: 2 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const { data: settingsData } = useQuery(["settings"], getSettings, {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    return {
        profile: data?.Data?.Data || null,
        settings: settingsData || null,
        loading: isLoading,
        error,
    };
}
