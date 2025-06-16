import { useForm } from "react-hook-form";
import {
  formateData,
  EventsManagementContext,
  TEventsManagementState,
  NotificationEventFormValues,
  formateGetByIdData,
  filterPayloadEmptyStringsAndArrays,
  //formatEventData,
} from "@ejada/screens/EventsManagement";
import { Context, useContext, useEffect } from "react";
import {
  CreateEventPayload,
  GetEventByIdInterface,
  UpdateEventPayload,
} from "@ejada/types";
import { useQueryClient } from "@tanstack/react-query";
import { QueryCosntant } from "@ejada/common/constants";
import { EventManagementInitialValues } from "@ejada/screens/EventsManagement/partials/EventManagementForm/types";

export const useEventManagementForm = (
  mode: "add" | "edit" | "view",
  closeDrawer: () => void,
  initialValues?: EventManagementInitialValues,
) => {
  const {
    isEventParametersSuccess,
    refetchEventParameters,
    refetchChannels,
    isEventChannelsSuccess,
    extraChannels,
    setViewEventId,
    setChannelsTableDataEditMode,
    extraMobileAppName,
    setSavedChannel,
    setSavedLanguage,
    eventByIdData,
    createEvent,
    createEventError,
    createEventSuccess,
    createEventData,
    updateEvent,
    updateEventError,
    updateEventSuccess,
    channelsTableDataEditMode,
    setExtraChannels,
    selectedChannels,
    setSelectedChannels,
    setExtraMobileAppName,
    resetUpdateEvent,
    resetCreateEvent,
    setAddExtraChannelBtn,
  } = useContext(EventsManagementContext as Context<TEventsManagementState>);
  const queryClient = useQueryClient();

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
  } = useForm<NotificationEventFormValues>({
    mode: "onTouched",
    defaultValues: {
      ...initialValues,
    },
  });

  useEffect(() => {
    if (createEventSuccess && createEventData) {
      setViewEventId(createEventData?.data.eventId as string);
    }
  }, [createEventData, createEventSuccess]);

  const resetAll = () => {
    setChannelsTableDataEditMode([]);
    setViewEventId("");
    setSavedChannel([]);
    setSavedLanguage([]);
    setExtraChannels([]);
    setSelectedChannels([]);
    setExtraMobileAppName("");
    setAddExtraChannelBtn(false);
    if (updateEventSuccess) {
      resetUpdateEvent();
    }
  };

  const onSubmit = async (data: NotificationEventFormValues) => {
    const formattedData = formateData(data);
    if (mode === "add") {
      const payLoadData = {
        ...formattedData,
        eventChannels: extraChannels,
        mobileAppName: extraMobileAppName ?? "",
      };
      const filteredData = filterPayloadEmptyStringsAndArrays(payLoadData);
      setViewEventId("");
      queryClient.removeQueries({ queryKey: [QueryCosntant.CHANNELS_DATA] });
      createEvent(filteredData as CreateEventPayload);
    } else {
      const formattedTableDataEditMode = channelsTableDataEditMode.map(
        ({
          //eventChannelId,
          ...channel
        }) => ({
          ...channel,
          languageCode:
            channel.languageCode === "English"
              ? "EN"
              : channel.languageCode === "Arabic"
                ? "AR"
                : channel.languageCode,
        }),
      );
      // Remove duplicates based on channelId and languageCode
      const uniqueChannels = [
        ...formattedTableDataEditMode,
        ...extraChannels,
      ].reduce(
        (acc, current) => {
          // Keep the first occurrence of each unique combination
          if (
            !acc.some(
              (item) =>
                item.channelId === current.channelId &&
                item.languageCode === current.languageCode,
            )
          ) {
            acc.push(current);
          }
          return acc;
        },
        [] as typeof formattedTableDataEditMode,
      );

      const gotMobileAppName = getValues("mobileAppName");
      const updatePayLoadData = {
        ...formattedData,
        eventChannels: uniqueChannels,
        mobileAppName: gotMobileAppName ?? extraMobileAppName ?? "",
        eventId: "",
      };
      const filteredUpdateData =
        filterPayloadEmptyStringsAndArrays(updatePayLoadData);
      updateEvent(filteredUpdateData as UpdateEventPayload);
      closeDrawer();
    }
    resetAll();
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset(); //reset hookform
    resetAll(); //reset States handled from FE
    closeDrawer();
  };

  useEffect(() => {
    if (eventByIdData && (mode === "edit" || mode === "view")) {
      const initialFormValues = formateGetByIdData(
        eventByIdData as GetEventByIdInterface,
      );
      resetAll();
      setChannelsTableDataEditMode(initialFormValues.channelsTableDataEditMode);
      //setting the initial values got from API to form values
      reset(initialFormValues as unknown as NotificationEventFormValues);
    }
  }, [eventByIdData]);

  useEffect(() => {
    resetUpdateEvent();
    resetCreateEvent();
  }, [updateEventSuccess, updateEventError]);

  return {
    register,
    control,
    handleSubmit,
    formState,
    handleCancel,
    onSubmit,
    trigger,
    watch,
    getValues,
    isEventParametersSuccess,
    refetchEventParameters,
    isEventChannelsSuccess,
    refetchChannels,
    selectedChannels,
    setSelectedChannels,
    reset,
    setValue,
    eventByIdData,
    createEvent,
    createEventError,
    createEventSuccess,
    createEventData,
    updateEvent,
    updateEventError,
    updateEventSuccess,
  };
};
