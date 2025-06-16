import { useForm, useWatch } from "react-hook-form";
import {
  EventManagementFormValidationSchema,
  EventsManagementContext,
  extraEventChannelsInitialValues,
  filteredChannels,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import { Context, useContext, useEffect, useState } from "react";
import { filterEmptyValues } from "@ejada/screens/shared";
import { EventChannel } from "@ejada/types";
import { TemplateChannelsData } from "../types";

export const useAddExtraChannelsForm = () => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const {
    extraChannels,
    setExtraChannels,
    setShowNotification,
    setExtraMobileAppName,
    setSavedChannel,
    setSavedLanguage,
    setShowErrorNotification,
  } = useContext(EventsManagementContext);

  const {
    control,
    handleSubmit,
    formState,
    reset,
    trigger,
    watch,
    getValues,
    register,
    setValue,
  } = useForm<extraEventChannelsInitialValues>({
    mode: "onTouched",
  });
  const { channelsTableDataEditMode } = useContext(
    EventsManagementContext as Context<TEventsManagementState>,
  );

  const watchedChannels = useWatch({
    control,
    name: "demoChannels",
    defaultValue: [],
  });

  useEffect(() => {
    setSelectedChannels?.(watchedChannels);

    watchedChannels?.forEach((channel, index) => {
      const prefix = `eventChannels.${index}`;

      switch (channel) {
        case "EMAIL":
          register(
            `${prefix}.header` as any,
            EventManagementFormValidationSchema.required,
          );
          register(
            `${prefix}.sender` as any,
            EventManagementFormValidationSchema.required,
          );
          register(
            `${prefix}.channelId` as any,
            EventManagementFormValidationSchema.required,
          );
          break;
        case "INBOX":
          register(
            `${prefix}.header` as any,
            EventManagementFormValidationSchema.required,
          );
          register(
            `${prefix}.channelId` as any,
            EventManagementFormValidationSchema.required,
          );
          break;

        case "SMS":
          register(
            `${prefix}.sender` as any,
            EventManagementFormValidationSchema.required,
          );
          register(
            `${prefix}.channelId` as any,
            EventManagementFormValidationSchema.required,
          );
          break;

        case "PUSH_NOTIFICATION":
          register(
            `${prefix}.header` as any,
            EventManagementFormValidationSchema.required,
          );
          register(
            `${prefix}.channelId` as any,
            EventManagementFormValidationSchema.required,
          );
          register(
            "mobileAppName",
            EventManagementFormValidationSchema.required,
          );

          break;

        default:
          break;
      }
    });
  }, [watchedChannels]);

  // Update the selected channels in parent component when they change
  useEffect(() => {
    setSelectedChannels && setSelectedChannels(watchedChannels);
  }, [watchedChannels, setSelectedChannels]);

  // Handle form submission with proper validation
  const handleFormSubmit = async () => {
    // First validate top-level fields
    const topLevelFieldsValid = await trigger();

    if (topLevelFieldsValid && watchedChannels?.length > 0) {
      // Then validate all accordion fields for each selected channel
      const accordionFields = watchedChannels.flatMap((_, index) => [
        `eventChannels.${index}.header`,
        `eventChannels.${index}.sender`,
        `eventChannels.${index}.body`,
        `eventChannels.${index}.channelId`,
      ]);

      const allFieldsValid = await trigger(accordionFields as any);

      if (allFieldsValid) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = (data: extraEventChannelsInitialValues) => {
    const formattedEventChannels: EventChannel[] = [];
    const eventChannels = filteredChannels(
      data.demoChannels,
      data.eventChannels,
    );
    //create copies of channels with every language
    if (Array.isArray(data.languageCode) && Array.isArray(eventChannels)) {
      data.languageCode.forEach((languageCode: string) => {
        // For each language, map over the eventChannels
        Array.isArray(eventChannels) &&
          eventChannels.forEach((channel) => {
            formattedEventChannels.push({
              ...channel,
              languageCode: languageCode,
              sender: Array.isArray(channel.sender)
                ? channel.sender[0]
                : channel.sender,
            });
          });
      });
    }
    const payLoadData = filterEmptyValues(
      formattedEventChannels as EventChannel[],
    );
    if (data.mobileAppName) {
      setExtraMobileAppName(data.mobileAppName);
    }
    let shouldBreak = false;
    channelsTableDataEditMode.forEach((channel: TemplateChannelsData) => {
      if (shouldBreak) return;
      payLoadData.forEach((payloadChannel: EventChannel) => {
        if (
          channel.languageCode === payloadChannel.languageCode &&
          channel.channelId === payloadChannel.channelId
        ) {
          setShowErrorNotification(true);
          shouldBreak = true;
          return;
        }
      });
    });

    if (!shouldBreak) {
      setExtraChannels(payLoadData);
      setShowNotification(true);
    }

    if (data.languageCode) {
      setSavedLanguage(data.languageCode);
    }
    if (data.demoChannels) {
      setSavedChannel(data.demoChannels);
    }
  };

  return {
    register,
    control,
    handleSubmit,
    formState,
    onSubmit,
    trigger,
    setValue,
    reset,
    watch,
    getValues,
    extraChannels,
    setExtraChannels,
    selectedChannels,
    setSelectedChannels,
    watchedChannels,
    handleFormSubmit,
  };
};
