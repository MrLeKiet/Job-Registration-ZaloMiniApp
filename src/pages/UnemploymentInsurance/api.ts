import api from "@/api/axiosInstance";

export async function getUnemploymentInsuranceList(rowIndex = 0, pageSize = 5) {
    try {
        const response = await api.get("/UnemploymentInsurance", {
            params: { rowIndex, pageSize },
            headers: { "Accept-Language": "2" }
        });
        return response.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching Unemployment Insurance list:", error);
        throw error;
    }
}
