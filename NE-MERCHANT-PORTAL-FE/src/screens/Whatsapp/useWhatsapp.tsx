import {
  useCreateWhatsappTemplate,
  useDeleteWhatsappTemplateById,
  useGetWhatsappTemplateById,
  useGetWhatsappTemplates,
  useUpdateWhatsappTemplate,
} from "@ejada/providers/whatsappProvider";
import { GetWhatsappTemplatesPayload } from "@ejada/types/api/whatsappInterface";
//import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { formatToSelectSearch } from "../shared";
import { SelectSearchList } from "../CustomerManagement";
import { TTableColumns } from "eds-react";
import { formateWhatsappTemplatesColumns } from "./utils";
import { toast } from "react-toastify";
import i18n from "@ejada/common/locals/i18n";
import { Notification } from "eds-react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export const useWhatsapp = () => {
  const { templateId } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [isButtonText, setIsButtonText] = useState<boolean>(false);
  const [templateType, setTemplateType] = useState<string>("");
  const [whatsappTemplatesList, setWhatsappTemplatesList] = useState<
    SelectSearchList[]
  >([]);
  const [isWhatsappFilterMenuOpen, setIsWhatsappFilterMenuOpen] =
    useState(false);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<
    Partial<GetWhatsappTemplatesPayload>
  >({});
  const [whatsappTemplateId, setWhatsappTemplateId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<
    boolean | Partial<GetWhatsappTemplatesPayload>
  >(false);
  const [whatsappTemplatesManegementData, setWhatsappTemplatesManegementData] =
    useState<TTableColumns[]>([]);

  const whatsappTemplatesPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  };

  const allWhatsappTemplatesPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    limit: 1000000,
    offset: 0,
  };

  const {
    updatedData: whatsappTemplatesData,
    isSuccess: isWhatsappTemplatesSuccess,
    isError: isWhatsappTemplatesError,
    refetch: refetchWhatsappTemplates,
    isLoading: isGetWhatsappTemplatesLoading,
  } = useGetWhatsappTemplates(
    {
      ...whatsappTemplatesPayload,
      ...(searchQuery && typeof searchQuery === "object" && searchQuery),
    },
    false,
  );

  //to get all data for exporting
  const {
    updatedData: allWhatsappTemplatesData,
    refetch: refetchAllWhatsappTemplatesData,
    isError: isRefetchedDataError,
    isSuccess: isRefetchDataSuccess,
    error: errorMessage,
  } = useGetWhatsappTemplates(
    {
      ...allWhatsappTemplatesPayload,
      ...(searchQuery && typeof searchQuery === "object" && searchQuery),
    },
    false,
  );
  const {
    mutate: deleteWhatsappTemplateById,
    isSuccess: isDeleteWhatsappTemplateByIdSuccess,
    isError: isDeleteWhatsappTemplateByIdError,
    error: isDeleteWhatsappTemplateByIdAxiosError,
  } = useDeleteWhatsappTemplateById();

  const {
    updatedData: whatsappTemplateByIdData,
    isError: isGetWhatsappTemplateByIdError,
    error: getWhatsappTemplateByIdError,
    refetch: refetchWhatsappTemplateById,
    isLoading: isGetWhatsappTemplateByIdLoading,
  } = useGetWhatsappTemplateById(
    {
      templateId: whatsappTemplateId,
    },
    false,
    //whatsappTemplateId !== "",
  );

  const {
    mutate: createWhatsappTemplate,
    isSuccess: isCreateWhatsappTemplateSuccess,
    isError: isCreateWhatsappTemplateError,
    error: isCreateWhatsappTemplateAxiosError,
  } = useCreateWhatsappTemplate();

  const {
    mutate: updateWhatsappTemplate,
    isSuccess: isUpdateWhatsappTemplateSuccess,
    isError: isUpdateWhatsappTemplateError,
    error: isUpdateWhatsappTemplateAxiosError,
  } = useUpdateWhatsappTemplate();

  useEffect(() => {
    if (searchQuery && typeof searchQuery === "object") {
      setActiveSearchCriteria(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("userLanguage");
    setIsEnglish(currentLanguage === "en" ? true : false);
  }, []);

  useEffect(() => {
    if (
      whatsappTemplatesData &&
      whatsappTemplatesData?.templates.length > 0 &&
      isWhatsappTemplatesSuccess
    ) {
      const whatsappTemplatesList = formatToSelectSearch(
        whatsappTemplatesData.templates,
        "templateName",
        "templateName",
      );
      setWhatsappTemplatesList(whatsappTemplatesList);
      setTotalListSize(Number(whatsappTemplatesData.templates.length));
      setWhatsappTemplatesManegementData(
        formateWhatsappTemplatesColumns(whatsappTemplatesData),
      );
    }
  }, [whatsappTemplatesData]);

  useEffect(() => {
    if (
      isUpdateWhatsappTemplateSuccess ||
      isCreateWhatsappTemplateSuccess ||
      isDeleteWhatsappTemplateByIdSuccess
    ) {
      refetchWhatsappTemplates?.();
    }
  }, [
    isUpdateWhatsappTemplateSuccess,
    isCreateWhatsappTemplateSuccess,
    isDeleteWhatsappTemplateByIdSuccess,
  ]);

  useEffect(() => {
    if (
      whatsappTemplateId !== ""
      //  && refetchWhatsappTemplateById
    ) {
      refetchWhatsappTemplateById?.();
    }
  }, [whatsappTemplateId]);

  useEffect(() => {
    if (templateId) {
      setWhatsappTemplateId(templateId);
    }
  }, [templateId]);

  useEffect(() => {
    if (
      searchQuery &&
      typeof searchQuery == "object" &&
      refetchWhatsappTemplates
    ) {
      // @ts-expect-error: refetch does not return a Promise, suppressing type error
      refetchWhatsappTemplates().then((result) => {
        if (result.status !== "success") {
          const queryValue = Object.values(searchQuery)[0];
          toast.dark(
            <Notification
              title={i18n.t("whatsapp.something_went_wrong") as string}
              body={`${i18n.t("whatsapp.there_is_no_data_with")} ${queryValue}`}
              option="fail"
            />,
            {
              position: toast.POSITION.TOP_RIGHT,
            },
          );
        }
      });
    }
  }, [refetchWhatsappTemplates, searchQuery]);

  return {
    setPopupType,
    setIsPopupOpen,
    isPopupOpen,
    popupType,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalListSize,
    setTotalListSize,
    isWhatsappFilterMenuOpen,
    setIsWhatsappFilterMenuOpen,
    whatsappTemplateId,
    setWhatsappTemplateId,
    whatsappTemplatesData,
    isWhatsappTemplatesSuccess,
    isWhatsappTemplatesError,
    refetchWhatsappTemplates,
    searchQuery,
    setSearchQuery,
    isEnglish,
    setIsEnglish,
    whatsappTemplatesList,
    whatsappTemplatesManegementData,
    isRefetchedDataError,
    isRefetchDataSuccess,
    errorMessage,
    activeSearchCriteria,
    setActiveSearchCriteria,
    setIsDeletePopUpOpen,
    isDeletePopUpOpen,
    setWhatsappTemplatesList,
    setWhatsappTemplatesManegementData,
    allWhatsappTemplatesData,
    refetchAllWhatsappTemplatesData,
    deleteWhatsappTemplateById,
    isDeleteWhatsappTemplateByIdSuccess,
    isDeleteWhatsappTemplateByIdError,
    isDeleteWhatsappTemplateByIdAxiosError,
    templateType,
    setTemplateType,
    isButtonText,
    setIsButtonText,
    isGetWhatsappTemplatesLoading,
    isGetWhatsappTemplateByIdLoading,
    whatsappTemplateByIdData,
    isGetWhatsappTemplateByIdError,
    getWhatsappTemplateByIdError,
    refetchWhatsappTemplateById,
    createWhatsappTemplate,
    isCreateWhatsappTemplateSuccess,
    isCreateWhatsappTemplateError,
    isCreateWhatsappTemplateAxiosError,
    updateWhatsappTemplate,
    isUpdateWhatsappTemplateSuccess,
    isUpdateWhatsappTemplateError,
    isUpdateWhatsappTemplateAxiosError,
  };
};
