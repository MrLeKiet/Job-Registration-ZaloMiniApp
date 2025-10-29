import api from "@/api/axiosInstance";

export async function signIn({ accessToken, code, zaloId }: { accessToken: string; code: string; zaloId: string }) {
    try {
        const response = await api.post("/SignIn", {
            accessToken,
            code,
            zaloId,
        });
        return response.data;
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
}
