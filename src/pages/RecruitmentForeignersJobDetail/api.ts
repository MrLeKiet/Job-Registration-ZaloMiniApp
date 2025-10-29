import api from "@/api/axiosInstance";

export async function GetRecruitmentForeignerDetail(id: string) {
    try {
        const response = await api.get("/GetRecruitmentForeigner", {
            params: { jodId: id },
        });
        return response.data?.Data || null;
    } catch (error) {
        console.error("Error fetching recruitment foreigner detail:", error);
        throw error;
    }
}