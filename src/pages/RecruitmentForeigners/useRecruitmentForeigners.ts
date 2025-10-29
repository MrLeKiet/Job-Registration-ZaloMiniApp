import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getEnterpriseOptions, getRecruitmentForeignersJobs } from "./api";

export interface FilterOption {
    value: string;
    label: string;
}

export function useFilterOptions() {
    const [options, setOptions] = useState<FilterOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        const fetchInitial = async () => {
            try {
                const data = await getEnterpriseOptions({ initialOnly: true });
                if (isMounted) {
                    setOptions(data.map((item: any) => ({ value: item.value, label: item.label })));
                    setIsLoading(false);
                }
                fetchFull();
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setIsLoading(false);
                }
            }
        };
        const fetchFull = async () => {
            try {
                const fullData = await getEnterpriseOptions();
                if (isMounted) {
                    setOptions(fullData.map((item: any) => ({ value: item.value, label: item.label })));
                }
            } catch (err) {
                if (isMounted) setError(err instanceof Error ? err : new Error(String(err)));
            }
        };
        fetchInitial();
        return () => {
            isMounted = false;
        };
    }, []);

    return { data: options, isLoading, error };
}

export function useRecruitmentJobs() {
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<string>("");

    const { data: FilterOptionsData } = useFilterOptions();
    const FilterOptions = useMemo(() => [
        { label: "Tất cả", value: "" },
        ...(FilterOptionsData || [])
    ], [FilterOptionsData]);

    const { data, isLoading: loading, error } = useQuery(
        ["recruitment-foreigners-jobs", search, selectedFilter],
        () => getRecruitmentForeignersJobs({ search, enterprise: selectedFilter }),
        {
            keepPreviousData: true,
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        }
    );

    return {
        search,
        setSearch,
        selectedFilter,
        setSelectedFilter,
        jobs: data || [],
        loading,
        error,
        FilterOptions
    };
}
