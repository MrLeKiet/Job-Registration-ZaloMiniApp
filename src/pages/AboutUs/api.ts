import axios from "@/api/axiosInstance";

export async function fetchAboutUs() {
    const response = await axios.get("/AboutUs", {
        headers: {
            "Accept-Language": 2,
            "Accept": "application/json"
        }
    });
    return response.data;
}
