import { ResponseInterface } from "./responseInterface";

// export interface createNotificationEventPayload {
//   eventId?: string | null;
//   eventGroupId?: string;
//   priority?: string;
//   descriptionEn?: string;
//   descriptionAr?: string;
//   validFromDate?: string;
//   validToDate?: string;
//   enabledFlag?: boolean;
//   eventChannels?: EventChannels[];
//   eventParameters?: string[];
//   notificationEventBlockingPeriodFromTime?: string;
//   notificationEventBlockingPeriodToTime?: string;
// }
export interface EventChannels {
  languageCode: string;
  notificationChannelId: string;
}
export interface EditTemplateDataInterface {
  insertFromParameter: string[];
  sender: string;
  header: string;
  body: string;
}
// export interface CreateNotificationEventResponse
//   extends ResponseInterface<{
//     notificationEventSubscribableFlag: boolean;
//     notificationEventDescriptionEn: string;
//     notificationEventEnabledFlag: boolean;
//     notificationEventId: string;
//   }> {}

export interface NotificationEvent {
  notificationEventContentEn: string;
  notificationEventStaticFlag: boolean;
  notificationEventChargeableFlag: boolean;
  notificationEventParameters: NotificationEventParameter[];
  notificationEventContentAr: string;
  notificationEventValidToDate: string;
  notificationEventAttributeGenerationTemplateType: string;
  notificationEventSendOncePeriod: number;
  notificationEventGeoLocationFlag: boolean;
  notificationEventDescriptionEn: string;
  notificationEventCoverageAreaPoint1X: number;
  notificationEventEnabledFlag: boolean;
  notificationEventCoverageAreaPoint1Y: number;
  notificationEventId: string;
  notificationEventExpirationPeriod: number;
  notificationEventDescriptionAr: string;
  notificationEventTargetContacts: string;
  eventGroup: EventGroup;
  notificationEventSecurityFlag: boolean;
  notificationEventsBlockingPeriods: NotificationEventsBlockingPeriod[];
  notificationEventQueryableFlag: boolean;
  notificationEventsPerMinute: number;
  notificationEventSystemFlag: boolean;
  notificationEventPriority: number;
  notificationEventChannels: NotificationEventChannel[];
  notificationEventValidFromDate: string;
  notificationEventDrivenFlag: boolean;
  notificationEventSubscribableFlag: boolean;
  notificationEventCoverageAreaPoint2X: number;
  notificationEventCoverageAreaPoint2Y: number;
  notificationEventSmsSender: string;
  notificationEventAttributeGenerationTemplateID: string;
  notificationEventSendOnceFlag: boolean;
  mobileAppName: string;
}

export interface NotificationEventParameter {
  eventParametersId: number;
  transformationId: number;
  parameterName: string;
  lookupParameter: LookupParameter;
}

export interface LookupParameter {
  parameterName: string;
  parameterDescription: string;
  transformation: Transformation;
}

export interface Transformation {
  transformationId: number;
  transformationType: TransformationType;
  transformationDescription: string;
}

export interface TransformationType {
  transformationTypeDescription: string;
  transformationTypeId: number;
}

export interface EventGroup {
  eventGroupId: string;
  eventGroupDescriptionAr: string;
  eventGroupPushFlag: string;
  eventGroupDescriptionEn: string;
  appTypeResponse: AppTypeResponse;
}

export interface AppTypeResponse {
  appTypeId: string;
  appTypeName: string;
  active: boolean;
  tenantResponse: TenantResponse;
}

export interface TenantResponse {
  tenantName: string;
  tenantId: string;
}

export interface NotificationEventsBlockingPeriod {
  notificationEventBlockingPeriodFromTime: string;
  notificationEventBlockingPeriodToTime: string;
  notificationEventId: string;
  blockingPeriodId: number;
}

