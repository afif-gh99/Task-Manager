import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const narrowViewportQuery = window.matchMedia("(max-width: 1023px)");
    const hasLimitedCpu =
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;
    const connection = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;
    const shouldReduceData = Boolean(connection?.saveData);

    if (
      reducedMotionQuery.matches ||
      coarsePointerQuery.matches ||
      narrowViewportQuery.matches ||
      hasLimitedCpu ||
      shouldReduceData
    ) {
      return undefined;
    }

    let lenis = null;
    let animationFrameId = 0;
    let idleCallbackId = 0;
    let initializationTimeoutId = 0;
    let isCancelled = false;
    let handleWindowLoad = null;

    const onAnimationFrame = (time) => {
      if (!lenis) {
        return;
      }

      lenis.raf(time);
      animationFrameId = window.requestAnimationFrame(onAnimationFrame);
    };

    const handleVisibilityChange = () => {
      if (!lenis) {
        return;
      }

      if (document.hidden) {
        lenis.stop();
        return;
      }

      lenis.start();
    };

    const startLenis = async () => {
      const { default: Lenis } = await import("lenis");

      if (isCancelled) {
        return;
      }

      lenis = new Lenis({
        duration: 0.72,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.88,
        touchMultiplier: 1,
        gestureOrientation: "vertical",
        autoResize: true,
        overscroll: false,
        anchors: true,
      });

      animationFrameId = window.requestAnimationFrame(onAnimationFrame);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    };

    const queueInitialization = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(() => {
          startLenis();
        }, { timeout: 900 });
        return;
      }

      initializationTimeoutId = window.setTimeout(() => {
        startLenis();
      }, 500);
    };

    if (document.readyState === "complete") {
      queueInitialization();
    } else {
      handleWindowLoad = () => {
        window.removeEventListener("load", handleWindowLoad);
        queueInitialization();
      };

      window.addEventListener("load", handleWindowLoad, { once: true });
    }

    return () => {
      isCancelled = true;

      if (handleWindowLoad) {
        window.removeEventListener("load", handleWindowLoad);
      }

      window.cancelAnimationFrame(animationFrameId);

      if ("cancelIdleCallback" in window && idleCallbackId) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (initializationTimeoutId) {
        window.clearTimeout(initializationTimeoutId);
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return null;
};

export default SmoothScroll;
