import { useEffect, useState } from "react";
import { fetchAboutUs } from "./api";

export function useAboutUs() {
    const [info, setInfo] = useState<{ title: string; description: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchAboutUs()
            .then(res => {
                const data = res?.Data?.Data;
                setInfo(data || null);
            })
            .catch(() => {
                setError("Không thể tải nội dung giới thiệu.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { info, loading, error };
}
