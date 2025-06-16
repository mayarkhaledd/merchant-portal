import { BlockingPeriod } from "@ejada/types";
import { EventChannel } from "@ejada/types/api/notificationEventsInterface";

export interface EventManagementInitialValues {
  eventCode: string;
  eventGroup: string;
  eventPriority: string;
  eventEnglishDescription: string;
  eventArabicDescription: string;
  eventStatus: string;
  language?: string[];
  parameters: string[];
  EventBlockingPeriodToTime?: string;
  EventBlockingPeriodFromTime?: string;
  ValidFromDateTime: string;
  ValidToDateTime: string;
  mobileAppName: string;
  eventChannels: EventChannel[];
  demoChannels: string[];
  eventBlockingPeriods?: BlockingPeriod[];
}

export interface TemplateChannelsData {
  eventChannelId: string;
  channelId: string;
  header: string;
  body: string;
  sender: string;
  languageCode: string;
}
