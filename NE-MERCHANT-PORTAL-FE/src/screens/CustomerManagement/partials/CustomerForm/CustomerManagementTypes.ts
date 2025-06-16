import { FieldValues } from "react-hook-form";

export interface CustomerInitialValues {
  relationTypeCode: string;
  relationValue: string;
  customerNameAr?: {
    firstName: string;
    secondName: string;
  };
  customerNameEn?: {
    firstName: string;
    secondName: string;
  };
  preferredLanguage: string;
  activeFlag: string | boolean | undefined;
  title?: string;
  customerEmailDetails: {
    email: string;
    activeFlag: boolean;
    contactType: string;
    preferredLanguage?: string;
  }[];
  customerMobileDetails: {
    activeFlag: boolean;
    mobileNumber: string;
    contactType: string;
    preferredLanguage?: string;
  }[];
  customerId: number;
}

export interface CustomerFormValues
  extends FieldValues,
    CustomerInitialValues {}
