import { useContext, useEffect } from "react";
import { AddExtraEventForm } from "./AddExtraEventForm";
import { useAddExtraChannelsForm } from "./useAddExtraChannelsForm";
import {
  EventsManagementContext,
  useEventsManagement,
} from "@ejada/screens/EventsManagement";
import { DrawerNotification } from "@ejada/screens/shared";
import { t } from "i18next";

export const ExtraEventChannelForm: React.FC = () => {
  const {
    register,
    control,
    formState,
    setValue,
    reset,
    watch,
    getValues,
    selectedChannels,
    setSelectedChannels,
    handleFormSubmit,
    watchedChannels,
  } = useAddExtraChannelsForm();

  const { channelListNew, isEventChannelsSuccess, refetchChannels } =
    useEventsManagement();

  const {
    showNotification,
    setShowNotification,
    showErrorNotification,
    setShowErrorNotification,
  } = useContext(EventsManagementContext);

  useEffect(() => {
    if (showNotification) {
      // Reset the notification state after showing it
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 1500); // Hide notification after 3 seconds

      return () => clearTimeout(timer);
    }
    if (showErrorNotification) {
      // Reset the notification state after showing it
      const timer = setTimeout(() => {
        setShowErrorNotification(false);
      }, 1500); // Hide notification after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [
    setShowNotification,
    showNotification,
    showErrorNotification,
    setShowErrorNotification,
  ]);

  return (
    <>
      {showNotification && (
        <DrawerNotification
          title={t("eventsManagement.succes_extra_msg") as string}
          option="success"
        />
      )}
      {showErrorNotification && (
        <DrawerNotification
          title={t("eventsManagement.failed_extra_msg") as string}
          option="fail"
        />
      )}
      <AddExtraEventForm
        control={control}
        formState={formState}
        getValues={getValues}
        register={register}
        channelList={channelListNew}
        isEventChannelsSuccess={isEventChannelsSuccess}
        refetchChannels={refetchChannels}
        selectedChannels={selectedChannels}
        setSelectedChannels={setSelectedChannels}
        reset={reset}
        setValue={setValue}
        watch={watch}
        handleFormSubmit={handleFormSubmit}
        watchedChannels={watchedChannels}
      />
    </>
  );
};
