import React from "react";

export function Button({ children, onClick, variant = "primary", size = "md" }) {
  const baseClasses = "rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    outline: "border border-white text-white hover:bg-white hover:text-black focus:ring-white",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}