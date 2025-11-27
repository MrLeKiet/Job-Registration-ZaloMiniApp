import axios from "axios";
import api from "./axiosInstance";
export async function updateProfile(body: any, token: string) {
  const headers = {
    "Accept": "application/json",
    "Accept-Language": "2",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
  const response = await axios.post(
    "/LaboreUpdateProfile",
    body,
    {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers,
      timeout: 15000,
    }
  );
  return response.data;
}
export async function getSettings() {
  const response = await api.get("/Settings");
  return response.data.Data;
}

export async function laborerSignUp(body: any) {
  const response = await api.post("/LaboreSignUp", body);
  return response.data;
}

export async function signIn({ Accesstoken, Code, ZaloId }: { Accesstoken: string, Code: string, ZaloId: string }) {
  const response = await api.post("/SignIn", { Accesstoken, Code, ZaloId });
  return response.data;
}
