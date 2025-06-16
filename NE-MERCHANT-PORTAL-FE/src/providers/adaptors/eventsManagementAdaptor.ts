import {
  getLookUpParametersInterface,
  getLookUpParametersResponse,
  getNotificationChannelsInterface,
  getNotificationChannelsResponse,
  NotificationEventInterface,
  GetNotificationEventResponse,
  GetEventByIdResponse,
  GetEventByIdInterface,
  CreateEventResponse,
  CreateEventInterface,
  GetSendersResponse,
  SendersInterface,
} from "@ejada/types";

export function adaptGetNotificationEvent(
  res: GetNotificationEventResponse,
): NotificationEventInterface {
  return {
    ...res.data,
  };
}

export function adaptGetLookUpParameters(
  data: getLookUpParametersResponse,
): getLookUpParametersInterface[] {
  return data.data.lookupParameters;
}
export function adaptGetNotificationChannel(
  data: getNotificationChannelsResponse,
): getNotificationChannelsInterface[] {
  return data.data.notificationChannels;
}

//merhcant APIs
export function adaptGetEventById(
  res: GetEventByIdResponse,
): GetEventByIdInterface {
  return {
    ...res.data,
  };
}

export function adaptCreateEvent(
  data: CreateEventResponse,
): CreateEventInterface {
  return { ...data.data };
}

export function adaptGetSenders(res: GetSendersResponse): SendersInterface {
  return {
    ...res.data,
  };
}
