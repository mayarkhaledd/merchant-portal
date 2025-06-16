import { FieldValues } from "react-hook-form";

export interface CreateAdhocMessageValues
  extends FieldValues,
    CreateAdhocInitialValues {}

export interface CreateAdhocMessageProps {
  closeDrawer: () => void;
}
export interface RecipientChannel {
  notificationChannel: string;
  senderId: number | undefined;
  email?: string;
  mobile?: number;
  push?: string;
  operatingSystemType?: string;
  additionalEmailDetails?: {
    emailCC: string;
    emailBCC: string;
    emailReplyTo: string;
  };
  inbox?: string;
}

export interface Recipient {
  channels: RecipientChannel[];
  RelationType?: string;
  RelationValue?: number;
}

export interface CreateAdhocInitialValues {
  DueTime: string;
  mobileAppName: string;
  notifyRecipientMode: string;
  RecipientType: string;
  MessageSubject?: string;
  AttachmentType?: string;
  MessageContent: string;
  MessageFile?: File[];
  DueDate: string;
  NotificationPriority?: number;
  NotificationValidity?: number;
  Recipients: Recipient[];
}
