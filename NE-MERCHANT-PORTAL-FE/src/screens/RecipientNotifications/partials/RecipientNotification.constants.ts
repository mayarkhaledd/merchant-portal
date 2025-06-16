export const relationType = [
  { key: "IDENTIFIER", node: "IDENTIFIER" },
  { key: "IQAMA", node: "IQAMA" },
  { key: "NIN", node: "NIN" },
];
export const language = [
  { key: "EN", node: "English" },
  { key: "AR", node: "Arabic" },
];
export const notifyRecipientMode = [
  { key: "ALL", node: "All" },
  { key: "ANY", node: "Any" },
];
export const channelArray = [
  { key: "SMS", node: "Short Message Service" },
  { key: "EMAIL", node: "Email" },
  { key: "PUSH_NOTIFICATION", node: "Push Notification" },
  { key: "INBOX", node: "Inbox" },
];
export const recipientTypeArray = [
  { key: "CUSTOMER", node: "Customer" },
  { key: "CONTACT", node: "Non-Customer" },
];
export enum RecipientType {
  "CUSTOMER" = "CUSTOMER",
  "CONTACT" = "CONTACT",
}
export const recipientTypeOptions = [
  { key: RecipientType.CUSTOMER, node: "Customer" },
  { key: RecipientType.CONTACT, node: "Non-Customer" },
];

export const osType = [
  { key: "IOS", node: "iOS" },
  { key: "ANDROID", node: "Android" },
];
