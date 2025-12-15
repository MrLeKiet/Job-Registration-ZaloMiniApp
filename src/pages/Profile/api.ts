import api from "@/api/axiosInstance";
import axios from "axios";

export async function getProfileWithToken(token) {
    try {
        const headers = {
            "Accept": "application/json",
            "Accept-Language": "2",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };
        console.log('[DEBUG] /api/v1/Profile Authorization header:', headers["Authorization"]);
        const response = await axios.get("/Profile", {
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers,
            timeout: 15000,
        });
        console.log("[DEBUG] /api/v1/Profile (with token) response:", response.data);
        return response.data;
    } catch (error) {
        console.error("[DEBUG] /api/v1/Profile (with token) error:", error);
        throw error;
    }
}

export async function getSettings() {
    try {
        const response = await api.get("/GetSettings", {
            headers: {
                "Accept": "application/json",
                "Accept-Language": "2",
            },
        });
        return response.data;
    } catch (error) {
        console.error("[DEBUG] /api/v1/GetSettings error:", error);
        throw error;
    }
}