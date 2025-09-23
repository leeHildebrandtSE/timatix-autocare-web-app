import React from "react";

export default function Button({ children, variant = "primary", onClick, className = "", isLoading = false, ...rest }) {
  const base = "btn"; // base class defined in CSS
  const variantClass = variant === "primary" ? "btn primary" : variant === "secondary" ? "btn secondary" : "btn ghost";
  return (
    <button className={`${base} ${variantClass} ${className}`} onClick={onClick} disabled={isLoading || rest.disabled} {...rest}>
      {isLoading ? (
        <span className="btn-spinner" aria-hidden />
      ) : null}
      <span className={isLoading ? "visually-hidden" : undefined}>{children}</span>
    </button>
  );
}
