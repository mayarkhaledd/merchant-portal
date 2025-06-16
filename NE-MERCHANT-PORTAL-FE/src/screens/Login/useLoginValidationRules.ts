// loginValidationRules.ts
import { passwordRegexPatternEightCharacters } from "@ejada/common/utils";
import { useTranslation } from "react-i18next";

export const useLoginValidationRules = () => {
  const { t } = useTranslation();

  return {
    loginName: {
      required: t("validations.email_required", {
        defaultValue: t("Name is required"),
      }),
    },
    password: {
      required: t("validations.password_required", {
        defaultValue: t("validations.password_required"),
      }),
      pattern: {
        value: passwordRegexPatternEightCharacters,
        message: t("validations.password_invalid", {
          defaultValue: t("validations.password_invalid"),
        }),
      },
    },
  };
};
