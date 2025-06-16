import {
  EventChannel,
  GetEventByIdInterface,
  NotificationEventInterface,
} from "@ejada/types";
import { TTableColumns, InputField } from "eds-react";
import { t } from "i18next";
import {
  EditTemplateFormInitialValues,
  NotificationEventFormValues,
  extraEventChannelsInitialValues,
} from "@ejada/screens/EventsManagement";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  EventManagementInitialValues,
  TemplateChannelsData,
} from "@ejada/screens/EventsManagement/partials/EventManagementForm/types";
import { ColorValues, Sizes, Types } from "@ejada/common";
import i18n from "@ejada/common/locals/i18n";
import { ValidationSchema } from "../EventGroupManagement";

export function formattingDate(date: Date) {
  const offset = date.getTimezoneOffset() * 60000; // Get the time zone offset in milliseconds
  const adjustedDate = new Date(date.getTime() - offset);
  return adjustedDate;
}

export const formatDateIntoSlashes = (isoString: string) => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // Converts to 'yyyy-mm-dd' format
};

export const filteredChannels = (
  demoChannels: string[],
  channels: EventChannel[],
): EventChannel[] => {
  const filteredChannel = channels?.filter((channel) => {
    return demoChannels.includes(channel.channelId!);
  });
  return filteredChannel;
};

export const formateData = (data: NotificationEventFormValues) => {
  return {
    eventGroupId: data.eventGroup ? data.eventGroup : ("" as string),
    targetContacts: "I",
    eventChannels: [],
    descriptionAr: (data.eventArabicDescription
      ? data.eventArabicDescription
      : "") as string,
    descriptionEn: data.eventEnglishDescription as string,
    enabledFlag: data.eventStatus === "A" ? true : false,
    eventId: data.eventCode as string,
    id: data.eventCode as string,
    eventParameters: (data.parameters
      ? (data.parameters as string[])
      : []) as string[],
    priority: data.eventPriority ? Number(data.eventPriority) : +"",
    eventBlockingPeriods: [],
    validFromDate: data.ValidFromDateTime
      ? formatDateIntoSlashes(data.ValidFromDateTime as string)
      : "",
    validToDate: (data.ValidToDateTime
      ? formatDateIntoSlashes(data.ValidToDateTime as string)
      : "") as string,
    mobileAppName: "",
  };
};
export function filterPayloadEmptyStringsAndArrays<T>(data: T): any {
  // Handle null or undefined
  if (data === null || data === undefined) {
    return undefined;
  }
  // Handle arrays
  if (Array.isArray(data)) {
    const cleanedArray = data
      .map((item) => filterPayloadEmptyStringsAndArrays(item))
      .filter((item) => item !== undefined);
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }
  // Handle objects
  if (typeof data === "object") {
    const result: Record<string, any> = {};
    let hasValues = false;
    for (const [key, value] of Object.entries(data)) {
      const cleanedValue = filterPayloadEmptyStringsAndArrays(value);
      if (cleanedValue !== undefined) {
        result[key] = cleanedValue;
        hasValues = true;
      }
    }
    return hasValues ? result : undefined;
  }
  // Handle primitives - only filter out empty strings
  if (data === "") {
    return undefined;
  }
  // Return other values as is
  return data;
}

export const formateEventsColumns = (
  data: NotificationEventInterface,
): TTableColumns[] => {
  const eventData = data.notificationEvents;
  return eventData.map((event) => {
    return {
      eventCode: event.notificationEventId,
      englishDescription: event.notificationEventDescriptionEn,
      arabicDescription: event.notificationEventDescriptionAr,
      status: event.notificationEventEnabledFlag ? "Enabled" : "Disabled",
    };
  });
};

export const removeEmptyStrings = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    return obj.map(removeEmptyStrings).filter((item) => item !== null);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (acc: { [key: string]: unknown }, [key, value]) => {
        const cleanedValue = removeEmptyStrings(value);
        if (cleanedValue !== "" && cleanedValue !== null) {
          acc[key] = cleanedValue;
        }
        return acc;
      },
      {},
    );
  }
  return obj;
};

export const findCommonElements = <T,>(arrays: T[][]): T[] => {
  if (arrays.length === 0) {
    return [];
  }
  return arrays.reduce((acc, array) =>
    acc.filter((item) => array.includes(item)),
  );
};

export const validateDates = (fromDate: string, toDate: string) => {
  if (fromDate && toDate) {
    if (new Date(fromDate) > new Date(toDate)) {
      return t("Invalid Date Range");
    }
  }
};

