import {
  DeleteNotificationEventPayload,
  getLookUpParametersInterface,
  GetEventPayload,
  getNotificationChannelsInterface,
  GetEventByIdInterface,
  CreateEventPayload,
  CreateEventResponse,
  UpdateEventPayload,
  EventChannel,
  NotificationEventInterface,
} from "@ejada/types";
import { GetEventGroupInterface } from "@ejada/types/api/eventGroupsInterface";
import { Dispatch, SetStateAction } from "react";
import { SelectSearchList } from "@ejada/screens";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseControllerProps,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { TTableColumns } from "eds-react";
import { AxiosError } from "axios";
import {
  EventManagementInitialValues,
  TemplateChannelsData,
} from "@ejada/screens/EventsManagement/partials/EventManagementForm/types";
export interface EventChannels {
  notificationEventChannelId?: string;
  notificationChannelId: string | undefined;
  header: string;
  body?: string;
  sender: string;
  languageCode?: string;
  mobileAppName?: string;
  eventChannels?: EventChannels[];
}
export interface TEventsManagementState {
  isGetEventsDataLoading: boolean;
  refetchEventsData: (() => void) | undefined;
  addNewEventDrawer: boolean;
  EventsManagementData: TTableColumns[];
  setAddNewEventDrawer: (value: boolean) => void;
  isEventFilterMenyOpen: boolean;
  setIsEventFilterMenuOpen: (value: boolean) => void;
  editEventDrawer: boolean;
  setEditEventDrawer: (value: boolean) => void;
  viewEventDrawer: boolean;
  setViewEventDrawer: (value: boolean) => void;
  editTemplateDrawer: boolean;
  setEditTemplateDrawer: (value: boolean) => void;
  notificationEventId: string;
  setNotificationEventId: (value: string) => void;
  viewEventId: string;
  setViewEventId: (value: string) => void;
  eventParameterList: SelectSearchList[];
  setEventParameterList: Dispatch<SetStateAction<SelectSearchList[]>>;
  eventGroupList: SelectSearchList[];
  setEventGroupList: Dispatch<SetStateAction<SelectSearchList[]>>;
  eventGroupData: GetEventGroupInterface | null;
  isEventGroupSuccess: boolean;
  channelsTableData?: TemplateChannelsData[];
  setChannelsTableData?: Dispatch<SetStateAction<TemplateChannelsData[]>>;
  editTemplateData: TemplateChannelsData;
  setEditTemplateData: Dispatch<SetStateAction<TemplateChannelsData>>;
  eventParameters: getLookUpParametersInterface[] | null;
  isEventParametersSuccess: boolean;
  refetchEventParameters: (() => void) | undefined;
  setIsPopupOpen: (state: boolean) => void;
  isPopupOpen: boolean;
  setSelectedEvent: React.Dispatch<React.SetStateAction<TTableColumns>>;
  selectedEvent: TTableColumns | null;
  setPopupType: (state: string) => void;
  popupType: string;
  deleteNotificationEvent: (data: DeleteNotificationEventPayload) => void;
  isDeleteNotificationEventSuccess: boolean;
  isDeleteNotificationEventError: boolean;
  searchQuery: boolean | Partial<GetEventPayload>;
  setSearchQuery: Dispatch<SetStateAction<boolean | Partial<GetEventPayload>>>;
  savedChannel: string[];
  setSavedChannel: Dispatch<SetStateAction<string[]>>;
  editTemplateInsertParameter: SelectSearchList[];
  savedLanguage: string[];
  setSavedLanguage: Dispatch<SetStateAction<string[]>>;
  setEditTemplateInsertParameter: Dispatch<SetStateAction<SelectSearchList[]>>;
  refetchChannels: (() => void) | undefined;
  eventChannels: getNotificationChannelsInterface[] | null;
  isEventChannelsSuccess: boolean;
  smsSender: SelectSearchList[];
  emailSender: SelectSearchList[];
  //merhcant apis fields ( create & update)
  createEvent: (data: CreateEventPayload) => void;
  createEventError: boolean;
  createEventSuccess: boolean;
  createEventErrorDetails: AxiosError | null;
  createEventData: CreateEventResponse | undefined;
  updateEvent: (data: UpdateEventPayload) => void;
  updateEventError: boolean;
  updateEventSuccess: boolean;
  updateEventErrorDetails: AxiosError | null;
  currentPage: number;
  setCurrentPage: (state: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (state: number) => void;
  totalListSize: number;
  setTotalListSize: (state: number) => void;
  selectedEventGroup: SelectSearchList;
  setSelectedEventGroup: Dispatch<SetStateAction<SelectSearchList>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteNotificationEventError: AxiosError<unknown, any> | null;
  channelsTableDataEditMode: TemplateChannelsData[];
  setChannelsTableDataEditMode: Dispatch<
    SetStateAction<TemplateChannelsData[]>
  >;
  resetCreateEvent: () => void;
  resetUpdateEvent: () => void;
  extraChannels: EventChannel[];
  setExtraChannels: Dispatch<SetStateAction<EventChannel[]>>;
  addExtraChannelBtn: boolean;
  setAddExtraChannelBtn: Dispatch<SetStateAction<boolean>>;
  showNotification: boolean;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  showErrorNotification: boolean;
  setShowErrorNotification: Dispatch<SetStateAction<boolean>>;
  extraMobileAppName: string;
  setExtraMobileAppName: Dispatch<SetStateAction<string>>;
  eventByIdData: GetEventByIdInterface | null;
  channelList?: SelectSearchList[];
  isGetEventByIdDataSuccess?: boolean;
  refetchEventByIdData?: () => void;
  isGetEventByIdDataError?: boolean;
  selectedChannels: string[];
  setSelectedChannels: Dispatch<SetStateAction<string[]>>;
  activeSearchCriteria: Partial<GetEventPayload>;
  setActiveSearchCriteria: Dispatch<SetStateAction<Partial<GetEventPayload>>>;
  isEnglish: boolean;
  setIsEnglish: (state: boolean) => void;
  sourceSystemsMenu: SelectSearchList[];
  setSourceSystemsMenu: Dispatch<SetStateAction<SelectSearchList[]>>;
  allEventData: NotificationEventInterface | null;
  refetchAllEventData: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  EventsData: NotificationEventInterface | null;
  isButtonText: boolean;
  setIsButtonText: (value: boolean) => void;
}

export interface EditTemplateFormInitialValues {
  eventChannelId: string;
  header: string;
  body: string;
  sender: string;
  languageCode: string;
  channelId: string;
}
export interface EditTemplateFormProps {
  initialValues?: EditTemplateFormInitialValues;
  closeDrawer: () => void;
}
export interface EditEventFormProps {
  initialValues?: EventFormInitialValues;
  closeDrawer: () => void;
}
export interface EditTemplatesFormValues
  extends FieldValues,
    EditTemplateFormInitialValues {}
export interface EventFormInitialValues {
  eventCode: string;
  eventGroup: string;
  eventPriority: string;
  eventEnglishDescription: string;
  eventArabicDescription: string;
  eventStatus: string;
  language: string[];
  parameters: string[];
  EventBlockingPeriodToTime: string;
  EventBlockingPeriodFromTime: string;
  ValidFromDateTime: string;
  ValidToDateTime: string;
  mobileAppName: string;
  eventChannels: EventChannels[];
  eventGroupId: string;
  demoChannels: string[];
}

export interface extraEventChannelsInitialValues {
  demoChannels: string[];
  languageCode?: string[];
  eventChannels: EventChannel[];
  mobileAppName: string;
}

export enum NotificationChannelType {
  SMS = "SMS",
  EMAIL = "EMAIL",
  PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
  INBOX = "INBOX",
}

export interface RenderAccordionProps {
  type: NotificationChannelType;
  control: Control<UseControllerProps>;
  formState: { errors: FieldErrors };
  id: number;
}

export interface NotificationEventFormValues
  extends FieldValues,
    EventManagementInitialValues {}
type MODE = "add" | "edit" | "view";

export interface EventFormProps {
  mode: MODE;
  closeDrawer: () => void;
  initialValues?: EventManagementInitialValues;
}

export interface EventsManagementFormStepProps {
  reset?: UseFormReset<NotificationEventFormValues>;
  registerEmail?: string;
  setRegisterEmail?: Dispatch<SetStateAction<string>>;
  mode?: string;
  formValues: NotificationEventFormValues;
  watch?: UseFormGetValues<NotificationEventFormValues>;
  control: Control<NotificationEventFormValues>;
  formState: {
    errors: FieldErrors<NotificationEventFormValues>;
  };
  getValues?: UseFormGetValues<NotificationEventFormValues>;
  colors?: {
    errorDefault: string;
  };
  isEventParametersSuccess?: boolean;
  refetchEventParameters?: () => void;
  channelList?: SelectSearchList[];
  isGetEventByIdDataSuccess?: boolean;
  refetchEventByIdData?: () => void;
  isGetEventByIdDataError?: boolean;
  refetchChannels?: () => void;
  eventByIdData?: GetEventByIdInterface;
  createEventError?: boolean;
  createEventSuccess?: boolean;
  updateEventError?: boolean;
  updateEventSuccess?: boolean;
  //channelsTableDataEditMode?: TemplateChannelsData[];
  register?: UseFormRegister<NotificationEventFormValues>;
  selectedChannels?: string[];
  setSelectedChannels?: Dispatch<SetStateAction<string[]>>;
  setValue?: UseFormSetValue<NotificationEventFormValues>;
  initialValues?: EventManagementInitialValues;
}

export interface ChannelData {
  notificationEventChannelId?: string;
  channelId: string;
  channel: string;
  language: string;
  templateHeader: string;
  templateBody: string;
  editTemplateParameters: SelectSearchList[];
}

export interface FormattedChannels {
  eventChannelId?: string;
  channelId: string | undefined;
  header: string;
  body?: string;
  sender: string;
  languageCode?: string;
  mobileAppName?: string;
}
