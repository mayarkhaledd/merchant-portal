import i18n from "@ejada/common/locals/i18n";

export const validationRules = {
  english: {
    pattern: {
      value: /^[a-zA-Z ]+$/,
      message: i18n.t("whatsapp.create_template.invalid.english") as string,
    },
    minLength: {
      value: 2,
      message: i18n.t("whatsapp.validations.min_description_length") as string,
    },
    maxLength: {
      value: 50,
      message: i18n.t("whatsapp.validations.max_description_length") as string,
    },
  },
  mobile: {
    required: i18n.t("whatsapp.create_template.required") as string,
    minLength: {
      value: 13,
      message: i18n.t(
        "whatsapp.create_template.invalid.formatMobile",
      ) as string,
    },
    maxLength: {
      value: 13,
      message: i18n.t(
        "whatsapp.create_template.invalid.formatMobile",
      ) as string,
    },
    pattern: {
      value: /^\+9665[0-9]{8}$/,
      message: i18n.t(
        "whatsapp.create_template.invalid.formatMobile",
      ) as string,
    },
  },
  extraMobile: {
    minLength: {
      value: 13,
      message: i18n.t(
        "whatsapp.create_template.invalid.formatMobile",
      ) as string,
    },
    maxLength: {
      value: 13,
      message: i18n.t(
        "whatsapp.create_template.invalid.formatMobile",
      ) as string,
    },
    pattern: {
      value: /^\+9665[0-9]{8}$/,
      message: i18n.t(
        "whatsapp.create_template.invalid.formatMobile",
      ) as string,
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: i18n.t("whatsapp.create_template.invalid.email") as string,
    },
    required: i18n.t("whatsapp.create_template.required") as string,
  },
  extraEmail: {
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: i18n.t("whatsapp.create_template.invalid.email") as string,
    },
  },
  required: {
    required: i18n.t("whatsapp.create_template.required") as string,
  },
  lowerCase: {
    pattern: {
      value: /^[a-z_]+$/,
      message: i18n.t("whatsapp.create_template.lower_case") as string,
    },
  },
  url: {
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      message: i18n.t(
        "whatsapp.create_template.second_step.invalid_url",
      ) as string,
    },
  },
  header: {
    minLength: {
      value: 2,
      message: i18n.t("whatsapp.validations.min_description_length") as string,
    },
  },
  body: {
    minLength: {
      value: 2,
      message: i18n.t("whatsapp.validations.min_description_length") as string,
    },
  },
  footer: {
    minLength: {
      value: 2,
      message: i18n.t("whatsapp.validations.min_description_length") as string,
    },
  },
  numbers: {
    pattern: {
      value: /^[0-9]+$/,
      message: i18n.t("whatsapp.create_template.invalid.numbers") as string,
    },
  },
};
