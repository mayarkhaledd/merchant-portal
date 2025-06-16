import { FieldValues } from "react-hook-form";
export interface Variable {
  value: string;
}
export type TargetType = "HEADER" | "BODY" | "FOOTER";
export interface ButtonType {
  buttonType: "URL" | "CALL" | "OFFER_CODE" | "OTP" | "PHONE_NUMBER";
  text: string;
  url?: string;
  phone?: string;
  offerCode?: string;
}
export interface ButtonGetByID {
  buttonId: string;
  buttonType: string;
  text: string;
  parameterPosition: number;
  exampleValue: string;
  url: string;
  phoneNumber: string;
}
export interface IButtonsWithOTP extends ButtonType {
  otpType?: "ONE_TAP" | "COPY_CODE" | undefined;
  name?: string;
  phoneNumber?: string;
}
export interface WhatsappInitialValues {
  templateName: string;
  languageCode: string;
  categoryButtons: string;
  header: string;
  body: string;
  footer: string;
  headerVariables: Variable[];
  bodyVariables: Variable[];
  copyCodeButton: string;
  expirationCheckbox: boolean;
  expiryDuration: string;
  securityCheckbox: boolean;
  buttons: ButtonType[];
}

export interface WhatsappFormValues
  extends FieldValues,
    WhatsappInitialValues {}
