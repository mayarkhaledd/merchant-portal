import { GetEventGroupInterface } from "@ejada/types/api/eventGroupsInterface";
import { TTableColumns } from "eds-react";

export const formateEventGroupColumns = (
  data: GetEventGroupInterface,
): TTableColumns[] => {
  const eventGroupList = data.eventGroupList;
  return eventGroupList.map((event) => {
    return {
      //assign table fields to the parameters got from BE with the type of interface defined in the api interface file for UI
      eventGroupId: event.eventGroupId,
      EventGroupType: event.eventGroupPushFlag,
      EnglishDescription: event.eventGroupDescriptionEn || "",
      ArabicDescription: event.eventGroupDescriptionAr || "",
    };
  });
};
