import { Control, FieldErrors, UseFormReturn } from "react-hook-form";
import {
  CreateAdhocMessageValues,
  BulkNotificationInitialValues,
} from "./partials/BulkNotificationForm";
import { GetEventGroupInterface } from "@ejada/types/api/eventGroupsInterface";
import { ChannelData, SelectSearchList } from "@ejada/screens";
import { Dispatch, SetStateAction } from "react";
import { GetEventPayload, NotificationEventInterface } from "@ejada/types";
import { NotificationRequestPayload } from "@ejada/types/api/recipientInterface";
import { AxiosError } from "axios";
import { TTableColumns } from "eds-react";

export interface FormStepProps {
  formValues: CreateAdhocMessageValues;
  control: Control<CreateAdhocMessageValues>;
  formState: {
    errors: FieldErrors<CreateAdhocMessageValues>; // Define the generic type as needed
  };
  colors: {
    errorDefault: string;
  };
  initialValues?: BulkNotificationInitialValues;
  setValue?: UseFormReturn<CreateAdhocMessageValues>["setValue"];
  watch?: UseFormReturn<CreateAdhocMessageValues>["watch"];
  mode?: "event" | "adhoc";
}

export type TBulkNotificationsState = {
  isGetEventsDataLoading: boolean;
  requestErrorMessage: AxiosError | null;
  requestSuccess: boolean;
  requestError: boolean;
  isEnglish: boolean;
  setIsEnglish: (state: boolean) => void;
  createNotification: (val: NotificationRequestPayload) => void;
  isCreateAdhocMessageOpen: boolean;
  refetchEventsData: (() => void) | undefined;
  setIsFetchingEventsEnabled: (state: boolean) => void;
  isFetchingEventsEnabled: boolean;
  setIsCreateAdhocMessageOpen: (state: boolean) => void;
  isSendEventMessageOpen: boolean;
  setIsSendEventMessageOpen: (state: boolean) => void;
  isEventPageOpen: boolean;
  setIsEventPageOpen: (state: boolean) => void;
  eventId: string;
  setEventId: (val: string) => void;
  isEventFilterMenuOpen: boolean;
  setIsEventFilterMenuOpen: (state: boolean) => void;
  eventGroupList: SelectSearchList[];
  setEventGroupList: Dispatch<SetStateAction<SelectSearchList[]>>;
  eventGroupData: GetEventGroupInterface | null;
  isEventGroupSuccess: boolean;
  channelsTableData?: ChannelData[];
  setChannelsTableData?: Dispatch<SetStateAction<ChannelData[]>>;
  searchQuery: boolean | Partial<GetEventPayload>;
  setSearchQuery: Dispatch<SetStateAction<boolean | Partial<GetEventPayload>>>;
  currentPage: number;
  setCurrentPage: (state: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (state: number) => void;
  totalListSize: number;
  setTotalListSize: (state: number) => void;
  EventsManagementData: TTableColumns[];
  activeSearchCriteria: Partial<GetEventPayload>;
  setActiveSearchCriteria: Dispatch<SetStateAction<Partial<GetEventPayload>>>;
  allEventData: NotificationEventInterface | null;
  EventsData: NotificationEventInterface | null;
  refetchAllEventData: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  isButtonText: boolean;
  setIsButtonText: (value: boolean) => void;
};
