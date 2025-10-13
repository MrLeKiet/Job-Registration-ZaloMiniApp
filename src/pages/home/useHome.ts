import { useEffect, useState } from "react";
import { getHotNewsList, getLaborerList, getRecruitmentForeignersList, getUrgentJobRecruitment, searchJobList, searchRecruitmentForeigners } from "./api";
// Custom hook for searching both RecruitmentForeigners and JobList by keyword
export function useHomeSearch(keyword: string) {
    const [results, setResults] = useState<{ foreigners: any[]; jobs: any[] }>({ foreigners: [], jobs: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!keyword) {
            setResults({ foreigners: [], jobs: [] });
            setLoading(false);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);
        Promise.all([
            searchRecruitmentForeigners(keyword),
            searchJobList(keyword)
        ])
            .then(([foreignersRes, jobsRes]) => {
                setResults({
                    foreigners: foreignersRes?.Data?.Data || [],
                    jobs: jobsRes?.Data?.Data || []
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err instanceof Error ? err : new Error(String(err)));
                setLoading(false);
            });
    }, [keyword]);

    return { results, loading, error };
}

import { useQuery } from "react-query";
export function useRecruitmentForeigners() {
    const { data, isLoading: loading, error } = useQuery(
        ["recruitment-foreigners-list"],
        getRecruitmentForeignersList,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { jobs: data?.Data?.Data || [], loading, error };
}


export function useUrgentJobs() {
    const { data, isLoading: loading, error } = useQuery(
        ["urgent-jobs"],
        getUrgentJobRecruitment,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { jobs: data?.Data?.Data || [], loading, error };
}


export function useHotNews() {
    const { data, isLoading: loading, error } = useQuery(
        ["hot-news"],
        getHotNewsList,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { news: data?.Data?.Data || [], loading, error };
}


export function useLaborer() {
    const { data, isLoading: loading, error } = useQuery(
        ["laborer-list"],
        getLaborerList,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { laborers: data?.Data?.Data || [], loading, error };
}