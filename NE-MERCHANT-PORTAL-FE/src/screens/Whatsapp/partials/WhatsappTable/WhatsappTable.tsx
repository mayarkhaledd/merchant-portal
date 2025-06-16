import { PagesName } from "@ejada/common";
import {
  ActiveSearchCriteria,
  Onboarding,
  SearchCriteria,
} from "@ejada/screens/shared";
import { Table, TTableColumns } from "eds-react";
import { Context, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { formateWhatsappTemplatesColumns } from "../../utils";
import { useWhatsappManagementTableColumns } from "./useWhatsappManagementTableColumns";
import { TWhatsappState } from "../../Whatsapp.types";
import { WhatsappContext } from "../../WhatsappProvider";
import { GetWhatsappTemplatesInterface } from "@ejada/types/api/whatsappInterface";
import { Loader } from "lucide-react";

export const WhatsappTable = () => {
  const { t } = useTranslation();
  const WhatsappColumns = useWhatsappManagementTableColumns();
  const {
    setSearchQuery,
    setIsWhatsappFilterMenuOpen,
    refetchWhatsappTemplates,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    allWhatsappTemplatesData,
    refetchAllWhatsappTemplatesData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    //isWhatsappTemplatesSuccess,
    searchQuery,
    whatsappTemplatesManegementData,
    isButtonText,
    isGetWhatsappTemplatesLoading,
    itemsPerPage,
    currentPage,
    isWhatsappTemplatesSuccess,
  } = useContext<TWhatsappState>(WhatsappContext as Context<TWhatsappState>);

  useEffect(() => {
    if (itemsPerPage || currentPage) {
      refetchWhatsappTemplates?.();
    }
  }, [itemsPerPage, currentPage]);
  return (
    <>
      {isGetWhatsappTemplatesLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          <SearchCriteria
            searchContainerStyle="w-[100%]"
            buttonStyle="!bg-primary-blue !text-white !text-[14px] !font-readexProRegular"
            placeHolder={t("whatsapp.search_criteria_placeholder") as string}
            currentPageName={PagesName.Whatsapp}
            onSubmit={setSearchQuery}
            setIsDrawerOpen={setIsWhatsappFilterMenuOpen}
            fileName={t("SearchCriteria.WhatsappData")}
            exportData={
              allWhatsappTemplatesData
                ? formateWhatsappTemplatesColumns(
                    allWhatsappTemplatesData as GetWhatsappTemplatesInterface,
                  )
                : []
            }
            exportRefetchData={refetchAllWhatsappTemplatesData}
            isRefetchedDataError={isRefetchedDataError}
            errorMessage={errorMessage}
            isRefetchDataSuccess={isRefetchDataSuccess}
            exportSearchQuery={searchQuery as TTableColumns}
            isEnglish={isEnglish}
            prefix="whatsapp"
          />
          <ActiveSearchCriteria
            refetch={refetchWhatsappTemplates}
            setSearchQuery={setSearchQuery}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
            currentPage="whatsapp"
            isEnglish={isEnglish}
            isButtonText={isButtonText}
          />
          <div className="mt-[-2.25rem] w-full">
            <div className="-mx-4">
              {whatsappTemplatesManegementData &&
            whatsappTemplatesManegementData?.length > 0 &&
            (isWhatsappTemplatesSuccess || isRefetchDataSuccess) ?(
                <Table
                  data={
                    whatsappTemplatesManegementData
                      ? whatsappTemplatesManegementData
                      : []
                  }
                  columns={WhatsappColumns}
                  isColumnSelectorEnabled={false}
                  variants="zebraStripe"
                  backgroundColor="bg-transparent"
                />
              ) : (
                <div className="mt-12 w-full items-center justify-center">
                  <Onboarding
                    onClick={() => {}}
                    title={t("whatsapp.no_data_found")}
                    message={t("whatsapp.there_is_no_data_found")}
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
