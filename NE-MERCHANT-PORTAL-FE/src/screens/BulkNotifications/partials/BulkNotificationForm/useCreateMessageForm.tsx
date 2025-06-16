import { Context, useContext, useState } from "react";

import { useForm } from "react-hook-form";
import {
  CreateAdhocMessageValues,
  BulkNotificationInitialValues,
} from "./CreateMessage.types";

import { TBulkNotificationsState } from "@ejada/screens/BulkNotifications/BulkNotificationsManagement.types";
import { BulkNotificationsContext } from "@ejada/screens/BulkNotifications/BulkNotificationsProvider";
import {
  mapInitialValuesToAdhocPayload,
  mapInitialValuesToEventPayload,
} from "./utilites/utilites";

type Mode = "adhoc" | "event";
export const useCreateMessageForm = (
  closeDrawer: () => void,
  mode: Mode,
  initialValues?: BulkNotificationInitialValues,
) => {
  const [, setIsValidPhone] = useState<boolean>(false);
  const { eventId } = useContext<TBulkNotificationsState>(
    BulkNotificationsContext as Context<TBulkNotificationsState>,
  );
  const { createNotification } = useContext<TBulkNotificationsState>(
    BulkNotificationsContext as Context<TBulkNotificationsState>,
  );
  const { control, handleSubmit, formState, reset, trigger, watch, setValue } =
    useForm<CreateAdhocMessageValues>({
      mode: "onTouched",
      defaultValues: {
        ...initialValues,
        AttachmentType: "INLINE_CONTENT",
        tokenGroups: [
          {
            channelId: "",
            tokenId: "",
            deviceId: "",
            deviceName: "",
            deviceOs: "",
            registrationDate: undefined,
          },
        ],
      },
    });

  const onSubmit = async (data: CreateAdhocMessageValues) => {
    if (mode === "adhoc") {
      createNotification(await mapInitialValuesToAdhocPayload(data));
      closeDrawer();
    } else {
      if (mode === "event") {
        createNotification(
          await mapInitialValuesToEventPayload({
            ...data,
            eventCode: eventId,
          }),
        );
      }
    }
  };
  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    closeDrawer();
  };

  return {
    control,
    handleSubmit,
    formState,
    handleCancel,
    onSubmit,
    setIsValidPhone,
    trigger,
    setValue,
    watch,
  };
};
