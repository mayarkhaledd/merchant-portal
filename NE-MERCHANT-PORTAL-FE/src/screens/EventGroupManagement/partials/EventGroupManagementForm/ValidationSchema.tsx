import i18n from "@ejada/common/locals/i18n";

export const ValidationSchema = {
  english: {
    pattern: {
      value: /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z ]+$/,
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
      value:
        /^(?=.*[\u0600-\u06FF].*[\u0600-\u06FF])[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/,
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
  eventGroupCode: {
    required: {
      value: true,
      message: i18n.t(
        "eventGroupManagement.validations.eventGroupCode_required",
      ) as string,
    },
    pattern: {
      value: /^(?=.*\S).+$/,
      message: i18n.t(
        "eventGroupManagement.validations.eventGroupCode_invalid",
      ) as string,
    },
  },
  required: {
    required: {
      value: true,
      message: i18n.t(
        "eventGroupManagement.validations.eventGroupCode_required",
      ) as string,
    },
  },
};