export interface NotificationEventChannel {
  notificationEventChannelId: number;
  additionalInfo4: string;
  additionalInfo3: string;
  additionalInfo2: string;
  additionalInfo1: string;
  periodicalRenewal: boolean;
  snoozePeriod: number;
  snoozeCount: number;
  sound: string;
  icon: string;
  enabledFlag: boolean;
  linkedUrl: string;
  notificationChannel: {
    notificationChannelId: string;
    channelNameEn: string;
    channelNameAr: string;
    retentionPeriod: number;
    regularExpression: string;
    useNeTemplatesFlag: boolean;
    enabledFlag: boolean;
    isSubscribableFlag: boolean;
    templateType: string;
    isHeaderRequiredFlag: boolean;
    senderFlag: boolean;
    isMobileApp: boolean;
    delayedPeriod: number;
    sender: string;
    allowMultiplePushNotification: boolean;
    bulkSupport: boolean;
    maxMsgsCount: number;
  };
  languageCode: string;
  body: string;
  confirmationPeriod: number;
  sender: string;
  notificationEventId: string;
  imageUrl: string;
  header: string;
  subscribableFlag: boolean;
  retentionPeriod: number;
  deepLinkingPath: string;
  additionalInfo5: string;
}

export interface GetEventPayload {
  tenantId: string;
  eventGroupId?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  enabledFlag?: boolean;
  priority?: number;
  eventCode?: string;
  appTypeId?: string;
  offset: number;
  limit: number;
}
export interface GetEventByIdPayload {
  id: string;
}
export interface NotificationEventInterface {
  totalElements: number;
  notificationEvents: NotificationEvent[];
}
// export interface GetNotificationEventByIdInterface extends NotificationEvent {}

// export interface GetNotificationEventByIdResponse {
//   notificationEvents: NotificationEvent;
// }

export interface Transformation {
  transformationId: number;
  transformationType: TransformationType;
  transformationDescription: string;
}

export interface TransformationType {
  transformationTypeDescription: string;
  transformationTypeId: number;
}
export interface NotificationChannel {
  notificationChannelId: string;
  channelNameEn: string;
  channelNameAr: string;
  retentionPeriod: number;
  regularExpression: string;
  useNeTemplatesFlag: boolean;
  enabledFlag: boolean;
  isSubscribableFlag: boolean;
  templateType: string;
  isHeaderRequiredFlag: boolean;
  senderFlag: boolean;
  isMobileApp: boolean;
  delayedPeriod: number;
  sender: string;
  allowMultiplePushNotification: boolean;
  bulkSupport: boolean;
  maxMsgsCount: number;
}

export interface getLookUpParametersResponse
  extends ResponseInterface<{
    lookupParameters: LookupParameter[];
  }> {}
export interface getNotificationChannelsResponse
  extends ResponseInterface<{
    notificationChannels: NotificationChannel[];
  }> {}

export interface DeleteNotificationEventPayload {
  id: string;
}
export interface getNotificationChannelsInterface extends NotificationChannel {}

export interface getLookUpParametersInterface extends LookupParameter {}

export interface GetNotificationEventResponse
  extends ResponseInterface<NotificationEventInterface> {}

// export interface GetNotificationEventByIdResponse
//   extends ResponseInterface<GetNotificationEventByIdInterface> {}

export interface GetEventByIdInterface extends Event {}
export interface GetEventByIdResponse
  extends ResponseInterface<GetEventByIdInterface> {}

// export interface updateNotificationEventPayload {
//   id?: string;
//   eventId?: string | null;
//   descriptionEn?: string;
//   descriptionAr?: string;
//   enabledFlag?: boolean;
//   priority?: number;
//   subscribableFlag?: boolean;
//   expirationPeriod?: number;
//   targetContacts?: string;
//   contentEn?: string;
//   contentAr?: string;
//   eventGroupId?: string;
//   geoLocationFlag?: boolean;
//   coverageAreaPoint1X?: number;
//   coverageAreaPoint1Y?: number;
//   coverageAreaPoint2X?: number;
//   coverageAreaPoint2Y?: number;
//   sendOnceFlag?: boolean;
//   validFromDate?: string;
//   validToDate?: string;
//   smsSender?: string;
//   chargeableFlag?: boolean;
//   queryableFlag?: boolean;
//   securityFlag?: boolean;
//   systemFlag?: boolean;
//   drivenFlag?: boolean;
//   sendOncePeriod?: number;
//   notificationEventsPerMinute?: number;
//   attributeGenerationTemplateID?: string;
//   attributeGenerationTemplateType?: string;
//   eventParameters?: string[];
//   eventChannels?: {
//     notificationEventChannelId?: number;
//     notificationChannelId?: string;
//     enabledFlag?: boolean;
//     subscribableFlag?: boolean;
//     periodicalRenewal?: boolean;
//     retentionPeriod?: number;
//     languageCode?: string;
//     header?: string;
//     body?: string;
//     sender?: string;
//     confirmationPeriod?: number;
//     snoozeCount?: number;
//     snoozePeriod?: number;
//     imageUrl?: string;
//     sound?: string;
//     deepLinkingPath?: string;
//     icon?: string;
//     linkedUrl?: string;
//     additionalInfo1?: string;
//     additionalInfo2?: string;
//     additionalInfo3?: string;
//     additionalInfo4?: string;
//     additionalInfo5?: string;
//   }[];
//   eventBlockingPeriods?: {
//     notificationEventBlockingPeriodId?: number;
//     notificationEventId?: string;
//     notificationEventBlockingPeriodFromTime?: number;
//     notificationEventBlockingPeriodToTime?: number;
//   }[];
// }
// export interface UpdateNotificationEventResponse
//   extends CreateNotificationEventResponse {}

