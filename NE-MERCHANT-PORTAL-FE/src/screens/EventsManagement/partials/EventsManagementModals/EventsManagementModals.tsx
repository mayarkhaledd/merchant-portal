import { useContext, Context, useEffect } from "react";
import { Drawer } from "eds-react";
import { useTranslation } from "react-i18next";
import {
  EventsManagementContext,
  TEventsManagementState,
  useEventsManagement,
  mapEventInterfaceToInitialValues,
} from "@ejada/screens/EventsManagement";
import { ContextPopup } from "@ejada/screens/shared/partials/ContextPopup/ContextPopup";
import { EventFilterMenuForm } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuForm";
import {
  ErrorCode,
  getLocalizedErrorMessage,
  useErrorToast,
  useSuccessToast,
} from "@ejada/screens/shared";
import { EventManagementForm } from "../EventManagementForm";
import { GetEventByIdInterface } from "@ejada/types";
import { EditTemplateForm } from "../EventManagementForm/EditTemplateForm";
import { AxiosError } from "axios";

export function EventsManagementModals() {
  const { t } = useTranslation();
  const {
    addNewEventDrawer,
    setAddNewEventDrawer,
    isEventFilterMenyOpen,
    setIsEventFilterMenuOpen,
    editTemplateDrawer,
    setEditTemplateDrawer,
    editEventDrawer,
    setEditEventDrawer,
    viewEventDrawer,
    setViewEventDrawer,
    isPopupOpen,
    popupType,
    selectedEvent,
    setIsPopupOpen,
    deleteNotificationEvent,
    //isDeleteNotificationEventError,
    isDeleteNotificationEventSuccess,
    setSearchQuery,
    setEventGroupList,
    isEventGroupSuccess,
    eventGroupData,
    deleteNotificationEventError,
    refetchEventsData,
    createEventSuccess,
    updateEventSuccess,
    //updateEventError,
    updateEventErrorDetails,
    //createEventError,
    createEventErrorDetails,
    setSavedChannel,
    setSavedLanguage,
    setChannelsTableDataEditMode,
    setExtraChannels,
    setViewEventId,
    setSelectedChannels,
    setAddExtraChannelBtn,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    sourceSystemsMenu,
    setIsButtonText,
    isButtonText,
  } = useContext<TEventsManagementState>(
    EventsManagementContext as Context<TEventsManagementState>,
  );
  const { eventByIdData } = useEventsManagement();
  useEffect(() => {
    if (isDeleteNotificationEventSuccess) {
      refetchEventsData?.();
    }
  }, [isDeleteNotificationEventSuccess]);

  const successToast = useSuccessToast;
  const errorToast = useErrorToast;

  const handleSuccessToast = (condition: boolean, message: string) => {
    successToast(condition, t(message));
  };

  const handleErrorToast = (
    condition: boolean,
    message: string,
    errorDetail: AxiosError<unknown, any> | null | ErrorCode,
  ) => {
    errorToast(
      condition,
      t(message),
      getLocalizedErrorMessage(errorDetail, t(message) as string),
    );
  };

  const handleToasts = () => {
    const toastConfigs = [
      {
        condition: isDeleteNotificationEventSuccess,
        successMessage: "eventsManagement.delete_success",
        errorCondition: deleteNotificationEventError?.message !== undefined,
        errorMessage: "eventsManagement.api_failure",
        errorDetail: deleteNotificationEventError as ErrorCode,
      },
      {
        condition: updateEventSuccess,
        successMessage: "eventsManagement.edit_event_success",
        errorCondition: updateEventErrorDetails?.message !== undefined,
        errorMessage: "eventsManagement.api_failure",
        errorDetail: updateEventErrorDetails as ErrorCode,
      },
      {
        condition: createEventSuccess,
        successMessage: "eventsManagement.add_new_event_successfully",
        errorCondition: createEventErrorDetails?.message !== undefined,
        errorMessage: "eventsManagement.api_failure",
        errorDetail: createEventErrorDetails as ErrorCode,
      },
    ];

    toastConfigs.forEach(
      ({
        condition,
        successMessage,
        errorCondition,
        errorMessage,
        errorDetail,
      }) => {
        handleSuccessToast(condition, successMessage);
        handleErrorToast(errorCondition, errorMessage, errorDetail);
      },
    );
  };

  handleToasts();
  return (
    <>
      <Drawer
        width="w-[740px]"
        isOpen={addNewEventDrawer}
        onOpenChange={setAddNewEventDrawer}
        drawerTitle={t("eventsManagement.add_new_event") as string}
      >
        <EventManagementForm
          closeDrawer={() => {
            setAddNewEventDrawer(false);
            setChannelsTableDataEditMode([]);
            setSavedChannel([]);
            setSavedLanguage([]);
            setExtraChannels([]);
            setSelectedChannels([]);
            setViewEventId("");
            setAddExtraChannelBtn(false);
          }}
          mode="add"
        />
      </Drawer>
      <Drawer
        width="w-[740px]"
        isOpen={editTemplateDrawer}
        onOpenChange={setEditTemplateDrawer}
        drawerTitle={t("eventsManagement.edit_template") as string}
      >
        <EditTemplateForm closeDrawer={() => setEditTemplateDrawer(false)} />
      </Drawer>
      <Drawer
        width="w-[740px]"
        isOpen={editEventDrawer}
        onOpenChange={setEditEventDrawer}
        drawerTitle={t("eventsManagement.edit_event") as string}
      >
        {eventByIdData ? (
          <EventManagementForm
            mode="edit"
            closeDrawer={() => {
              setEditEventDrawer(false);
              setChannelsTableDataEditMode([]);
              setSavedChannel([]);
              setSavedLanguage([]);
              setExtraChannels([]);
              setSelectedChannels([]);
              setViewEventId("");
              setAddExtraChannelBtn(false);
            }}
            initialValues={mapEventInterfaceToInitialValues(
              eventByIdData as GetEventByIdInterface,
            )}
          />
        ) : (
          <></>
        )}
      </Drawer>

      <Drawer
        width="w-[740px]"
        isOpen={viewEventDrawer}
        onOpenChange={setViewEventDrawer}
        drawerTitle={t("eventsManagement.view_event") as string}
      >
        {eventByIdData ? (
          <EventManagementForm
            mode="view"
            closeDrawer={() => {
              setViewEventDrawer(false);
              setViewEventId("");
            }}
            initialValues={mapEventInterfaceToInitialValues(
              eventByIdData as GetEventByIdInterface,
            )}
          />
        ) : (
          <></>
        )}
      </Drawer>

      {isPopupOpen && (
        <ContextPopup
          option={popupType}
          eventCode={selectedEvent ? (selectedEvent.eventCode as string) : ""}
          onConfirm={() => {
            deleteNotificationEvent({
              id: selectedEvent?.eventCode as string,
            });
            setIsPopupOpen(false);
          }}
          onClose={() => {
            setIsPopupOpen(false);
          }}
          deleteConfirmLabel={t("eventsManagement.delete") as string}
        />
      )}

      <Drawer
        width="w-[630px]"
        isOpen={isEventFilterMenyOpen}
        onOpenChange={setIsEventFilterMenuOpen}
        drawerTitle={t("eventsManagement.filterMenu.filter")}
      >
        <>
          <EventFilterMenuForm
            closeDrawer={() => setIsEventFilterMenuOpen(false)}
            setSearchQuery={setSearchQuery}
            setEventGroupList={setEventGroupList}
            isEventGroupSuccess={isEventGroupSuccess}
            eventGroupData={eventGroupData}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            refetchEventsData={refetchEventsData}
            isEnglish={isEnglish}
            sourceSystemsMenu={sourceSystemsMenu}
            setIsButtonText={setIsButtonText}
            isButtonText={isButtonText}
          />
        </>
      </Drawer>
    </>
  );
}
