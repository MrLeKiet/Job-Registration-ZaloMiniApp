import api from "@/api/axiosInstance";


export const getHotNewsList = async () => {
    try {
        const response = await api.get("/HotNewsHomePage");
        return response.data;
    } catch (error) {
        console.error("Error fetching hot news:", error);
        throw error;
    }
};
