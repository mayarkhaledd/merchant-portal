import { languageMap } from "@ejada/screens/NotificationHistory";
import i18n from "@ejada/common/locals/i18n";

// export const formData = (
//   data1: NotificationMessageByIdInterface,
//   data2: MessageStatusLogListInterface,
// ) => {
//   const formDetailsData = {
//     NotificationHistoryFormData: {
//       eventCode: data1?.eventCode,
//       sourceSystem: data1?.sourceSystem,
//       notificationChannel: data1?.notificationChannel,
//       messageLanguage: data1?.messageLanguage,
//       tenancyID: Cookies.get(HTTPCookies.tenantId)
//         ? (Cookies.get(HTTPCookies.tenantId) as string)
//         : " ",
//       eventPriority: data1?.eventPriority,
//       messageID: data1?.messageId,
//       externalMessageID: data1?.referenceId,
//       requestID: data1?.requestId,
//       externalRequestID: data1?.externalRequestId
//         ? data1?.externalRequestId
//         : "",
//       notificationSenderInfo: data1?.notificationSenderInfo
//         ? data1?.notificationSenderInfo
//         : "",
//       DeliveryDescription: data1?.deliveryDescription
//         ? data1?.deliveryDescription
//         : "",
//     },
//     NotificationHistoryDetailsData: {
//       contact: data1?.contact,
//       emailReplyTo:
//         data1?.additionalEmailDetails?.emailReplyTo == null
//           ? ""
//           : data1?.additionalEmailDetails?.emailReplyTo,
//       emailCC:
//         data1?.additionalEmailDetails?.emailCC == null
//           ? ""
//           : data1?.additionalEmailDetails?.emailCC,
//       emailBCC:
//         data1?.additionalEmailDetails?.emailBCC == null
//           ? ""
//           : data1?.additionalEmailDetails?.emailBCC,
//       messageSubject: data1?.messageSubject,
//       messageContent: data1?.messageContent,
//     },
//     NotificationHistoryMessageHistoryLog: {
//       messageStatus: data1?.messageStatus,
//       statusDetails: data2?.statusLogs[0]?.statusDetails,
//       statusDateTime: data2?.statusLogs[0]?.statusDateTime,
//       statusConsumedUnit: data2?.statusLogs[0]?.statusConsumedUnits,
//       statusConsumedAmount: data2?.statusLogs[0]?.statusConsumedAmount,
//     },
//   };

//   return {
//     formDetailsData,
//   };
// };
export function getLanguageName(code: string): string {
  return languageMap[code];
}

export const formatDateTime = (date: string) => {
  if (!date) {
    return;
  }
  const d = new Date(date);
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};
export const NotificationHistoryFilterMenuvalidateDates = (
  fromDate: string,
  toDate: string,
) => {
  if (!fromDate && toDate) {
    return i18n.t("notificationHistory.validations.invalid_from_date");
  } else if (fromDate && !toDate) {
    return i18n.t("notificationHistory.validations.invalid_to_date");
  }
  if (fromDate && toDate) {
    if (new Date(fromDate) > new Date(toDate)) {
      return i18n.t("notificationHistory.validations.invalid_date_range");
    }
  }
};
