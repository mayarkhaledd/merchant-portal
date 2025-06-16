import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import navigationLocalsAr from "./ar/navigation.ar.json";
import eventsManagementAr from "./ar/eventsManagement.ar.json";
import eventGroupManagementAr from "./ar/eventGroupManagement.ar.json";
import SearchCriteriaAr from "./ar/SearchCriteria.ar.json";
import navigationLocals from "./en/navigation.en.json";
import bulkNotifications from "./en/bulkNotifications.en.json";
import bulkNotificationsAr from "./ar/bulkNotifications.ar.json";
import recipients from "./en/Recipient.en.json";
import recipientsAr from "./ar/Recipient.ar.json";
import eventsManagement from "./en/eventsManagement.en.json";
import eventGroupManagement from "./en/eventGroupManagement.en.json";
import SearchCriteria from "./en/SearchCriteria.en.json";
import validations from "./en/validations.en.json";
import validationsAr from "./ar/validations.ar.json";
import login from "./en/login.en.json";
import loginAr from "./ar/login.ar.json";
import forgotPassword from "./en/forgotPassword.en.json";
import forgotPasswordAr from "./ar/forgotPassword.ar.json";
import systemOnboarding from "./en/systemonboarding.en.json";
import notificationHistory from "./en/notificationHistory.en.json";
import systemOnboardingAr from "./ar/systemonboarding.ar.json";
import apis from "./en/api.en.json";
import apisAr from "./ar/api.ar.json";
import customerManagement from "./en/customerManagement.en.json";
import customerManagementAr from "./ar/customerManagement.ar.json";
import notificationHistoryAr from "./ar/notificationHistory.ar.json";
import Users from "./en/users.en.json";
import UsersAr from "./ar/users.ar.json";
import whatsapp from "./en/whatsapp.en.json";
import whatsappAr from "./ar/whatsapp.ar.json";

export const userLanguage = localStorage.getItem("userLanguage");
export const language =
  userLanguage && typeof userLanguage === "string" ? userLanguage : "en";

i18n.use(LanguageDetector).use(initReactI18next);
i18n.init({
  fallbackLng: "ar",
  lng: language,
  resources: {
    en: {
      translation: {
        ...navigationLocals,
        ...bulkNotifications,
        ...eventsManagement,
        ...SearchCriteria,
        ...recipients,
        ...eventsManagement,
        ...eventGroupManagement,
        ...validations,
        ...login,
        ...forgotPassword,
        ...systemOnboarding,
        ...notificationHistory,
        ...apis,
        ...customerManagement,
        ...Users,
        ...whatsapp,
      },
    },
    ar: {
      translation: {
        ...navigationLocalsAr,
        ...bulkNotificationsAr,
        ...eventsManagementAr,
        ...SearchCriteriaAr,
        ...recipientsAr,
        ...eventsManagementAr,
        ...eventGroupManagementAr,
        ...validationsAr,
        ...loginAr,
        ...forgotPasswordAr,
        ...systemOnboardingAr,
        ...notificationHistoryAr,
        ...apisAr,
        ...customerManagementAr,
        ...UsersAr,
        ...whatsappAr,
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
