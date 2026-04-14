// This service contains auth-related API calls and auth session helpers.
// It sits between page submit handlers and the backend auth endpoints.
import apiClient, { getJsonHeaders } from "../lib/api/apiClient";
import {
  clearAuthStorage,
  tokenStorage,
  userStorage,
} from "../lib/auth/tokenStorage";

export const authService = {
  // Sends login credentials to the backend and returns the raw response body.
  async login(credentials) {
    const endpoint = "/login";
    const headers = getJsonHeaders();

    const response = await apiClient.post(endpoint, credentials, {
      headers,
    });

    return response.data;
  },

  // Sends registration data to the backend and returns the raw response body.
  async register(payload) {
    const endpoint = "/register";
    const headers = getJsonHeaders();

    const response = await apiClient.post(endpoint, payload, {
      headers,
    });

    return response.data;
  },

  // Stores the authenticated token and user object after login succeeds.
  persistSession(session, options = {}) {
    if (!session) {
      return;
    }

    tokenStorage.setToken(session.Token, options);
    userStorage.setUser(session.User, options);
  },

  // Clears all saved auth data when the user logs out.
  logout() {
    clearAuthStorage();
  },
};
