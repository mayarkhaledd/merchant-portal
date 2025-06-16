import { AuthPayload } from "@ejada/types";
import type { FieldValues } from "react-hook-form";
export interface LoginFormValues extends FieldValues, AuthPayload {}
export interface LoginButtonProps {
  loading?: boolean;
  isValid?: boolean;
  onClick?: () => void;
}
