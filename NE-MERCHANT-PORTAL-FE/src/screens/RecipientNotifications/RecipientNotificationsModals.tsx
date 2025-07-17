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
  getBulkNotificationErrorMessages,
  useErrorToast,
  useSuccessToast,
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
    requestSuccess,
    setActiveSearchCriteria,
    activeSearchCriteria,
    refetchEventsData,
    isEnglish,
    setIsButtonText,
    isButtonText,
    requestErrorData,
    setSelectedWhatsappTemplate,
  } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );

  // Only use .data if it exists, otherwise use an empty object
  const errorMessages = getBulkNotificationErrorMessages(
    (requestErrorData && "data" in requestErrorData
      ? requestErrorData.data
      : {}) as {
      invalidRequestDataErrors?: {
        errorCode: string;
        errorDescription: string;
      }[];
      invalidRecipientErrors?: {
        [key: string]: { errorCode: string; errorDescription: string }[];
      };
    },
  );
  const localizedErrorMessages = errorMessages.map((msg) => i18n.t(msg));
  const errorMessageString = localizedErrorMessages.join("\n");

  useErrorToast(
    errorMessages.length > 0,
    t("bulk-notifications.adhoc_fail"),
    errorMessageString,
  );

  useSuccessToast(
    requestSuccess && errorMessages.length === 0,
    t("bulk-notifications.adhoc_success") as string,
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
          closeDrawer={() => {
            setIsCreateAdhocMessageOpen(false);
            setSelectedWhatsappTemplate(null);
          }}
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
