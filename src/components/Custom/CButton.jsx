import React from "react";
import clsx from "clsx";

const CButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  type = "button",
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-xl font-medium
    transition-all duration-300
    active:scale-95
  `;

  const variants = {
    primary:
      "bg-[var(--primary)] text-white shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600",
    outline:
      "border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/10",
    ghost:
      "bg-transparent text-[var(--nav-text)] hover:bg-black/5 dark:hover:bg-white/10 text-[var(--nav-text)]",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-7 py-2 text-base",
    lg: "px-9 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-60 cursor-not-allowed hover:scale-100",
        className
      )}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};

export default CButton;
