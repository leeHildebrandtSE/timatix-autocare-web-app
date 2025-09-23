import { describe, it, expect } from 'vitest';
import { appendWithCap, markLeaving, removeById } from '../toastManager';

describe('toastManager', () => {
  it('appends toasts and caps at max with droppedMessage', () => {
  // create 5 simple toasts
    const toasts = [];
    for (let i = 0; i < 5; i++) toasts.push({ id: i + 1, message: `t${i}`, leaving: false });

    let current = [];
    let dropped = null;
    for (const t of toasts) {
      const res = appendWithCap(current, t, 4);
      current = res.next;
      if (res.droppedMessage) dropped = res.droppedMessage;
    }

    expect(current.length).toBeLessThanOrEqual(4);
    expect(dropped).toBeTruthy();
  });

  it('marks leaving and removes by id', () => {
    const current = [{ id: 1, message: 'a', leaving: false }, { id: 2, message: 'b', leaving: false }];
    const marked = markLeaving(current, 1);
    expect(marked.find((t) => t.id === 1).leaving).toBe(true);
    const removed = removeById(marked, 1);
    expect(removed.find((t) => t.id === 1)).toBeUndefined();
  });
});
