import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Accept-Language": "2",
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach auth token if available
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    // Only set Authorization header if not already present
    if (!config.headers["Authorization"]) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(new Error(error?.message || String(error)))
);

// Response interceptor: Retry on 401 (unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      return error.response; // QUAN TRỌNG: Không reject, trả về response
    }
    if (error.response?.status === 401) {
      // TODO: Implement your refreshToken logic here
      // await refreshToken();
      // return api(error.config); // retry original request
      // For now, just reject
      return Promise.reject(new Error("Unauthorized. Please log in again."));
    }
    return Promise.reject(new Error(error?.message || String(error)));
  }
);

export default api;
