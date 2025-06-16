import type { Control, FieldValues, FormState } from "react-hook-form";

export interface ForgotPasswordForm extends FieldValues {
  userName?: string;
  password?: string;
}

export interface InputsProps {
  control: Control<ForgotPasswordForm, unknown>;
  formState: FormState<ForgotPasswordForm>;
  isLoading: boolean;
  onEnterPress: () => void;
}

export interface LoginButtonProps {
  loading?: boolean;
  isValid?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
