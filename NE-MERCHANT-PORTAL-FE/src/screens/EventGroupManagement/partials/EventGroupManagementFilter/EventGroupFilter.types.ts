import { GetEventGroupPayload } from "@ejada/types/api/eventGroupsInterface";
import { Dispatch, SetStateAction } from "react";
import { SelectSearchList } from "../EventGroupManagementForm";

export interface EventGroupFilterMenuValues {
  eventGroupId: string;
  eventGroupDescriptionEn: string;
  eventGroupDescriptionAr: string;
  eventGroupType: "MARKETING" | "ESHAAR" | "TOUCHID" | undefined;
  sourceSystem: string;
}

export interface useEventGroupFilterMenuFormProps {
  setSearchQuery: Dispatch<
    SetStateAction<boolean | Partial<GetEventGroupPayload>>
  >;
  closeDrawer: () => void;
  sourceSystemsMenu?: SelectSearchList[];
  activeSearchCriteria: Partial<GetEventGroupPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetEventGroupPayload>>
  >;
}
