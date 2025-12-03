export async function getProvinces() {
    try {
        const res = await api.get("/Province");
        return res.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching provinces:", error);
        return [];
    }
}

export async function getWardsByProvince(provinceId: string) {
    try {
        const res = await api.get("/Wards", {
            params: { provinceIds: provinceId }
        });
        return res.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching wards by province:", error);
        return [];
    }
}
import api from "@/api/axiosInstance";
import axios from "axios";
export async function registerRecruitment(body: any, token: string) {
    const headers: Record<string, string> = {
        "Accept": "application/json",
        "Accept-Language": "2",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
    const response = await axios.post(
        "/RegisterRecruitment",
        body,
        {
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers,
            timeout: 15000,
        }
    );
    return response.data;
}

export async function getWards() {
    try {
        const res = await api.get("/Wards");
        return res.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching wards:", error);
        return [];
    }
}

export async function getSettings() {
    try {
        const res = await api.get("/Settings");
        return res.data?.Data || {};
    } catch (error) {
        console.error("Error fetching settings:", error);
        return {};
    }
}