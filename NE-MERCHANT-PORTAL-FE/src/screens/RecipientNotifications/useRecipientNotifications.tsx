import { useEffect, useState } from "react";
import { SelectSearchList, formateEventsColumns } from "@ejada/screens";
import { GetEventPayload, NotificationEventParameter } from "@ejada/types";
import { useGetEventGroups, useGetNotificationEvent } from "@ejada/providers";
import Cookies from "js-cookie";
import { useNotificaitonRequest } from "@ejada/providers/recipientProvider/recipientProvider";
import { TTableColumns, Notification } from "eds-react";
import { toast } from "react-toastify";
import i18n from "@ejada/common/locals/i18n";

export function useRecipientNotifications() {
  const [isCreateAdhocMessageOpen, setIsCreateAdhocMessageOpen] =
    useState<boolean>(false);
  const [isSendEventMessageOpen, setIsSendEventMessageOpen] =
    useState<boolean>(false);
  const [eventId, setEventId] = useState<string>();
  const [isEventFilterMenuOpen, setIsEventFilterMenuOpen] =
    useState<boolean>(false);
  const [eventGroupList, setEventGroupList] = useState<SelectSearchList[]>([]);
  const [searchQuery, setSearchQuery] = useState<
    Partial<GetEventPayload> | boolean
  >(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);
  const [EventsManagementData, setEventsManagementData] = useState<
    TTableColumns[]
  >([]);
  const [eventParameters, setEventParameters] = useState<
    NotificationEventParameter[]
  >([]);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<
    Partial<GetEventPayload>
  >({});
  const [isFetchingEventsEnabled, setIsFetchingEventsEnabled] =
    useState<boolean>(false);
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [isButtonText, setIsButtonText] = useState<boolean>(false);
  const [languageSelected, setLanguageSelected] = useState<string>("");
  const [paramCodeGot, setParamCodeGot] = useState<string[]>([]);
  const [channelIds, setChannelIds] = useState<string[]>([]);

  const payload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    appTypeId: Cookies.get("appTypeId") ? Cookies.get("appTypeId") : undefined,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage, // FIXED OFFSET
    ...(searchQuery && typeof searchQuery == "object" && searchQuery),
  };

  const allEventPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    appTypeId: Cookies.get("appTypeId") ? Cookies.get("appTypeId") : undefined,
    limit: 1000000,
    offset: 0,
    ...(searchQuery && typeof searchQuery == "object" && searchQuery),
  };

  const { updatedData: eventGroupData, isSuccess: isEventGroupSuccess } =
    useGetEventGroups(
      {
        tenantId: Cookies.get("tenantId")
          ? (Cookies.get("tenantId") as string)
          : " ",
        appTypeId: Cookies.get("appTypeId")
          ? Number(Cookies.get("appTypeId"))
          : undefined,
      },
      true,
    );

  const {
    updatedData: EventsData,
    refetch: refetchEventsData,
    isError: isGetEventsDataError,
    isSuccess: isGetEventsDataSuccess,
    isLoading: isGetEventsDataLoading,
  } = useGetNotificationEvent(payload, isFetchingEventsEnabled);

  //to get all data for exporting
  const {
    updatedData: allEventData,
    refetch: refetchAllEventData,
    isError: isRefetchedDataError,
    isSuccess: isRefetchDataSuccess,
    error: errorMessage,
  } = useGetNotificationEvent(allEventPayload, false);

  const {
    mutate: createNotification,
    isSuccess: requestSuccess,
    isError: requestError,
    error: requestErrorMessage,
  } = useNotificaitonRequest();

  useEffect(() => {
    if (searchQuery && typeof searchQuery == "object" && refetchEventsData) {
      setCurrentPage(1);
      if (currentPage === 1) {
        // @ts-expect-error: refetch does not return a Promise, suppressing type error
        refetchEventsData().then((result) => {
          if (result.status !== "success") {
            const queryValue = Object.values(searchQuery)[0];
            toast.dark(
              <Notification
                title={
                  i18n.t(
                    "recipient_notifications.something_went_wrong",
                  ) as string
                }
                body={`${i18n.t("recipient_notifications.there_is_no_data_with")} ${queryValue}`}
                option="fail"
              />,
              {
                position: toast.POSITION.TOP_RIGHT,
              },
            );
          }
        });
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    if (EventsData) {
      setTotalListSize(Number(EventsData.totalElements));
      setEventsManagementData(formateEventsColumns(EventsData));
    }
  }, [EventsData]);

  useEffect(() => {
    if (searchQuery && typeof searchQuery === "object") {
      setActiveSearchCriteria(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("userLanguage");
    setIsEnglish(currentLanguage === "en" ? true : false);
  }, []);

  return {
    EventsManagementData,
    itemsPerPage,
    currentPage,
    totalListSize,
    setCurrentPage,
    setItemsPerPage,
    setTotalListSize,
    requestErrorMessage,
    createNotification,
    requestSuccess,
    requestError,
    isEventGroupSuccess,
    eventGroupData,
    setSearchQuery,
    searchQuery,
    EventsData,
    isGetEventsDataError,
    isGetEventsDataSuccess,
    eventGroupList,
    setEventGroupList,
    eventId,
    setEventId,
    isCreateAdhocMessageOpen,
    setIsCreateAdhocMessageOpen,
    isSendEventMessageOpen,
    setIsSendEventMessageOpen,
    isEventFilterMenuOpen,
    setIsEventFilterMenuOpen,
    setIsFetchingEventsEnabled,
    isFetchingEventsEnabled,
    activeSearchCriteria,
    setActiveSearchCriteria,
    refetchEventsData,
    isEnglish,
    setIsEnglish,
    allEventData,
    refetchAllEventData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    eventParameters,
    setEventParameters,
    isButtonText,
    setIsButtonText,
    isGetEventsDataLoading,
    languageSelected,
    setLanguageSelected,
    paramCodeGot,
    setParamCodeGot,
    channelIds,
    setChannelIds,
  };
}
