// import { LoginPayload } from "@ejada/types";

import { ForgetPasswordPayload } from "@ejada/types";
import type { FieldValues } from "react-hook-form";

export interface ForgotPasswordFormValues
  extends FieldValues,
    ForgetPasswordPayload {}
export interface ForgotPasswordProps {
  loading?: boolean;
  isValid?: boolean;
  onClick?: () => void;
}
