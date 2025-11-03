import { getSettings } from "@/api/registerApi";
import { useQuery } from "react-query";
import { getProfile } from "./api";

export function useProfile() {
    // Only fetch profile if user is signed in
    const isSignedIn = !!localStorage.getItem('token');
    const { data, isLoading, error } = useQuery(["profile"], getProfile, {
        enabled: isSignedIn,
    });

    const { data: settingsData } = useQuery(["settings"], getSettings, {
    });

    return {
        profile: data?.Data?.Data || null,
        settings: settingsData || null,
        loading: isLoading,
        error,
    };
}