// export default interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   backgroundcolorprop?: string;
//   sx?: React.CSSProperties;
// }

import React from "react";

interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundcolorprop?: string;
  sx?: React.CSSProperties;
  color?:
    | "default"
    | "primary"
    | "white"
    | "disabled"
    | "transparent"
    | "noStyle";
  size?: "xsmall" | "small" | "medium" | "large";
  svgIcon?: string;
  svgStyle?: string;
  noStyle?: boolean;
}

export default EnhancedButtonProps;
