import { FieldValues } from "react-hook-form";

export interface AddSourceSystemFormValues
  extends FieldValues,
    SystemOnboardingInitialValues {}

export interface AddSourceSystemProps {
  closeDrawer: () => void;
}
export interface SystemOnboardingInitialValues {
  sourceSystemId: number;
  sourceSystemName: string;
  status: string;
}
