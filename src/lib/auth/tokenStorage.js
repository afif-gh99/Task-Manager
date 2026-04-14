const TOKEN_STORAGE_KEY = "auth_token";
const USER_STORAGE_KEY = "auth_user";
const getStorageTargets = () => {
  try {
    return [localStorage, sessionStorage];
  } catch {
    return [];
  }
};

export const tokenStorage = {
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

  clearToken() {
    getStorageTargets().forEach((storage) =>
      storage.removeItem(TOKEN_STORAGE_KEY),
    );
  },
};

export const userStorage = {
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

  clearUser() {
    getStorageTargets().forEach((storage) =>
      storage.removeItem(USER_STORAGE_KEY),
    );
  },
};

export const clearAuthStorage = () => {
  tokenStorage.clearToken();
  userStorage.clearUser();
};
