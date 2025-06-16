import { SelectSearchList } from "@ejada/screens";
import { GetEventPayload, NotificationEventInterface } from "@ejada/types";
import { AxiosError } from "axios";
import { TTableColumns, TTableColumnsDef } from "eds-react";
import { Dispatch, SetStateAction } from "react";

export interface EventManagementTableProps {
  eventsManagementData?: TTableColumns[];
  eventsManagementColumns?: TTableColumnsDef[];
  searchCriteriaPlaceHolder?: string;
  isEventFilterMenuOpen?: boolean;
  setIsEventFilterMenuOpen?: (state: boolean) => void;
  currentPageName?: string;
  onSubmit?: Dispatch<SetStateAction<boolean | Partial<GetEventPayload>>>;
  disablePagination?: boolean;
  isSendNotificationFilter?: boolean;
  refetchEventsData: (() => void) | undefined;
  activeSearchCriteria: Partial<GetEventPayload>;
  setActiveSearchCriteria: Dispatch<SetStateAction<Partial<GetEventPayload>>>;
  setSearchQuery: Dispatch<SetStateAction<boolean | Partial<GetEventPayload>>>;
  isEnglish: boolean;
  sourceSystemsMenu?: SelectSearchList[];
  allEventData?: NotificationEventInterface | null;
  eventsData?: NotificationEventInterface | null;
  refetchAllEventData?: (() => void) | undefined;
  isRefetchedDataError?: boolean;
  isRefetchDataSuccess?: boolean;
  errorMessage?: AxiosError<unknown, any> | null;
  searchQuery?: boolean | Partial<GetEventPayload>;
  prefix?: string;
  isButtonText: boolean;
  setIsButtonText: (state: boolean) => void;
}
