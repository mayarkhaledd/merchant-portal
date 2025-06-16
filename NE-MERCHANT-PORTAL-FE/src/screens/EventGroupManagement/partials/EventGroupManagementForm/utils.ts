import {
  CreateEventGroupPayload,
  EventGroup,
} from "@ejada/types/api/eventGroupsInterface";
import {
  EventGroupFormValues,
  EventGroupInitialValues,
} from "./eventGroupManagementForm.type";

export function mapToPayload(
  data: EventGroupFormValues,
  mode: string,
): CreateEventGroupPayload {
  const payload = {
    eventGroupId: mode === "edit" ? null : data.eventGroupId,
    eventGroupPushFlag: data.eventGroupPushFlag as string,
    eventGroupDescriptionEn: data.eventGroupDescriptionEn || "",
    eventGroupDescriptionAr: data.eventGroupDescriptionAr || "",
  };
  return payload;
}
export const mapEventGroupInterfaceToInitialValues = (
  eventGroup: EventGroup,
): EventGroupInitialValues => {
  return {
    eventGroupId: eventGroup.eventGroupId,
    eventGroupDescriptionEn: eventGroup.eventGroupDescriptionEn,
    eventGroupDescriptionAr: eventGroup.eventGroupDescriptionAr,
    eventGroupPushFlag: eventGroup.eventGroupPushFlag,
    sourceSystem: eventGroup.appTypeResponse.appTypeId + "",
  };
};
