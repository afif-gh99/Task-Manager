// This file defines the shared Axios client and header helpers.
// Services use these helpers so every request follows the same base URL
// and header format without hiding the request flow too much.
import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://taskmanager.proteam-syria.com/api",
});

// Headers for public JSON requests like login and register.
export const getJsonHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

// Headers for authenticated requests. The token is passed in explicitly
// so it is easy to see where authorization is being attached.
export const getAuthHeaders = (token) => ({
  ...getJsonHeaders(),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export default apiClient;
