import { describe, it, expect } from 'vitest';
import { registerWatchdog, notifyWatchdog } from '../loadingWatchdog';

describe('loadingWatchdog', () => {
  it('should call registered listeners and allow unregistering', () => {
    let called = 0;
    const fn = (evt) => {
      called += 1;
      expect(evt).toHaveProperty('type', 'safetyTimeout');
    };
    const unregister = registerWatchdog(fn);
    notifyWatchdog({ type: 'safetyTimeout' });
    expect(called).toBe(1);
    unregister();
    notifyWatchdog({ type: 'safetyTimeout' });
    expect(called).toBe(1);
  });
});
