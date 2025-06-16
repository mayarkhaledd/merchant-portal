import { PagesName } from "@ejada/common";
import {
  EventGroupManagementContext,
  TEventGroupManagementState,
  useEventGroupManagement,
  useEventGroupManagementTableColumns,
} from "@ejada/screens/EventGroupManagement";
import {
  ActiveSearchCriteria,
  Onboarding,
  SearchCriteria,
} from "@ejada/screens/shared";
import { Table, TTableColumns } from "eds-react";
import { Loader, PlusIcon } from "lucide-react";
import { Context, useContext } from "react";
import { useTranslation } from "react-i18next";
import { formateEventGroupColumns } from "./utils";
import { GetEventGroupInterface } from "@ejada/types/api/eventGroupsInterface";

export const EventGroupManagementTable = () => {
  const { t } = useTranslation();
  const EventsManagementColumns = useEventGroupManagementTableColumns();
  const { EventGroupManagementData } = useEventGroupManagement();
  const {
    setSearchQuery,
    setAddNewEventGroupDrawer,
    setIsEventGroupFilterMenuOpen,
    refetchEventGroup,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    sourceSystemsMenu,
    allEventGroupData,
    refetchAllEventGroupData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    isEventGroupSuccess,
    searchQuery,
    isButtonText,
    isGetEventGroupsLoading,
  } = useContext<TEventGroupManagementState>(
    EventGroupManagementContext as Context<TEventGroupManagementState>,
  );

  return (
    <>
      {isGetEventGroupsLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          <SearchCriteria
            searchContainerStyle="w-[100%]"
            buttonStyle="!bg-primary-blue !text-white !text-[14px] !font-readexProRegular"
            placeHolder={
              t("eventGroupManagement.search_criteria_placeholder") as string
            }
            currentPageName={PagesName.EventGroupManagement}
            onSubmit={setSearchQuery}
            setIsDrawerOpen={setIsEventGroupFilterMenuOpen}
            fileName={t("SearchCriteria.EventGroupsData")}
            exportData={
              allEventGroupData
                ? formateEventGroupColumns(
                    allEventGroupData as GetEventGroupInterface,
                  )
                : []
            }
            exportRefetchData={refetchAllEventGroupData}
            isRefetchedDataError={isRefetchedDataError}
            errorMessage={errorMessage}
            isRefetchDataSuccess={isRefetchDataSuccess}
            exportSearchQuery={searchQuery as TTableColumns}
            isEnglish={isEnglish}
            prefix="eventGroupManagement"
          />
          <ActiveSearchCriteria
            refetch={refetchEventGroup}
            setSearchQuery={setSearchQuery}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            sourceSystemsMenu={sourceSystemsMenu}
            currentPage="eventGroupManagement"
            isEnglish={isEnglish}
            isButtonText={isButtonText}
          />
          <div className="mt-[-2.25rem] w-full">
            <div className="-mx-4">
              {(EventGroupManagementData &&
                EventGroupManagementData?.length > 0 &&
                isEventGroupSuccess) ||
              isRefetchDataSuccess ? (
                <Table
                  data={
                    EventGroupManagementData ? EventGroupManagementData : []
                  }
                  columns={EventsManagementColumns}
                  isColumnSelectorEnabled={false}
                  variants="zebraStripe"
                  backgroundColor="bg-transparent"
                />
              ) : (
                <div className="mt-12 w-full items-center justify-center">
                  <Onboarding
                    message={
                      t("eventGroupManagement.welcome-message") as string
                    }
                    title={t("eventGroupManagement.title-message") as string}
                    onClick={() => {
                      setAddNewEventGroupDrawer(true);
                    }}
                    buttonLabel={
                      t("eventGroupManagement.button-message") as string
                    }
                    buttonIcon={<PlusIcon />}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
