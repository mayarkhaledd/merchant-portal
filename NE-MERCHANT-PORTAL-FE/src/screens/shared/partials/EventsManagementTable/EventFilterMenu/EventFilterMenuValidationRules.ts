import i18n from "@ejada/common/locals/i18n";
export const EventFilterMenuValidationRules = {
  english: {
    pattern: {
      value: /^[a-zA-Z ]+$/,
      message: i18n.t(
        "eventGroupManagement.validations.english_InValid",
      ) as string,
    },
    minLength: {
      value: 2,
      message: i18n.t(
        "eventGroupManagement.validations.min_description_length",
      ) as string,
    },
    maxLength: {
      value: 50,
      message: i18n.t(
        "eventGroupManagement.validations.max_description_length",
      ) as string,
    },
  },
  arabic: {
    pattern: {
      value: /^[\u0600-\u06FF\s]+$/,
      message: i18n.t(
        "eventGroupManagement.validations.arabic_InValid",
      ) as string,
    },
    minLength: {
      value: 2,
      message: i18n.t(
        "eventGroupManagement.validations.min_description_length",
      ) as string,
    },
    maxLength: {
      value: 50,
      message: i18n.t(
        "eventGroupManagement.validations.max_description_length",
      ) as string,
    },
  },
};
