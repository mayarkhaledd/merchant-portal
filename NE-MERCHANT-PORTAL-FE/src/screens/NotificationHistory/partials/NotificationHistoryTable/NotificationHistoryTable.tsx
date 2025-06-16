import {
  ActiveSearchCriteria,
  Onboarding,
  SearchCriteria,
} from "@ejada/screens/shared";
import { Pagination, Table } from "eds-react";
import { useTranslation } from "react-i18next";
// import { TEventsManagementState, EventsManagementContext } from "@ejada/screens/EventsManagement";

import {
  useNotificationHistoryColumns,
  NotificationHistoryState,
  NotificationHistoryContext,
  formatNotificationHistoryColumns,
} from "@ejada/screens/NotificationHistory";
import { Context, useContext } from "react";
import { PagesName } from "@ejada/common";
import { NotificationMessagesInterface } from "@ejada/types/api/notificationHistoryInterface";
import { Loader } from "lucide-react";

export const NotificationHistoryTable = () => {
  const { t } = useTranslation();
  const NotificationHistoryColumns = useNotificationHistoryColumns();
  const {
    setSearchQuery,
    setIsFilterOpen,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalListSize,
    notificationHistoryData,
    refetchMessageListData,
    activeSearchCriteria,
    setActiveSearchCriteria,
    sourceSystemsMenu,
    isEnglish,
    allMessagesData,
    refetchAllMessagesData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    searchQuery,
    isButtonText,
    isGetNotificationMessagesLoading,
  } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );

  return (
    <>
      {isGetNotificationMessagesLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          <SearchCriteria
            searchContainerStyle="w-[100%]"
            buttonStyle="!bg-primary-blue !text-white !text-[14px] !font-readexProRegular"
            placeHolder={t("notificationHistory.search") as string}
            setIsDrawerOpen={setIsFilterOpen}
            currentPageName={PagesName.NotificationHistory}
            onSubmit={setSearchQuery}
            fileName={t("SearchCriteria.NotificationHistoryData")}
            exportData={
              allMessagesData
                ? formatNotificationHistoryColumns(
                    allMessagesData as NotificationMessagesInterface,
                  )
                : []
            }
            exportRefetchData={refetchAllMessagesData}
            isRefetchedDataError={isRefetchedDataError}
            errorMessage={errorMessage}
            isRefetchDataSuccess={isRefetchDataSuccess}
            exportSearchQuery={searchQuery}
            isEnglish={isEnglish}
            prefix={"notificationHistory"}
          />
          <ActiveSearchCriteria
            refetch={refetchMessageListData}
            setSearchQuery={setSearchQuery}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            sourceSystemsMenu={sourceSystemsMenu}
            currentPage="notificationHistory"
            isEnglish={isEnglish}
            isButtonText={isButtonText}
          />
          <div className="mt-[-2.25rem] w-full">
            <div className="-mx-4">
              {notificationHistoryData.length > 0 ? (
                <Table
                  data={notificationHistoryData ? notificationHistoryData : []}
                  columns={NotificationHistoryColumns}
                  isColumnSelectorEnabled={false}
                  variants="zebraStripe"
                  backgroundColor="bg-transparent"
                  disablePagination
                />
              ) : (
                <div className="mt-12 w-full items-center justify-center">
                  <Onboarding
                    message={t("notificationHistory.notifications_message")}
                    onClick={() => {}}
                    title={t("notificationHistory.welcome_notifications")}
                  />
                </div>
              )}
            </div>
          </div>
          {totalListSize > 0 && (
            <Pagination
              items={notificationHistoryData ? notificationHistoryData : []}
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
