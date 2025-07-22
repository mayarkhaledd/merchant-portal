import { t } from "i18next";

export const WhatsappStepperSteps = (
  currentStep: number,
  hasExistingAccount: boolean | null,
  setupStatus: "success" | "failed" | null
) => [
  {
    id: "choose-account",
    title: t("stepper.choose_account_title"),
    description: t("stepper.choose_account_desc"),
    completed: currentStep > 0,
    active: currentStep === 0,
  },
  {
    id: "create-account",
    title: t("stepper.create_account_title"),
    description: t("stepper.create_account_desc"),
    completed: hasExistingAccount === true && currentStep !== 0 || currentStep > 1 || currentStep !== 0,
    active: hasExistingAccount === false && currentStep === 1,
  },
  {
    id: "connect-meta",
    title: t("stepper.connect_meta_title"),
    description: t("stepper.connect_meta_desc"),
    completed: currentStep > 2,
    active: currentStep === 2,
  },
  {
    id: "loading",
    title: t("stepper.loading_title"),
    description: t("stepper.loading_desc"),
    completed: currentStep > 3,
    active: currentStep === 3,
  },
  {
    id: "finish",
    title: t("stepper.finish_title"),
    description:
      currentStep === 4
        ? setupStatus === "success"
          ? t("stepper.finish_desc_success")
          : t("stepper.finish_desc_failed")
        : currentStep === 5
        ? t("stepper.finish_desc_failed")
        : t("stepper.finish_desc_success"),
    completed: currentStep > 4,
    active: currentStep === 4 || currentStep === 5,
  },
];