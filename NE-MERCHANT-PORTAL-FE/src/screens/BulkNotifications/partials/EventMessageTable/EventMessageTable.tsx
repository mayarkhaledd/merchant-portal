import { EventsManagementTable } from "@ejada/screens";
import { useTranslation } from "react-i18next";
import { useEventsMessageTableColumns } from "./useEventsMessageTableColumns";
import { Context, useContext, useEffect, useLayoutEffect } from "react";
import { TBulkNotificationsState } from "../../BulkNotificationsManagement.types";
import { BulkNotificationsContext } from "../../BulkNotificationsProvider";
import { PagesName, QueryCosntant } from "@ejada/common";
import { Pagination } from "eds-react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export const EventsMessageTable = () => {
  const { t } = useTranslation();
  const EventsManagementColumns = useEventsMessageTableColumns();
  const {
    setIsEventFilterMenuOpen,
    isEventFilterMenuOpen,
    setSearchQuery,
    EventsManagementData,
    itemsPerPage,
    setItemsPerPage,
    totalListSize,
    currentPage,
    setCurrentPage,
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
  } = useContext<TBulkNotificationsState>(
    BulkNotificationsContext as Context<TBulkNotificationsState>,
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
            setIsEventFilterMenuOpen={setIsEventFilterMenuOpen}
            isEventFilterMenuOpen={isEventFilterMenuOpen}
            eventsManagementColumns={EventsManagementColumns}
            eventsManagementData={EventsManagementData}
            searchCriteriaPlaceHolder={
              t("bulk-notifications.searchPlaceHolder") as string
            }
            currentPageName={PagesName.BulkNotificationsPage}
            onSubmit={setSearchQuery}
            disablePagination
            refetchEventsData={refetchEventsData}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            setSearchQuery={setSearchQuery}
            isEnglish={isEnglish}
            allEventData={allEventData}
            refetchAllEventData={refetchAllEventData}
            isRefetchedDataError={isRefetchedDataError}
            errorMessage={errorMessage}
            isRefetchDataSuccess={isRefetchDataSuccess}
            eventsData={EventsData}
            searchQuery={searchQuery}
            prefix={"bulk-notifications"}
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
