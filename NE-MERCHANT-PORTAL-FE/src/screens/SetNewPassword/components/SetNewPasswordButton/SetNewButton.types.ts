import type { Control, FieldValues, FormState } from "react-hook-form";

export interface SetNewPasswordFormValues extends FieldValues {
  password?: string;
  newPassword?: string;
}

export interface InputsProps {
  control: Control<SetNewPasswordFormValues, unknown>;
  formState: FormState<SetNewPasswordFormValues>;
  isLoading: boolean;
  onEnterPress: () => void;
}

export interface SetNewPasswordButtonProps {
  loading?: boolean;
  isValid?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
