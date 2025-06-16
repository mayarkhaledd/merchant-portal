// import { LoginPayload } from "@ejada/types";
import type { FieldValues } from "react-hook-form";
export interface SetNewPasswordFormValues extends FieldValues {
  newPassword: string;
  confirmPassword: string;
}
export interface SetNewPasswordButton {
  loading?: boolean;
  isValid?: boolean;
  onClick?: () => void;
}
