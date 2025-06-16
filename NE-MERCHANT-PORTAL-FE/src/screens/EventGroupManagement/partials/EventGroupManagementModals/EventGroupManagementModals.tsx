import { useContext, Context } from "react";
import { Drawer } from "eds-react";
import { useTranslation } from "react-i18next";
import {
  EventGroupManagementContext,
  TEventGroupManagementState,
  useEventGroupManagement,
} from "@ejada/screens/EventGroupManagement";
import { EventGroupManagementForm } from "../EventGroupManagementForm/EventGroupManagementForm";
import { ContextPopup } from "@ejada/screens/shared/partials/PopUp/ContextPopup";
import {
  ErrorCode,
  getLocalizedErrorMessage,
  useErrorToast,
  useSuccessToast,
} from "@ejada/screens/shared";
import {
  EventGroupFilterForm,
  useEventGroupManagementForm,
} from "@ejada/screens/EventGroupManagement/partials";
import { mapEventGroupInterfaceToInitialValues } from "../EventGroupManagementForm/utils";
import { AxiosError } from "axios";
import i18n from "@ejada/common/locals/i18n";

export function EventGroupManagementModals() {
  const { t } = useTranslation();
  const {
    addNewEventGroupDrawer,
    setAddNewEventGroupDrawer,
    editEventGroupDrawer,
    setEditEventGroupDrawer,
    isDeletePopUpOpen,
    setIsDeletePopUpOpen,
    eventGroupId,
    //isDeleteEventGroupByIdError,
    isDeleteEventGroupByIdSuccess,
    deleteEventGroupById,
    isDeleteEventGroupByIdAxiosError,
    isCreateEventGroupSuccess,
    //isCreateEventGroupError,
    createEventGroupAxiosError,
    isEditEventGroupSuccess,
    //isEditEventGroupError,
    editEventGroupAxiosError,
    viewEventGroupDrawer,
    setIsViewEventGroupDrawer,
    isEventGroupFilterMenuOpen,
    setIsEventGroupFilterMenuOpen,
    setSearchQuery,
    activeSearchCriteria,
    setActiveSearchCriteria,
    sourceSystemsMenu,
    setEventGroupId,
  } = useContext<TEventGroupManagementState>(
    EventGroupManagementContext as Context<TEventGroupManagementState>,
  );
  const { eventGroupByIdData } = useEventGroupManagement();
  const successToast = useSuccessToast;
  const errorToast = useErrorToast;

  const handleSuccessToast = (condition: boolean, message: string) => {
    successToast(condition, t(message));
  };

  const handleErrorToast = (
    condition: boolean,
    message: string,
    errorDetail: AxiosError<unknown, unknown> | null | ErrorCode,
  ) => {
    errorToast(
      condition,
      t(message),
      getLocalizedErrorMessage(errorDetail, t(message) as string),
    );
  };
  const isRtl = i18n.language === "ar";
  // Handle success and error toasts
  const handleToasts = () => {
    const toastConfigs = [
      {
        condition: isDeleteEventGroupByIdSuccess,
        successMessage: "eventGroupManagement.deleted_successfully",
        errorCondition: isDeleteEventGroupByIdAxiosError?.message !== undefined,
        errorMessage: "eventGroupManagement.error_delete",
        errorDetail: isDeleteEventGroupByIdAxiosError as ErrorCode,
      },
      {
        condition: isCreateEventGroupSuccess,
        successMessage: "eventGroupManagement.create_event_group_success",
        errorCondition: createEventGroupAxiosError?.message !== undefined,
        errorMessage: "eventGroupManagement.create_event_group_fails",
        errorDetail: createEventGroupAxiosError as ErrorCode,
      },
      {
        condition: isEditEventGroupSuccess,
        successMessage: "eventGroupManagement.update_event_group_success",
        errorCondition: editEventGroupAxiosError?.message !== undefined,
        errorMessage: "eventGroupManagement.update_event_group_fails",
        errorDetail: editEventGroupAxiosError as ErrorCode,
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

  const createEventGroupFormProps = useEventGroupManagementForm(
    () => setAddNewEventGroupDrawer(false),
    "add",
    undefined,
  );

  const updateEventGroupFormProps = useEventGroupManagementForm(
    () => setEditEventGroupDrawer(false),
    "edit",
    eventGroupByIdData
      ? mapEventGroupInterfaceToInitialValues(eventGroupByIdData)
      : undefined,
  );

  const viewEventGroupFormProps = useEventGroupManagementForm(
    () => setIsViewEventGroupDrawer(false),
    "view",
    eventGroupByIdData
      ? mapEventGroupInterfaceToInitialValues(eventGroupByIdData)
      : undefined,
  );

  return (
    <>
      {isDeletePopUpOpen && (
        <ContextPopup
          option={"deleteEventGroup"}
          id={eventGroupId}
          onClose={() => {
            setIsDeletePopUpOpen(false);
          }}
          onConfirm={() => {
            deleteEventGroupById({
              id: eventGroupId as string,
            });

            setIsDeletePopUpOpen(false);
          }}
        />
      )}
      <Drawer
        width="w-[740px]"
        isOpen={addNewEventGroupDrawer}
        onOpenChange={setAddNewEventGroupDrawer}
        drawerTitle={t("eventGroupManagement.add_new_event") as string}
      >
        <EventGroupManagementForm
          {...createEventGroupFormProps}
          closeDrawer={() => {
            setAddNewEventGroupDrawer(false);
            setEventGroupId("");
          }}
          mode="add"
        />
      </Drawer>
      <Drawer
        width="w-[740px]"
        isOpen={editEventGroupDrawer}
        onOpenChange={setEditEventGroupDrawer}
        drawerTitle={t("eventGroupManagement.edit_event_group") as string}
      >
        {eventGroupByIdData ? (
          <EventGroupManagementForm
            {...updateEventGroupFormProps}
            closeDrawer={() => {
              setEditEventGroupDrawer(false);
              setEventGroupId("");
            }}
            mode="edit"
            initialValues={
              eventGroupByIdData
                ? mapEventGroupInterfaceToInitialValues(eventGroupByIdData)
                : undefined
            }
          />
        ) : (
          <></>
        )}
      </Drawer>
      <Drawer
        width="w-[740px]"
        isOpen={viewEventGroupDrawer}
        onOpenChange={setIsViewEventGroupDrawer}
        drawerTitle={t("eventGroupManagement.view_event_group") as string}
      >
        <>
          <button
            className={`position absolute -mt-7 ${isRtl ? "left-9" : "right-9"} top-16 font-readexProSemiBold600`}
            onClick={() => {
              setIsViewEventGroupDrawer(false);
              setEditEventGroupDrawer(true);
            }}
          >
            <div className="flex items-center">
              <span className="font-readexProMedium500 text-primary-blue pr-1">
                {t("eventsManagement.edit")}
              </span>
            </div>
          </button>
          {eventGroupByIdData ? (
            <EventGroupManagementForm
              {...viewEventGroupFormProps}
              closeDrawer={() => {
                setIsViewEventGroupDrawer(false);
                setEventGroupId("");
              }}
              mode="view"
              initialValues={
                eventGroupByIdData
                  ? mapEventGroupInterfaceToInitialValues(eventGroupByIdData)
                  : undefined
              }
            />
          ) : (
            <></>
          )}
        </>
      </Drawer>
      <Drawer
        width="w-[630px]"
        isOpen={isEventGroupFilterMenuOpen}
        onOpenChange={setIsEventGroupFilterMenuOpen}
        drawerTitle={t("eventGroupManagement.filter_menu.filter")}
      >
        <>
          <EventGroupFilterForm
            closeDrawer={() => setIsEventGroupFilterMenuOpen(false)}
            setSearchQuery={setSearchQuery}
            sourceSystemsMenu={sourceSystemsMenu}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
          />
        </>
      </Drawer>
    </>
  );
}
