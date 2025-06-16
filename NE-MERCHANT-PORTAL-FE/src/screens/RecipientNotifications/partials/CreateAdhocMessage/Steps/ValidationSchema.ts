import i18n from "@ejada/common/locals/i18n";

export const validationRules = {
  required: {
    required: i18n.t(
      "recipient_notifications.adhoc_message.validation.required",
    ) as string,
  },

  relationValue: {
    pattern: {
      value: /^\d+$/,
      message: i18n.t(
        "recipient_notifications.adhoc_message.validation.numbers",
      ) as string,
    },
    required: i18n.t(
      "recipient_notifications.adhoc_message.validation.required",
    ) as string,
  },

  senderId: {
    pattern: {
      value: /^\d+$/,
      message: i18n.t(
        "recipient_notifications.adhoc_message.validation.numbers",
      ) as string,
    },
    required: i18n.t(
      "recipient_notifications.adhoc_message.validation.required",
    ) as string,
  },
  mobile: {
    required: i18n.t("customer.create_customer.required.mobile") as string,
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
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: i18n.t(
        "recipient_notifications.adhoc_message.validation.email",
      ) as string,
    },
    required: i18n.t(
      "recipient_notifications.adhoc_message.validation.required",
    ) as string,
  },
  extraEmail: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: i18n.t(
        "recipient_notifications.adhoc_message.validation.email",
      ) as string,
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
  notificationValidity: {
    pattern: {
      value: /^\d+$/,
      message: i18n.t(
        "recipient_notifications.adhoc_message.validation.numbers",
      ) as string,
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
// utils.ts
export const isEmailUniqueInChannel = (
  currentValue: string | undefined,
  currentPath: string,
  allValues: any,
): true | string => {
  if (!currentValue) return true;

  const match = currentPath.match(/Recipients\.(\d+)\.channels\.(\d+)/);
  if (!match) return true;

  const [_, recipientIndex, channelIndex] = match.map(Number);
  const channel =
    allValues?.Recipients?.[recipientIndex]?.channels?.[channelIndex];

  if (!channel) return true;

  const allEmails = [
    channel?.email,
    channel?.additionalEmailDetails?.emailCC,
    channel?.additionalEmailDetails?.emailBCC,
    channel?.additionalEmailDetails?.emailReplyTo,
  ];

  const count = allEmails.filter((email) => email === currentValue).length;

  return count > 1
    ? (i18n.t(
        "recipient_notifications.adhoc_message.validation.duplicate_email",
      ) as string)
    : true;
};
