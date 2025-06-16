import {
  GetNotificationMessagesListResponse,
  NotificationMessagesInterface,
  NotificationMessageByIdInterface,
  GetNotificationMessageByIdResponse,
  GetMessageStatusLogsResponse,
  MessageStatusLogListInterface,
} from "@ejada/types";

export function adaptGetNotificationMessagesList(
  res: GetNotificationMessagesListResponse,
): NotificationMessagesInterface {
  return {
    ...res.data,
  };
}

export function adaptGetNotificationMessagesById(
  res: GetNotificationMessageByIdResponse,
): NotificationMessageByIdInterface {
  return {
    ...res.data,
  };
}

export function adaptGetMessageStatusLogsList(
  res: GetMessageStatusLogsResponse,
): MessageStatusLogListInterface {
  return {
    ...res.data,
  };
}
