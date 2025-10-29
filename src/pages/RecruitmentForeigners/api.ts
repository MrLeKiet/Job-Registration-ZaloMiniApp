

import api from "@/api/axiosInstance";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getEnterpriseOptions({ initialOnly = false } = {}) {
    try {
        await delay(1000); // Fast initial load
        const response = await api.get("/Enterprise");
        const allOptions = response.data?.Data?.Data || [];
        if (initialOnly) {
            return allOptions.slice(0, 10);
        }
        return allOptions;
    } catch (error) {
        console.error("Error fetching enterprise options:", error);
        throw error;
    }
}

export async function getRecruitmentForeignersJobs(params: { search?: string; enterprise?: string }) {
    try {
        await delay(5500);
        const response = await api.get("/RecruitmentForeigners", { params });
        return response.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching recruitment foreigners jobs:", error);
        throw error;
    }
}
