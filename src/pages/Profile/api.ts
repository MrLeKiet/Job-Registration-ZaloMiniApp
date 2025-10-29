import api from "@/api/axiosInstance";
    
export async function getProfile() {
    // Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    return {
        Data: {
            Data: {
                id: 1,
                fullName: "Người dùng",
                phone: "0987654321",
                zaloId: "123456789",
                avatar: "",
                email: "nguyenvana@example.com",
                address: "Hà Nội",
                job: "Kỹ sư phần mềm"
            }
        }
    };
}

export async function getSettings() {
    const response = await api.get("/Settings");
    return response.data.Data;
}
