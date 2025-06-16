import { FieldValues } from "react-hook-form";

export interface CreateAdhocMessageValues
  extends FieldValues,
    BulkNotificationInitialValues {}

export interface CreateAdhocMessageProps {
  closeDrawer: () => void;
}
export interface BulkNotificationInitialValues {
  mobileAppName: string;
  eventCode?: string;
  RecipientType: string;
  RecipientFile: File[];
  IgnoreInvalid: boolean;
  MessageSubject: string;
  AttachmentType: string;
  MessageContent: string;
  MessageFile: File[];
  DueDate: string;
  DueTime: string;
  NotificationPriority: number;
  NotifyRecipientMode: boolean;
  appTypeId?: string;
}
