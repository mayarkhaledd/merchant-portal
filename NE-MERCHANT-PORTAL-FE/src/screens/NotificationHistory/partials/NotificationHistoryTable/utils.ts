import {
  MessageStatusLogListInterface,
  NotificationMessagesInterface,
} from "@ejada/types";
import { TTableColumns } from "eds-react";

export const formatNotificationHistoryColumns = (
  data: NotificationMessagesInterface,
): TTableColumns[] => {
  const historyData = data.notificationMessages;
  return historyData.map((data) => {
    return {
      messageId: data.messageId,
      eventCode: data.eventCode,
      //sourceSystem: data.sourceSystem,
      channelType: data.notificationChannel,
      //relationType: data.customerInfo.relationType,
      //relationValue: data.customerInfo.relationValue,
      contact: data.contact,
      status: data.messageStatus,
      //sendingTimeStamp: data.sentDateTime,
      referenceId: data.referenceId,
      //messageLanguage: data.messageLanguage,
      //messageSubject: data.messageSubject,
      //deliveryDescription: data.deliveryDescription,
      //requestId: data.requestId,
      //externalRequestId: data.externalRequestId,
      //eventPriority: data.eventPriority,
      //notificationSenderInfo: data.notificationSenderInfo,
      //emailCC: data.additionalEmailDetails.emailCC,
      //emailBCC: data.additionalEmailDetails.emailCC,
      //emailReplyTo: data.additionalEmailDetails.emailReplyTo,
      notificationChannel: data.notificationChannel,
      //messageStatus: data.messageStatus,
    };
  });
};

export const formatMessageHistoryLogsColumns = (
  data: MessageStatusLogListInterface,
): TTableColumns[] => {
  const historyData = data.statusLogs;
  return historyData.map((data) => {
    return {
      messageStatus: data.messageStatus,
      statusDateTime: data.statusDateTime,
      statusDetails: data.statusDetails,
      statusConsumedUnits: data.statusConsumedUnits,
      statusConsumedAmount: data.statusConsumedAmount,
    };
  });
};
