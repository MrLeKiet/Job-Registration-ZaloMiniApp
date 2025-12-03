import api from "@/api/axiosInstance";
import axios from "axios";

// Fetch a single enterprise job by id
export async function getEnterpriseJobById(id: string, token: string) {
    const headers = {
        "Accept": "application/json",
        "Accept-Language": "2",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
    const response = await api.get("/GetJob", {
        params: { jodId: id },
        headers,
        timeout: 15000,
    });
    return response.data;
}
export async function updateRecruitment(data: any, token: string) {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "2",
        "Authorization": `Bearer ${token}`,
    };
    if (!data.RequirementId) {
        throw new Error("RequirementId is required for updateRecruitment");
    }
    const response = await axios.post(
        "/UpdateRecruitment",
        data,
        {
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers,
            timeout: 15000,
        }
    );
    return response.data;
}
export async function enterpriseUpdateProfile(body: {
    Email?: string;
    CompanyName?: string;
    CompanyEmail?: string;
    CompanyAddress?: string;
    CompanyPhone?: string;
    BusinessSize?: string;
}, token?: string) {
    const headers = {
        "Accept": "application/json",
        "Accept-Language": "2",
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
    const response = await axios.post(
        "https://chatbot.ttld.sweetsoft.vn/api/v1/EnterpriseUpdateProfile",
        body,
        {
            headers,
            timeout: 15000,
        }
    );
    return response.data;
}

export async function getEnterpriseJobList(token: string) {
    const headers = {
        "Accept": "application/json",
        "Accept-Language": "2",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
    const response = await axios.get(
        "https://chatbot.ttld.sweetsoft.vn/api/v1/EnterpriseJobList",
        {
            headers,
            timeout: 15000,
        }
    );
    return response.data;
}

export async function enterpriseSignUp(body: {
    Accesstoken?: string;
    Code?: string;
    ZaloId?: string;
    Email?: string;
    CompanyName?: string;
    CompanyEmail?: string;
    CompanyAddress?: string;
    CompanyPhone?: string;
}) {
    const headers = {
        "Accept": "application/json",
        "Accept-Language": "2",
        "Content-Type": "application/json",
    };
    const response = await axios.post(
        "https://chatbot.ttld.sweetsoft.vn/api/v1/EnterpriseSignUp",
        body,
        {
            headers,
            timeout: 15000,
        }
    );
    return response.data;
}
