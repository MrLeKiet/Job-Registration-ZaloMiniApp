import { useQuery } from "react-query";
import { useParams } from "zmp-ui";
import { getLaborerDetail } from "./api";

export function useLaborerDetail() {
    const params = useParams();
    const laboreId = params.id;
    const { data, isLoading: loading, error } = useQuery(
        ["laborer-detail", laboreId],
        () => (laboreId ? getLaborerDetail(laboreId) : Promise.resolve(null)),
        {
            enabled: !!laboreId,
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { laborer: data, loading, error };
}
