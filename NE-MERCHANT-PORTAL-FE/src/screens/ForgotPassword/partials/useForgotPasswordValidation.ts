import { emailRegexPattern } from "@ejada/common/utils";
import { useTranslation } from "react-i18next";

// forgotPasswordValidationRules.ts

export const useForgotPasswordValidation = () => {
  const { t } = useTranslation();

  return {
    passResetMethod: {
      required: t("pass_reset_method"),
    },
    passResetMethodvalue: {
      required: "Email is required",
      pattern: {
        value: emailRegexPattern,
        message: "Please enter a valid email address!",
      },
    },
  };
};
