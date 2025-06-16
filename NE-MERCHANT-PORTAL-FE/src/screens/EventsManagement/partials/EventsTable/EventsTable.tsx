import { PagesName, QueryCosntant } from "@ejada/common";
import {
  EventsManagementContext,
  TEventsManagementState,
  useEventsManagementTableColumns,
} from "@ejada/screens/EventsManagement";
import { EventsManagementTable } from "@ejada/screens/shared";
import { Context, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "eds-react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export const EventsTable = () => {
  const { t } = useTranslation();
  const EventsManagementColumns = useEventsManagementTableColumns();
  const {
    isEventFilterMenyOpen,
    setIsEventFilterMenuOpen,
    //setAddNewEventDrawer,
    setSearchQuery,
    totalListSize,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    EventsManagementData,
    refetchEventsData,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    sourceSystemsMenu,
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
  } = useContext<TEventsManagementState>(
    EventsManagementContext as Context<TEventsManagementState>,
  );

  const queryClient = useQueryClient();

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
            isEventFilterMenuOpen={isEventFilterMenyOpen}
            setIsEventFilterMenuOpen={setIsEventFilterMenuOpen}
            setSearchQuery={setSearchQuery}
            eventsManagementColumns={EventsManagementColumns}
            eventsManagementData={EventsManagementData}
            searchCriteriaPlaceHolder={
              t("eventsManagement.search_criteria_placeholder") as string
            }
            currentPageName={PagesName.EventsManagementPage}
            onSubmit={setSearchQuery}
            disablePagination
            refetchEventsData={refetchEventsData}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            isEnglish={isEnglish}
            sourceSystemsMenu={sourceSystemsMenu}
            allEventData={allEventData}
            refetchAllEventData={refetchAllEventData}
            isRefetchedDataError={isRefetchedDataError}
            errorMessage={errorMessage}
            isRefetchDataSuccess={isRefetchDataSuccess}
            eventsData={EventsData}
            searchQuery={searchQuery}
            prefix={"eventsManagement"}
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
