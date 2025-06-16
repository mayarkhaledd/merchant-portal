import i18n from "@ejada/common/locals/i18n";

export const LANGUAGES = [
  { id: "EN", label: i18n.t("eventsManagement.english") },
  { id: "AR", label: i18n.t("eventsManagement.arabic") },
];
export const CHANNELS = [
  { id: "EMAIL", label: i18n.t("eventsManagement.email") },
  { id: "SMS", label: i18n.t("eventsManagement.sms") },
  {
    id: "PUSH_NOTIFICATION",
    label: i18n.t("eventsManagement.push_notification"),
  },
  { id: "INBOX", label: i18n.t("eventsManagement.inbox") },
];

export const EVENT_PRIORITY = [
  { key: "1", node: "1" },
  { key: "2", node: "2" },
  { key: "3", node: "3" },
  { key: "4", node: "4" },
  { key: "5", node: "5" },
  { key: "6", node: "6" },
  { key: "7", node: "7" },
  { key: "8", node: "8" },
  { key: "9", node: "9" },
  { key: "10", node: "10" },
];
export const EVENT_STATUS = [
  { key: "A", node: i18n.t("eventsManagement.active") },
  { key: "I", node: i18n.t("eventsManagement.inactive") },
];
