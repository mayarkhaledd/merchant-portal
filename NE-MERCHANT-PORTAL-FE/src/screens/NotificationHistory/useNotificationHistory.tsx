import { useEffect, useState } from "react";
import detailsIcon from "@ejada/common/assets/detailsIcon.svg";
import { useGetNotificationMessagesList } from "@ejada/providers";
import { TTableColumns, Notification } from "eds-react";

import {
  selectType,
  formatNotificationHistoryColumns,
  SelectSearchMenuList,
} from "@ejada/screens/NotificationHistory";
import {
  GetNotificationMessageListPayload,
  NotificationMessageByIdInterface,
} from "@ejada/types";
import {
  useGetMessageStatusLogsList,
  useGetNotificationMessageById,
} from "@ejada/providers";
// import { toast } from "react-toastify";
// import i18n from "@ejada/common/locals/i18n";
import Cookies from "js-cookie";
// import { HTTPCookies } from "@ejada/common";
import i18n from "@ejada/common/locals/i18n";
import { toast } from "react-toastify";

export function useNotificationHistory() {
  const [isDetailsFormOpen, setIsDetailsFormOpen] = useState<boolean>(false);
  const [notificationHistoryId, setNotificationHistoryId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [channelType, setChannelType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [notificationHistoryData, setNotificationHistoryData] = useState<
    TTableColumns[]
  >([]);
  const [notificationChannel, setNotificationChannel] = useState<selectType[]>(
    [],
  );
  const [messageLanguage, setMessageLanguage] = useState<selectType[]>([]);
  const [eventCode, setEventCode] = useState<selectType[]>([]);
  const [sourceSystem, setSourceSystem] = useState<selectType[]>([]);
  const [eventPriority, setEventPriority] = useState<selectType[]>([]);
  const [relationType, setRelationType] = useState<selectType[]>([]);
  const [messageStatus, setMessageStatus] = useState<selectType[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);
  const [searchQuery, setSearchQuery] = useState<
    Partial<GetNotificationMessageListPayload> | boolean
  >(false);
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [notificationHistoryDetails, setNotificationHistoryDetails] =
    useState<NotificationMessageByIdInterface | null>();
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<
    Partial<GetNotificationMessageListPayload>
  >({});
  const [sourceSystemsMenu, setSourceSystemsMenu] = useState<
    SelectSearchMenuList[]
  >([]);
  const [isButtonText, setIsButtonText] = useState(false);
  const NotificationMessagesPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    maxRecs: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    appType: Cookies.get("appTypeId")
      ? String(Cookies.get("appTypeId"))
      : undefined,
  };
  const allNotificationMessagesPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    maxRecs: 1000000,
    offset: 0,
    appType: Cookies.get("appTypeId")
      ? String(Cookies.get("appTypeId"))
      : undefined,
  };

  const {
    updatedData: MessagesListData,
    refetch: refetchMessageListData,
    isLoading: isGetNotificationMessagesLoading,
  } = useGetNotificationMessagesList(
    {
      ...NotificationMessagesPayload,
      ...(searchQuery && typeof searchQuery == "object" && searchQuery),
    },
    true,
    //Cookies.get(HTTPCookies.appTypeId) != null,
  );

  //to get all data for exporting
  const {
    updatedData: allMessagesData,
    refetch: refetchAllMessagesData,
    isError: isRefetchedDataError,
    isSuccess: isRefetchDataSuccess,
    error: errorMessage,
  } = useGetNotificationMessagesList(
    {
      ...allNotificationMessagesPayload,
      ...(searchQuery && typeof searchQuery == "object" && searchQuery),
    },
    false,
  );

  const {
    updatedData: messageData,
    isSuccess: isMessageSuccess,
    isError: NotificationMessageByIdDataError,
    error: NotificationMessageByIdDataAxiosError,
    refetch: refetchMessageById,
  } = useGetNotificationMessageById(
    {
      id: notificationHistoryId ? notificationHistoryId : "",
    },
    false,
  );

  const {
    updatedData: statusLogData,
    isSuccess: isStatusSuccess,
    isError: MessageStatusLogsDataError,
    error: MessageStatusLogsDataAxiosError,
    refetch: refetchStatusLog,
  } = useGetMessageStatusLogsList(
    {
      notificationChannel: channelType ? channelType : "",
      referenceId: referenceId ? referenceId : "",
    },
    false,
  );

  useEffect(() => {
    if (
      searchQuery &&
      typeof searchQuery == "object" &&
      refetchMessageListData
    ) {
      setCurrentPage(1);
      if (currentPage === 1) {
        // @ts-expect-error: refetch does not return a Promise, suppressing type error
        refetchMessageListData().then((result) => {
          if (result.totalRecords === 0) {
            const queryValue = Object.values(searchQuery)[0];
            if (queryValue !== undefined) {
              toast.dark(
                <Notification
                  title={
                    i18n.t("notificationHistory.something_went_wrong") as string
                  }
                  body={`${i18n.t("notificationHistory.there_is_no_data_with")} ${queryValue}`}
                  option="fail"
                />,
                {
                  position: toast.POSITION.TOP_RIGHT,
                },
              );
            }
          }
        });
      }
    }
  }, [refetchMessageListData, searchQuery]);

  useEffect(() => {
    if (MessagesListData) {
      setTotalListSize(Number(MessagesListData.totalRecords));
      setNotificationHistoryData(
        formatNotificationHistoryColumns(MessagesListData),
      );
    }
  }, [MessagesListData]);

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
    isFilterOpen,
    setIsFilterOpen,
    isDetailsFormOpen,
    setIsDetailsFormOpen,
    detailsIcon,
    notificationHistoryId,
    setNotificationHistoryId,
    notificationHistoryData,
    channelType,
    setChannelType,
    referenceId,
    setReferenceId,
    notificationChannel,
    setNotificationChannel,
    messageLanguage,
    setMessageLanguage,
    eventCode,
    setEventCode,
    sourceSystem,
    setSourceSystem,
    eventPriority,
    setEventPriority,
    relationType,
    setRelationType,
    messageStatus,
    setMessageStatus,
    searchQuery,
    setSearchQuery,
    notificationHistoryDetails,
    setNotificationHistoryDetails,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalListSize,
    setTotalListSize,
    messageData,
    statusLogData,
    isMessageSuccess,
    NotificationMessageByIdDataAxiosError,
    NotificationMessageByIdDataError,
    isStatusSuccess,
    MessageStatusLogsDataAxiosError,
    MessageStatusLogsDataError,
    refetchMessageById,
    refetchStatusLog,
    activeSearchCriteria,
    setActiveSearchCriteria,
    refetchMessageListData,
    sourceSystemsMenu,
    setSourceSystemsMenu,
    isEnglish,
    setIsEnglish,
    allMessagesData,
    refetchAllMessagesData,
    isRefetchedDataError,
    isRefetchDataSuccess,
    errorMessage,
    MessagesListData,
    isButtonText,
    setIsButtonText,
    isGetNotificationMessagesLoading,
  };
}
