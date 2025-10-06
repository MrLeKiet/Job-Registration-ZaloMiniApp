import api from "@/api/axiosInstance";

export async function getLaborerList(filters = {}) {
  try {
    const defaultParams = { rowIndex: 0, pageSize: 5 };
    const params = { ...defaultParams };
    Object.keys(filters).forEach(key => {
      if (filters[key] !== "") {
        params[key] = filters[key];
      }
    });
    const res = await api.get("/Labore", { params });
    return res.data?.Data?.Data || [];
  } catch (error) {
    console.error("Error fetching labore list:", error);
    return [];
  }
}

export async function getSettings() {
    try {
        const res = await api.get("/Settings");
    return res.data?.Data || {};
    } catch (error) {
        console.error("Error fetching settings:", error);
        return {};
    }
}

export async function getWards() {
    try {
        const res = await api.get("/Wards");
        return res.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching wards:", error);
        return [];
    }
}
