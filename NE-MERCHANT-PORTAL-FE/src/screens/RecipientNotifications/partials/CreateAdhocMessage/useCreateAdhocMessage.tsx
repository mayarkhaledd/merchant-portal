import { Context, useContext, useState } from "react";

import { useForm } from "react-hook-form";
import {
  CreateAdhocMessageValues,
  CreateAdhocInitialValues,
} from "./CreateAdhocMessage.types";
import { mapFormToPayload } from "@ejada/screens/RecipientNotifications";
import { TRecipientNotificationsState } from "../../RecipientNotifications.types";
import { RecipientNotificationsContext } from "../../RecipientNotificationsProvider";

const useCreateAdhocMessage = (
  closeDrawer: () => void,
  initialValues?: CreateAdhocInitialValues,
) => {
  const [, setIsValidPhone] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState,
    reset,
    trigger,
    watch,
    setValue,
    getValues,
  } = useForm<CreateAdhocMessageValues>({
    mode: "onTouched",

    defaultValues: {
      ...initialValues,
      AttachmentType: "INLINE_CONTENT",
      Recipients: [
        {
          channels: [
            {
              notificationChannel: "",
              senderId: undefined,
            },
          ],
        },
      ],
    },
  });
  const { createNotification } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );
  const onSubmit = async (data: CreateAdhocMessageValues) => {
    const payload = await mapFormToPayload(data);
    createNotification(payload);
    closeDrawer();
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
    getValues,
  };
};
export default useCreateAdhocMessage;
