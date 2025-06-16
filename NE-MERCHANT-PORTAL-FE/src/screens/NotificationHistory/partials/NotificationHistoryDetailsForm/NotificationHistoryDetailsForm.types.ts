import i18n from "@ejada/common/locals/i18n";
import { AttachmentInfoAPIResponse } from "@ejada/types";
import { FieldValues } from "react-hook-form";

// export interface formDetailsData {
//   eventCode: string | undefined;
//   sourceSystem: string | undefined;
//   notificationChannel: string | undefined;
// }
export const languageMap: { [key: string]: string } = {
  AR: i18n.t("notificationHistory.language.arabic"),
  EN: i18n.t("notificationHistory.language.english"),
};

export interface NotificationHistoryInitialValues {
  NotificationHistoryFormData: {
    eventCode: string;
    sourceSystem: string;
    notificationChannel: string;
    messageLanguage: string;
    tenancyID: string;
    eventPriority: string;
    messageID: string;
    externalMessageID: string;
    requestID: string;
    externalRequestID: string;
    notificationSenderInfo: string;
    relationType: string;
    relationValue: string;
    sentDateTime: string;
    deliveryDateTime: string;
    expiryDateTime: string;
    DeliveryDescription: string;
    attachments: AttachmentInfoAPIResponse[];
  };
  NotificationHistoryDetailsData: {
    contact: string;
    emailReplyTo: string;
    emailCC: string;
    emailBCC: string;
    messageSubject: string;
    messageContent: string;
  };
  NotificationHistoryMessageHistoryLog: {
    messageStatus: string;
    statusDetails: string;
    statusDateTime: string;
    statusConsumedUnit: string;
    statusConsumedAmount: string;
  };
}

export interface NotificationHistoryFormValues
  extends FieldValues,
    NotificationHistoryInitialValues {}
