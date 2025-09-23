// Pure helper functions to manage toast arrays. These are deterministic and
// easy to unit-test without DOM or React.

export function appendWithCap(currentToasts, toast, max = 4) {
  const next = [...currentToasts, toast];
  let droppedMessage = null;
  if (next.length > max) {
    // try drop oldest non-leaving first
    const idx = next.findIndex((x) => !x.leaving);
    if (idx >= 0) {
      const [removed] = next.splice(idx, 1);
      droppedMessage = removed?.message ?? null;
    } else {
      const removed = next.shift();
      droppedMessage = removed?.message ?? null;
    }
  }
  return { next, droppedMessage };
}

export function markLeaving(currentToasts, id) {
  return currentToasts.map((t) => (t.id === id ? { ...t, leaving: true } : t));
}

export function removeById(currentToasts, id) {
  return currentToasts.filter((t) => t.id !== id);
}
