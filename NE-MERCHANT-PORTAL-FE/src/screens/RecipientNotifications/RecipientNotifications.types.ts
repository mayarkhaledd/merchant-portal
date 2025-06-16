import { Control, FieldErrors, UseFormReturn } from "react-hook-form";
import {
  CreateAdhocMessageValues,
  CreateAdhocInitialValues,
} from "./partials/CreateAdhocMessage";
import { CreateEventInitialValues as EventValues } from "./partials/CreateEventMessage";
import { CreateEventMessageValues } from "./partials/CreateEventMessage";
import { ChannelData, SelectSearchList } from "@ejada/screens";
import { Dispatch, SetStateAction } from "react";
import { GetEventGroupInterface } from "@ejada/types/api/eventGroupsInterface";
import {
  GetEventPayload,
  NotificationEventInterface,
  NotificationEventParameter,
} from "@ejada/types";
import { NotificationRequestPayload } from "@ejada/types/api/recipientInterface";
import { AxiosError } from "axios";
import { TTableColumns } from "eds-react";

export interface FormStepProps {
  formValues: CreateAdhocMessageValues;
  control: Control<CreateAdhocMessageValues>;
  formState: {
    errors: FieldErrors<CreateAdhocMessageValues>;
  };
  colors: {
    errorDefault: string;
  };
  initialValues?: CreateAdhocInitialValues;
  setValue?: UseFormReturn<CreateAdhocMessageValues>["setValue"];
  watch?: UseFormReturn<CreateAdhocMessageValues>["watch"];
  trigger?: UseFormReturn<CreateAdhocMessageValues>["trigger"];
  getValues?: UseFormReturn<CreateAdhocMessageValues>["getValues"];
}
export interface EventFormStepProps {
  formValues: CreateEventMessageValues;
  control: Control<CreateEventMessageValues>;
  formState: {
    errors: FieldErrors<CreateEventMessageValues>;
  };
  colors: {
    errorDefault: string;
  };
  initialValues?: EventValues;
  setValue?: UseFormReturn<CreateEventMessageValues>["setValue"];
  watch?: UseFormReturn<CreateEventMessageValues>["watch"];
  eventParameters?: NotificationEventParameter[];
  getValues: UseFormReturn<CreateEventMessageValues>["getValues"];
  trigger?: UseFormReturn<CreateEventMessageValues>["trigger"];
}
export type TRecipientNotificationsState = {
  isGetEventsDataLoading: boolean;
  requestSuccess: boolean;
  requestError: boolean;
  isEnglish: boolean;
  setIsEnglish: (state: boolean) => void;
  requestErrorMessage: AxiosError | null;
  createNotification: (val: NotificationRequestPayload) => void;
  isCreateAdhocMessageOpen: boolean;
  setIsCreateAdhocMessageOpen: (state: boolean) => void;
  isSendEventMessageOpen: boolean;
  setIsSendEventMessageOpen: (state: boolean) => void;
  eventId: string | undefined;
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
  setIsFetchingEventsEnabled: (state: boolean) => void;
  isFetchingEventsEnabled: boolean;
  activeSearchCriteria: Partial<GetEventPayload>;
  setActiveSearchCriteria: Dispatch<SetStateAction<Partial<GetEventPayload>>>;
  refetchEventsData: (() => void) | undefined;
  allEventData: NotificationEventInterface | null;
  refetchAllEventData: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  eventParameters: NotificationEventParameter[];
  setEventParameters: Dispatch<SetStateAction<NotificationEventParameter[]>>;
  EventsData: NotificationEventInterface | null;
  isButtonText: boolean;
  setIsButtonText: (value: boolean) => void;
  languageSelected: string;
  setLanguageSelected: (value: string) => void;
  paramCodeGot: string[];
  setParamCodeGot: (value: string[]) => void;
  channelIds: string[];
  setChannelIds: Dispatch<SetStateAction<string[]>>;
};
