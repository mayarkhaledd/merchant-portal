import { GetNotificationMessageListPayload } from "@ejada/types";
import { Dispatch, SetStateAction } from "react";

export interface NotificationHistoryFilterMenuValues {
  messageId?: string;
  requestId?: string;
  externalRequestId?: string;
  eventCode?: string;
  relationType?: string;
  relationValue?: string;
  mobileContact?: string;
  emailContact?: string;
  notificationChannel?: string;
  eventPriority?: string;
  messageStatus?: string;
  messageLanguage?: string;
  attachmentContentType?: string;
  sourceSystem?: string;
}

export interface useNotificationHistoryFilterMenuFormProps {
  setSearchQuery: Dispatch<
    SetStateAction<boolean | Partial<GetNotificationMessageListPayload>>
  >;
  closeDrawer: () => void;
  activeSearchCriteria: Partial<GetNotificationMessageListPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetNotificationMessageListPayload>>
  >;
}
