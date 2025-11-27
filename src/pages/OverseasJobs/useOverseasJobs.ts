
import { useEffect, useState } from "react";
import { fetchOverseasJobs } from "./api";

export function useOverseasJobs() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchOverseasJobs(0, 5)
            .then((res) => {
                const data = res?.Data?.Data || [];
                setItems(data);
            })
            .catch(() => {
                setError("Không thể tải dữ liệu việc làm ngoài nước.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { items, loading, error };
}
