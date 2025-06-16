// import {
//   GetNotificationEventByIdInterface,
//   NotificationEventInterface,
// } from "@ejada/types";
// import { TTableColumns } from "eds-react";
// import { t } from "i18next";
// import { ChannelData } from "@ejada/screens/EventsManagement";

// export function formattingDate(date: Date) {
//   const offset = date.getTimezoneOffset() * 60000; // Get the time zone offset in milliseconds
//   const adjustedDate = new Date(date.getTime() - offset);
//   return adjustedDate;
// }

// export const formateEventsColumns = (
//   data: NotificationEventInterface,
// ): TTableColumns[] => {
//   const eventData = data.notificationEvents;
//   return eventData.map((event) => {
//     return {
//       eventCode: event.notificationEventId,
//       englishDescription: event.notificationEventDescriptionEn,
//       arabicDescription: event.notificationEventDescriptionAr,
//       status: event.notificationEventEnabledFlag ? "Enabled" : "Disabled",
//     };
//   });
// };

// export const removeEmptyStrings = (obj: unknown): unknown => {
//   if (Array.isArray(obj)) {
//     return obj.map(removeEmptyStrings).filter((item) => item !== null);
//   } else if (obj !== null && typeof obj === "object") {
//     return Object.entries(obj).reduce(
//       (acc: { [key: string]: unknown }, [key, value]) => {
//         const cleanedValue = removeEmptyStrings(value);
//         if (cleanedValue !== "" && cleanedValue !== null) {
//           acc[key] = cleanedValue;
//         }
//         return acc;
//       },
//       {},
//     );
//   }
//   return obj;
// };

// export const findCommonElements = <T,>(arrays: T[][]): T[] => {
//   if (arrays.length === 0) {
//     return [];
//   }
//   return arrays.reduce((acc, array) =>
//     acc.filter((item) => array.includes(item)),
//   );
// };

// export const validateDates = (fromDate: string, toDate: string) => {
//   if (fromDate && toDate) {
//     if (new Date(fromDate) > new Date(toDate)) {
//       return t("Invalid Date Range");
//     }
//   }
// };

// export const formatChannelsColumns = (
//   data: GetNotificationEventByIdInterface,
// ): ChannelData[] => {
//   const channelsData = data.notificationEventChannels.map((channel) => {
//     return {
//       channelId: channel.notificationEventChannelId.toString(),
//       channel: channel.notificationChannel.channelNameEn,
//       language: channel.languageCode === "EN" ? "English" : "Arabic",
//       templateHeader: channel.header,
//       templateBody: channel.body,
//     };
//   });
//   const insertFromParameter = data.notificationEventParameters.map(
//     (parameter) => {
//       return {
//         id: parameter.parameterName.toString(),
//         label: "",
//       };
//     },
//   );
//   const result = channelsData.map((item) => ({
//     ...item,
//     editTemplateParameters: insertFromParameter,
//   }));

//   return result;
// };

// export const getLocalizedChannels = (channel: string) => {
//   switch (channel) {
//     case "SMS":
//       return "Short Message Service";
//     case "PUSH_NOTIFICATION":
//       return "Mobile Push Notification";
//     default:
//       return channel;
//   }
// };
