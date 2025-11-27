import axios from "@/api/axiosInstance";

export async function fetchOverseasJobs(rowIndex = 0, pageSize = 5) {
    const response = await axios.get("/OverseasJobs", {
        headers: {
            "Accept-Language": 2,
            "Accept": "application/json"
        },
        params: {
            rowIndex,
            pageSize
        }
    });
    return response.data;
}
