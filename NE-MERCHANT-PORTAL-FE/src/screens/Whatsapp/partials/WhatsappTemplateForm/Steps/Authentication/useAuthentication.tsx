import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
import { WhatsappFormValues } from "../../WhatsappTemplateFormTypes";
import { useCallback } from "react";
import { t } from "i18next";

interface UseAuthenticationProps {
  control?: Control<WhatsappFormValues> | undefined;
  unregister?: UseFormUnregister<WhatsappFormValues>;
  setValue?: UseFormSetValue<WhatsappFormValues>;
  watch?: UseFormWatch<WhatsappFormValues> | undefined;
  getValues?: UseFormGetValues<WhatsappFormValues>;
}
export function useAuthentication({ watch }: UseAuthenticationProps) {
  const copyCodeText = watch?.("copyCodeButton") ?? "";
  const expiryDuration = watch?.("expiryDuration") ?? "";
  const expiryCheckbox = watch?.("expirationCheckbox") ?? (false as boolean);
  const securityCheckbox = watch?.("securityCheckbox") ?? (false as boolean);
  const securityBody = securityCheckbox
    ? (t("whatsapp.security_section_text") as string)
    : "";
  const replaceVariable = useCallback((variableValue: string): string => {
    const text = t("whatsapp.expiry_section_text") as string;
    return text.replace("{{0}}", variableValue || "{{0}}");
  }, []);

  return {
    replaceVariable,
    securityBody,
    expiryDuration,
    copyCodeText,
    expiryCheckbox,
    securityCheckbox,
  };
}
