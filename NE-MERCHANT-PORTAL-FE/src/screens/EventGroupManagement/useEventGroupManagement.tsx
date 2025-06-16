import { useEffect, useState } from "react";
import {
  useCreateEventGroup,
  useDeleteEventGroupById,
  useGetEventGroupById,
  useGetEventGroups,
  useUpdateEventGroup,
} from "@ejada/providers/eventGroupsProvider";
import { TTableColumns } from "eds-react";
import { formatToSelectSearch } from "../shared";
import { GetEventGroupPayload } from "@ejada/types/api/eventGroupsInterface";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Notification } from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import { formateEventGroupColumns } from "./partials/EventGroupManagementTable/utils";
import { SelectSearchList } from "@ejada/screens";
import { useGetSystems } from "@ejada/providers/systemProvider/systemProvider";

export const useEventGroupManagement = () => {
  const [addNewEventGroupDrawer, setAddNewEventGroupDrawer] = useState(false);
  const [editEventGroupDrawer, setEditEventGroupDrawer] = useState(false);
  const [viewEventGroupDrawer, setIsViewEventGroupDrawer] =
    useState<boolean>(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [eventGroupId, setEventGroupId] = useState("");
  const [searchQuery, setSearchQuery] = useState<
    boolean | Partial<GetEventGroupPayload>
  >(false);
  const [EventGroupManagementData, setEventGroupManagementData] = useState<
    TTableColumns[]
  >([]);
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [eventGroupList, setEventGroupList] = useState<SelectSearchList[]>([]);
  const [totalListSize, setTotalListSize] = useState(0);
  const [isEventGroupFilterMenuOpen, setIsEventGroupFilterMenuOpen] =
    useState(false);
  const EventGroupPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    appTypeId: Cookies.get("appTypeId")
      ? Number(Cookies.get("appTypeId"))
      : undefined,
  };

  const allEventGroupPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    appTypeId: Cookies.get("appTypeId")
      ? Number(Cookies.get("appTypeId"))
      : undefined,
    limit: 1000000,
    offset: 0,
  };

  const [sourceSystemsMenu, setSourceSystemsMenu] = useState<
    SelectSearchList[]
  >([]);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<
    Partial<GetEventGroupPayload>
  >({});
  const [isButtonText, setIsButtonText] = useState(false);
  const {
    mutate: deleteEventGroupById,
    isSuccess: isDeleteEventGroupByIdSuccess,
    isError: isDeleteEventGroupByIdError,
    error: isDeleteEventGroupByIdAxiosError,
  } = useDeleteEventGroupById();

  const {
    updatedData: eventGroupsData,
    isSuccess: isEventGroupSuccess,
    isError: isEventGroupError,
    refetch: refetchEventGroup,
    isLoading: isGetEventGroupsLoading,
  } = useGetEventGroups({
    ...EventGroupPayload,
    ...(searchQuery && typeof searchQuery === "object" && searchQuery),
  });

  //to get all data for exporting
  const {
    updatedData: allEventGroupData,
    refetch: refetchAllEventGroupData,
    isError: isRefetchedDataError,
    isSuccess: isRefetchDataSuccess,
    error: errorMessage,
  } = useGetEventGroups(
    {
      ...allEventGroupPayload,
      ...(searchQuery && typeof searchQuery === "object" && searchQuery),
    },
    false,
  );

  const {
    mutate: addEventGroup,
    isSuccess: isCreateEventGroupSuccess,
    isError: isCreateEventGroupError,
    error: createEventGroupAxiosError,
  } = useCreateEventGroup();

  const {
    mutate: editEventGroup,
    isSuccess: isEditEventGroupSuccess,
    isError: isEditEventGroupError,
    error: editEventGroupAxiosError,
  } = useUpdateEventGroup();

  const {
    updatedData: eventGroupByIdData,
    isError: eventGroupByIdDataError,
    refetch: refetchEventGroupByIdData,
    error: eventGroupByIdDataAxiosError,
  } = useGetEventGroupById(
    {
      id: eventGroupId,
    },
    eventGroupId !== "",
  );

  useEffect(() => {
    if (
      eventGroupsData &&
      eventGroupsData?.eventGroupList.length > 0 &&
      isEventGroupSuccess
    ) {
      const eventGroupList = formatToSelectSearch(
        eventGroupsData.eventGroupList,
        "eventGroupPushFlag",
        "eventGroupPushFlag",
      );
      setEventGroupList(eventGroupList);
      setTotalListSize(Number(eventGroupsData.eventGroupList.length));
      setEventGroupManagementData(formateEventGroupColumns(eventGroupsData));
    }
  }, [eventGroupsData]);

  useEffect(() => {
    if (searchQuery && typeof searchQuery === "object") {
      setActiveSearchCriteria(searchQuery);
    }
  }, [searchQuery]);

  const {
    updatedData: sourceSystemData,
    refetch: refetchGetSystems,
    isSuccess: isGetSystemsSuccess,
  } = useGetSystems(
    {
      tenantId: Cookies.get("tenantId")
        ? (Cookies.get("tenantId") as string)
        : "",
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
    if (!isGetSystemsSuccess) {
      refetchGetSystems?.();
    }
  }, []);

  useEffect(() => {
    if (
      isEditEventGroupSuccess ||
      isCreateEventGroupSuccess ||
      isDeleteEventGroupByIdSuccess
    ) {
      refetchEventGroup?.();
    }
  }, [
    isEditEventGroupSuccess,
    isCreateEventGroupSuccess,
    isDeleteEventGroupByIdSuccess,
  ]);

  useEffect(() => {
    if (eventGroupId !== "" && refetchEventGroupByIdData) {
      refetchEventGroupByIdData();
    }
  }, [eventGroupId]);

  useEffect(() => {
    if (searchQuery && typeof searchQuery == "object" && refetchEventGroup) {
      // @ts-expect-error: refetch does not return a Promise, suppressing type error
      refetchEventGroup().then((result) => {
        if (result.status !== "success") {
          const queryValue = Object.values(searchQuery)[0];
          toast.dark(
            <Notification
              title={
                i18n.t("eventGroupManagement.something_went_wrong") as string
              }
              body={`${i18n.t("eventGroupManagement.there_is_no_data_with")} ${queryValue}`}
              option="fail"
            />,
            {
              position: toast.POSITION.TOP_RIGHT,
            },
          );
        }
      });
    }
  }, [refetchEventGroup, searchQuery]);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("userLanguage");
    setIsEnglish(currentLanguage === "en" ? true : false);
  }, []);

  return {
    addNewEventGroupDrawer,
    setAddNewEventGroupDrawer,
    eventGroupList,
    setEventGroupList,
    eventGroupId,
    setEventGroupId,
    editEventGroupDrawer,
    setEditEventGroupDrawer,
    isDeletePopUpOpen,
    setIsDeletePopUpOpen,
    searchQuery,
    setSearchQuery,
    isDeleteEventGroupByIdError,
    isDeleteEventGroupByIdSuccess,
    deleteEventGroupById,
    refetchEventGroup,
    isEventGroupSuccess,
    isEventGroupError,
    isDeleteEventGroupByIdAxiosError,
    isCreateEventGroupSuccess,
    isCreateEventGroupError,
    createEventGroupAxiosError,
    isEditEventGroupSuccess,
    isEditEventGroupError,
    editEventGroupAxiosError,
    eventGroupByIdDataError,
    eventGroupByIdDataAxiosError,
    eventGroupByIdData,
    addEventGroup,
    editEventGroup,
    viewEventGroupDrawer,
    setIsViewEventGroupDrawer,
    totalListSize,
    setTotalListSize,
    EventGroupManagementData,
    isEventGroupFilterMenuOpen,
    setIsEventGroupFilterMenuOpen,
    sourceSystemsMenu,
    setSourceSystemsMenu,
    activeSearchCriteria,
    setActiveSearchCriteria,
    refetchEventGroupByIdData,
    isEnglish,
    setIsEnglish,
    refetchGetSystems,
    allEventGroupData,
    refetchAllEventGroupData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    eventGroupsData,
    isButtonText,
    setIsButtonText,
    isGetEventGroupsLoading,
  };
};
