import { useContext, Context } from "react";
import { Drawer } from "eds-react";
import { useTranslation } from "react-i18next";
import {
  NotificationHistoryState,
  NotificationHistoryContext,
  NotificationHistoryDetailsForm,
  useNotificationHistoryForm,
} from "@ejada/screens/NotificationHistory";
import { NotificationHistoryForm } from "../NotificationHistoryFilter/NotificationHistoryFilterForm";
import { mapNotificationMessageInterfaceToInitialValues } from "../NotificationHistoryDetailsForm/utils";

export function NotificationHistoryModals() {
  const { t } = useTranslation();
  const {
    isFilterOpen,
    setIsFilterOpen,
    isDetailsFormOpen,
    setIsDetailsFormOpen,
    setSearchQuery,
    messageData,
    statusLogData,
    activeSearchCriteria,
    setActiveSearchCriteria,
  } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );
  const viewNotificationHistoryFormProps = useNotificationHistoryForm(
    () => setIsDetailsFormOpen(false),
    messageData && statusLogData
      ? mapNotificationMessageInterfaceToInitialValues(
          messageData,
          statusLogData,
        )
      : undefined,
  );
  return (
    <>
      <Drawer
        width="w-[621px]"
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        drawerTitle={t("notificationHistory.filterMenu.filter") as string}
      >
        <NotificationHistoryForm
          closeDrawer={() => setIsFilterOpen(false)}
          setSearchQuery={setSearchQuery}
          activeSearchCriteria={activeSearchCriteria}
          setActiveSearchCriteria={setActiveSearchCriteria}
        />
      </Drawer>

      <Drawer
        width="w-[740px]"
        isOpen={isDetailsFormOpen}
        onOpenChange={setIsDetailsFormOpen}
        drawerTitle={
          t("notificationHistory.notification_history_details") as string
        }
      >
        {messageData && statusLogData ? (
          <NotificationHistoryDetailsForm
            {...viewNotificationHistoryFormProps}
            onCancel={() => {
              setIsDetailsFormOpen(false);
            }}
            initialValues={
              messageData && statusLogData
                ? mapNotificationMessageInterfaceToInitialValues(
                    messageData,
                    statusLogData,
                  )
                : undefined
            }
          />
        ) : (
          <></>
        )}
      </Drawer>
    </>
  );
}
