import { MenuItem } from "@ejada/types";
import { AppRoutes } from "./AppRoutes";
import { default as i18next } from "@ejada/common/locals/i18n";

//Icons should follow PascalCase
export const SideBarNavigation: MenuItem[] = [
  {
    url: AppRoutes.dashboard,
    pageTitle: i18next.t("navigation.dashboard"),
    text: i18next.t("navigation.dashboard"),
    icon: "LayoutDashboard",
  },
  {
    url: AppRoutes.myProfile,
    pageTitle: i18next.t("navigation.my_profile"),
    text: i18next.t("navigation.my_profile"),
    icon: "UserCircle",
  },
  {
    url: AppRoutes.customerManagement,
    pageTitle: i18next.t("navigation.customer_management"),
    text: i18next.t("navigation.customer_management"),
    icon: "UserCog",
  },
  {
    url: AppRoutes.eventManagement,
    pageTitle: i18next.t("navigation.events_management"),
    text: i18next.t("navigation.events_management"),
    icon: "CalendarEvent",
  },
  {
    url: AppRoutes.eventGroupManagement,
    pageTitle: i18next.t("navigation.events_group_management"),
    text: i18next.t("navigation.events_group_management"),
    icon: "UsersGroup",
  },
  {
    url: AppRoutes.notificationHistory,
    pageTitle: i18next.t("navigation.notification-history"),
    text: i18next.t("navigation.notification-history"),
    icon: "History",
  },
  {
    url: AppRoutes.recipientNotifications,
    pageTitle: i18next.t("navigation.recipients_notifications"),
    text: i18next.t("navigation.recipients_notifications"),
    icon: "Send",
  },
  {
    url: AppRoutes.notificationManagement,
    pageTitle: i18next.t("navigation.bulk_notifications"),
    text: i18next.t("navigation.bulk_notifications"),
    icon: "Notification",
  },
  {
    url: AppRoutes.whatsapp,
    pageTitle: i18next.t("navigation.whatsapp"),
    text: i18next.t("navigation.whatsapp"),
    icon: "BrandWhatsapp",
    children: [
      {
        url: AppRoutes.whatsappSignUp,
        pageTitle: i18next.t("navigation.whatsappSignUp"),
        text: i18next.t("navigation.whatsappSignUp"),
        icon: "BrandWhatsapp",
      },
      {
        url: AppRoutes.templates,
        pageTitle: i18next.t("navigation.whatsappTemplates"),
        text: i18next.t("navigation.whatsappTemplates"),
        icon: "BrandWhatsapp",
      },
    ],
  },
  {
    url: AppRoutes.settings,
    pageTitle: i18next.t("navigation.settings"),
    text: i18next.t("navigation.settings"),
    icon: "Settings",
  },
];
