import {
  NotificationRequestPayload,
  NotificationRequestResponse,
} from "@ejada/types/api/recipientInterface";
import httpClient from "./httpClient";
import { API } from "@ejada/common";

export const recipientService = {
  CreateNotificationRequest: async (
    data: NotificationRequestPayload,
  ): Promise<NotificationRequestResponse> => {
    const response = await httpClient.post(API.createNotification, data);
    return {
      ...response.data,
    };
  },
};
