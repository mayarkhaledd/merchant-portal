import { PagesName, QueryCosntant } from "@ejada/common";
import { useCustomerManagementColumns } from "./useCustomerManagementColumns";
import {
  ActiveSearchCriteria,
  CustomerManagementContext,
  Onboarding,
  SearchCriteria,
  TCustomerManagementState,
} from "@ejada/screens";
import { t } from "i18next";
import { Loader, PlusIcon } from "lucide-react";
import { Context, useContext, useEffect } from "react";
import { Pagination, Table } from "eds-react";
import { useQueryClient } from "@tanstack/react-query";
import { formateCustomersColumns } from "../../utils";
import { GetCustomersInterface } from "@ejada/types/api/customerManagementInterface";

export function CustomerManagementTable() {
  const tableColumns = useCustomerManagementColumns();
  const {
    setSearchQuery,
    setIsCreateCustomerOpen,
    setIsFilterOpen,
    totalListSize,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    CustomerManagementData,
    refetchCustomersData,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    allCustomersData,
    refetchAllCustomersData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    searchQuery,
    isButtonText,
    isGetCustomerLoading,
  } = useContext<TCustomerManagementState>(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (itemsPerPage || currentPage) {
      queryClient.invalidateQueries({
        queryKey: [QueryCosntant.CUSTOMERS, itemsPerPage, currentPage],
      });
    }
  }, [itemsPerPage, currentPage]);

  return (
    <>
      {isGetCustomerLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          <SearchCriteria
            searchContainerStyle="w-[100%]"
            buttonStyle="!bg-primary-blue !text-white !text-[14px] !font-readexProRegular"
            placeHolder={t("customer.search_placeholder") as string}
            currentPageName={PagesName.CustomerPage}
            onSubmit={setSearchQuery}
            setIsDrawerOpen={setIsFilterOpen}
            fileName={t("SearchCriteria.CustomersData")}
            exportData={
              allCustomersData
                ? formateCustomersColumns(
                    allCustomersData as GetCustomersInterface,
                  )
                : []
            }
            exportRefetchData={refetchAllCustomersData}
            isRefetchedDataError={isRefetchedDataError}
            errorMessage={errorMessage}
            isRefetchDataSuccess={isRefetchDataSuccess}
            exportSearchQuery={searchQuery}
            isEnglish={isEnglish}
            prefix={"customer"}
          />
          <ActiveSearchCriteria
            refetch={refetchCustomersData}
            setSearchQuery={setSearchQuery}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            currentPage="customer"
            isEnglish={isEnglish}
            isButtonText={isButtonText}
          />

          <div className="mt-[-2.25rem] w-full">
            <div className="-mx-4">
              {CustomerManagementData && CustomerManagementData?.length > 0 ? (
                <Table
                  backgroundColor="bg-transparent"
                  data={CustomerManagementData ? CustomerManagementData : []}
                  columns={tableColumns}
                  isColumnSelectorEnabled={false}
                  variants={"zebraStripe"}
                  disablePagination
                />
              ) : (
                <div className="mt-12 w-full items-center justify-center">
                  <Onboarding
                    message={t("customer.welcome_customer") as string}
                    title={t("customer.customer_message") as string}
                    onClick={() => {
                      setIsCreateCustomerOpen(true);
                    }}
                    buttonLabel={t("customer.new_customer") as string}
                    buttonIcon={<PlusIcon />}
                  />
                </div>
              )}
              {totalListSize > 0 && (
                <Pagination
                  items={CustomerManagementData ? CustomerManagementData : []}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  totalListSize={totalListSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
