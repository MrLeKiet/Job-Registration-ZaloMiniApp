
import api from "@/api/axiosInstance";

export const getMajors = async (level: string) => {
	try {
		if (!level) return [];
		const res = await api.get("/GetMajors", {
			params: { level },
			headers: {
				"Accept": "application/json",
				"Accept-Language": "2",
			},
		});
		return Array.isArray(res.data?.Data?.lstResultNganhNgheDT)
			? res.data.Data.lstResultNganhNgheDT
			: [];
	} catch (err) {
		return [];
	}
};
