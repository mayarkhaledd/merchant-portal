import { Context, useContext } from "react";

import { Drawer } from "eds-react";
import { TBulkNotificationsState } from "./BulkNotificationsManagement.types";
import { BulkNotificationsContext } from "./BulkNotificationsProvider";
import { CreateMessageForm } from "./partials/BulkNotificationForm";
import i18n from "@ejada/common/locals/i18n";
import { EventFilterMenuForm } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuForm";
import { useTranslation } from "react-i18next";
import { getBulkNotificationErrorMessages } from "@ejada/screens/shared/utils";
import { useErrorToast, useSuccessToast } from "../shared";
export const BulkNotificationsModals = () => {
  const { t } = useTranslation();
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
  } = useContext<TBulkNotificationsState>(
    BulkNotificationsContext as Context<TBulkNotificationsState>,
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
        <CreateMessageForm
          closeDrawer={() => setIsCreateAdhocMessageOpen(false)}
          mode="adhoc"
        />
      </Drawer>

      <Drawer
        width="w-[740px]"
        isOpen={isSendEventMessageOpen}
        onOpenChange={setIsSendEventMessageOpen}
        drawerTitle={i18n.t("bulk-notifications.send_event") as string}
      >
        <CreateMessageForm
          closeDrawer={() => setIsSendEventMessageOpen(false)}
          mode="event"
        />
      </Drawer>
    </>
  );
};
