import api from "@/api/axiosInstance";
import axios from "axios";

export async function getProfile() {
    try {
        const response = await api.get("/Profile");
        console.log("[DEBUG] /api/v1/Profile response:", response.data);
        return response.data;
    } catch (error) {
        console.error("[DEBUG] /api/v1/Profile error:", error);
        throw error;
    }
}

// Use this to fetch profile with a specific token (not from localStorage)
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
    const response = await api.get("/Settings");
    return response.data.Data;
}