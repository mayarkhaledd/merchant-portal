import { HTTPCookies } from "@ejada/common";
import { getAttachmentObject } from "@ejada/screens";
import { removeEmptyValues } from "@ejada/screens/BulkNotifications";
import { CreateAdhocMessageValues } from "@ejada/screens/RecipientNotifications";
import { NotificationRequestPayload } from "@ejada/types/api/recipientInterface";
import Cookies from "js-cookie";
import { WhatsappTemplate } from "@ejada/types/api/whatsappInterface";

export const mapFormToPayload = async (
  data: CreateAdhocMessageValues,
  selectedWhatsappTemplate?: WhatsappTemplate | null,
  token?: string,
) => {
  //mapping the initial values of the form to be sent as a payload to the API (to send notification )
  const recipients = data.Recipients.map((recipient) => {
    const isCustomer = data.RecipientType === "CUSTOMER";
    return {
      customerInfo: isCustomer
        ? {
            relationType: recipient.RelationType ? recipient.RelationType : "",
            relationValue: recipient.RelationValue
              ? String(recipient.RelationValue)
              : "",
            tenancyId: Cookies.get(HTTPCookies.tenantId) || "",
          }
        : undefined,
      notificationMethods: !isCustomer
        ? recipient.channels.map((channel) => ({
            notificationChannel: channel.notificationChannel,
            // senderId: channel.senderId,
            contact: channel.email
              ? channel.email
              : channel.mobile
                ? String(channel.mobile)
                : channel.push
                  ? String(channel.push)
                  : String(channel.inbox),
            additionalEmailDetails: channel.additionalEmailDetails,
            operatingSystemType: channel.operatingSystemType,
            whatsappTemplateId: channel.whatsappTemplateId,
          }))
        : undefined,
    };
  });

  const attachments = data.MessageFile
    ? await Promise.all(
        (data.MessageFile as File[]).map((file) => getAttachmentObject(file)),
      )
    : undefined;

  const payload: NotificationRequestPayload = {
    mobileAppName: data.mobileAppName,
    recipientType: data.RecipientType,
    appTypeId: Cookies.get(HTTPCookies.appTypeId) || "",
    adhocMessageDetails: {
      messageSubject: data.MessageSubject,
      messageContent: data.MessageContent,
      whatsappSender:
        data.Recipients?.flatMap((recipient) => recipient.channels || []).find(
          (channel) => channel.notificationChannel === "WHATSAPP",
        )?.whatsappSender || "",
    },
    attachmentsCategory: data.AttachmentType,
    attachments: attachments,
    dueDateTime:
      mergeDateAndTimeWithTimeZone(data.DueDate, data.DueTime) || null,
    eventCode: "STATIC",
    notificationPriority: Number(data.NotificationPriority) || undefined,
    notificationValidity: Number(data.NotificationValidity) || undefined,
    notifyRecipientMode: data.notifyRecipientMode,
    recipients,
  };

  // Add WhatsApp parameter values if template is selected
  if (selectedWhatsappTemplate) {
    const components = [];

    if (data.headerVariable && data.headerVariable.length > 0) {
      components.push({
        componentType: "HEADER",
        buttonSubtype: "",
        parameters: data.headerVariable.map((value: string, idx: number) => ({
          parameterType: "TEXT",
          parameterValue: value,
          parameterPosition: idx,
        })),
      });
    }

    if (data.bodyVariable && data.bodyVariable.length > 0) {
      components.push({
        componentType: "BODY",
        buttonSubtype: "",
        parameters: data.bodyVariable.map((value: string, idx: number) => ({
          parameterType: "TEXT",
          parameterValue: value,
          parameterPosition: idx,
        })),
      });
    }

    payload.whatsappParameterValues = {
      templateName: selectedWhatsappTemplate.templateName,
      templateLanguage: selectedWhatsappTemplate.languageCode,
      whatsappApiToken: token || "",
      components,
    };
  }

  return removeEmptyValues(payload, [
    "dueDateTime",
  ]) as NotificationRequestPayload;
};

export function mergeDateAndTimeWithTimeZone(
  datePickerValue: string | Date,
  dueTime: string,
): string {
  let datePart: string;
  if (typeof datePickerValue === "string") {
    datePart = datePickerValue.split("T")[0];
  } else if (datePickerValue instanceof Date) {
    datePart = datePickerValue.toISOString().split("T")[0];
  } else {
    return "";
  }

  // Parse datePart safely
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = dueTime.split(":").map(Number);

  // JS months are 0-based, so subtract 1 from month
  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0));

  if (isNaN(date.getTime())) {
    // Invalid date
    return "";
  }

  const dateTimeString = date.toISOString();

  return isWithinAllowedTimeRange(dateTimeString) ? dateTimeString : "";
}

function isWithinAllowedTimeRange(targetDateTime: string): boolean {
  const now = new Date().getTime();
  const targetTime = new Date(targetDateTime).getTime();

  const differenceInMs = targetTime - now;
  const oneHourInMs = 60 * 60 * 1000;
  const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;

  return differenceInMs >= oneHourInMs && differenceInMs <= oneMonthInMs;
}
