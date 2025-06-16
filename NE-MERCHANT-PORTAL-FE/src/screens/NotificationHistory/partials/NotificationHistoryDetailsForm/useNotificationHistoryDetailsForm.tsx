import { useForm } from "react-hook-form";
import {
  formatMessageHistoryLogsColumns,
  getLanguageName,
  NotificationHistoryInitialValues,
  NotificationHistoryContext,
  NotificationHistoryFormValues,
  NotificationHistoryState,
} from "@ejada/screens/NotificationHistory";
import { useTranslation } from "react-i18next";
import { Context, useContext, useEffect, useState } from "react";
import {
  useGetMessageStatusLogsList,
  useGetNotificationMessageById,
} from "@ejada/providers";
import { TTableColumns } from "eds-react";

export const useNotificationHistoryForm = (
  onCancel: () => void,
  initialValues?: NotificationHistoryInitialValues,
) => {
  const { t } = useTranslation();
  const { control, formState, setValue, watch, reset } =
    useForm<NotificationHistoryFormValues>({
      mode: "onTouched",
      defaultValues: {
        ...initialValues,
      },
    });
  const {
    referenceId,
    channelType,
    notificationHistoryId,
    setNotificationChannel,
    setEventCode,
    setEventPriority,
    setRelationType,
    setMessageLanguage,
    setMessageStatus,
    setSourceSystem,
  } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );
  const [statusLogHistoryData, setStatusLogHistoryData] = useState<
    TTableColumns[]
  >([]);
  const { updatedData: messageData, isSuccess: isMessageSuccess } =
    useGetNotificationMessageById(
      {
        id: notificationHistoryId ? notificationHistoryId : "",
      },
      notificationHistoryId !== "",
    );

  const { updatedData: statusLogData, isSuccess: isStatusSuccess } =
    useGetMessageStatusLogsList(
      {
        notificationChannel: channelType ? channelType : "",
        referenceId: referenceId ? referenceId : "",
      },
      channelType != "" || referenceId != "",
    );

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    onCancel();
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }

    if (statusLogData && statusLogData.statusLogs.length) {
      setStatusLogHistoryData(formatMessageHistoryLogsColumns(statusLogData));
    }
  }, [messageData, statusLogData]);

  // useEffect(() => {
  //   if ((referenceId || channelType) && notificationHistoryId) {
  //     refetchMessageById?.();
  //     refetchStatusLog?.();
  //   }
  // }, []);

  useEffect(() => {
    if (messageData) {
      setNotificationChannel([
        {
          key: messageData.notificationChannel,
          node: messageData.notificationChannel,
        },
      ]);
      setEventCode([
        {
          key: messageData.eventCode,
          node: messageData.eventCode,
        },
      ]);
      setEventPriority([
        {
          key: messageData.eventPriority,
          node: messageData.eventPriority,
        },
      ]);
      setMessageLanguage([
        {
          key: messageData.messageLanguage,
          node: getLanguageName(messageData.messageLanguage),
        },
      ]);
      setSourceSystem([
        {
          key: messageData.sourceSystem,
          node: messageData.sourceSystem,
        },
      ]);

      setMessageStatus([
        {
          key: messageData.messageStatus,
          node: messageData.messageStatus,
        },
      ]);
      setRelationType([
        {
          key: messageData.customerInfo.relationType,
          node: messageData.customerInfo.relationType,
        },
      ]);
    }
  }, [
    isStatusSuccess,
    isMessageSuccess,
    messageData,
    statusLogData,
    setEventCode,
    setEventPriority,
    setRelationType,
    setMessageLanguage,
    setMessageStatus,
    setNotificationChannel,
    setSourceSystem,
  ]);

  return {
    control,
    handleCancel,
    formState,
    setValue,
    watch,
    t,
    statusLogHistoryData,
  };
};
