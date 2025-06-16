import i18n from "@ejada/common/locals/i18n";

export const NotificationHistoryValidationSchema = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: i18n.t(
        "notificationHistory.validations.email_Invalid",
      ) as string,
    },
  },
  messageId: {
    pattern: {
      value: /^[0-9]+$/,
      message: i18n.t(
        "notificationHistory.validations.message_id_invalid",
      ) as string,
    },
  },
  mobile: {
    minLength: {
      value: 13,
      message: i18n.t("notificationHistory.validations.formatMobile") as string,
    },
    maxLength: {
      value: 13,
      message: i18n.t("notificationHistory.validations.formatMobile") as string,
    },
    pattern: {
      value: /^\+9665[0-9]{8}$/,
      message: i18n.t("notificationHistory.validations.formatMobile") as string,
    },
  },
};
