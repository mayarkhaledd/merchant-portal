import { NotificationRequestPayload } from "@ejada/types/api/recipientInterface";
import { BulkNotificationInitialValues } from "@ejada/screens/BulkNotifications";
import { HTTPCookies } from "@ejada/common";
import Cookies from "js-cookie";
import { getAttachmentObject, getRecipient } from "@ejada/screens";
import { mergeDateAndTimeWithTimeZone } from "@ejada/screens/RecipientNotifications";

export function convertToDateOnly(dateTimeString: string) {
  if (dateTimeString === "NaN-NaN-NaN") {
    return "";
  }
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formattingDate(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() - offset);
  return adjustedDate;
}

export async function mapInitialValuesToAdhocPayload(
  initialValues: BulkNotificationInitialValues,
): Promise<NotificationRequestPayload> {
  const attachments = initialValues.MessageFile
    ? await Promise.all(
        (initialValues.MessageFile as File[]).map((file) =>
          getAttachmentObject(file),
        ),
      )
    : undefined;
  const recipients = await getRecipient(initialValues.RecipientFile[0]);

  const dueDateTime = mergeDateAndTimeWithTimeZone(
    initialValues.DueDate,
    initialValues.DueTime,
  );

  const payload: NotificationRequestPayload = {
    mobileAppName: initialValues.mobileAppName,
    eventCode: "STATIC",
    recipientType: initialValues.RecipientType,
    adhocMessageDetails: {
      messageSubject: initialValues.MessageSubject || undefined,
      messageContent: initialValues.MessageContent,
    },
    attachmentsCategory: initialValues.AttachmentType || undefined,
    appTypeId: Cookies.get(HTTPCookies.appTypeId) || "",
    notifyRecipientMode:
      initialValues.NotifyRecipientMode === true ? "ANY" : "ALL",
    attachments: attachments,
    dueDateTime: dueDateTime,
    notificationPriority: initialValues.NotificationPriority
      ? Number(initialValues.NotificationPriority)
      : undefined,
    recipients: recipients,
  };

  return removeEmptyValues(payload, [
    "dueDateTime",
  ]) as NotificationRequestPayload;
}

export async function mapInitialValuesToEventPayload(
  initialValues: BulkNotificationInitialValues,
): Promise<NotificationRequestPayload> {
  const recipients = await getRecipient(initialValues.RecipientFile[0], true);
  const adhocMessageDetails =
    initialValues.MessageSubject || initialValues.MessageContent
      ? {
          messageSubject: initialValues.MessageSubject || undefined,
          messageContent: initialValues.MessageContent,
        }
      : undefined;

  const dueDateTime =
    mergeDateAndTimeWithTimeZone(
      initialValues.DueDate,
      initialValues.DueTime,
    ) || null;
  const payload: NotificationRequestPayload = {
    eventCode: initialValues.eventCode,
    recipientType: initialValues.RecipientType,
    adhocMessageDetails: adhocMessageDetails,
    attachmentsCategory: initialValues.AttachmentType || undefined,
    appTypeId: Cookies.get(HTTPCookies.appTypeId) || "",
    notifyRecipientMode:
      initialValues.NotifyRecipientMode === true ? "ANY" : "ALL",
    dueDateTime: dueDateTime,
    notificationPriority: initialValues.NotificationPriority
      ? Number(initialValues.NotificationPriority)
      : undefined,
    recipients: recipients,
  };

  return removeEmptyValues(payload, [
    "dueDateTime",
  ]) as NotificationRequestPayload;
}

export function removeEmptyValues<T extends Record<string, any>>(
  obj: T,
  preserveNullFields: string[] = [],
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      if (preserveNullFields.includes(key)) {
        return value !== "";
      }
      return value !== "" && value !== null && value !== undefined;
    }),
  ) as Partial<T>;
}
