import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RouterProvider } from "react-router";
import IntroLoader from "./IntroLoader";

const DEFAULT_INTRO_DURATION = 3000;
const IntroLoaderContext = createContext({
  playIntro: async () => {},
});

export const useIntroLoader = () => useContext(IntroLoaderContext);

const AppEntry = ({
  router,
  showIntro = true,
  introDuration = DEFAULT_INTRO_DURATION,
  isAppReady = true,
}) => {
  const [hasMinimumDelayElapsed, setHasMinimumDelayElapsed] =
    useState(!showIntro);
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

  if (isInitialIntroVisible) {
    return (
      <IntroLoaderContext.Provider value={{ playIntro }}>
        <IntroLoader duration={introDuration} />
      </IntroLoaderContext.Provider>
    );
  }

  return (
    <IntroLoaderContext.Provider value={{ playIntro }}>
      <RouterProvider router={router} />
      {isTransitionIntroVisible && <IntroLoader duration={introDuration} />}
    </IntroLoaderContext.Provider>
  );
};

export default AppEntry;
