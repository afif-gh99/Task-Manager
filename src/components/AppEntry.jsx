import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { RouterProvider } from "react-router";
import IntroLoader from "./IntroLoader";
import SmoothScroll from "./SmoothScroll";

const DEFAULT_INTRO_DURATION = 2400;
const THEME_STORAGE_KEY = "proteam-theme";
const THEME_TRANSITION_CLASS = "theme-switching";
const THEME_TRANSITION_DURATION = 140;
const IntroLoaderContext = createContext({
  playIntro: async () => {},
});
const ThemeContext = createContext({
  toggleTheme: () => {},
});
const themeSubscribers = new Set();

let themeSnapshot = false;
let isThemeInitialized = false;
let themeTransitionTimeoutId = null;

export const useIntroLoader = () => useContext(IntroLoaderContext);

const applyTheme = (isDarkMode) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", isDarkMode);
  document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
};

const getInitialThemePreference = () => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const isDarkMode = storedTheme === "dark";

    applyTheme(isDarkMode);
    return isDarkMode;
  } catch {
    return false;
  }
};

const persistThemePreference = (isDarkMode) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      isDarkMode ? "dark" : "light",
    );
  } catch {
    // Ignore storage errors and keep the in-memory theme state.
  }
};

const initializeThemeStore = () => {
  if (isThemeInitialized) {
    return;
  }

  themeSnapshot = getInitialThemePreference();
  isThemeInitialized = true;
};

const getThemeSnapshot = () => {
  initializeThemeStore();
  return themeSnapshot;
};

const subscribeTheme = (subscriber) => {
  initializeThemeStore();
  themeSubscribers.add(subscriber);

  return () => {
    themeSubscribers.delete(subscriber);
  };
};

const notifyThemeSubscribers = () => {
  themeSubscribers.forEach((subscriber) => subscriber());
};

const pulseThemeTransitionClass = () => {
  if (typeof document === "undefined") {
    return;
  }

  const rootElement = document.documentElement;
  rootElement.classList.add(THEME_TRANSITION_CLASS);

  if (themeTransitionTimeoutId) {
    window.clearTimeout(themeTransitionTimeoutId);
  }

  themeTransitionTimeoutId = window.setTimeout(() => {
    rootElement.classList.remove(THEME_TRANSITION_CLASS);
    themeTransitionTimeoutId = null;
  }, THEME_TRANSITION_DURATION);
};

const commitTheme = (isDarkMode) => {
  initializeThemeStore();

  if (themeSnapshot === isDarkMode) {
    return;
  }

  themeSnapshot = isDarkMode;
  applyTheme(isDarkMode);
  persistThemePreference(isDarkMode);
  notifyThemeSubscribers();
};

const setTheme = (isDarkMode) => {
  pulseThemeTransitionClass();
  commitTheme(isDarkMode);
};

const toggleThemeState = () => {
  setTheme(!getThemeSnapshot());
};

export const useTheme = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const isDarkMode = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeSnapshot,
  );

  return {
    isDarkMode,
    toggleTheme,
  };
};

const AppEntry = ({
  router,
  showIntro = true,
  introDuration = DEFAULT_INTRO_DURATION,
  isAppReady = true,
}) => {
  const [hasMinimumDelayElapsed, setHasMinimumDelayElapsed] = useState(
    !showIntro,
  );
  const [isInitialIntroVisible, setIsInitialIntroVisible] = useState(showIntro);
  const [isTransitionIntroVisible, setIsTransitionIntroVisible] =
    useState(false);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    if (!showIntro) {
      setHasMinimumDelayElapsed(true);
      setIsInitialIntroVisible(false);
      return undefined;
    }

    setHasMinimumDelayElapsed(false);
    setIsInitialIntroVisible(true);

    const timeoutId = window.setTimeout(() => {
      setHasMinimumDelayElapsed(true);
    }, introDuration);

    return () => window.clearTimeout(timeoutId);
  }, [introDuration, showIntro]);

  useEffect(() => {
    if (showIntro && hasMinimumDelayElapsed && isAppReady) {
      setIsInitialIntroVisible(false);
    }
  }, [hasMinimumDelayElapsed, isAppReady, showIntro]);

  useEffect(
    () => () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      if (themeTransitionTimeoutId) {
        window.clearTimeout(themeTransitionTimeoutId);
      }
    },
    [],
  );

  const playIntro = () => {
    if (isInitialIntroVisible || isTransitionIntroVisible) {
      return Promise.resolve();
    }

    setIsTransitionIntroVisible(true);

    return new Promise((resolve) => {
      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsTransitionIntroVisible(false);
        transitionTimeoutRef.current = null;
        resolve();
      }, introDuration);
    });
  };

  const toggleTheme = useCallback(() => {
    toggleThemeState();
  }, []);

  const themeContextValue = useMemo(
    () => ({
      toggleTheme,
    }),
    [toggleTheme],
  );

  if (isInitialIntroVisible) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <IntroLoaderContext.Provider value={{ playIntro }}>
          <IntroLoader duration={introDuration} />
        </IntroLoaderContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <IntroLoaderContext.Provider value={{ playIntro }}>
        <SmoothScroll />
        <div
          className={`app-router-shell ${
            isTransitionIntroVisible ? "app-router-shell--covered" : ""
          }`}
        >
          <RouterProvider router={router} />
        </div>
        {isTransitionIntroVisible && <IntroLoader duration={introDuration} />}
      </IntroLoaderContext.Provider>
    </ThemeContext.Provider>
  );
};

export default AppEntry;
