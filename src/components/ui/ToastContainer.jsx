import React, { useContext, useState, useRef, useEffect } from "react";
import { ToastContext } from "../../context/ToastContextValue";

function Icon({ type = "info" }) {
  // Simple inline SVGs sized to match toast styles
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  switch (type) {
    case "success":
      return (
        <svg {...common} aria-hidden>
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "error":
      return (
        <svg {...common} aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common} aria-hidden>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
          <path d="M12 9v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 17h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function ToastContainer() {
  const { toasts, hideToast, overflowCount, overflowMessages = [], clearOverflow } = useContext(ToastContext);
  const [showOverflow, setShowOverflow] = useState(false);
  const popoverRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (!showOverflow) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowOverflow(false);
        if (badgeRef.current) badgeRef.current.focus();
      }
      if (e.key === "Tab") {
        const el = popoverRef.current;
        if (!el) return;
        const focusables = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    // set initial focus to first focusable in popover
    const t = setTimeout(() => {
      const el = popoverRef.current;
      if (el) {
        const focusables = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusables.length) focusables[0].focus();
      }
    }, 0);

    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [showOverflow]);

  return (
    <div className="toast-wrapper">
      {overflowCount > 0 && (
        <div className="toast-overflow-wrapper">
          <button type="button" className="toast-overflow-badge" aria-label={`Show ${overflowCount} more messages`} onClick={() => setShowOverflow((s) => !s)}>+{overflowCount}</button>
          {showOverflow && (
            <div ref={popoverRef} className="toast-overflow-popover" role="dialog" aria-label="Dropped messages">
              <div className="popover-header">
                <strong>Dropped messages</strong>
                <button type="button" className="popover-clear" onClick={() => { clearOverflow(); setShowOverflow(false); }} aria-label="Clear dropped messages">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <ul>
                {overflowMessages.map((m, i) => (
                  <li key={i} className="popover-item">{m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.type} ${t.leaving ? "leaving" : "entering"}`}
          role="status"
          aria-live="polite"
        >
          <div className="toast-icon" aria-hidden>
            <Icon type={t.type} />
          </div>
          <div className="toast-message">{t.message}</div>
          <button type="button" className="toast-close" onClick={() => hideToast(t.id)} aria-label="Dismiss">✖</button>
        </div>
      ))}
    </div>
  );
}
