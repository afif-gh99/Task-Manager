import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://taskmanager.proteam-syria.com/api",
});

export const getJsonHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const getAuthHeaders = (token) => ({
  ...getJsonHeaders(),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export default apiClient;
