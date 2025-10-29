import api from "@/api/axiosInstance";

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
