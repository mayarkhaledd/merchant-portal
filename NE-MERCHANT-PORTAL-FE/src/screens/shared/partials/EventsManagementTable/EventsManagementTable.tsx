import {
  ActiveSearchCriteria,
  Onboarding,
  SearchCriteria,
} from "@ejada/screens/shared";
import { Table } from "eds-react";
import { EventManagementTableProps } from "./EventManagementTableTypes";
import { formateEventsColumns } from "@ejada/screens/EventsManagement/utils";
import { NotificationEventInterface } from "@ejada/types/api/notificationEventsInterface";
import { t } from "i18next";

export const EventsManagementTable: React.FC<EventManagementTableProps> = ({
  eventsManagementColumns,
  eventsManagementData,
  searchCriteriaPlaceHolder,
  setIsEventFilterMenuOpen,
  currentPageName,
  onSubmit = () => {},
  disablePagination,
  refetchEventsData,
  activeSearchCriteria,
  setActiveSearchCriteria,
  setSearchQuery,
  isEnglish,
  sourceSystemsMenu,
  allEventData,
  refetchAllEventData,
  isRefetchedDataError,
  errorMessage,
  isRefetchDataSuccess,
  searchQuery,
  prefix,
  isButtonText,
}) => {
  return (
    <>
      <SearchCriteria
        searchContainerStyle="w-[100%]"
        buttonStyle="!bg-primary-blue !text-white !text-[14px] !font-readexProRegular"
        placeHolder={searchCriteriaPlaceHolder}
        setIsDrawerOpen={setIsEventFilterMenuOpen}
        currentPageName={currentPageName}
        onSubmit={onSubmit}
        fileName={t("SearchCriteria.EventsData")}
        exportData={
          allEventData
            ? formateEventsColumns(allEventData as NotificationEventInterface)
            : []
        }
        exportRefetchData={refetchAllEventData}
        isRefetchedDataError={isRefetchedDataError as boolean}
        errorMessage={errorMessage ? errorMessage : null}
        isRefetchDataSuccess={isRefetchDataSuccess as boolean}
        exportSearchQuery={searchQuery ? searchQuery : {}}
        isEnglish={isEnglish}
        prefix={prefix ? prefix : ""}
      />
      <ActiveSearchCriteria
        refetch={refetchEventsData}
        setSearchQuery={setSearchQuery}
        activeSearchCriteria={activeSearchCriteria}
        setActiveSearchCriteria={setActiveSearchCriteria}
        sourceSystemsMenu={sourceSystemsMenu}
        currentPage="eventsManagement"
        isEnglish={isEnglish}
        isButtonText={isButtonText}
      />
      <div className="mt-[-2.25rem] w-full">
        <div className="-mx-4">
          {eventsManagementData && eventsManagementData?.length > 0 ? (
            <>
              <Table
                data={eventsManagementData ? eventsManagementData : []}
                columns={eventsManagementColumns ?? []}
                isColumnSelectorEnabled={false}
                variants="zebraStripe"
                backgroundColor="bg-transparent"
                enableSettingsColCustomization
                confirmLabel={t("eventsManagement.save") as string}
                popoverHeader={t("eventsManagement.customize_table") as string}
                infoText={t("eventsManagement.setting_title") as string}
                showHideTitle={t("eventsManagement.show_hide_col") as string}
                columnNameTitle={t("eventsManagement.col_name") as string}
                sortTitle={t("eventsManagement.sort") as string}
                disablePagination={disablePagination}
              />
            </>
          ) : (
            <div className="mt-12 w-full items-center justify-center">
              <Onboarding
                onClick={() => {}}
                title={t("eventsManagement.no_data_found")}
                //buttonLabel={t("eventsManagement.add_new_event") as string}
                message={t("eventsManagement.there_is_no_data_found")}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