export interface DeleteNotificationEventResponse
  extends ResponseInterface<void> {}

//Merchant APIs
export interface GetEventByIdResponse {
  event: Event;
}
export interface Event {
  eventId: string;
  descriptionEn: string;
  descriptionAr: string;
  enabledFlag: boolean;
  priority: string;
  subscribableFlag: boolean;
  expirationPeriod: string;
  targetContacts: string;
  contentEn: string;
  contentAr: string;
  eventGroupId: string;
  mobileAppName: string;
  geoLocationFlag: boolean;
  coverageAreaPoint1X: string;
  coverageAreaPoint1Y: string;
  coverageAreaPoint2X: string;
  coverageAreaPoint2Y: string;
  sendOnceFlag: boolean;
  validFromDate: string;
  validToDate: string;
  smsSender: string;
  chargeableFlag: boolean;
  queryableFlag: boolean;
  securityFlag: boolean;
  systemFlag: boolean;
  drivenFlag: boolean;
  sendOncePeriod: string;
  notificationEventsPerMinute: string;
  attributeGenerationTemplateID: string;
  attributeGenerationTemplateType: string;
  eventParameters: string[];
  eventChannels: EventChannel[];
  eventBlockingPeriods: BlockingPeriod[];
}
export interface EventChannel {
  eventChannelId: string;
  eventId?: string;
  channelId: string;
  enabledFlag?: boolean;
  subscribableFlag?: boolean;
  periodicalRenewal?: boolean;
  retentionPeriod?: string;
  languageCode: string;
  header: string;
  body: string;
  sender: string;
  confirmationPeriod?: string;
  snoozeCount?: string;
  snoozePeriod?: string;
  imageUrl?: string;
  sound?: string;
  deepLinkingPath?: string;
  icon?: string;
  linkedUrl?: string;
  additionalInfo1?: string;
  additionalInfo2?: string;
  additionalInfo3?: string;
  additionalInfo4?: string;
  additionalInfo5?: string;
}
export interface BlockingPeriod {
  blockingPeriodId: string;
  eventId: string;
  eventBlockingPeriodFromTime: string;
  eventBlockingPeriodToTime: string;
}

