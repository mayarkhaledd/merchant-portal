import { QueryCosntant } from "@ejada/common";
import { useCustomQuery } from "../useCustomQuery";
import { EventGroupsService } from "@ejada/services/eventGroups.service";
import {
  CreateEventGroupPayload,
  CreateEventGroupResponse,
  GetEventGroupByIdPayload,
  GetEventGroupByIdResponse,
  GetEventGroupInterface,
  GetEventGroupPayload,
  GetEventGroupsResponse,
  EventGroup,
  UpdateEventGroupResponse,
  updateEventGroupPayload,
  DeleteEventGroupResponse,
  deleteEventGroupPayload,
} from "@ejada/types/api/eventGroupsInterface";
import {
  adaptCreateUpdateEventGroup,
  adaptGetEventGroupById,
  adaptGetEventGroups,
} from "../adaptors/eventGroupsAdaptor";
import { useCustomMutation } from "../useCustomMutation";

export function useGetEventGroups(
  data: GetEventGroupPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetEventGroupPayload,
    GetEventGroupsResponse,
    GetEventGroupInterface
  >(
    QueryCosntant.EVENT_GROUPS,
    () => {
      return EventGroupsService.getEventGroups(data);
    },
    (data: GetEventGroupsResponse) => adaptGetEventGroups(data),
    enabled,
  );
}

export function useGetEventGroupById(
  data: GetEventGroupByIdPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetEventGroupByIdPayload,
    GetEventGroupByIdResponse,
    EventGroup
  >(
    QueryCosntant.EVENT_GROUPS_BY_ID,
    () => {
      return EventGroupsService.getEventGroupById(data);
    },
    (data: GetEventGroupByIdResponse) => adaptGetEventGroupById(data),
    enabled,
  );
}

export function useCreateEventGroup() {
  const onSuccess = (res: CreateEventGroupResponse) => {
    const updatedData = adaptCreateUpdateEventGroup(res);
    return updatedData;
  };

  return useCustomMutation<CreateEventGroupPayload, CreateEventGroupResponse>(
    (data: CreateEventGroupPayload) => {
      return EventGroupsService.createEventGroup(data);
    },
    onSuccess,
  );
}

export function useUpdateEventGroup() {
  const onSuccess = (res: UpdateEventGroupResponse) => {
    const updatedData = adaptCreateUpdateEventGroup(res);
    return updatedData;
  };

  return useCustomMutation<updateEventGroupPayload, UpdateEventGroupResponse>(
    (data: updateEventGroupPayload) => {
      return EventGroupsService.updateEventGroup(data);
    },
    onSuccess,
  );
}
export function useDeleteEventGroupById() {
  const onSuccess = (res: DeleteEventGroupResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<deleteEventGroupPayload, DeleteEventGroupResponse>(
    (data: deleteEventGroupPayload) => {
      return EventGroupsService.deleteEventGroupById(data);
    },
    onSuccess,
  );
}
