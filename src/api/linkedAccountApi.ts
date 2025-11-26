import axios from "axios";

export async function zmpLinkedAccount(body: {
    Accesstoken?: string;
    Code?: string;
    ZaloId?: string;
    Email?: string;
}) {
    const headers = {
        "Accept": "application/json",
        "Accept-Language": "2",
        "Content-Type": "application/json",
    };
    const response = await axios.post(
        "https://chatbot.ttld.sweetsoft.vn/api/v1/ZmpLinkedAccount",
        body,
        {
            headers,
            timeout: 15000,
        }
    );
    return response.data;
}
