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

export const applyForJob = async (jobId: string, accessToken) => {
    try {
        const response = await api.post("/ApplyForJob", { JobId: jobId }, {
            headers: {
                "Accept-Language": "2",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error applying for job:", error);
        throw error;
    }
};

export const getEnterpriseJobApplyList = async (token: string, rowIndex = 0, pageSize = 5) => {
    const response = await api.get("/EnterpriseJobApplyList", {
        params: { rowIndex, pageSize },
        headers: {
            "Accept-Language": "2",
            "Authorization": `Bearer ${token}`,
        },
    });
    return response.data;
};
