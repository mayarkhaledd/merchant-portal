import i18n from "@ejada/common/locals/i18n";
export const CustomerFilterValidationRules = {
  arabic: {
    pattern: {
      value: /^[\u0600-\u06FF\s]+$/,
      message: i18n.t("customer.create_customer.invalid.arabic") as string,
    },
  },
  english: {
    pattern: {
      value: /^[a-zA-Z ]+$/,
      message: i18n.t("customer.create_customer.invalid.english") as string,
    },
  },
  mobile: {
    minLength: {
      value: 13,
      message: i18n.t(
        "customer.create_customer.invalid.formatMobile",
      ) as string,
    },
    maxLength: {
      value: 13,
      message: i18n.t(
        "customer.create_customer.invalid.formatMobile",
      ) as string,
    },
    pattern: {
      value: /^\+9665[0-9]{8}$/,
      message: i18n.t(
        "customer.create_customer.invalid.formatMobile",
      ) as string,
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: i18n.t("Invalid Email Format") as string,
    },
  },
  relationValue: {
    pattern: {
      value: /^\d+$/,
      message: i18n.t("customer.create_customer.invalid.numbers") as string,
    },
  },
};
