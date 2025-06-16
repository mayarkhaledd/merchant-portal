import React from "react";

import EnhancedButtonProps from "./Button.types";

const colorClasses = {
  default: "bg-white text-primary-blue border-2 border-secondary-dark ",
  white: "bg-white text-neutrals/N3 border-2 border-neutrals/N3 ",
  primary:
    "bg-primary-blue text-white border-2 border-transparent   border-primary-blue ",
  disabled: "bg-disabled-grey text-neutrals/N4 border-0 border-disabled-grey ",
  transparent: "bg-transparent text-primary-blue border-2 border-primary-blue ",
  noStyle: "",
};

const sizeClasses = {
  xsmall: "p-[10px] gap-x-[8px]",
  small: "px-[40px] py-[9px] gap-x-[10px]",
  medium: "px-[50px] py-[14px] gap-x-[8px]  ",
  large: "px-[24px] py-[12px] w-full gap-x-[10px]",
};

export const Button: React.FC<EnhancedButtonProps> = ({
  disabled,
  onClick,
  children,
  className = "",
  sx = {},
  color = "primary",
  size = "medium",
  svgStyle,
  svgIcon,
  noStyle = false,
  ...restProps
}) => {
  const colorClass = colorClasses[color as keyof typeof colorClasses];
  const sizeClass = sizeClasses[size as keyof typeof sizeClasses];

  return (
    <button
      className={`${noStyle ? "" : "rounded-[7px] text-center text-[16px] font-readexProMedium500"} ${
        disabled
          ? "opacity-50 cursor-not-allowed border-none bg-slate-200"
          : "hover:opacity-80"
      } ${colorClass} ${sizeClass} ${className}`}
      style={sx}
      onClick={onClick}
      disabled={disabled}
      type="submit"
      {...restProps}
    >
      {svgIcon && (
        <div className="w-full flex justify-center items-center">
          <img src={svgIcon} alt="Icon" className={svgStyle} />
        </div>
      )}
      {children}
    </button>
  );
};
