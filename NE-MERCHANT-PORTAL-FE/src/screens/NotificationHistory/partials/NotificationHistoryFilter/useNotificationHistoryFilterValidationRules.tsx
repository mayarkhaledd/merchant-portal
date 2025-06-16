import {
  lettersAndNumbersPattern,
  maxTenCharsPattern,
  acceptOneNumberOnlyRegex,
} from "@ejada/common/utils";
import { useTranslation } from "react-i18next";

export const useNotificationHistoryFilterValidationRules = () => {
  const { t } = useTranslation();

  const validateEventCode = (value: string) => {
    if (value === "") {
      return true;
    }

    if (!lettersAndNumbersPattern.test(value)) {
      return t("notificationHistory.validations.event_code_invalid", {
        defaultValue: t("notificationHistory.validations.event_code_invalid"),
      });
    }

    if (!maxTenCharsPattern.test(value)) {
      return t("eventsManagement.validation.event_code_invalid_max_ten", {
        defaultValue: t(
          "eventsManagement.validation.event_code_invalid_max_ten",
        ),
      });
    }

    return true;
  };
  const validateRelationValue = (value: string) => {
    if (value === "") {
      return true;
    }

    if (!lettersAndNumbersPattern.test(value)) {
      return t("notificationHistory.validations.relation_value_invalid", {
        defaultValue: t(
          "notificationHistory.validations.relation_value_invalid",
        ),
      });
    }

    if (!maxTenCharsPattern.test(value)) {
      return t("eventsManagement.validation.event_code_invalid_max_ten", {
        defaultValue: t(
          "eventsManagement.validation.event_code_invalid_max_ten",
        ),
      });
    }

    return true;
  };
  const validateNotificationEvent = (value: string) => {
    if (value === "") {
      return true;
    }

    if (!lettersAndNumbersPattern.test(value)) {
      return t("notificationHistory.validations.notification_event_invalid", {
        defaultValue: t(
          "notificationHistory.validations.notification_event_invalid",
        ),
      });
    }

    if (!maxTenCharsPattern.test(value)) {
      return t("eventsManagement.validation.event_code_invalid_max_ten", {
        defaultValue: t(
          "eventsManagement.validation.event_code_invalid_max_ten",
        ),
      });
    }

    return true;
  };
  const validateMessageID = (value: string) => {
    if (value === "") {
      return true;
    }

    if (!lettersAndNumbersPattern.test(value)) {
      return t("notificationHistory.validations.message_id_invalid", {
        defaultValue: t("notificationHistory.validations.message_id_invalid"),
      });
    }

    if (!maxTenCharsPattern.test(value)) {
      return t("eventsManagement.validation.event_code_invalid_max_ten", {
        defaultValue: t(
          "eventsManagement.validation.event_code_invalid_max_ten",
        ),
      });
    }

    return true;
  };
  const validateExternalMessageID = (value: string) => {
    if (value === "") {
      return true;
    }

    if (!lettersAndNumbersPattern.test(value)) {
      return t("notificationHistory.validations.external_message_id_invalid", {
        defaultValue: t(
          "notificationHistory.validations.external_message_id_invalid",
        ),
      });
    }

    if (!maxTenCharsPattern.test(value)) {
      return t("eventsManagement.validation.event_code_invalid_max_ten", {
        defaultValue: t(
          "eventsManagement.validation.event_code_invalid_max_ten",
        ),
      });
    }

    return true;
  };
  const validateRequestID = (value: string) => {
    if (value === "") {
      return true;
    }

    if (!lettersAndNumbersPattern.test(value)) {
      return t("notificationHistory.validations.request_id_invalid", {
        defaultValue: t("notificationHistory.validations.request_id_invalid"),
      });
    }

    if (!maxTenCharsPattern.test(value)) {
      return t("eventsManagement.validation.event_code_invalid_max_ten", {
        defaultValue: t(
          "eventsManagement.validation.event_code_invalid_max_ten",
        ),
      });
    }

    return true;
  };
  const validateExternalRequestID = (value: string) => {
    if (value === "") {
      return true;
    }

    if (!lettersAndNumbersPattern.test(value)) {
      return t("notificationHistory.validations.external_request_id_invalid", {
        defaultValue: t(
          "notificationHistory.validations.external_request_id_invalid",
        ),
      });
    }

    if (!maxTenCharsPattern.test(value)) {
      return t("eventsManagement.validation.event_code_invalid_max_ten", {
        defaultValue: t(
          "eventsManagement.validation.event_code_invalid_max_ten",
        ),
      });
    }

    return true;
  };

  return {
    eventCode: {
      validate: validateEventCode,
    },
    relationValue: {
      validate: validateRelationValue,
    },
    notificationEvent: { validate: validateNotificationEvent },
    messageID: { validate: validateMessageID },
    externalMessageID: { validate: validateExternalMessageID },
    requestID: { validate: validateRequestID },
    externalRequestID: { validate: validateExternalRequestID },
    eventPriority: {
      pattern: {
        value: acceptOneNumberOnlyRegex,
        message: t("notificationHistory.validations.numbers_only", {
          defaultValue: t("notificationHistory.validations.numbers_only"),
        }),
      },
    },
  };
};
