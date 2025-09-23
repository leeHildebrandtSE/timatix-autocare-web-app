import React, { useCallback, useState, useRef } from "react";
import { ToastContext } from "./ToastContextValue";

export const ToastProvider = ({ children }) => {
  // toasts: { id, type, message, leaving }
  const [toasts, setToasts] = useState([]);
  const [droppedMessages, setDroppedMessages] = useState([]);
  const idRef = useRef(1);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const hideToast = useCallback((id) => {
    // mark as leaving so the UI can play an exit animation
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    // remove after animation (match CSS -- 320ms)
    setTimeout(() => removeToast(id), 320);
  }, [removeToast]);

  const showToast = useCallback(({ type = "info", message = "", duration = 4000 }) => {
    const id = idRef.current++;
    const toast = { id, type, message, leaving: false };
    setToasts((t) => {
      const MAX = 4;
      const next = [...t, toast];
      if (next.length > MAX) {
        // drop the oldest non-leaving toast (or oldest overall)
        const filtered = next.filter((x) => !x.leaving);
        if (filtered.length >= MAX) {
          // remove first non-leaving
          const idx = next.findIndex((x) => !x.leaving);
          if (idx >= 0) next.splice(idx, 1);
        } else {
          // fall back: remove the first item
          next.shift();
        }
        // record the dropped message (keep recent first), cap history to 10
        setDroppedMessages((prev) => [toast.message, ...prev].slice(0, 10));
      }
      return next;
    });

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }

    return id;
  }, [hideToast]);

  const clearOverflow = useCallback(() => setDroppedMessages([]), []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast, overflowCount: droppedMessages.length, overflowMessages: droppedMessages, clearOverflow }}>
      {children}
    </ToastContext.Provider>
  );
};
