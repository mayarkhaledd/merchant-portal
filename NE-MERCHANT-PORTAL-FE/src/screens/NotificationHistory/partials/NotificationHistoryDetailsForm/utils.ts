import {
  MessageStatusLogListInterface,
  NotificationMessageByIdInterface,
} from "@ejada/types/api/notificationHistoryInterface";
import { NotificationHistoryInitialValues } from "./NotificationHistoryDetailsForm.types";
import Cookies from "js-cookie";
import { HTTPCookies } from "@ejada/common";

export const mapNotificationMessageInterfaceToInitialValues = (
  data1: NotificationMessageByIdInterface,
  data2: MessageStatusLogListInterface,
): NotificationHistoryInitialValues => {
  return {
    NotificationHistoryFormData: {
      eventCode: data1?.eventCode,
      sourceSystem: data1?.sourceSystem,
      notificationChannel: data1?.notificationChannel,
      messageLanguage: data1?.messageLanguage,
      tenancyID: Cookies.get(HTTPCookies.tenantId)
        ? (Cookies.get(HTTPCookies.tenantId) as string)
        : " ",
      eventPriority: data1?.eventPriority,
      messageID: data1?.messageId,
      externalMessageID: data1?.referenceId,
      requestID: data1?.requestId,
      externalRequestID: data1?.externalRequestId
        ? data1?.externalRequestId
        : "",
      notificationSenderInfo: data1?.notificationSenderInfo
        ? data1?.notificationSenderInfo
        : "",
      relationType: data1?.customerInfo.relationType,
      relationValue: data1?.customerInfo.relationValue,
      sentDateTime: data1?.sentDateTime,
      deliveryDateTime: data1?.deliveryDateTime,
      expiryDateTime: data1?.expiryDateTime,
      DeliveryDescription: data1?.deliveryDescription
        ? data1?.deliveryDescription
        : "",
      attachments: data1?.attachments,
    },
    NotificationHistoryDetailsData: {
      contact: data1?.contact,
      emailReplyTo:
        data1?.additionalEmailDetails?.emailReplyTo == null
          ? ""
          : data1?.additionalEmailDetails?.emailReplyTo,
      emailCC:
        data1?.additionalEmailDetails?.emailCC == null
          ? ""
          : data1?.additionalEmailDetails?.emailCC,
      emailBCC:
        data1?.additionalEmailDetails?.emailBCC == null
          ? ""
          : data1?.additionalEmailDetails?.emailBCC,
      messageSubject: data1?.messageSubject,
      messageContent: data1?.messageContent,
    },
    NotificationHistoryMessageHistoryLog: {
      messageStatus: data1?.messageStatus,
      statusDetails: data2?.statusLogs[0]?.statusDetails,
      statusDateTime: data2?.statusLogs[0]?.statusDateTime,
      statusConsumedUnit: data2?.statusLogs[0]?.statusConsumedUnits,
      statusConsumedAmount: data2?.statusLogs[0]?.statusConsumedAmount,
    },
  };
};
