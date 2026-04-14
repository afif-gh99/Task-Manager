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

const preloadCriticalAssets = async (assetPaths) => {
  if (!Array.isArray(assetPaths) || assetPaths.length === 0) {
    return;
  }

  await Promise.all(assetPaths.map(preloadImage));
};

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
