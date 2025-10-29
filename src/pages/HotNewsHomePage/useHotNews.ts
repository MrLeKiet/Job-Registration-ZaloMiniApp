import { useQuery } from "react-query";
import { getHotNewsList } from "./api";

export function useHotNews() {
    const { data, isLoading: loading, error } = useQuery(
        ["hot-news-homepage"],
        getHotNewsList,
        {
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        }
    );
    return { news: data?.Data?.Data || [], loading, error };
}
