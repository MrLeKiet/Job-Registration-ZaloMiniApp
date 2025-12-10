
export async function getForeignJobDetails(id: string) {
    try {
        const response = await api.get(`/RecruitmentForeigners/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching foreign job details:", error);
        throw error;
    }
}
export async function searchRecruitmentForeigners(keyword: string) {
    try {
        const response = await api.get("RecruitmentForeigners", {
            params: { keyword }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching recruitment foreigners:", error);
        throw error;
    }
}

export async function searchJobList(keyword: string) {
    try {
        const response = await api.get("JobList", {
            params: { keyword }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching job list:", error);
        throw error;
    }
}

import api from "@/api/axiosInstance";


export async function getHotNewsList() {
    try {
        const response = await api.get("/HotNewsHomePage", {
            params: { rowIndex: 0, pageSize: 5 },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching hot news:", error);
        throw error;
    }
}

export async function getUrgentJobRecruitment() {
    try {
        const response = await api.get("/JobList", {
            params: { rowIndex: 0, pageSize: 5 },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching urgent job recruitment:", error);
        throw error;
    }
}

export async function getLaborerList() {
    try {
        const response = await api.get("/Labore", {
            params: { rowIndex: 0, pageSize: 5 },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching laborer list:", error);
        throw error;
    }
}


export async function getRecruitmentForeignersList() {
    try {
        const response = await api.get("/RecruitmentForeigners", {
            params: { rowIndex: 0, pageSize: 5 },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching recruitment foreigners list:", error);
        throw error;
    }
}


