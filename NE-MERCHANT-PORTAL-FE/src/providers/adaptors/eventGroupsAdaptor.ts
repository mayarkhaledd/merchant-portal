import {
  CreateEventGroupInterface,
  CreateEventGroupResponse,
  GetEventGroupByIdResponse,
  GetEventGroupInterface,
  GetEventGroupsResponse,
  EventGroup,
} from "@ejada/types/api/eventGroupsInterface";

export function adaptGetEventGroups(
  res: GetEventGroupsResponse,
): GetEventGroupInterface {
  return {
    eventGroupList: res.data.eventGroupList.map((eventGroup) => ({
      eventGroupId: eventGroup.eventGroupId,
      eventGroupDescriptionEn: eventGroup.eventGroupDescriptionEn,
      eventGroupDescriptionAr: eventGroup.eventGroupDescriptionAr,
      eventGroupPushFlag: eventGroup.eventGroupPushFlag,
      appTypeResponse: eventGroup.appTypeResponse,
    })),
  };
}

export function adaptGetEventGroupById(
  res: GetEventGroupByIdResponse,
): EventGroup {
  return {
    eventGroupId: res.data.eventGroupId,
    eventGroupDescriptionEn: res.data.eventGroupDescriptionEn,
    eventGroupDescriptionAr: res.data.eventGroupDescriptionAr,
    eventGroupPushFlag: res.data.eventGroupPushFlag,
    appTypeResponse: res.data.appTypeResponse,
  };
}

export function adaptCreateUpdateEventGroup(
  data: CreateEventGroupResponse,
): CreateEventGroupInterface {
  return {
    eventGroupId: data.data.eventGroupId,
    eventGroupDescriptionEn: data.data.eventGroupDescriptionEn,
  };
}
