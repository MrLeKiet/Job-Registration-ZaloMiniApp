import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GetRecruitmentForeignerDetail } from "./api";

export function useRecruitmentJobDetail() {
    const params = useParams();
    const id = params.id;
    const { data, isLoading: loading, error } = useQuery(
        ["recruitment-foreigners-job-detail", id],
        () => (id ? GetRecruitmentForeignerDetail(id) : Promise.resolve(null)),
        {
            enabled: !!id,
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { job: data?.Data || null, loading, error };
}
