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
import axios from "axios";

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
