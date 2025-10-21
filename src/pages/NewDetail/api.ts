import api from "@/api/axiosInstance";


export async function getNewsDetail(id: string) {
    try {
        const response = await api.get("/GetNews", {
            params: { newsId: id },
        });
        return response.data?.Data?.Data || null;
    } catch (error) {
        console.error("Error fetching news detail:", error);
        throw error;
    }
}