// Simple in-memory watchdog for loading safety-timeout events.
// Consumers can register a callback to be notified when the LoadingProvider
// forces a hide due to the safety timeout. This file intentionally has no
// external dependencies and is safe to require in node-only tests.

const listeners = new Set();

export function registerWatchdog(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function notifyWatchdog(event) {
  try {
    for (const fn of Array.from(listeners)) {
      try {
        fn(event);
      } catch (err) {
        // swallow listener errors — watchdog should not crash app
        console.error('[loadingWatchdog] listener error', err);
      }
    }
  } catch {
    // defensive
  }
}

export default { registerWatchdog, notifyWatchdog };
