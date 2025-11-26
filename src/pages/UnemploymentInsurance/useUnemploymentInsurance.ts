import { useQuery } from "react-query";
import { getUnemploymentInsuranceList } from "./api";

export function useUnemploymentInsurance() {
    const { data, isLoading: loading, error } = useQuery(
        ["unemployment-insurance-list"],
        () => getUnemploymentInsuranceList(),
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { items: data || [], loading, error };
}
