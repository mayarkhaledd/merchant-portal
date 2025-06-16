import i18n from "@ejada/common/locals/i18n";

export const inputValidationRules = {
  inputFieldRequiredOnly: {
    required: i18n.t("validations.input_required") as string,
  },
  englishRequired: {
    required: i18n.t("validations.name") as string,
    pattern: {
      value: /^[a-zA-Z ]+$/,
      message: i18n.t("validations.name_InValid") as string,
    },
    minLength: {
      value: 2,
      message: i18n.t("validations.min_name_length") as string,
    },
    maxLength: {
      value: 50,
      message: i18n.t("validations.max_name_length") as string,
    },
  },
  arabicRequired: {
    required: i18n.t("validations.arabic_only_required") as string,
    pattern: {
      value: /^[\u0621-\u064A\u0660-\u0669 ]+$/,
      message: i18n.t("validations.arabic_InValid") as string,
    },
    minLength: {
      value: 2,
      message: i18n.t("validations.min_name_length") as string,
    },
    maxLength: {
      value: 50,
      message: i18n.t("validations.max_name_length") as string,
    },
  },
  numbersOnly: {
    required: i18n.t("validations.input_required") as string,
    pattern: {
      value: /^\d+$/,
      message: i18n.t("validations.numbers_only") as string,
    },
  },
  maxLength_50: {
    required: i18n.t("validations.max_50_required") as string,
    maxLength: {
      value: 50,
      message: i18n.t("validations.max_50") as string,
    },
  },
  email: {
    required: i18n.t("validations.general_email-message") as string,
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: i18n.t("validations.email_Invalid") as string,
    },
  },
  password: {
    required: i18n.t("validations.general_password-message") as string,
    pattern: {
      value: /^.{8,}$/,
      message: i18n.t("validations.password_Invalid") as string,
    },
  },
  phoneNumber: {
    required: i18n.t("validations.phone_required") as string,
    pattern: {
      value: /^\+?\d{10,15}$/,
      message: i18n.t("validations.phone_InValid") as string,
    },
    minLength: {
      value: 10,
      message: i18n.t("validations.min_phone_length") as string,
    },
    maxLength: {
      value: 15,
      message: i18n.t("validations.max_phone_length") as string,
    },
  },
  mixCharsAndLetters: {
    required: i18n.t("validations.input_required") as string,
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // At least one letter, one number, and minimum length of 8
      message: i18n.t("validations.alpha_numeric_8_InValid") as string,
    },
    minLength: {
      value: 8,
      message: i18n.t("validations.alpha_numeric_8_Length") as string,
    },
  },
  date: {
    required: i18n.t("validations.date") as string,
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      message: i18n.t("validations.date_format") as string,
    },
  },
};
