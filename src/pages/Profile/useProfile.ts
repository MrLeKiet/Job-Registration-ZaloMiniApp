import { getSettings } from "@/api/registerApi";
import { useQuery } from "react-query";
import { getProfileWithToken } from "./api";

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