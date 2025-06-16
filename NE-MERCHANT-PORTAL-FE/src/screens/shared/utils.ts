import i18n from "@ejada/common/locals/i18n";
import {
  Recipient,
  RecipientChannel,
} from "@ejada/types/api/recipientInterface";
import { AxiosError } from "axios";
import { read, utils } from "xlsx";
import { t } from "i18next";
import { useLocation } from "react-router-dom";
interface StatusColorMapping {
  [key: string]: string;
}

export const getStatusColor = (status: string): string => {
  const statusToColor: StatusColorMapping = {
    admin: "green",
    createCustomer: "green",
    manageRoles: "green",
    createUser: "blue",
    editCustomer: "blue",
    editUser: "red",
    managePoint: "red",
    A: "green",
    ACTIVE: "green",
    INACTIVE: "red",
    suspended: "gray",
    IP: "gray",
    G: "green",
    S: "gray",
    OP: "green",
    L: "yellow",
    redemption: "red2",
    R: "red2",
    E: "green2",
    earning: "green2",
    T: "yellow",
    I: "yellow",
    D: "red",
    C: "red",
    Enabled: "green",
    Disabled: "red",
    default: "black",
    SENT: "green",
    FAILED: "red",
    FAILED_IN_SENDING: "red",
    PENDING: "gray",
    APPROVED: "green",
    REJECTED: "red",
  };
  return statusToColor[status] || statusToColor.default;
};
export function filterEmptyStringsAndArrays<T extends Record<string, unknown>>(
  data: T,
): Partial<T> {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (
      value !== "" &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatToSelectSearch = <T extends Record<string, any>>(
  data: T[],
  keyId: string,
  keyLabel: string,
): { id: string; label: string }[] => {
  return data.map((item) => ({
    id: String(item[keyId]),
    label: item[keyLabel],
  }));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatToSelectKeyNode = <T extends Record<string, any>>(
  data: T[],
  keyId: string,
  NodeId: string,
): { key: string; node: string }[] => {
  return data.map((item) => ({
    key: item[keyId],
    node: item[NodeId],
  }));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatToSelect = <T extends Record<string, any>>(
  data: T[],
  keyNode: string,
): { key: string; node: string }[] => {
  const seenKeys = new Set<string>();

  return data.reduce<{ key: string; node: string }[]>((acc, item) => {
    const key = item[keyNode];
    if (key != null && !seenKeys.has(key)) {
      // Check for null/undefined and uniqueness
      seenKeys.add(key);
      acc.push({ key, node: key });
    }
    return acc;
  }, []);
};
export async function getRecipient(
  file: File,
  event?: boolean,
): Promise<Recipient[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData: unknown[] = utils.sheet_to_json(worksheet);
    const recipients: Recipient[] = [];

    rawData.forEach((row: any) => {
      const notificationMethods: RecipientChannel[] = [];

      const addNotificationMethod = (methodKey: string, contactKey: string) => {
        if (row[methodKey] && row[contactKey]) {
          const notificationChannel = row[methodKey];
          const additionalEmailDetails =
            notificationChannel.toLowerCase() === "email"
              ? {
                  additionalEmailDetails: {
                    emailCC: row["EmailCC"] || undefined,
                    emailBCC: row["EmailBCC"] || undefined,
                    emailReplyTo: row["EmailReplyTo"] || undefined,
                  },
                }
              : {};
          const osType =
            notificationChannel.toLowerCase() === "push_notification"
              ? { operatingSystemType: row["OSType"] }
              : {};
          notificationMethods.push({
            notificationChannel,
            contact: String(row[contactKey]),
            ...osType,
            ...additionalEmailDetails,
          });
        }
      };

      addNotificationMethod("NotificationMethod_1", "Contact_1");
      addNotificationMethod("NotificationMethod_2", "Contact_2");
      const messageLanguage = row["LangPref"]
        ? row["LangPref"].toUpperCase()
        : undefined;

      if (notificationMethods.length > 0) {
        const recipient: any = {
          notificationMethods,
          messageLanguage,
        };

        if (event) {
          recipient.eventParams = [
            {
              paramCode: row["paramCode"] as string,
              paramValue: row["paramValue"] as string,
            },
          ];
        }

        recipients.push(recipient);
        return;
      }

      // Process customer info if no notification methods
      const customerInfo = {
        relationType: row["RelationType"],
        relationValue: String(row["RelationValue"] || ""),
        tenancyId: String(row["TenantId"] || ""),
      };

      const eventParams = [
        {
          paramCode: row["paramCode"] as string,
          paramValue: row["paramValue"] as string,
        },
      ];

      if (
        customerInfo.relationType ||
        customerInfo.relationValue ||
        customerInfo.tenancyId
      ) {
        const recipient: any = {
          customerInfo,
          messageLanguage,
        };

        if (event) {
          recipient.eventParams = eventParams;
        }

        recipients.push(recipient);
      }
    });

    return recipients;
  } catch (error) {
    throw new Error("Failed to parse the Excel file.");
  }
}

export function getAttachmentObject(file: File): Promise<{
  attachmentContent: string;
  attachmentFileName: string;
  attachmentContentType: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64Content = result.split(",")[1];

        const mimeTypeToExtensionMap: Record<string, string> = {
          "application/pdf": "PDF",
          "text/html": "HTML",
          "application/msword": "DOC",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            "DOC",
          "text/plain": "PTEXT",
          "image/jpeg": "JPG",
          "image/png": "PNG",
          "image/gif": "GIF",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            "EXCEL",
          "application/vnd.ms-excel": "EXCEL",
        };

        const attachmentContentType =
          mimeTypeToExtensionMap[file.type] || "UNKNOWN";

        resolve({
          attachmentContent: base64Content,
          attachmentFileName: file.name,
          attachmentContentType,
        });
      } else {
        reject(new Error("Failed to convert file to Base64."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
interface IErrorMessages {
  error: {
    message: string;
  };
}

export function formatErrorMessage(error: AxiosError | null): IErrorMessages {
  const errorMessage = error?.response?.data;

  if (isErrorResponse(errorMessage)) {
    return { error: { message: errorMessage.message } };
  }

  return { error: { message: error?.message ?? "Unknown error occurred" } };
}

function isErrorResponse(data: unknown): data is { message: string } {
  return typeof data === "object" && data !== null && "message" in data;
}
export interface ErrorCode {
  response: {
    data: {
      header: {
        status: {
          code: string;
          details: string;
          subErrors: { details: string; code: string }[];
        };
      };
    };
    status: number;
  };
}

export const getLocalizedErrorMessage = (
  error: ErrorCode | null | AxiosError,
  defaultMessage: string,
) => {
  const errorCode =
    (error as ErrorCode)?.response?.data?.header?.status?.code || null;
  const errorStatus = (error as ErrorCode)?.response?.status || null;
  const errordetails = (error as ErrorCode)?.response?.data?.header?.status
    ?.details;
  const subErrorCode = (error as ErrorCode)?.response?.data?.header?.status
    ?.subErrors?.[0]?.code;
  const subErrorsDetails = (error as ErrorCode)?.response?.data?.header?.status
    ?.subErrors?.[0]?.details;

  const subErrorMessage =
    subErrorCode && subErrorsDetails
      ? i18n.t(`${subErrorCode} ${subErrorsDetails}`)
      : null;

  if (errorCode) {
    const localizedMessage = i18n.t(`${errorStatus}.${errorCode}`);
    if (
      localizedMessage &&
      localizedMessage !== `${errorStatus}.${errorCode}`
    ) {
      return localizedMessage;
    }
    if (subErrorMessage) {
      return subErrorMessage;
    }
    if (errordetails) {
      return errordetails;
    }
  }
  return defaultMessage;
};

export const filterEmptyValues = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => filterEmptyValues(item))
      .filter(
        (item) =>
          item !== undefined &&
          item !== null &&
          item !== "" &&
          (!Array.isArray(item) || item.length > 0),
      ) as unknown as T;
  } else if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const filteredValue = filterEmptyValues(value);
      if (
        filteredValue !== undefined &&
        filteredValue !== null &&
        filteredValue !== "" &&
        (!Array.isArray(filteredValue) || filteredValue.length > 0)
      ) {
        acc[key as keyof T] = filteredValue;
      }
      return acc;
    }, {} as T);
  }
  return obj;
};

export const getFilterDisplayName = (key: string): string => {
  const displayNames: Record<string, string> = {
    eventCode: "Event Code",
    eventGroupDescriptionEn: "English Description",
    descriptionEn: "English Description",
    descriptionAr: "Arabic Description",
    eventGroupDescriptionAr: "Arabic Description",
    appTypeId: "Source System",
    eventGroupPushFlag: "Relation Type",
    // Add more mappings as needed
  };

  return displayNames[key] || key;
};

export function formatHeader(key: string, isEnglish: boolean, prefix: string) {
  if (key === "appType") {
    key = "sourceSystem";
  }
  const formattedKey = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ");
  if (!isEnglish) {
    const translationKey = `${prefix}.${formattedKey.map((word) => word.toLowerCase()).join("_")}`;
    return t(translationKey);
  }
  return formattedKey
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function usePath() {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const currentPath = pathArray[pathArray.length - 1];
  return currentPath;
}
