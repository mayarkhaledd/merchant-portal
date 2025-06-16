import { useEffect, useState } from "react";
import { formateEventsColumns } from "@ejada/screens/EventsManagement";
import { SelectSearchList } from "@ejada/screens";
import {
  useCreateEvent,
  useDeleteNotificationEvent,
  useGetEventById,
  useGetEventGroups,
  useGetLookUpParameters,
  useGetNotificationChannels,
  useGetNotificationEvent,
  useSmsSender,
  useUpdateEvent,
} from "@ejada/providers";
import { TTableColumns, Notification } from "eds-react";
import { EventChannel, GetEventPayload } from "@ejada/types";
import Cookies from "js-cookie";
import { formatToSelectSearch } from "../shared";
import { toast } from "react-toastify";
import i18n from "@ejada/common/locals/i18n";
import { TemplateChannelsData } from "./partials/EventManagementForm/types";
import { useGetSystems } from "@ejada/providers/systemProvider/systemProvider";

export const useEventsManagement = () => {
  const [savedChannel, setSavedChannel] = useState<string[]>([]);
  const [savedLanguage, setSavedLanguage] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showErrorNotification, setShowErrorNotification] =
    useState<boolean>(false);
  const [extraMobileAppName, setExtraMobileAppName] = useState<string>("");
  const [addExtraChannelBtn, setAddExtraChannelBtn] = useState(false);
  const [extraChannels, setExtraChannels] = useState<EventChannel[]>([]);

  const [channelsTableDataEditMode, setChannelsTableDataEditMode] = useState<
    TemplateChannelsData[]
  >([]);

  const [selectedEventGroup, setSelectedEventGroup] =
    useState<SelectSearchList>({
      id: "",
      label: "",
    });

  const [editTemplateInsertParameter, setEditTemplateInsertParameter] =
    useState<SelectSearchList[]>([]);
  const [addNewEventDrawer, setAddNewEventDrawer] = useState(false);
  const [isEventFilterMenyOpen, setIsEventFilterMenuOpen] = useState(false);
  const [editEventDrawer, setEditEventDrawer] = useState(false);
  const [viewEventDrawer, setViewEventDrawer] = useState(false);
  const [editTemplateDrawer, setEditTemplateDrawer] = useState(false);
  const [eventParameterList, setEventParameterList] = useState<
    SelectSearchList[]
  >([]);
  const [eventGroupList, setEventGroupList] = useState<SelectSearchList[]>([]);
  const [notificationEventId, setNotificationEventId] = useState("");
  const [viewEventId, setViewEventId] = useState("");
  const [EventsManagementData, setEventsManagementData] = useState<
    TTableColumns[]
  >([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<TTableColumns>({});
  const [channelsTableData, setChannelsTableData] = useState<
    TemplateChannelsData[]
  >([]);
  const [isButtonText, setIsButtonText] = useState<boolean>(false);
  const [editTemplateData, setEditTemplateData] =
    useState<TemplateChannelsData>({
      eventChannelId: "",
      channelId: "",
      header: "",
      body: "",
      sender: "",
      languageCode: "",
    });
  const [searchQuery, setSearchQuery] = useState<
    Partial<GetEventPayload> | boolean
  >(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);
  const [channelList, setChannelList] = useState<SelectSearchList[]>([]);
  const [channelListNew, setChannelListNew] = useState<SelectSearchList[]>([]);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<
    Partial<GetEventPayload>
  >({});
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [sourceSystemsMenu, setSourceSystemsMenu] = useState<
    SelectSearchList[]
  >([]);
  const [smsSender, setSmsSender] = useState<SelectSearchList[]>([
    {
      id: "",
      label: "",
    },
  ]);
  const [emailSender, setEmailSender] = useState<SelectSearchList[]>([
    {
      id: "",
      label: "",
    },
  ]);

  // Modify the code near line 93 to fix the pagination issues
  const getEventsPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    appTypeId: Cookies.get("appTypeId")
      ? String(Cookies.get("appTypeId"))
      : undefined,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  };

  const allEventPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    appTypeId: Cookies.get("appTypeId")
      ? String(Cookies.get("appTypeId"))
      : undefined,
    limit: 1000000,
    offset: 0,
  };

  const {
    updatedData: EventsData,
    refetch: refetchEventsData,
    isError: isGetEventsDataError,
    isSuccess: isGetEventsDataSuccess,
    isLoading: isGetEventsDataLoading,
  } = useGetNotificationEvent(
    {
      ...getEventsPayload,
      ...(searchQuery && typeof searchQuery === "object" ? searchQuery : {}),
    },
    true,
  );

  //to get all data for exporting
  const {
    updatedData: allEventData,
    refetch: refetchAllEventData,
    isError: isRefetchedDataError,
    isSuccess: isRefetchDataSuccess,
    error: errorMessage,
  } = useGetNotificationEvent(
    {
      ...allEventPayload,
      ...(searchQuery && typeof searchQuery === "object" ? searchQuery : {}),
    },
    false,
  );

  const {
    updatedData: sourceSystemData,
    refetch: refetchsystems,
    isSuccess: isSystemsSuccess,
  } = useGetSystems(
    {
      tenantId: Cookies.get("tenantId")
        ? (Cookies.get("tenantId") as string)
        : " ",
    },
    false,
  );

  const {
    updatedData: eventChannels,
    isSuccess: isEventChannelsSuccess,
    refetch: refetchChannels,
  } = useGetNotificationChannels(false);

  const {
    updatedData: eventParameters,
    isSuccess: isEventParametersSuccess,
    refetch: refetchEventParameters,
  } = useGetLookUpParameters(false);

  const {
    updatedData: smsSenderList,
    isSuccess: isSmsSenderSuccess,
    refetch: refetchSmsSenderList,
  } = useSmsSender(
    {
      tenantId: Cookies.get("tenantId")
        ? (Cookies.get("tenantId") as string)
        : "",
    },
    false,
  );

  const {
    mutate: deleteNotificationEvent,
    isSuccess: isDeleteNotificationEventSuccess,
    isError: isDeleteNotificationEventError,
    error: deleteNotificationEventError,
  } = useDeleteNotificationEvent();

  const { updatedData: eventGroupData, isSuccess: isEventGroupSuccess } =
    useGetEventGroups({
      tenantId: Cookies.get("tenantId")
        ? (Cookies.get("tenantId") as string)
        : " ",
      appTypeId: Cookies.get("appTypeId")
        ? Number(Cookies.get("appTypeId"))
        : undefined,
    });

  //Merchant APIs
  const {
    mutate: createEvent,
    reset: resetCreateEvent,
    isError: createEventError,
    error: createEventErrorDetails,
    isSuccess: createEventSuccess,
    data: createEventData,
  } = useCreateEvent();

  const {
    mutate: updateEvent,
    reset: resetUpdateEvent,
    isError: updateEventError,
    isSuccess: updateEventSuccess,
    error: updateEventErrorDetails,
  } = useUpdateEvent();

  const {
    updatedData: eventByIdData,
    refetch: refetchEventByIdData,
    isError: isGetEventByIdDataError,
    isSuccess: isGetEventByIdDataSuccess,
  } = useGetEventById(
    {
      id: viewEventId,
    },
    false,
  );

  useEffect(() => {
    if (sourceSystemData && sourceSystemData.appTypeList) {
      const systemMenu = formatToSelectSearch(
        sourceSystemData.appTypeList,
        "appTypeId",
        "appTypeName",
      );
      setSourceSystemsMenu(systemMenu);
    }
  }, [sourceSystemData]);

  useEffect(() => {
    if (viewEventId !== "" && refetchEventByIdData) {
      refetchEventByIdData();
    }
  }, [viewEventId]);

  useEffect(() => {
    if (searchQuery && typeof searchQuery === "object") {
      setActiveSearchCriteria(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (smsSenderList && smsSenderList.tenantSenders) {
      // Filter and format email senders
      const emailList = smsSenderList.tenantSenders
        .filter((item) => item.channel == "EMAIL" && item.status == "Y")
        .map((item) => ({
          id: item.senderValue,
          label: item.senderName,
        }));
      // Filter for SMS senders
      const smsList = smsSenderList.tenantSenders
        .filter((item) => item.channel == "SMS" && item.status == "Y")
        .map((item) => ({
          id: item.senderValue,
          label: item.senderName,
        }));

      setEmailSender(emailList);
      setSmsSender(smsList);
    }
  }, [smsSenderList]);

  useEffect(() => {
    if (!isEventChannelsSuccess) {
      refetchChannels?.();
    }
    if (!isEventParametersSuccess) {
      refetchEventParameters?.();
    }
    if (!isSmsSenderSuccess) {
      refetchSmsSenderList?.();
    }
    if (!isSystemsSuccess) {
      refetchsystems?.();
    }
  }, []);

  useEffect(() => {
    if (
      Array.isArray(eventChannels) &&
      eventChannels.length > 0 &&
      eventChannels.every(
        (channel) =>
          typeof channel === "object" &&
          channel !== null &&
          "notificationChannelId" in channel &&
          "channelNameEn" in channel,
      )
    ) {
      const channelListFormatted = formatToSelectSearch(
        eventChannels,
        "notificationChannelId",
        "channelNameEn",
      );
      setChannelListNew(channelListFormatted as []);
    }
  }, [eventChannels]);

  useEffect(() => {
    //format to fill the dropdowns
    if (eventParameters && eventParameters.length > 0) {
      const eventParameterList = formatToSelectSearch(
        eventParameters,
        "parameterName",
        "parameterDescription",
      );
      setEventParameterList(eventParameterList as []);
    }
    if (
      eventGroupData?.eventGroupList.length &&
      eventGroupData?.eventGroupList &&
      isEventGroupSuccess
    ) {
      const eventGroupList = formatToSelectSearch(
        eventGroupData.eventGroupList,
        "eventGroupId",
        "eventGroupId",
      );
      setEventGroupList(eventGroupList);
    }
    if (
      Array.isArray(eventChannels) &&
      eventChannels.length > 0 &&
      eventChannels.every(
        (channel) =>
          typeof channel === "object" &&
          channel !== null &&
          "notificationChannelId" in channel &&
          "channelNameEn" in channel,
      )
    ) {
      const channelListFormatted = formatToSelectSearch(
        eventChannels,
        "notificationChannelId",
        "channelNameEn",
      );
      setChannelList(channelListFormatted as []);
    }
  }, [eventParameters, eventChannels, eventGroupData]);

  //format the events data got, to fit in the table
  useEffect(() => {
    if (EventsData) {
      setTotalListSize(Number(EventsData.totalElements));
      setEventsManagementData(formateEventsColumns(EventsData));
    }
  }, [EventsData, isGetEventsDataSuccess]);

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
                title={i18n.t("eventsManagement.something_wrong") as string}
                body={`${i18n.t("eventsManagement.there_is_no_data_with")} ${queryValue}`}
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
  }, [refetchEventsData, searchQuery]);

  useEffect(() => {
    if (
      updateEventSuccess ||
      createEventSuccess ||
      isDeleteNotificationEventSuccess
    ) {
      refetchEventsData?.();
    }
  }, [
    updateEventSuccess,
    createEventSuccess,
    isDeleteNotificationEventSuccess,
  ]);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("userLanguage");
    setIsEnglish(currentLanguage === "en" ? true : false);
  }, []);

  return {
    deleteNotificationEventError,
    EventsManagementData,
    addNewEventDrawer,
    setAddNewEventDrawer,
    isEventFilterMenyOpen,
    setIsEventFilterMenuOpen,
    editTemplateDrawer,
    setEditTemplateDrawer,
    isGetEventsDataError,
    isGetEventsDataSuccess,
    editEventDrawer,
    setEditEventDrawer,
    refetchEventsData,
    notificationEventId,
    setNotificationEventId,
    channelsTableData,
    setChannelsTableData,
    editTemplateData,
    setEditTemplateData,
    eventParameterList,
    setEventParameterList,
    eventParameters,
    isEventParametersSuccess,
    refetchEventParameters,
    setSelectedEvent,
    setPopupType,
    setIsPopupOpen,
    isPopupOpen,
    popupType,
    selectedEvent,
    deleteNotificationEvent,
    isDeleteNotificationEventSuccess,
    isDeleteNotificationEventError,
    searchQuery,
    setSearchQuery,
    eventGroupData,
    isEventGroupSuccess,
    eventGroupList,
    setEventGroupList,
    savedLanguage,
    setSavedLanguage,
    editTemplateInsertParameter,
    setEditTemplateInsertParameter,
    refetchChannels,
    eventChannels,
    isEventChannelsSuccess,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalListSize,
    setTotalListSize,
    selectedEventGroup,
    setSelectedEventGroup,
    savedChannel,
    setSavedChannel,
    channelsTableDataEditMode,
    setChannelsTableDataEditMode,
    extraChannels,
    setExtraChannels,
    addExtraChannelBtn,
    setAddExtraChannelBtn,
    showNotification,
    setShowNotification,
    showErrorNotification,
    setShowErrorNotification,
    extraMobileAppName,
    setExtraMobileAppName,
    channelList,
    createEvent,
    resetCreateEvent,
    createEventError,
    createEventErrorDetails,
    createEventSuccess,
    createEventData,
    updateEvent,
    resetUpdateEvent,
    updateEventError,
    updateEventSuccess,
    updateEventErrorDetails,
    eventByIdData,
    refetchEventByIdData,
    isGetEventByIdDataError,
    isGetEventByIdDataSuccess,
    viewEventDrawer,
    setViewEventDrawer,
    viewEventId,
    setViewEventId,
    smsSender,
    emailSender,
    selectedChannels,
    setSelectedChannels,
    channelListNew,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    setIsEnglish,
    sourceSystemsMenu,
    refetchsystems,
    setSourceSystemsMenu,
    allEventData,
    refetchAllEventData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    EventsData,
    isButtonText,
    setIsButtonText,
    isGetEventsDataLoading,
  };
};
