import { useState } from "react";
import { useQuery } from "react-query";
import { getEnterpriseOptions, getRecruitmentForeignersJobs } from "../RecruitmentForeigners/api";

export function useRecruitmentForeignersJobs() {
    const [search, setSearch] = useState("");
    const [enterprise, setEnterprise] = useState("");

    const { data: enterpriseOptions } = useQuery(["enterprise-options"], () => getEnterpriseOptions());

    const { data, isLoading: loading, error } = useQuery(
        ["recruitment-foreigners-jobs", search, enterprise],
        () => getRecruitmentForeignersJobs({ search, enterprise }),
        {
            keepPreviousData: true,
            staleTime: 5 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );

    return {
        search,
        setSearch,
        enterprise,
        setEnterprise,
        enterpriseOptions: enterpriseOptions || [],
        jobs: data || [],
        loading,
        error,
    };
}
