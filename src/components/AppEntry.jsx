// This file is the real app entry shell.
// It decides when the intro loader should be shown, prepares startup data,
// and mounts global UI like routing and toast notifications.
import { useEffect, useRef, useState } from "react";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppBootstrapContext } from "../context/AppBootstrapContext";
import { getApiErrorMessage } from "../lib/api/getApiErrorMessage";
import { tokenStorage } from "../lib/auth/tokenStorage";
import { taskService } from "../services/taskService";
import IntroLoader from "./IntroLoader";

const MINIMUM_LOADER_DURATION = 2000;

// Reads the preferred mode from storage so shared UI like Toastify
// can match the current light/dark appearance.
const getStoredMode = () => {
  try {
    return localStorage.getItem("mode") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const preloadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });

// Preloads the small set of images needed for the first visible screen.
// This keeps the intro loader on screen until critical visuals are ready.
const preloadCriticalAssets = async (assetPaths) => {
  if (!Array.isArray(assetPaths) || assetPaths.length === 0) {
    return;
  }

  await Promise.all(assetPaths.map(preloadImage));
};

// Chooses only the assets needed for the first route the user will see.
const getCriticalAssetPaths = ({ pathname, hasToken }) => {
  if (hasToken && pathname === "/dashboard") {
    return ["/assets/proteam-text.png"];
  }

  return ["/assets/proteamLogo.png", "/assets/photo1.png"];
};

const AppEntry = ({
  router,
  showIntro = true,
  isAppReady = true,
}) => {
  // Top-level startup state:
  // - toastTheme controls global toast appearance
  // - minimumLoaderTimePassed keeps the intro visible briefly
  // - bootstrapState tracks real app readiness and initial dashboard data
  const [toastTheme, setToastTheme] = useState(getStoredMode);
  const [minimumLoaderTimePassed, setMinimumLoaderTimePassed] =
    useState(!showIntro);
  const [bootstrapState, setBootstrapState] = useState({
    isAppReady: false,
    isBootstrapping: showIntro,
    startupData: {
      tasks: null,
      stats: null,
    },
    startupError: "",
  });
  const hasBootstrappedRef = useRef(false);

  // Keep the intro visible for a minimum time so it does not flash too quickly
  // on fast connections or when startup work finishes almost instantly.
  useEffect(() => {
    if (!showIntro) {
      setMinimumLoaderTimePassed(true);
      return undefined;
    }

    setMinimumLoaderTimePassed(false);

    const timeoutId = window.setTimeout(() => {
      setMinimumLoaderTimePassed(true);
    }, MINIMUM_LOADER_DURATION);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showIntro]);

  // Real bootstrap flow:
  // 1. inspect current route and auth token
  // 2. preload critical first-screen assets
  // 3. if the first screen is the dashboard, fetch tasks and stats up front
  // 4. publish startup data through context so the dashboard can render faster
  useEffect(() => {
    let isMounted = true;

    const bootstrapApp = async () => {
      if (!showIntro || hasBootstrappedRef.current) {
        if (isMounted) {
          setBootstrapState((currentState) => ({
            ...currentState,
            isAppReady: true,
            isBootstrapping: false,
          }));
        }

        return;
      }

      hasBootstrappedRef.current = true;

      const pathname = router.state.location.pathname;
      const token = tokenStorage.getToken();
      const hasToken = Boolean(token);
      const shouldBootstrapDashboard = hasToken && pathname === "/dashboard";
      const criticalAssets = getCriticalAssetPaths({ pathname, hasToken });

      // These values are passed into the dashboard so it can use bootstrapped
      // data instead of making the same requests again on first render.
      let startupTasks = null;
      let startupStats = null;
      let startupError = "";

      try {
        await preloadCriticalAssets(criticalAssets);

        if (shouldBootstrapDashboard) {
          const [tasksResponse, statsResponse] = await Promise.all([
            taskService.getTasks(),
            taskService.getStats(),
          ]);

          startupTasks = Array.isArray(tasksResponse?.data)
            ? tasksResponse.data
            : [];
          startupStats = statsResponse?.data ?? statsResponse ?? null;
        }
      } catch (error) {
        startupError = getApiErrorMessage(
          error,
          "We could not finish startup loading.",
        );
      }

      if (!isMounted) {
        return;
      }

      setBootstrapState({
        isAppReady: isAppReady,
        isBootstrapping: false,
        startupData: {
          tasks: startupTasks,
          stats: startupStats,
        },
        startupError,
      });
    };

    bootstrapApp();

    return () => {
      isMounted = false;
    };
  }, [isAppReady, router, showIntro]);

  // Listen for mode changes so toast styling updates if the theme changes later.
  useEffect(() => {
    const syncToastTheme = () => {
      setToastTheme(getStoredMode());
    };

    syncToastTheme();
    window.addEventListener("storage", syncToastTheme);

    return () => {
      window.removeEventListener("storage", syncToastTheme);
    };
  }, []);

  // The loader hides only after the app is really ready and the short
  // minimum visibility window has passed.
  const shouldShowIntroLoader =
    showIntro &&
    (!bootstrapState.isAppReady ||
      bootstrapState.isBootstrapping ||
      !minimumLoaderTimePassed);

  if (shouldShowIntroLoader) {
    return <IntroLoader />;
  }

  return (
    <AppBootstrapContext.Provider value={bootstrapState}>
      {/* ToastContainer is mounted once here so every page can call toast.* safely. */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnFocusLoss={false}
        closeOnClick
        draggable
        style={{ zIndex: 9999 }}
        toastStyle={{
          borderRadius: "18px",
          boxShadow: "0 18px 45px rgba(26,36,68,0.18)",
        }}
      />
      <RouterProvider router={router} />
    </AppBootstrapContext.Provider>
  );
};

export default AppEntry;
