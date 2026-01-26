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
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105",
    secondary:
      "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600",
    outline:
      "border border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
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
