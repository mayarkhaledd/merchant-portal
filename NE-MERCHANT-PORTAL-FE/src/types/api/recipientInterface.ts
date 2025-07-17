import { ResponseInterface } from "./responseInterface";

export interface RecipientChannel {
  operatingSystemType?: string;
  notificationChannel: string;
  senderId?: number | undefined;
  contact: string;
}
export interface Recipient {
  customerInfo?: {
    relationType: string;
    relationValue: string;
    tenancyId: string;
  };
  eventParams?: [
    {
      paramValue: string;
      paramCode: string;
    },
  ];
  notificationMethods?: RecipientChannel[];
  messageLanguage?: string;
}

export interface NotificationRequestPayload {
  mobileAppName?: string;
  eventCode?: string;
  recipientType: string;
  adhocMessageDetails?: {
    messageSubject?: string;
    messageContent: string;
    whatsappSender?: string;
  };
  attachmentsCategory?: string;
  notifyRecipientMode: string;
  appTypeId: string;
  attachments?: {
    attachmentContent: string;
    attachmentFileName: string;
    attachmentContentType: string;
  }[];
  dueDateTime?: string | null;
  notificationPriority?: number;
  notificationValidity?: number;
  recipients: Recipient[];
  whatsappParameterValues?: {
    templateName?: string;
    templateLanguage?: string;
    whatsappApiToken: string;
    components?: {
      componentType?: string;
      buttonSubtype?: string;
      parameters?: {
        parameterType?: string;
        parameterValue?: string;
        parameterPosition?: number;
      }[];
    }[];
  };
}
export interface NotificationRequestInterface {
  data: {
    notificationRequestId: string;
    invalidRequestDataErrors: {
      errorCode: string;
      errorDescription: string;
    }[];
    invalidRecipientErrors: {
      [key: string]: {
        errorCode: string;
        errorDescription: string;
      }[];
    };
  };
}
export interface NotificationRequestResponse
  extends ResponseInterface<NotificationRequestInterface> {}
