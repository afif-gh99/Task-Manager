// This file is responsible for storing and reading auth data in browser storage.
// It keeps token and user persistence in one place so auth pages and services
// do not need to repeat storage logic.
const TOKEN_STORAGE_KEY = "auth_token";
const USER_STORAGE_KEY = "auth_user";

// Some environments may not allow storage access, so this helper gives us
// a safe way to interact with localStorage/sessionStorage.
const getStorageTargets = () => {
  try {
    return [localStorage, sessionStorage];
  } catch {
    return [];
  }
};

export const tokenStorage = {
  // Returns the saved token from either persistent or session storage.
  getToken() {
    try {
      return (
        localStorage.getItem(TOKEN_STORAGE_KEY) ??
        sessionStorage.getItem(TOKEN_STORAGE_KEY)
      );
    } catch {
      return null;
    }
  },

  // Saves the token and clears the opposite storage location so we keep
  // only one active copy of the auth token.
  setToken(token, options = {}) {
    const storageTargets = getStorageTargets();

    if (storageTargets.length === 0) {
      return;
    }

    const targetStorage = options.remember ? localStorage : sessionStorage;
    const resetStorage = options.remember ? sessionStorage : localStorage;

    resetStorage.removeItem(TOKEN_STORAGE_KEY);

    if (!token) {
      targetStorage.removeItem(TOKEN_STORAGE_KEY);
      return;
    }

    targetStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  // Clears the token from every supported storage target during logout.
  clearToken() {
    getStorageTargets().forEach((storage) =>
      storage.removeItem(TOKEN_STORAGE_KEY),
    );
  },
};

export const userStorage = {
  // Reads the stored user object and safely parses it back into JSON.
  getUser() {
    let storedUser = null;

    try {
      storedUser =
        localStorage.getItem(USER_STORAGE_KEY) ??
        sessionStorage.getItem(USER_STORAGE_KEY);
    } catch {
      return null;
    }

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  },

  // Persists the authenticated user payload so screens like the dashboard
  // can personalize the UI without making another auth request.
  setUser(user, options = {}) {
    const storageTargets = getStorageTargets();

    if (storageTargets.length === 0) {
      return;
    }

    const targetStorage = options.remember ? localStorage : sessionStorage;
    const resetStorage = options.remember ? sessionStorage : localStorage;

    resetStorage.removeItem(USER_STORAGE_KEY);

    if (!user) {
      targetStorage.removeItem(USER_STORAGE_KEY);
      return;
    }

    targetStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  // Removes the saved user from storage during logout.
  clearUser() {
    getStorageTargets().forEach((storage) =>
      storage.removeItem(USER_STORAGE_KEY),
    );
  },
};

// Convenience helper used by logout flows to clear all auth state at once.
export const clearAuthStorage = () => {
  tokenStorage.clearToken();
  userStorage.clearUser();
};