export const formatChannelsColumnsEditMode = (
  data: EventChannel[],
): TemplateChannelsData[] => {
  const channelsData = data.map((channel) => {
    return {
      channelId: channel?.channelId || "",
      languageCode: channel.languageCode === "EN" ? "English" : "Arabic",
      body: channel.body || "",
      header: channel.header || "",
      eventChannelId: channel.eventChannelId || "",
      eventId: channel.eventId || "",
      sender: channel.sender || "",
    };
  });

  return channelsData;
};
export const formatChannelsColumns = (
  data: GetEventByIdInterface,
): TemplateChannelsData[] => {
  const channelsData = data.eventChannels.map((channel) => {
    return {
      channelId: channel?.channelId || "",
      languageCode: channel.languageCode === "EN" ? "English" : "Arabic",
      body: channel.body || "",
      header: channel.header || "",
      eventChannelId: channel.eventChannelId || "",
      eventId: channel.eventId || "",
      sender: channel.sender || "",
    };
  });

  return channelsData;
};
export const formateToEditTemplateData = (
  data: EditTemplateFormInitialValues,
): TemplateChannelsData[] => {
  return [
    {
      channelId: data.channelId ?? "",
      languageCode: data.languageCode ?? "",
      body: data.body ?? "",
      header: data.header ?? "",
      sender: data.sender ?? "",
      eventChannelId: data.eventChannelId ?? "",
    },
  ];
};

export const getLocalizedChannels = (channel: string) => {
  switch (channel) {
    case "SMS":
      return "Short Message Service";
    case "PUSH_NOTIFICATION":
      return "Mobile Push Notification";
    default:
      return channel;
  }
};
export const getLocalizedLanguages = (language: string) => {
  switch (language) {
    case "EN":
      return i18n.t("users.english") as string;
    case "AR":
      return i18n.t("users.arabic") as string;
    default:
      return language;
  }
};

export function RenderMobileAppName(
  type: string,
  control:
    | Control<NotificationEventFormValues>
    | Control<extraEventChannelsInitialValues>,
  formState: {
    errors: FieldErrors<
      NotificationEventFormValues | extraEventChannelsInitialValues
    >;
  },
  id: number,
) {
  switch (type) {
    case "PUSH_NOTIFICATION":
      return (
        <div className="flex justify-between my-7 gap-6" key={id}>
          <Controller
            name="mobileAppName"
            control={
              control as Control<
                NotificationEventFormValues | extraEventChannelsInitialValues
              >
            }
            rules={ValidationSchema.required}
            defaultValue=""
            render={({ field }) => (
              <div className="relative w-full">
                <InputField
                  className=" w-full"
                  type={Types.TextType}
                  placeHolder={t("eventsManagement.mobile_app_name") as string}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  isRequired
                  style={{ width: "100%" }}
                  label={t("eventsManagement.mobile_app_name") as string}
                  inputError={formState.errors.mobileAppName?.message}
                  {...field}
                />
              </div>
            )}
          />
        </div>
      );
    default:
      return null;
  }
}

export const mapEventInterfaceToInitialValues = (
  event: GetEventByIdInterface,
): EventManagementInitialValues => {
  return {
    eventCode: event.eventId,
    eventGroup: event.eventGroupId,
    eventPriority: event.priority,
    eventChannels: event?.eventChannels?.map((channel) => ({
      eventChannelId: channel.eventChannelId,
      eventId: channel.eventId,
      channelId: channel.channelId,
      enabledFlag: channel.enabledFlag,
      subscribableFlag: channel.subscribableFlag,
      languageCode: channel.languageCode,
      header: channel.header,
      body: channel.body,
      sender: channel.sender,
    })),
    parameters: event?.eventParameters,
    eventBlockingPeriods: event?.eventBlockingPeriods?.map(
      (blockingPeriod) => ({
        blockingPeriodId: blockingPeriod.blockingPeriodId,
        eventBlockingPeriodFromTime: blockingPeriod.eventBlockingPeriodFromTime,
        eventBlockingPeriodToTime: blockingPeriod.eventBlockingPeriodToTime,
        eventId: blockingPeriod.eventId,
      }),
    ),
    eventEnglishDescription: event.descriptionEn,
    eventArabicDescription: event.descriptionAr,
    eventStatus: event.enabledFlag == true ? "Enabled" : "Disabled",
    ValidFromDateTime: event.validFromDate,
    ValidToDateTime: event.validToDate,
    mobileAppName: event.mobileAppName,
    demoChannels: event?.eventChannels?.map((channel) => channel.channelId),
  };
};

export const formateGetEventByIdData = (data: GetEventByIdInterface) => {
  return data.eventChannels.map((channel) => ({
    eventChannelId: channel.eventChannelId ? channel.eventChannelId : "",
    channelId: channel.channelId ? channel.channelId : "",
    header: channel.header ? channel.header : "",
    body: channel.body ? channel.body : "",
    sender: channel.sender ? channel.sender : "",
    languageCode: channel.languageCode ? channel.languageCode : "",
  }));
};

export const formateGetByIdData = (data: GetEventByIdInterface) => {
  const editEventChannels = formateGetEventByIdData(data);

  const editEventData = {
    eventCode: data.eventId?.toString() || "",
    eventGroup: data.eventGroupId?.toString() || "",
    eventPriority: data.priority?.toString() || "",
    eventEnglishDescription: data.descriptionEn?.toString() || "",
    eventArabicDescription: data.descriptionAr?.toString() || "",
    eventStatus: data.enabledFlag === true ? "A" : "I",
    parameters: data.eventParameters.map(
      (parameter) => parameter.toString() || [""],
    ),
    eventBlockingPeriods: data.eventBlockingPeriods,

    mobileAppName: data.mobileAppName?.toString() || null,
  };
  return {
    ...editEventData,
    channelsTableDataEditMode: editEventChannels,
  };
};
