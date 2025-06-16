import {
  GetNotificationMessageListPayload,
  GetNotificationMessagesListResponse,
  NotificationMessagesInterface,
  GetNotificationMessageByIdPayload,
  GetNotificationMessageByIdResponse,
  NotificationMessageByIdInterface,
  MessageStatusLogListInterface,
  GetMessageStatusLogsResponse,
  GetMessageStatusLogsListPayLoad,
} from "@ejada/types";
import { NotificationHistoryService } from "@ejada/services";
import {
  adaptGetNotificationMessagesList,
  adaptGetNotificationMessagesById,
  useCustomQuery,
  adaptGetMessageStatusLogsList,
} from "@ejada/providers";
import { QueryCosntant } from "@ejada/common";
export function useGetNotificationMessagesList(
  data: GetNotificationMessageListPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetNotificationMessageListPayload,
    GetNotificationMessagesListResponse,
    NotificationMessagesInterface
  >(
    [QueryCosntant.MESSAGES, data.maxRecs, data.offset],
    () => {
      return NotificationHistoryService.GetNotificationMessagesList(data);
    },
    (data: GetNotificationMessagesListResponse) =>
      adaptGetNotificationMessagesList(data),
    enabled,
  );
}

export function useGetNotificationMessageById(
  data: GetNotificationMessageByIdPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetNotificationMessageByIdPayload,
    GetNotificationMessageByIdResponse,
    NotificationMessageByIdInterface
  >(
    QueryCosntant.MESSAGES_ID,
    () => {
      return NotificationHistoryService.GetNotificationMessagesById(data);
    },
    (data: GetNotificationMessageByIdResponse) =>
      adaptGetNotificationMessagesById(data),
    enabled,
  );
}

export function useGetMessageStatusLogsList(
  data: GetMessageStatusLogsListPayLoad,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetMessageStatusLogsListPayLoad,
    GetMessageStatusLogsResponse,
    MessageStatusLogListInterface
  >(
    QueryCosntant.MESSAGE_STATUS_LOGS,
    () => {
      return NotificationHistoryService.GetMessageStatusList(data);
    },
    (data: GetMessageStatusLogsResponse) => adaptGetMessageStatusLogsList(data),
    enabled,
  );
}
