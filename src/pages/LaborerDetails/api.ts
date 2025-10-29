import api from "@/api/axiosInstance";

export async function getLaborerDetail(laboreId: string, language: string = "2") {
    try {
        const response = await api.get("/GetLabore", {
            params: { laboreId },
            headers: { "Accept-Language": language }
        });
        return response.data?.Data?.Data || null;
    } catch (error) {
        console.error("Error fetching labor detail:", error);
        throw error;
    }
}
