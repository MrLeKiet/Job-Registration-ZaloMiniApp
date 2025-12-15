import { useState } from "react";
import { useQuery } from "react-query";
import { getRecruitmentForeignersJobs } from "./api";

export function useRecruitmentJobs() {
    try {
        const { data } = useQuery(
            ["recruitment-foreigners-jobs"],
            () => getRecruitmentForeignersJobs({}),
            {
                keepPreviousData: true,
                staleTime: 5 * 60 * 1000,
                cacheTime: 30 * 60 * 1000,
            }
        );
        return { data: data || [] };
    } catch (err) {
        return { data: [] };
    }
}

