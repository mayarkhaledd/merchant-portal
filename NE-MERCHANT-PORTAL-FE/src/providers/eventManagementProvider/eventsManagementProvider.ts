import {
  GetEventPayload,
  GetNotificationEventResponse,
  NotificationEventInterface,
  getLookUpParametersResponse,
  getLookUpParametersInterface,
  getNotificationChannelsInterface,
  getNotificationChannelsResponse,
  GetEventByIdPayload,
  DeleteNotificationEventResponse,
  DeleteNotificationEventPayload,
  CreateEventResponse,
  CreateEventPayload,
  GetEventByIdResponse,
  GetEventByIdInterface,
  UpdateEventResponse,
  UpdateEventPayload,
  GetSendersPayload,
  GetSendersResponse,
  SendersInterface,
} from "@ejada/types";
import { useCustomMutation } from "../useCustomMutation";
import { EventsService } from "@ejada/services";
import {
  adaptCreateEvent,
  adaptGetEventById,
  adaptGetLookUpParameters,
  adaptGetNotificationChannel,
  adaptGetNotificationEvent,
  adaptGetSenders,
  useCustomQuery,
} from "@ejada/providers";
import { QueryCosntant } from "@ejada/common";

// export function useCreateNotificationEvent() {
//   const onSuccess = (res: CreateNotificationEventResponse) => {
//     const updatedData = adaptCreateNotificationEvent(res);
//     return updatedData;
//   };

//   return useCustomMutation<
//     createNotificationEventPayload,
//     CreateNotificationEventResponse
//   >((data: createNotificationEventPayload) => {
//     return EventsService.createNotificationEvent(data);
//   }, onSuccess);
// }
export function useGetNotificationEvent(
  data: GetEventPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetEventPayload,
    GetNotificationEventResponse,
    NotificationEventInterface
  >(
    [QueryCosntant.EVENTS, data.limit, data.offset],
    () => {
      return EventsService.getNotificationEvents(data);
    },
    (data: GetNotificationEventResponse) => adaptGetNotificationEvent(data),
    enabled,
  );
}
// export function useGetNotificationEventById(
//   data: GetEventByIdPayload,
//   enabled?: boolean,
// ) {
//   return useCustomQuery<
//     GetEventByIdPayload,
//     GetNotificationEventByIdResponse,
//     GetNotificationEventByIdInterface
//   >(
//     QueryCosntant.CHANNELS_DATA,
//     () => {
//       return EventsService.getNotificationEventById(data);
//     },
//     (data: GetNotificationEventByIdResponse) =>
//       adaptGetNotificationEventById(data),
//     enabled,
//   );
// }

// export function useUpdateNotificationEvent() {
//   const onSuccess = (res: UpdateNotificationEventResponse) => {
//     const updatedData = res;
//     return updatedData;
//   };

//   return useCustomMutation<
//     updateNotificationEventPayload,
//     UpdateNotificationEventResponse
//   >((data: updateNotificationEventPayload) => {
//     return EventsService.updateNotificationEvent(data);
//   }, onSuccess);
// }
export function useGetLookUpParameters(enabled?: boolean) {
  return useCustomQuery<
    [],
    getLookUpParametersResponse,
    getLookUpParametersInterface[]
  >(
    QueryCosntant.LOOKUP_PARAMETERS,
    () => {
      return EventsService.getLookUpParameters();
    },
    (data: getLookUpParametersResponse) => adaptGetLookUpParameters(data),
    enabled,
  );
}
export function useGetNotificationChannels(enabled?: boolean) {
  return useCustomQuery<
    [],
    getNotificationChannelsResponse,
    getNotificationChannelsInterface[]
  >(
    QueryCosntant.CHANNELS,
    () => {
      return EventsService.getNotificationChannels();
    },
    (data: getNotificationChannelsResponse) =>
      adaptGetNotificationChannel(data),
    enabled,
  );
}
export function useSmsSender(data: GetSendersPayload, enabled?: boolean) {
  return useCustomQuery<
    GetSendersPayload,
    GetSendersResponse,
    SendersInterface
  >(
    QueryCosntant.SENDERS,
    () => {
      return EventsService.getSenders(data);
    },
    (data: GetSendersResponse) => adaptGetSenders(data),
    enabled,
  );
}

export function useDeleteNotificationEvent() {
  const onSuccess = (res: DeleteNotificationEventResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<
    DeleteNotificationEventPayload,
    DeleteNotificationEventResponse
  >((data: DeleteNotificationEventPayload) => {
    return EventsService.deleteNotificationEvent(data);
  }, onSuccess);
}
//merchant APIs
export function useCreateEvent() {
  const onSuccess = (res: CreateEventResponse) => {
    const updatedData = adaptCreateEvent(res);
    return updatedData;
  };

  return useCustomMutation<CreateEventPayload, CreateEventResponse>(
    (data: CreateEventPayload) => {
      return EventsService.createEvent(data);
    },
    onSuccess,
  );
}

export function useGetEventById(data: GetEventByIdPayload, enabled?: boolean) {
  return useCustomQuery<
    GetEventByIdPayload,
    GetEventByIdResponse,
    GetEventByIdInterface
  >(
    QueryCosntant.CHANNELS_DATA,
    () => {
      return EventsService.getEventById(data);
    },
    (data: GetEventByIdResponse) => adaptGetEventById(data),
    enabled,
  );
}

export function useUpdateEvent() {
  const onSuccess = (res: UpdateEventResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<UpdateEventPayload, UpdateEventResponse>(
    (data: UpdateEventPayload) => {
      return EventsService.updateEventById(data);
    },
    onSuccess,
  );
}
