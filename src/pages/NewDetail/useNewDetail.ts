import { useQuery } from "react-query";
import { useParams } from "zmp-ui";
import { getNewsDetail } from "./api";

export function useNewDetail() {
    const params = useParams();
    const id = params.id;
    const {
        data,
        isLoading: loading,
        error
    } = useQuery(
        ["news-detail", id],
        () => (id ? getNewsDetail(id) : Promise.resolve(null)),
        {
            enabled: !!id,
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        }
    );
    return { news: data, loading, error };
}