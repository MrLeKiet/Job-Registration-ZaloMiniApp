import axios from "axios";

export async function deleteRecruitmentEnterprise(JobId: string, token: string) {
    const headers = {
        "Accept": "application/json",
        "Accept-Language": "2",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
    const response = await axios.post(
        "https://chatbot.ttld.sweetsoft.vn/api/v1/DeleteRecruitmentEnterprise",
        { JobId },
        {
            headers,
            timeout: 15000,
        }
    );
    return response.data;
}
