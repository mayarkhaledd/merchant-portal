import { ResponseInterface } from "./responseInterface";

export interface NotificationMessages {
  messageId: string;
  requestId: string;
  referenceId: string;
  externalRequestId: string;
  eventCode: string;
  eventPriority: string;
  messageStatus: string;
  payLoads: messagePayLoads[];
  messageLanguage: string;
  messageContent: string;
  messageSubject: string;
  customerInfo: customerInfoRelation;
  additionalEmailDetails: additionalEmailDetails;
  notificationChannel: string;
  contact: string;
  sourceSystem: string;
  notificationSenderInfo: string;
  sentDateTime: string;
  deliveryDateTime: string;
  deliveryDescription: string;
  expiryDateTime: string;
  attachmentSent: boolean;
  attachmentCategory: string;
  attachments: attachments[];
  readFlag: boolean;
  deletedFlag: boolean;
  userAction: string;
}
export interface NotificationMessagesInterface {
  notificationMessages: NotificationMessages[];
  totalRecords?: number;
}
export interface messagePayLoads {
  payloadObjectName: string;
  payloadObjectValue: string;
}

export interface customerInfoRelation {
  relationType: string;
  relationValue: string;
}

export interface additionalEmailDetails {
  emailCC: string;
  emailBCC: string;
  emailReplyTo: string;
}

export interface attachments {
  attachmentFileName: string;
  attachmentContentType: string;
  attachmentECMReferenceId: string;
}
export interface GetNotificationMessagesListResponse
  extends ResponseInterface<NotificationMessagesInterface> {}
export interface GetNotificationMessageListPayload {
  maxRecs: number;
  offset: number;
  messageId?: string;
  requestId?: string;
  externalRequestId?: string;
  eventCode?: string;
  customerRelationType?: string;
  customerRelationValue?: string;
  mobileContact?: string;
  emailContact?: string;
  notificationChannel?: string;
  eventPriority?: string;
  messageStatus?: string;
  messageLanguage?: string;
  attachmentSent?: boolean;
  attachmentContentType?: string;
  fromCreationDateTime?: string;
  toCreationDateTime?: string;
  batchNumber?: string;
  eventChannel?: string;
  appType?: string;
  fromSendingDateTime?: string;
  toSendingDateTime?: string;
}
export interface GetNotificationMessageByIdPayload {
  id: string;
  appType?: string;
}
export interface NotificationMessageById {
  messageId: string;
  requestId: string;
  referenceId: string;
  externalRequestId: string;
  eventCode: string;
  eventPriority: string;
  messageStatus: string;
  payLoads: messagePayLoads[];
  messageLanguage: string;
  messageContent: string;
  messageSubject: string;
  customerInfo: customerInfoRelation;
  additionalEmailDetails?: AdditionalEmailDetailsAPIResponse;
  notificationChannel: string;
  contact: string;
  sourceSystem: string;
  notificationSenderInfo: string;
  sentDateTime: string;
  deliveryDateTime: string;
  deliveryDescription: string;
  expiryDateTime: string;
  attachmentSent: boolean;
  attachmentCategory: string;
  attachments: AttachmentInfoAPIResponse[];
  readFlag: boolean;
  deletedFlag: boolean;
  userAction: string;
}

export interface AdditionalEmailDetailsAPIResponse {
  emailCC: string;
  emailBCC: string;
  emailReplyTo: string;
}

export interface AttachmentInfoAPIResponse {
  attachmentFileName: string;
  attachmentContentType: string;
  attachmentECMReferenceId: string;
}
export interface NotificationMessageByIdInterface
  extends NotificationMessageById {}
export interface GetNotificationMessageByIdResponse
  extends ResponseInterface<NotificationMessageByIdInterface> {}

export interface GetMessageStatusLogsListPayLoad {
  notificationChannel?: string;
  referenceId?: string;
}

export interface MessageStatusLogsList {
  messageStatus: string;
  statusDateTime: string;
  statusDetails: string;
  statusConsumedUnits: string;
  statusConsumedAmount: string;
}
export interface MessageStatusLogListInterface {
  statusLogs: MessageStatusLogsList[];
}

export interface GetMessageStatusLogsResponse
  extends ResponseInterface<MessageStatusLogListInterface> {}
