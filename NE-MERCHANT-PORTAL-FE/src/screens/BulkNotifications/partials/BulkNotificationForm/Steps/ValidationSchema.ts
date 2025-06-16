import i18n from "@ejada/common/locals/i18n";

export const validationRules = {
  required: {
    required: i18n.t("bulk-notifications.adhoc_message.required") as string,
  },
  numbers: {
    required: i18n.t("bulk-notifications.adhoc_message.required") as string,
    pattern: {
      value: /^\d+$/,
      message: i18n.t("bulk-notifications.adhoc_message.numbers") as string,
    },
  },
  numbersOptional: {
    pattern: {
      value: /^\d+$/,
      message: i18n.t("bulk-notifications.adhoc_message.numbers") as string,
    },
  },
  notificationPriority: {
    pattern: {
      value: /^\d+$/,
      message: i18n.t(
        "recipient_notifications.adhoc_message.validation.numbers",
      ) as string,
    },
    validate: {
      lessThanTen: (value: number | undefined) =>
        value === undefined ||
        value === null ||
        value === 0 ||
        value < 10 ||
        (i18n.t(
          "recipient_notifications.adhoc_message.validation.less_than_10",
        ) as string),
    },
  },
  date: {
    validate: {
      notPastDate: (value: string | undefined) => {
        if (!value) {
          return true;
        }
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return (
          selectedDate >= today ||
          (i18n.t("bulk-notifications.adhoc_message.not_past_date") as string)
        );
      },
    },
  },
};
