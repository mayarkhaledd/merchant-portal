import { Context, useContext } from "react";

import { Drawer } from "eds-react";
import { TRecipientNotificationsState } from "./RecipientNotifications.types";
import { CreateAdhocMessage } from "./partials/CreateAdhocMessage";
import i18n from "@ejada/common/locals/i18n";
import { RecipientNotificationsContext } from "./RecipientNotificationsProvider";
import { CreateEventMessage } from "./partials/CreateEventMessage";
import { t } from "i18next";
import { EventFilterMenuForm } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuForm";
import {
  getLocalizedErrorMessage,
  useErrorToast,
  useSuccessToast,
  ErrorCode,
} from "@ejada/screens/shared";

export const RecipientNotificationsModals = () => {
  const {
    isCreateAdhocMessageOpen,
    setIsCreateAdhocMessageOpen,
    isSendEventMessageOpen,
    setIsSendEventMessageOpen,
    isEventFilterMenuOpen,
    setIsEventFilterMenuOpen,
    setSearchQuery,
    setEventGroupList,
    isEventGroupSuccess,
    eventGroupData,
    //requestError,
    requestSuccess,
    requestErrorMessage,
    setActiveSearchCriteria,
    activeSearchCriteria,
    refetchEventsData,
    isEnglish,
    setIsButtonText,
    isButtonText,
  } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );
  useSuccessToast(requestSuccess, t("bulk-notifications.adhoc_success"));

  useErrorToast(
    requestErrorMessage?.message !== undefined,
    t("bulk-notifications.adhoc_fail"),
    getLocalizedErrorMessage(
      requestErrorMessage as ErrorCode,
      t("bulk-notifications.adhoc_fail") as string,
    ),
  );

  return (
    <>
      <Drawer
        width="w-[630px]"
        isOpen={isEventFilterMenuOpen}
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
            isSendNotificationFilter={true}
            refetchEventsData={refetchEventsData}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            isEnglish={isEnglish}
            setIsButtonText={setIsButtonText}
            isButtonText={isButtonText}
          />
        </>
      </Drawer>
      <Drawer
        width="w-[740px]"
        isOpen={isCreateAdhocMessageOpen}
        onOpenChange={setIsCreateAdhocMessageOpen}
        drawerTitle={i18n.t("bulk-notifications.send_adhoc") as string}
      >
        <CreateAdhocMessage
          closeDrawer={() => setIsCreateAdhocMessageOpen(false)}
        />
      </Drawer>

      <Drawer
        width="w-[740px]"
        isOpen={isSendEventMessageOpen}
        onOpenChange={setIsSendEventMessageOpen}
        drawerTitle={i18n.t("bulk-notifications.send_event") as string}
      >
        <CreateEventMessage
          closeDrawer={() => setIsSendEventMessageOpen(false)}
        />
      </Drawer>
    </>
  );
};
