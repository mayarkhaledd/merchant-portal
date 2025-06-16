import {
  NotificationRequestPayload,
  Recipient,
} from "@ejada/types/api/recipientInterface";
import { CreateEventMessageValues } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage";
import { HTTPCookies } from "@ejada/common";
import Cookies from "js-cookie";
import {
  mergeDateAndTimeWithTimeZone,
  RecipientChannel,
} from "@ejada/screens/RecipientNotifications";
import { removeEmptyValues } from "@ejada/screens/BulkNotifications/partials/BulkNotificationForm";
export function mapToNotificationRequestPayload(
  initialValues: CreateEventMessageValues,
): NotificationRequestPayload {
  //mapping the initial values of the form to be sent as a payload to the API (to send notification )
  const mappedRecipients: Recipient[] = initialValues.recipients
    .map((recipient) => {
      const {
        relationType,
        relationValue,
        channels,
        parameters,
        messageLanguage,
      } = recipient;
      const notificationMethods =
        initialValues.recipientType === "CONTACT"
          ? channels
              .map((channel) => {
                const {
                  notificationChannel,
                  push,
                  inbox,
                  email,
                  mobile,
                  additionalEmailDetails,
                  operatingSystemType,
                } = channel;
                const contact =
                  push || inbox || email || (mobile ? String(mobile) : null);
                return contact && notificationChannel
                  ? removeEmptyValues({
                      notificationChannel,
                      contact,
                      additionalEmailDetails,
                      operatingSystemType,
                    })
                  : null;
              })
              .filter(
                (channel): channel is RecipientChannel => channel !== null,
              )
          : undefined;

      const customerInfo =
        initialValues.recipientType === "CUSTOMER"
          ? removeEmptyValues({
              relationType,
              relationValue,
              tenancyId: Cookies.get(HTTPCookies.tenantId) || "",
            })
          : undefined;

      let eventParams: [{ paramValue: string; paramCode: string }] | undefined;
      if (parameters && Array.isArray(parameters) && parameters.length > 0) {
        const filteredParams = parameters
          .map((param) => {
            const paramCode = (param.parameterCode || "").trim();
            const paramValue = (param.parameterValue || "").trim();

            const hasCode = paramCode !== "";
            const hasValue = paramValue !== "";
            if (hasCode && !hasValue) {
              return null;
            } else if (hasValue) {
              return {
                paramCode: paramCode,
                paramValue: paramValue,
              };
            } else {
              return null;
            }
          })
          .filter((param) => param !== null) as {
          paramCode: string;
          paramValue: string;
        }[];

        eventParams =
          filteredParams.length > 0 ? [filteredParams[0]] : undefined;
      }

      return removeEmptyValues({
        relationType,
        relationValue,
        eventParams,
        customerInfo,
        notificationMethods,
        messageLanguage,
      }) as Recipient;
    })
    .filter((recipient) => Object.keys(recipient).length > 0);

  const dueDateTime =
    mergeDateAndTimeWithTimeZone(
      initialValues.dueDate,
      initialValues.dueTime,
    ) || null;

  const payload: NotificationRequestPayload = {
    notifyRecipientMode: initialValues.notifyRecipientMode,
    recipientType: initialValues.recipientType,
    appTypeId: Cookies.get(HTTPCookies.appTypeId) || "",
    eventCode: initialValues.eventCode,
    recipients: mappedRecipients,
    ...removeEmptyValues(
      {
        dueDateTime,
        notificationPriority:
          initialValues.notificationPriority &&
          Number(initialValues.notificationPriority),
        notificationValidity:
          initialValues.notificationValidity &&
          Number(initialValues.notificationValidity),
      },
      ["dueDateTime"],
    ),
  };

  return removeEmptyValues(payload, [
    "dueDateTime",
  ]) as NotificationRequestPayload;
}