export interface CreateEventPayload {
  eventId: string;
  descriptionEn: string;
  descriptionAr: string;
  enabledFlag: boolean;
  priority: number;
  subscribableFlag?: boolean;
  expirationPeriod?: string;
  targetContacts?: string;
  contentEn?: string;
  contentAr?: string;
  eventGroupId: string;
  mobileAppName: string;
  geoLocationFlag?: boolean;
  coverageAreaPoint1X?: string;
  coverageAreaPoint1Y?: string;
  coverageAreaPoint2X?: string;
  coverageAreaPoint2Y?: string;
  sendOnceFlag?: boolean;
  validFromDate?: string;
  validToDate?: string;
  smsSender?: string;
  chargeableFlag?: boolean;
  queryableFlag?: boolean;
  securityFlag?: boolean;
  systemFlag?: boolean;
  drivenFlag?: boolean;
  sendOncePeriod?: string;
  notificationEventsPerMinute?: string;
  attributeGenerationTemplateID?: string;
  attributeGenerationTemplateType?: string;
  eventParameters: string[];
  eventChannels: EventChannel[];
  eventBlockingPeriods: BlockingPeriod[];
}
export interface UpdateEventPayload {
  id?: string;
  eventId: string;
  descriptionEn: string;
  descriptionAr: string;
  enabledFlag: boolean;
  priority: number;
  subscribableFlag?: boolean;
  expirationPeriod?: string;
  targetContacts?: string;
  contentEn?: string;
  contentAr?: string;
  eventGroupId: string;
  mobileAppName: string;
  geoLocationFlag?: boolean;
  coverageAreaPoint1X?: string;
  coverageAreaPoint1Y?: string;
  coverageAreaPoint2X?: string;
  coverageAreaPoint2Y?: string;
  sendOnceFlag?: boolean;
  validFromDate?: string;
  validToDate?: string;
  smsSender?: string;
  chargeableFlag?: boolean;
  queryableFlag?: boolean;
  securityFlag?: boolean;
  systemFlag?: boolean;
  drivenFlag?: boolean;
  sendOncePeriod?: string;
  notificationEventsPerMinute?: string;
  attributeGenerationTemplateID?: string;
  attributeGenerationTemplateType?: string;
  eventParameters: string[];
  eventChannels: EventChannel[];
  eventBlockingPeriods: BlockingPeriod[];
}

export interface CreateEventResponse
  extends ResponseInterface<{
    eventId: string;
    descriptionEn: string;
    descriptionAr: string;
    enabledFlag: boolean;
    priority: string;
    subscribableFlag: boolean;
    expirationPeriod: string;
    targetContacts: string;
    contentEn: string;
    contentAr: string;
    eventGroupId: string;
    mobileAppName: string;
    geoLocationFlag: boolean;
    coverageAreaPoint1X: string;
    coverageAreaPoint1Y: string;
    coverageAreaPoint2X: string;
    coverageAreaPoint2Y: string;
    sendOnceFlag: boolean;
    validFromDate: string;
    validToDate: string;
    smsSender: string;
    chargeableFlag: boolean;
    queryableFlag: boolean;
    securityFlag: boolean;
    systemFlag: boolean;
    drivenFlag: boolean;
    sendOncePeriod: string;
    notificationEventsPerMinute: string;
    attributeGenerationTemplateID: string;
    attributeGenerationTemplateType: string;
    eventParameters: NotificationEventParameter[];
    eventChannels: EventChannel[];
    eventBlockingPeriods: BlockingPeriod[];
  }> {}
export interface UpdateEventResponse extends CreateEventResponse {}
export interface CreateEventInterface {
  eventId: string;
  descriptionEn: string;
  descriptionAr: string;
  enabledFlag: boolean;
  priority: string;
  subscribableFlag: boolean;
  expirationPeriod: string;
  targetContacts: string;
  contentEn: string;
  contentAr: string;
  eventGroupId: string;
  mobileAppName: string;
  geoLocationFlag: boolean;
  coverageAreaPoint1X: string;
  coverageAreaPoint1Y: string;
  coverageAreaPoint2X: string;
  coverageAreaPoint2Y: string;
  sendOnceFlag: boolean;
  validFromDate: string;
  validToDate: string;
  smsSender: string;
  chargeableFlag: boolean;
  queryableFlag: boolean;
  securityFlag: boolean;
  systemFlag: boolean;
  drivenFlag: boolean;
  sendOncePeriod: string;
  notificationEventsPerMinute: string;
  attributeGenerationTemplateID: string;
  attributeGenerationTemplateType: string;
  eventParameters: NotificationEventParameter[];
  eventChannels: EventChannel[];
  eventBlockingPeriods: BlockingPeriod[];
}

export interface GetSendersPayload {}

export interface SenderType {
  tenantSenderId: number;
  tenant: {
    tenantId: string;
    tenantName: string;
  };
  senderName: string;
  senderValue: string;
  channel: string;
  status: string;
}
export interface SendersInterface {
  tenantSenders: SenderType[];
}

export interface GetSendersResponse
  extends ResponseInterface<SendersInterface> {}
