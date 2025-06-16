import { AppTypeResponse } from "@ejada/types";
import { Control, FieldErrors, FieldValues } from "react-hook-form";

export interface SelectSearchList {
  id: string;
  label?: string;
}
export interface EventGroupManagementProps {
  closeDrawer: () => void;
  mode: "add" | "edit" | "view";
  initialValues?: EventGroupInitialValues;
  control: Control<EventGroupFormValues>;
  formState: {
    errors: FieldErrors<EventGroupFormValues>;
  };
  sourceSystemsMenu?: SelectSearchList[];
}

export const eventGroupTypes = [
  { key: "MARKETING", node: "Marketing" },
  { key: "ESHAAR", node: "Eshaar" },
  { key: "TOUCHID", node: "TouchID" },
];

export interface EventGroupInitialValues {
  eventGroupId: string;
  eventGroupDescriptionEn: string;
  eventGroupDescriptionAr: string;
  eventGroupPushFlag: string;
  appTypeResponse?: AppTypeResponse;
  sourceSystem: string;
}

export interface EventGroupFormValues
  extends FieldValues,
    EventGroupInitialValues {}
