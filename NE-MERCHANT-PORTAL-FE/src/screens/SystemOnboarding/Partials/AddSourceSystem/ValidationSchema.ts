import i18n from "@ejada/common/locals/i18n";

export const systemValidationRules = {
  sourceSystemId: {
    pattern: {
      value: /^\d+$/,
      message: i18n.t("system-onboarding.validation.number") as string,
    },
    required: i18n.t("system-onboarding.validation.required") as string,
  },
  sourceSystemName: {
    required: i18n.t("system-onboarding.validation.required") as string,
  },
  status: {
    required: i18n.t("system-onboarding.validation.required") as string,
  },
};
