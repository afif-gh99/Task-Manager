import { createContext, useContext } from "react";

export const AppBootstrapContext = createContext({
  isAppReady: false,
  isBootstrapping: true,
  startupData: {
    tasks: null,
    stats: null,
  },
  startupError: "",
});

export const useAppBootstrap = () => useContext(AppBootstrapContext);
