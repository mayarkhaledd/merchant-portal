import i18n from "@ejada/common/locals/i18n";
export const EventManagementFormValidationSchema = {
  english: {
    //required: i18n.t("eventsManagement.event_eventEnglishDescription_required"),
    minLength: {
      value: 2,
      message: i18n.t("validations.min_description_length") as string,
    },
    maxLength: {
      value: 50,
      message: i18n.t("validations.max_description_length") as string,
    },
  },
  eventCode: {
    required: i18n.t("eventsManagement.event_code_required"),
    maxLength: {
      value: 10,
      message: i18n.t("eventsManagement.max_event_code_length") as string,
    },
  },
  arabic: {
    //required: i18n.t("eventsManagement.event_arabic_description_required"),
    pattern: {
      value: /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/,
      message: i18n.t("eventsManagement.arabic_InValid") as string,
    },
    minLength: {
      value: 2,
      message: i18n.t("validations.min_description_length") as string,
    },
    maxLength: {
      value: 50,
      message: i18n.t("validations.max_description_length") as string,
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: i18n.t("validations.email_Invalid") as string,
    },
  },
  required: {
    required: i18n.t("validations.required") as string,
  },
};
