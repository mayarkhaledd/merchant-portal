import {
  CreateEventGroupPayload,
  deleteEventGroupPayload,
  EventGroup,
  GetEventGroupInterface,
  GetEventGroupPayload,
  updateEventGroupPayload,
} from "@ejada/types/api/eventGroupsInterface";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { SelectSearchList } from "@ejada/screens";

export interface TEventGroupManagementState {
  addNewEventGroupDrawer: boolean;
  setAddNewEventGroupDrawer: (value: boolean) => void;
  eventGroupList: SelectSearchList[];
  setEventGroupList: Dispatch<SetStateAction<SelectSearchList[]>>;
  eventGroupId: string;
  setEventGroupId: (value: string) => void;
  isEnglish: boolean;
  setIsEnglish: (state: boolean) => void;
  editEventGroupDrawer: boolean;
  setEditEventGroupDrawer: (value: boolean) => void;
  isDeletePopUpOpen: boolean;
  setIsDeletePopUpOpen: (value: boolean) => void;
  searchQuery: boolean | Partial<GetEventGroupPayload>;
  setSearchQuery: Dispatch<
    SetStateAction<boolean | Partial<GetEventGroupPayload>>
  >;
  deleteEventGroupById: (data: deleteEventGroupPayload) => void;
  isDeleteEventGroupByIdSuccess: boolean;
  isDeleteEventGroupByIdError: boolean;
  refetchEventGroup: (() => void) | undefined;
  isDeleteEventGroupByIdAxiosError: AxiosError<unknown, unknown> | null;
  isCreateEventGroupSuccess: boolean;
  isCreateEventGroupError: boolean;
  createEventGroupAxiosError: AxiosError<unknown, unknown> | null;
  isEditEventGroupSuccess: boolean;
  isEditEventGroupError: boolean;
  editEventGroupAxiosError: AxiosError<unknown, unknown> | null;
  viewEventGroupDrawer: boolean;
  setIsViewEventGroupDrawer: (value: boolean) => void;
  addEventGroup: (data: CreateEventGroupPayload) => void;
  editEventGroup: (data: updateEventGroupPayload) => void;
  totalListSize: number;
  setTotalListSize: (state: number) => void;
  isEventGroupFilterMenuOpen: boolean;
  setIsEventGroupFilterMenuOpen: (value: boolean) => void;
  sourceSystemsMenu: SelectSearchList[];
  setSourceSystemsMenu: Dispatch<SetStateAction<SelectSearchList[]>>;
  activeSearchCriteria: Partial<GetEventGroupPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetEventGroupPayload>>
  >;
  eventGroupByIdData: EventGroup | null;
  refetchEventGroupByIdData?: () => void;
  allEventGroupData: GetEventGroupInterface | null;
  eventGroupsData: GetEventGroupInterface | null;
  refetchAllEventGroupData: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  isEventGroupSuccess: boolean;
  isEventGroupError: boolean;
  isButtonText: boolean;
  setIsButtonText: (value: boolean) => void;
  isGetEventGroupsLoading: boolean;
}

export interface SelectList {
  key: string;
  node: string;
}
