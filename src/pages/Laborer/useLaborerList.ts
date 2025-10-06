import { useQuery } from "react-query";
import { getLaborerList, getSettings, getWards } from "./api";

export function useLaborerList(filters: any) {
  // Only send non-empty params
  const params: Record<string, string> = {};
  Object.keys(filters).forEach(key => {
    if (filters[key] !== "") {
      params[key] = filters[key];
    }
  });

  const { data, isLoading, error } = useQuery([
    "laborer-list",
    params,
  ], () => getLaborerList(params), {
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  return {
    laborers: data || [],
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