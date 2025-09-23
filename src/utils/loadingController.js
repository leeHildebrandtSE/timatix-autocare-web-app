// Pure JS loading controller for tests: reference-counting + safety timeout
import { notifyWatchdog } from './loadingWatchdog';

export function createLoadingController({ safetyTimeoutMs = 20000 } = {}) {
  let isLoading = false;
  let message = 'Loading...';
  let counter = 0;
  let timeoutId = null;
  const listeners = new Set();

  const notify = () => {
    for (const l of Array.from(listeners)) {
      try {
        l({ isLoading, message, counter });
      } catch {
        // swallow listener errors
      }
    }
  };

  const clearSafety = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const armSafety = () => {
    clearSafety();
    timeoutId = setTimeout(() => {
      counter = 0;
      isLoading = false;
      timeoutId = null;
      notify();
      // notify watchdog synchronously if available
      try {
        if (typeof notifyWatchdog === 'function') {
          notifyWatchdog({ type: 'safetyTimeout', message, safetyTimeoutMs, time: Date.now() });
        }
      } catch {
        // swallow
      }
    }, safetyTimeoutMs);
  };

  return {
    show(msg = 'Loading...') {
      counter += 1;
      message = msg;
      isLoading = true;
      armSafety();
      notify();
    },
    hide() {
      counter = Math.max(0, counter - 1);
      if (counter === 0) {
        isLoading = false;
        clearSafety();
      }
      notify();
    },
    reset() {
      counter = 0;
      isLoading = false;
      message = 'Loading...';
      clearSafety();
      notify();
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    _getState() {
      return { isLoading, message, counter };
    },
  };
}

export default { createLoadingController };
