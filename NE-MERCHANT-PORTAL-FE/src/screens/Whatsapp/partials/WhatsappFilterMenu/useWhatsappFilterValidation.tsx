import i18n from "@ejada/common/locals/i18n";
export const useWhatsappFilterValidation = () => {
  return {
    english: {
      pattern: {
        value: /^[a-zA-Z ]+$/,
        message: i18n.t("whatsapp.create_template.invalid.english") as string,
      },
      minLength: {
        value: 2,
        message: i18n.t(
          "whatsapp.validations.min_description_length",
        ) as string,
      },
      maxLength: {
        value: 50,
        message: i18n.t(
          "whatsapp.validations.max_description_length",
        ) as string,
      },
    },
  };
};
