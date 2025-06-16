import { FieldValues } from "react-hook-form";

export interface CreateEventMessageValues
  extends FieldValues,
    CreateEventInitialValues {}

export interface CreateEventMessageProps {
  closeDrawer: () => void;
}

export interface RecipientChannel {
  notificationChannel: string;
  operatingSystemType?: string;
  email?: string;
  mobile?: number;
  push?: string;
  inbox?: string;
  additionalEmailDetails?: {
    emailCC: string;
    emailBCC: string;
    emailReplyTo: string;
  };
}

export interface Recipient {
  channels: RecipientChannel[];
  messageLanguage?: string;
  parameterCode?: string;
  relationType?: string;
  relationValue?: string;
  parameterValue?: number;
  parameters?: {
    parameterCode?: string;
    parameterValue?: string;
  }[];
}

export interface CreateEventInitialValues {
  eventCode?: string;
  recipientType: string;
  dueDate: string;
  dueTime: string;
  notificationPriority?: number;
  notificationValidity?: number;
  notifyRecipientMode: string;
  recipients: Recipient[];
}
