import {
  CreateEventPayload,
  CreateEventResponse,
  DeleteNotificationEventPayload,
  DeleteNotificationEventResponse,
  GetEventByIdPayload,
  GetEventByIdResponse,
  GetEventPayload,
  getLookUpParametersResponse,
  getNotificationChannelsResponse,
  GetNotificationEventResponse,
  GetSendersPayload,
  GetSendersResponse,
  UpdateEventPayload,
  UpdateEventResponse,
} from "@ejada/types";
import httpClient from "./httpClient";
import { API } from "@ejada/common";

export const EventsService = {
  getNotificationEvents: async (
    data: GetEventPayload,
  ): Promise<GetNotificationEventResponse> => {
    const response = await httpClient.get(API.notificationEvents, {
      params: { ...data },
    });
    return {
      ...response.data,
    };
  },
  // getNotificationEventById: async (
  //   data: GetEventByIdPayload,
  // ): Promise<GetNotificationEventByIdResponse> => {
  //   const response = await httpClient.get(
  //     `${API.notificationEvents}/${data.id}`,
  //   );
  //   return {
  //     ...response.data,
  //   };
  // },
  // createNotificationEvent: async (
  //   data: createNotificationEventPayload,
  // ): Promise<CreateNotificationEventResponse> => {
  //   const response = await httpClient.post(API.notificationEvents, data);
  //   return {
  //     status: response.status,
  //     ...response.data,
  //   };
  // },
  // updateNotificationEvent: async (
  //   data: updateNotificationEventPayload,
  // ): Promise<UpdateNotificationEventResponse> => {
  //   const response = await httpClient.put(
  //     `${API.notificationEvents}/${data.id}`,
  //     data,
  //   );
  //   return {
  //     status: response.status,
  //     ...response.data,
  //   };
  // },
  getLookUpParameters: async (): Promise<getLookUpParametersResponse> => {
    const response = await httpClient.get(`${API.notificationParameters}`);
    return {
      status: response.status,
      ...response.data,
    };
  },
  getNotificationChannels:
    async (): Promise<getNotificationChannelsResponse> => {
      const response = await httpClient.get(`${API.notificationChannels}`);
      return {
        status: response.status,
        ...response.data,
      };
    },
  deleteNotificationEvent: async (
    data: DeleteNotificationEventPayload,
  ): Promise<DeleteNotificationEventResponse> => {
    const response = await httpClient.delete(
      `${API.notificationEvents}/${data.id}`,
    );
    return {
      status: response.status,
      ...response.data,
    };
  },
  //new merchant APIs
  getEventById: async (
    data: GetEventByIdPayload,
  ): Promise<GetEventByIdResponse> => {
    const response = await httpClient.get(`${API.events}/${data.id}`);
    return {
      ...response.data,
    };
  },
  createEvent: async (
    data: CreateEventPayload,
  ): Promise<CreateEventResponse> => {
    const response = await httpClient.post(API.events, data);
    return {
      status: response.status,
      ...response.data,
    };
  },
  updateEventById: async (
    data: UpdateEventPayload,
  ): Promise<UpdateEventResponse> => {
    const response = await httpClient.put(`${API.events}/${data.id}`, data);
    return {
      status: response.status,
      ...response.data,
    };
  },

  getSenders: async (data: GetSendersPayload): Promise<GetSendersResponse> => {
    const response = await httpClient.get(API.senders, {
      params: { ...data },
    });
    return {
      ...response.data,
    };
  },
};
