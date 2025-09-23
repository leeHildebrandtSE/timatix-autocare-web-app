import { describe, it, expect, vi } from 'vitest';
import { createLoadingController } from '../../utils/loadingController';
import { registerWatchdog } from '../../utils/loadingWatchdog';

describe('LoadingProvider safety timeout (controller)', () => {
  it('auto-hides after safetyTimeoutMs and notifies watchdog', async () => {
    const ctrl = createLoadingController({ safetyTimeoutMs: 50 });

    let fired = 0;
    const unregister = registerWatchdog((evt) => {
      if (evt.type === 'safetyTimeout') fired += 1;
    });

    // use fake timers to fast-forward
    vi.useFakeTimers();

    ctrl.show('Testing');
    expect(ctrl._getState().isLoading).toBe(true);

  // advance time past safety timeout and run pending timer callbacks
  vi.advanceTimersByTime(100);
  // run any timers immediately (flush the fake timers)
  if (typeof vi.runAllTimers === 'function') vi.runAllTimers();
  // allow any pending microtasks from async handlers (dynamic import) to run
  await Promise.resolve();
  await Promise.resolve();

    expect(ctrl._getState().isLoading).toBe(false);
    expect(fired).toBe(1);

    unregister();
    vi.useRealTimers();
  });
});
