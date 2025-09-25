import React, { useRef, useState, useCallback, useEffect } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { notifyWatchdog } from "../utils/loadingWatchdog";
// Note: createLoadingController is available in tests at src/utils/loadingController.js

export const LoadingProvider = ({ children, safetyTimeoutMs = 20000 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const counterRef = useRef(0);
  const timeoutRef = useRef(null);

  // safety auto-hide: if loading stays active for too long, force hide
  useEffect(() => {
    if (!isLoading) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // set a safety timeout (20s) to avoid a permanently stuck spinner
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
          counterRef.current = 0;
          setIsLoading(false);
          timeoutRef.current = null;
          // keep message as-is so devs can inspect why it was stuck
          try {
            // runtime check: only warn in browser/dev
            if (typeof window !== 'undefined' && window?.location) {
              console.warn(`[LoadingProvider] safetyTimeout (${safetyTimeoutMs}ms) fired; forced hide. message=${message}`);
            }
          } catch {
            // ignore in non-browser envs
          }

          // notify any registered watchdog listeners (safe to call in node)
          try {
            notifyWatchdog({ type: 'safetyTimeout', message, safetyTimeoutMs, time: Date.now() });
          } catch {
            // swallow any errors from watchdog
          }
        }, safetyTimeoutMs);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isLoading, message, safetyTimeoutMs]);

  const showLoading = useCallback((msg = "Loading...") => {
    // increment reference count and show spinner
    counterRef.current += 1;
    setMessage(msg);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    // decrement reference count and only hide when it reaches zero
    counterRef.current = Math.max(0, counterRef.current - 1);
    if (counterRef.current === 0) setIsLoading(false);
  }, []);

  const resetLoading = useCallback(() => {
    counterRef.current = 0;
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, message, showLoading, hideLoading, resetLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Note: test helper createLoadingController is in `src/utils/loadingController.js`.
