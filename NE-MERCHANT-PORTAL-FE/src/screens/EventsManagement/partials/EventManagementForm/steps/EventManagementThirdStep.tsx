import {
  EventsManagementContext,
  EventsManagementFormStepProps,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import { ChannelsGrid } from "@ejada/screens/shared/partials/ChannelsGrid/ChannelsGrid";
import { useTranslation } from "react-i18next";
import {
  DrawerNotification,
  getLocalizedErrorMessage,
} from "@ejada/screens/shared";
import { Context, useContext, useEffect, useState } from "react";
import { Spinner } from "eds-react";
import { QueryCosntant } from "@ejada/common";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import {
  formatChannelsColumnsEditMode,
  formatChannelsColumns,
} from "@ejada/screens/EventsManagement/utils";
import { useChannelsColumns } from "@ejada/screens/EventsManagement/partials/EventManagementForm/useChannelsColumns";
export const EventManagementThirdStep: React.FC<
  EventsManagementFormStepProps
> = ({
  mode,
  eventByIdData,
  refetchEventByIdData,
  createEventError,
  isGetEventByIdDataSuccess,
  createEventSuccess,
  isGetEventByIdDataError,
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const {
    viewEventId,
    channelsTableData,
    setChannelsTableData,
    createEventErrorDetails,
    channelsTableDataEditMode,
    setCurrentPage,
    extraChannels,
    setChannelsTableDataEditMode,
  } = useContext(EventsManagementContext as Context<TEventsManagementState>);
  const channelsColumns = useChannelsColumns(mode as string);
  const [creationErrorDetails, setCreationErrorDetails] = useState<string>("");

  const invalidateChannelsData = () => {
    queryClient.invalidateQueries({
      queryKey: QueryCosntant.CHANNELS_DATA, // Ensure this matches the expected type
    } as unknown as InvalidateQueryFilters);
  };
  useEffect(() => {
    setCurrentPage(1);
    const fetchChannelsData = async () => {
      try {
        await viewEventId;
        if (mode === "add" && viewEventId && viewEventId !== "") {
          await refetchEventByIdData?.();
        }
      } catch (error) {
        console.error("Failed to fetch channel data:", error);
        setChannelsTableData?.([]); // Handle error by resetting the data
      }
    };

    if (!createEventError && viewEventId !== "") {
      fetchChannelsData();
    }
  }, [
    isGetEventByIdDataError,
    mode,
    viewEventId,
    refetchEventByIdData,
    setChannelsTableData,
  ]);
  useEffect(() => {
    if (mode === "add") {
      invalidateChannelsData();
      if (eventByIdData) {
        setChannelsTableData &&
          setChannelsTableData(formatChannelsColumns(eventByIdData));
      }
    } else {
      if (mode === "edit" && extraChannels.length > 0) {
        const allTableData = [
          ...channelsTableDataEditMode,
          ...formatChannelsColumnsEditMode(extraChannels),
        ];

        // Filter out duplicates based on channelId and languageCode
        const uniqueData = allTableData.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.channelId === item.channelId &&
                t.languageCode === item.languageCode,
            ),
        );

        setChannelsTableDataEditMode &&
          setChannelsTableDataEditMode(uniqueData);
      }
    }
  }, [eventByIdData, mode, extraChannels]);

  // Clear cached data if there is an error
  useEffect(() => {
    if (createEventError || !isGetEventByIdDataSuccess) {
      setChannelsTableData && setChannelsTableData([]);
    }
  }, [
    createEventError,
    isGetEventByIdDataSuccess,
    queryClient,
    setChannelsTableData,
  ]);

  useEffect(() => {
    if (
      createEventErrorDetails?.response?.status === 400 ||
      createEventErrorDetails?.response?.status === 500
    ) {
      setCreationErrorDetails(
        getLocalizedErrorMessage(
          createEventErrorDetails,
          t("eventsManagement.Unknown_Error") as string,
        ),
      );
    }
  }, [createEventErrorDetails]);

  return (
    <div
      className={`h-full ${mode == "edit" || mode == "view" ? "mt-16" : "mt-5"} `}
    >
      {mode === "add" &&
      createEventSuccess !== false &&
      createEventError !== true ? (
        <DrawerNotification
          option={!createEventError && createEventSuccess ? "success" : "fail"}
          title={
            !createEventError && createEventSuccess
              ? (t("eventsManagement.add_new_event_successfully") as string)
              : creationErrorDetails
          }
        />
      ) : mode === "add" && creationErrorDetails !== "" ? (
        <DrawerNotification option={"fail"} title={creationErrorDetails} />
      ) : null}

      {eventByIdData && isGetEventByIdDataSuccess ? (
        //&& !createEventError
        <ChannelsGrid
          columns={channelsColumns}
          channelData={
            mode === "add" ? channelsTableData : channelsTableDataEditMode
          }
        />
      ) : (
        <div className="w-full flex items-center justify-center pt-14">
          {!createEventError && !isGetEventByIdDataSuccess && (
            <Spinner size="w-16 h-16" />
          )}
        </div>
      )}
    </div>
  );
};
