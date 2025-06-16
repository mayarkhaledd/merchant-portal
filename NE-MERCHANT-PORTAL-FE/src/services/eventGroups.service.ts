import {
  CreateEventGroupPayload,
  CreateEventGroupResponse,
  deleteEventGroupPayload,
  DeleteEventGroupResponse,
  GetEventGroupByIdPayload,
  GetEventGroupByIdResponse,
  GetEventGroupPayload,
  GetEventGroupsResponse,
  updateEventGroupPayload,
  UpdateEventGroupResponse,
} from "@ejada/types/api/eventGroupsInterface";
import httpClient from "./httpClient";
import { API } from "@ejada/common";
//import Cookies from "js-cookie";
export const EventGroupsService = {
  getEventGroups: async (
    data: GetEventGroupPayload,
  ): Promise<GetEventGroupsResponse> => {
    // const EventGroupPayload = {
    //   tenantId: Cookies.get("tenantId")
    //     ? (Cookies.get("tenantId") as string)
    //     : " ",
    //   appTypeId: Cookies.get("appTypeId")
    //     ? Number(Cookies.get("appTypeId"))
    //     : undefined,
    // };

    // if (!EventGroupPayload.tenantId.trim() || !EventGroupPayload.appTypeId) {
    //   throw new Error("Invalid or missing cookie values");
    // }

    const response = await httpClient.get(API.eventGroup, {
      params: {
        ...data,
        //...EventGroupPayload
      },
    });
    return {
      ...response.data,
    };
  },

  getEventGroupById: async (
    data: GetEventGroupByIdPayload,
  ): Promise<GetEventGroupByIdResponse> => {
    const response = await httpClient.get(`${API.eventGroup}/${data.id}`);
    return {
      ...response.data,
    };
  },

  createEventGroup: async (
    data: CreateEventGroupPayload,
  ): Promise<CreateEventGroupResponse> => {
    const response = await httpClient.post(API.eventGroup, data);
    return {
      status: response.status,
      ...response.data,
    };
  },

  updateEventGroup: async (
    data: updateEventGroupPayload,
  ): Promise<UpdateEventGroupResponse> => {
    const response = await httpClient.put(`${API.eventGroup}/${data.id}`, data);
    return {
      status: response.status,
      ...response.data,
    };
  },

  deleteEventGroupById: async (
    data: deleteEventGroupPayload,
  ): Promise<DeleteEventGroupResponse> => {
    const response = await httpClient.delete(`${API.eventGroup}/${data.id}`);
    return {
      status: response.status,
      ...response.data,
    };
  },
};
