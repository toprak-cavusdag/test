import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled = false,
      variant = "solid",
      className = "",
      type = "button",
    },
    ref
  ) => {
    let style = "";
    if (variant === "solid") {
      style =
        "border button border-slate-500/25 !text-slate-800 bg-white hover:bg-emerald-100 active:bg-emerald-200 disabled:text-gray-400 disabled:border-gray-300 disabled:bg-gray-100 transition-colors duration-200 rounded-md shadow-sm";
    } else if (variant === "outline") {
      style =
        "border border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50 disabled:text-gray-400 disabled:border-gray-300";
    } else if (variant === "ghost") {
      style =
        "bg-transparent text-emerald-600 hover:bg-emerald-100 disabled:text-gray-400";
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-xl cursor-pointer  font-semibold text-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${style} ${className}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
