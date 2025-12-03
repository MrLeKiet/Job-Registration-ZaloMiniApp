import { useQuery } from "react-query";
import { getProvinces, getSettings, getWards, getWardsByProvince } from "./api";
export function useProvinces() {
    const { data, isLoading: loading, error } = useQuery(
        ["provinces"],
        getProvinces,
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { provinces: data || [], loading, error };
}

export function useWardsByProvince(provinceId: string) {
    const { data, isLoading: loading, error } = useQuery(
        ["wards", provinceId],
        () => getWardsByProvince(provinceId),
        {
            enabled: !!provinceId,
            staleTime: 5 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { wards: data || [], loading, error };
}

export function useSettings() {
    const { data, isLoading: loading, error } = useQuery(
        ["settings"],
        getSettings,
        {
            staleTime: 5 * 60 * 1000,
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
            staleTime: 5 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { wards: data || [], loading, error };
}
