import { SelectSearchList } from "@ejada/screens";
import { GetEventPayload } from "@ejada/types";
import { GetEventGroupInterface } from "@ejada/types/api/eventGroupsInterface";
import { Dispatch, SetStateAction } from "react";

export interface EventFilterMenuValues {
  eventCode: string;
  eventGroup: string;
  sourceSystem: string;
  eventEnglishDescription: string;
  eventArabicDescription: string;
  status: "enabled" | "disabled" | undefined;
}
export interface useEventFilterMenuFormProps {
  setSearchQuery: Dispatch<SetStateAction<boolean | Partial<GetEventPayload>>>;
  setEventGroupList?: Dispatch<SetStateAction<SelectSearchList[]>>;
  eventGroupData?: GetEventGroupInterface | null;
  isEventGroupSuccess?: boolean;
  closeDrawer: () => void;
  activeSearchCriteria: Partial<GetEventPayload>;
  setActiveSearchCriteria: Dispatch<SetStateAction<Partial<GetEventPayload>>>;
}

export interface EventFilterMenuFormProps extends useEventFilterMenuFormProps {
  closeDrawer: () => void;
  activeSearchCriteria: Partial<GetEventPayload>;
  setActiveSearchCriteria: Dispatch<SetStateAction<Partial<GetEventPayload>>>;
}
