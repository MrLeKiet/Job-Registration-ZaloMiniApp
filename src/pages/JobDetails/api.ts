import api from "@/api/axiosInstance";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getJobDetails = async (id: string) => {
    try {
        const response = await api.get("/GetJob", {
            params: { jodId: id },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}