import type { Control, FieldValues, FormState } from "react-hook-form";

export interface LoginFormValues extends FieldValues {
  userName?: string;
  password?: string;
}

export interface InputsProps {
  control: Control<LoginFormValues, unknown>;
  formState: FormState<LoginFormValues>;
  isLoading: boolean;
  onEnterPress: () => void;
}

export interface LoginButtonProps {
  loading?: boolean;
  isValid?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}
