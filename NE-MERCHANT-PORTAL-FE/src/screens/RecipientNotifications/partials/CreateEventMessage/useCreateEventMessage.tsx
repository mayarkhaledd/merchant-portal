import { Context, useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import {
  CreateEventMessageValues,
  CreateEventInitialValues,
} from "./CreateEventMessage.types";
import { mapToNotificationRequestPayload } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage";
import { TRecipientNotificationsState } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { RecipientNotificationsContext } from "@ejada/screens/RecipientNotifications/RecipientNotificationsProvider";
import { NotificationEvent } from "@ejada/types";
import { useGetEventById } from "@ejada/providers";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";

const useCreateEventMessage = (
  closeDrawer: () => void,
  initialValues?: CreateEventInitialValues,
) => {
  const {
    setEventId,
    eventId,
    createNotification,
    EventsData,
    eventParameters,
    setEventParameters,
    setChannelIds,
    channelIds,
    setSelectedWhatsappTemplateId,
    TemplateByIdData,
    setLanguageSelected,
  } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );
  const context = useWhatsappOnboardingParams();
  const params = context?.params;
  const token = params?.onboardingMetaAuth?.accessToken || "";
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
  } = useForm<CreateEventMessageValues>({
    mode: "onTouched",
    defaultValues: {
      ...initialValues,
      recipients:
        initialValues?.recipients?.map((recipient) => ({
          ...recipient,
          parameters: eventParameters.map((param) => ({
            parameterCode: param?.parameterName || "",
            parameterValue: "",
          })),
        })) || [],
    },
  });
  const {
    updatedData: eventByIdData,
    refetch: refetchEventByIdData,
    isError: isGetEventByIdDataError,
    isSuccess: isGetEventByIdDataSuccess,
  } = useGetEventById(
    {
      id: eventId as string,
    },
    eventId !== "",
  );

  const selectedLanguage = watch("recipients.0.messageLanguage");

  useEffect(() => {
    if (eventByIdData && selectedLanguage) {
      const whatsappChannel = eventByIdData.eventChannels.find(
        (channel: any) => {
          return (
            channel.channelId === "WHATSAPP" &&
            channel.languageCode === selectedLanguage
          );
        },
      );
      setSelectedWhatsappTemplateId(
        whatsappChannel?.whatsappTemplateId || null,
      );
    }
  }, [eventByIdData, selectedLanguage]);

  const fetchEventParameters = () => {
    const eventsList = EventsData?.notificationEvents as NotificationEvent[];
    const selectedEvent = eventsList.find(
      (event: any) => event.notificationEventId === eventId,
    );
    if (selectedEvent && selectedEvent.notificationEventParameters) {
      setEventParameters(selectedEvent.notificationEventParameters);
    }
  };
  // Extract channelIds from eventByIdData.eventChannels and gather all channelIds in a list

  useEffect(() => {
    if (eventByIdData && Array.isArray(eventByIdData.eventChannels)) {
      const ids = eventByIdData.eventChannels.map(
        (channel: any) => channel.channelId,
      );
      setChannelIds(ids);
    } else {
      setChannelIds([]);
    }
  }, [eventByIdData]);

  // Fetch event parameters when the component initializes or eventId changes
  useEffect(() => {
    if (eventId) {
      fetchEventParameters();
    }
  }, [eventId]);

  const onSubmit = async (data: CreateEventMessageValues) => {
    const payload = mapToNotificationRequestPayload(
      {
        ...data,
        eventCode: eventId,
      },
      TemplateByIdData,
      token,
    );

    createNotification(payload);
    closeDrawer();
    setEventId("");
    setSelectedWhatsappTemplateId(null);
    setLanguageSelected("");
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    closeDrawer();
    setEventId("");
    setSelectedWhatsappTemplateId(null);
    setLanguageSelected("");
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
    getValues,
    watch,
    eventParameters,
    eventByIdData,
    refetchEventByIdData,
    isGetEventByIdDataError,
    isGetEventByIdDataSuccess,
    channelIds,
  };
};
export default useCreateEventMessage;
