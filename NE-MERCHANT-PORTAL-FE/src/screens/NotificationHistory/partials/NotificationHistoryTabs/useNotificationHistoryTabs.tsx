import { Control } from "react-hook-form";
import {
  NotificationHistoryFormData,
  NotificationDetails,
  MessageDetails,
  NotificationHistoryInitialValues,
  MessageHistoryLogTable,
} from "@ejada/screens/NotificationHistory";
import { TFunction } from "i18next";

export const useNotificationHistoryTabs = (
  onCancel: () => void,
  control: Control<NotificationHistoryFormData>,
  t: TFunction<"translation", undefined, "translation">,
  initialValues?: NotificationHistoryInitialValues,
) => {
  const NotificationHistoryTabs = [
    {
      label: t("notificationHistory.notification_details"),
      value: t("notificationHistory.notification_details"),
      content: (
        <NotificationDetails
          onCancel={onCancel}
          control={control}
          t={t}
          initialValues={initialValues}
        />
      ),
    },
    {
      label: t("notificationHistory.message_details"),
      value: t("notificationHistory.message_details"),
      content: (
        <MessageDetails
          onCancel={onCancel}
          control={control}
          t={t}
          initialValues={initialValues}
        />
      ),
    },
    // {
    //   label: t("notificationHistory.message_history_log"),
    //   value: t("notificationHistory.message_history_log"),
    //   content: (
    //     <MessageHistoryLog
    //       onCancel={onCancel}
    //       control={control}
    //       t={t}
    //       initialValues={initialValues}
    //     />
    //   ),
    // },
    {
      label: t("notificationHistory.message_history_log"),
      value: t("notificationHistory.message_history_log"),
      content: (
        <MessageHistoryLogTable
          onCancel={onCancel}
          control={control}
          t={t}
          initialValues={initialValues}
        />
      ),
    },
  ];

  return {
    NotificationHistoryTabs,
  };
};
