import { Control } from "react-hook-form";
import {
  AttachmentInfoAPIResponse,
  NotificationMessagesInterface,
} from "@ejada/types";
export interface NotificationHistoryState {
  isFilterOpen: boolean;
  setIsFilterOpen: (state: boolean) => void;
}
import {
  GetNotificationMessageListPayload,
  MessageStatusLogListInterface,
  NotificationMessageByIdInterface,
} from "@ejada/types";
import { Dispatch, SetStateAction } from "react";
import i18n from "@ejada/common/locals/i18n";
import { NotificationHistoryInitialValues } from "./partials/NotificationHistoryDetailsForm/NotificationHistoryDetailsForm.types";
import { TFunction } from "i18next";
import { TTableColumns } from "eds-react";
import { AxiosError } from "axios";

export interface selectType {
  key: string;
  node: string;
}

export interface NotificationHistoryState {
  isDetailsFormOpen: boolean;
  isGetNotificationMessagesLoading: boolean;
  setIsDetailsFormOpen: (open: boolean) => void;
  detailsIcon: string;
  isEnglish: boolean;
  setIsEnglish: (state: boolean) => void;
  notificationHistoryId: string;
  setNotificationHistoryId: (value: string) => void;
  referenceId: string;
  setReferenceId: (value: string) => void;
  channelType: string;
  setChannelType: (value: string) => void;
  notificationChannel: selectType[];
  setNotificationChannel: (value: selectType[]) => void;
  messageLanguage: selectType[];
  setMessageLanguage: (value: selectType[]) => void;
  eventCode: selectType[];
  setEventCode: (value: selectType[]) => void;
  sourceSystem: selectType[];
  setSourceSystem: (value: selectType[]) => void;
  eventPriority: selectType[];
  setEventPriority: (value: selectType[]) => void;
  messageStatus: selectType[];
  setMessageStatus: (value: selectType[]) => void;
  notificationHistoryData: TTableColumns[];
  searchQuery: boolean | Partial<GetNotificationMessageListPayload>;
  setSearchQuery: Dispatch<
    SetStateAction<boolean | Partial<GetNotificationMessageListPayload>>
  >;
  notificationHistoryDetails:
    | NotificationMessageByIdInterface
    | null
    | undefined;
  setNotificationHistoryDetails: Dispatch<
    SetStateAction<NotificationMessageByIdInterface | null | undefined>
  >;
  currentPage: number;
  setCurrentPage: (state: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (state: number) => void;
  totalListSize: number;
  setTotalListSize: (state: number) => void;
  refetchStatusLog: (() => void) | undefined;
  refetchMessageById: (() => void) | undefined;
  messageData: NotificationMessageByIdInterface | null;
  statusLogData: MessageStatusLogListInterface | null;
  isStatusSuccess: boolean;
  relationType: selectType[];
  setRelationType: (value: selectType[]) => void;
  activeSearchCriteria: Partial<GetNotificationMessageListPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetNotificationMessageListPayload>>
  >;
  refetchMessageListData: (() => void) | undefined;
  sourceSystemsMenu: SelectSearchMenuList[] | undefined;
  setSourceSystemsMenu: Dispatch<SetStateAction<SelectSearchMenuList[]>>;
  allMessagesData: NotificationMessagesInterface | null;
  MessagesListData: NotificationMessagesInterface | null;
  refetchAllMessagesData: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  isButtonText: boolean;
  setIsButtonText: (value: boolean) => void;
}
export interface notificationHistoryDetailsData {
  sourceSystem: string;
  eventCode: string;
  notificationChannel: string;
  messageLanguage: string;
  tenancyID: string;
  eventPriority: string;
  messageID: string;
  externalMessageID: string;
  requestID: string;
  externalRequestID: string;
  notificationSenderInfo: string;
  relationType: string;
  relationValue: string;
  sentDateTime: string;
  deliveryDateTime: string;
  expiryDateTime: string;
  DeliveryDescription: string;
  attachments: AttachmentInfoAPIResponse[];
}

export interface notificationHistoryMessageDetailsData {
  contact: string;
  emailReplyTo: string;
  emailCC: string;
  emailBCC: string;
  messageSubject: string;
  messageContent: string;
}
export interface notificationHistoryMessageHistoryLog {
  messageStatus: string;
  statusDetails: string;
  statusDateTime: string;
  statusConsumedUnit: string;
  statusConsumedAmount: string;
}
export interface NotificationHistoryFormData {
  NotificationHistoryFormData: notificationHistoryDetailsData;
  NotificationHistoryDetailsData: notificationHistoryMessageDetailsData;
  NotificationHistoryMessageHistoryLog: notificationHistoryMessageHistoryLog;
}

export interface NotificatioHistoryDetailsFormProps {
  onCancel: () => void;
  initialValues?: NotificationHistoryInitialValues;
  control: Control<NotificationHistoryFormData>;
  t: TFunction<"translation", undefined, "translation">;
}

export interface NotificationHistoryFormProps {
  closeDrawer: () => void;
  setSearchQuery: Dispatch<
    SetStateAction<boolean | Partial<GetNotificationMessageListPayload>>
  >;
  activeSearchCriteria: Partial<GetNotificationMessageListPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetNotificationMessageListPayload>>
  >;
}
//types for filtering
export interface NotificationHistoryFormInitValues {
  eventCode: string;
  notificationChannel: string[];
  sourceSystem: string[];
  relationType: string[];
  relationValue: string;
  notificationEvent: string;
  eventPriority: string[];
  messageLanguage: string[];
  requestID: string;
  externalRequestID: string;
  messageID: string;
  externalMessageID: string;
  emailContact: string;
  fromDatePick: string;
  toDatePick: string;
  sentAttachment: string[];
  status: "SENT" | "FAILED" | undefined;
  phone: string;
}

export const SOURCE_SYSTEM = [
  { id: "0", label: "UCM" },
  { id: "1", label: "IPO" },
  { id: "2", label: "SNP" },
];
export const EVENTS_PRIORITY = [
  { id: "0", label: "1" },
  { id: "1", label: "2" },
  { id: "2", label: "3" },
  { id: "3", label: "4" },
  { id: "4", label: "5" },
  { id: "5", label: "6" },
  { id: "6", label: "7" },
  { id: "7", label: "8" },
  { id: "8", label: "9" },
];

export const Message_Language = [
  { id: "EN", label: i18n.t("notificationHistory.english") },
  { id: "AR", label: i18n.t("notificationHistory.arabic") },
];

export const RELATION_TYPE = [
  { id: "IDENTIFIER", label: "IDENTIFIER" },
  { id: "IQAMA", label: "IQAMA" },
  { id: "NIN", label: "NIN" },
];
export const SENT_ATTACHMENT = [
  { id: "PDF", label: "PDF" },
  { id: "CSV", label: "CSV" },
  { id: "DOCX", label: "DOCX" },
];

export interface SelectSearchMenuList {
  id: string;
  label: string;
}
