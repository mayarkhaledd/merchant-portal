import { EventsManagementTable } from "@ejada/screens";
import { useTranslation } from "react-i18next";
import { useEventsMessageTableColumns } from "./useEventsMessageTableColumns";
import { TRecipientNotificationsState } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { useContext, Context, useEffect, useLayoutEffect } from "react";
import { RecipientNotificationsContext } from "@ejada/screens/RecipientNotifications/RecipientNotificationsProvider";
import { PagesName, QueryCosntant } from "@ejada/common";
import { Pagination } from "eds-react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export const RecipientEventTable = () => {
  const { t } = useTranslation();
  const EventsManagementColumns = useEventsMessageTableColumns();
  const {
    setIsEventFilterMenuOpen,
    isEventFilterMenuOpen,
    setSearchQuery,
    itemsPerPage,
    totalListSize,
    setCurrentPage,
    currentPage,
    setItemsPerPage,
    EventsManagementData,
    setIsFetchingEventsEnabled,
    refetchEventsData,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    allEventData,
    refetchAllEventData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    EventsData,
    searchQuery,
    isButtonText,
    setIsButtonText,
    isGetEventsDataLoading,
  } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );
  const queryClient = useQueryClient();
  useLayoutEffect(() => {
    setIsFetchingEventsEnabled(true); // Enable fetching only after mounting
  }, []);

  useEffect(() => {
    if (itemsPerPage || currentPage) {
      queryClient.invalidateQueries({
        queryKey: [QueryCosntant.EVENTS, itemsPerPage, currentPage],
      });
    }
  }, [itemsPerPage, currentPage]);

  return (
    <>
      {isGetEventsDataLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          <EventsManagementTable
            isEventFilterMenuOpen={isEventFilterMenuOpen}
            setIsEventFilterMenuOpen={setIsEventFilterMenuOpen}
            eventsManagementColumns={EventsManagementColumns}
            eventsManagementData={EventsManagementData}
            isSendNotificationFilter={true}
            searchCriteriaPlaceHolder={
              t("recipient_notifications.search_criteria_placeholder") as string
            }
            currentPageName={PagesName.RecipientManagementPage}
            onSubmit={setSearchQuery}
            disablePagination
            setSearchQuery={setSearchQuery}
            refetchEventsData={refetchEventsData}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            isEnglish={isEnglish}
            allEventData={allEventData}
            refetchAllEventData={refetchAllEventData}
            isRefetchedDataError={isRefetchedDataError}
            errorMessage={errorMessage}
            isRefetchDataSuccess={isRefetchDataSuccess}
            eventsData={EventsData}
            searchQuery={searchQuery}
            prefix={"recipient_notifications"}
            isButtonText={isButtonText}
            setIsButtonText={setIsButtonText}
          />
          {totalListSize > 0 && (
            <Pagination
              items={EventsManagementData ? EventsManagementData : []}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalListSize={totalListSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </>
  );
};
