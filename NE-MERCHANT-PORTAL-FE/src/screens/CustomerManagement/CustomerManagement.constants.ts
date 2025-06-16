import i18n from "@ejada/common/locals/i18n";

export const LANGUAGE = [
  { id: "EN", label: i18n.t("customer.customer_management.english") },
  { id: "AR", label: i18n.t("customer.customer_management.arabic") },
];

export const statusArray = [
  { key: "A", node: "Active" },
  { key: "I", node: "Inactive" },
];

export const relationType = [
  { key: "IDENTIFIER", node: "IDENTIFIER" },
  { key: "IQAMA", node: "IQAMA" },
  { key: "NIN", node: "NIN" },
];
