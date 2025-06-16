import {
  GetNotificationMessageListPayload,
  GetNotificationMessagesListResponse,
  GetNotificationMessageByIdPayload,
  GetNotificationMessageByIdResponse,
  GetMessageStatusLogsListPayLoad,
  GetMessageStatusLogsResponse,
} from "@ejada/types";
import httpClient from "./httpClient";
import { API } from "@ejada/common";

export const NotificationHistoryService = {
  GetNotificationMessagesList: async (
    data: GetNotificationMessageListPayload,
  ): Promise<GetNotificationMessagesListResponse> => {
    const response = await httpClient.get(API.messages, {
      params: { ...data },
    });
    return {
      ...response.data,
    };
  },
  GetNotificationMessagesById: async (
    data: GetNotificationMessageByIdPayload,
  ): Promise<GetNotificationMessageByIdResponse> => {
    const response = await httpClient.get(`${API.messages}/${data.id}`, {
      params: { ...data },
    });
    return {
      ...response.data,
    };
  },
  GetMessageStatusList: async (
    data: GetMessageStatusLogsListPayLoad,
  ): Promise<GetMessageStatusLogsResponse> => {
    const response = await httpClient.get(`${API.messagesStatusLogs}`, {
      params: { ...data },
    });
    return {
      ...response.data,
    };
  },
};
