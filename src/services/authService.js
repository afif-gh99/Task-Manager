import apiClient, { getJsonHeaders } from "../lib/api/apiClient";
import {
  clearAuthStorage,
  tokenStorage,
  userStorage,
} from "../lib/auth/tokenStorage";

export const authService = {
  async login(credentials) {
    const endpoint = "/login";
    const headers = getJsonHeaders();

    const response = await apiClient.post(endpoint, credentials, {
      headers,
    });

    return response.data;
  },

  async register(payload) {
    const endpoint = "/register";
    const headers = getJsonHeaders();

    const response = await apiClient.post(endpoint, payload, {
      headers,
    });

    return response.data;
  },

  persistSession(session, options = {}) {
    if (!session) {
      return;
    }

    tokenStorage.setToken(session.Token, options);
    userStorage.setUser(session.User, options);
  },

  logout() {
    clearAuthStorage();
  },
};
