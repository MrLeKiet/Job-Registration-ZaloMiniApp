import api from "@/api/axiosInstance";

export async function getSettings() {
    try {
        const res = await api.get("/Settings");
    return res.data?.Data || {};
    } catch (error) {
        console.error("Error fetching settings:", error);
        return {};
    }
}