import i18n from "@ejada/common/locals/i18n";
import { t } from "i18next";

export const MarketingDropDown = [
  {
    value: "URL",
    label: i18n.t("whatsapp.url"),
  },
  {
    value: "CALL",
    label: i18n.t("whatsapp.call"),
  },
  {
    value: "OFFER_CODE",
    label: i18n.t("whatsapp.website_offerCode"),
  },
];

export const UtilityDropDown = [
  {
    value: "URL",
    label: i18n.t("whatsapp.url"),
  },
  {
    value: "CALL",
    label: i18n.t("whatsapp.call"),
  },
];
export const WhatsappLanguage = [
  { key: "en", node: t("whatsapp.english") },
  { key: "en_US", node: t("whatsapp.english_us") },
  { key: "en_GB", node: t("whatsapp.english_uk") },
  { key: "ar", node: t("whatsapp.arabic") },
];
