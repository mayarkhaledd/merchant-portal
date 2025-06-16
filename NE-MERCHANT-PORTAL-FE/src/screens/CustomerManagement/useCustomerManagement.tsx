import { useEffect, useState } from "react";
import { formateCustomersColumns } from "@ejada/screens/CustomerManagement/utils";
import {
  useGetCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
  useUpdateCustomerStatus,
  useGetCustomer,
} from "@ejada/providers/customerProvider";
import { TTableColumns, Notification } from "eds-react";
import { formatToSelectSearch } from "../shared";
import {
  CustomerInterface,
  GetCustomersPayload,
} from "@ejada/types/api/customerManagementInterface";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import i18n from "@ejada/common/locals/i18n";
import { SelectSearchList } from "@ejada/screens";
import { useGetLookUpParameters } from "@ejada/providers";

export const useCustomerManagement = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customerId, setCustomerId] = useState<number>(-1);
  const [CustomerManagementData, setCustomerManagementData] = useState<
    TTableColumns[]
  >([]);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] =
    useState<boolean>(false);
  const [isUpdateCustomerOpen, setIsUpdateCustomerOpen] =
    useState<boolean>(false);
  const [rowData, setRowData] = useState<
    CustomerInterface | undefined | null
  >();
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<
    Partial<GetCustomersPayload> | boolean
  >(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);
  const [IsPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [PopupType, setPopupType] = useState<string>("");
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<TTableColumns | undefined>();
  const [isEditable, setIsEditable] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<SelectSearchList>({
    id: "",
    label: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editTemplateInsertParameter, setEditTemplateInsertParameter] =
    useState<SelectSearchList[]>([]);
  const [customerParameterList, setCustomerParameterList] = useState<
    SelectSearchList[]
  >([]);
  const [customerList, setCustomerList] = useState<SelectSearchList[]>([]);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<
    Partial<GetCustomersPayload>
  >({});
  const [isButtonText, setIsButtonText] = useState(false);
  const getCustomersPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  };

  const getAllDataPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    limit: 1000000,
    offset: 0,
  };

  const {
    updatedData: CustomersData,
    refetch: refetchCustomersData,
    isError: isGetCustomersDataError,
    isSuccess: isGetCustomersDataSuccess,
    isLoading: isGetCustomerLoading,
  } = useGetCustomers(
    {
      ...getCustomersPayload,
      ...(searchQuery && typeof searchQuery === "object" && searchQuery),
    },
    true,
  );

  //to get all data for exporting
  const {
    updatedData: allCustomersData,
    refetch: refetchAllCustomersData,
    isError: isRefetchedDataError,
    isSuccess: isRefetchDataSuccess,
    error: errorMessage,
  } = useGetCustomers(
    {
      ...getAllDataPayload,
      ...(searchQuery && typeof searchQuery === "object" && searchQuery),
    },
    false,
  );

  const {
    mutate: createNewCustomer,
    data: addCustomerData,
    isError: isCreateCustomerError,
    isSuccess: isCreateCustomerSuccess,
    error: createCustomerErrorDetails,
  } = useCreateCustomer();

  const {
    mutate: updateCustomer,
    isError: IsEditCustomerError,
    isSuccess: isEditCustomerSuccess,
    error: editCustomerErrorDetails,
  } = useUpdateCustomer();

  const {
    mutate: deleteCustomer,
    isSuccess: isDeleteCustomerSuccess,
    isError: isDeleteCustomerError,
    error: deleteCustomerErrorDetails,
    data: deleteCustomerData,
  } = useDeleteCustomer();

  const {
    mutate: updateStatus,
    isError: isUpdateStatusError,
    isSuccess: isUpdateStatusSuccess,
    error: updateStatusError,
  } = useUpdateCustomerStatus();

  const {
    updatedData: viewCustomerData,
    isStale,
    refetch,
    isError: IsViewCustomerError,
    isSuccess: IsViewCustomerSuccess,
    error: viewCustomerErrorDetails,
  } = useGetCustomer({ customerId: customerId }, customerId !== -1);

  const {
    updatedData: customerParameters,
    isSuccess: isCustomertParametersSuccess,
    refetch: refetchCustomerParameters = () => {},
  } = useGetLookUpParameters(false);

  useEffect(() => {
    if (customerId !== -1 && refetch) {
      refetch();
    }
  }, [customerId]);

  useEffect(() => {
    if (CustomersData) {
      setTotalListSize(Number(CustomersData.totalElements));
      setCustomerManagementData(formateCustomersColumns(CustomersData));
    }
  }, [CustomersData]);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("userLanguage");
    setIsEnglish(currentLanguage === "en" ? true : false);
  }, []);

  useEffect(() => {
    if (
      CustomersData?.customers.length &&
      CustomersData?.customers &&
      isGetCustomersDataSuccess
    ) {
      const customerList = formatToSelectSearch(
        CustomersData.customers,
        "customerId",
        "customerId",
      );
      setCustomerList(customerList);
    }
  }, [CustomersData]);

  useEffect(() => {
    if (searchQuery && typeof searchQuery === "object") {
      setActiveSearchCriteria(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery && typeof searchQuery == "object" && refetchCustomersData) {
      setCurrentPage(1);
      if (currentPage === 1) {
        // @ts-expect-error: refetch does not return a Promise, suppressing type error
        refetchCustomersData().then((result) => {
          if (result.status !== "success") {
            const queryValue = Object.values(searchQuery)[0];
            toast.dark(
              <Notification
                title={i18n.t("customer.something_went_wrong") as string}
                body={`${i18n.t("customer.there_is_no_data_with")} ${queryValue}`}
                option="fail"
              />,
              {
                position: toast.POSITION.TOP_RIGHT,
              },
            );
          }
        });
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    if (
      (isCreateCustomerOpen ||
        isUpdateCustomerOpen ||
        isViewDetailsOpen ||
        IsPopUpOpen) &&
      searchQuery &&
      typeof searchQuery == "object"
    ) {
      setSearchQuery(false);
    }
  }, [
    isCreateCustomerOpen,
    isUpdateCustomerOpen,
    isViewDetailsOpen,
    IsPopUpOpen,
    searchQuery,
  ]);

  useEffect(() => {
    if (
      isEditCustomerSuccess ||
      isCreateCustomerSuccess ||
      isDeleteCustomerSuccess ||
      isUpdateStatusSuccess
    ) {
      refetchCustomersData?.();
    }
  }, [
    isEditCustomerSuccess,
    isCreateCustomerSuccess,
    isDeleteCustomerSuccess,
    isUpdateStatusSuccess,
  ]);

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalListSize,
    setTotalListSize,
    searchQuery,
    setSearchQuery,
    CustomerManagementData,
    isGetCustomersDataError,
    isGetCustomersDataSuccess,
    isCreateCustomerError,
    isCreateCustomerSuccess,
    addCustomerData,
    IsEditCustomerError,
    isEditCustomerSuccess,
    editCustomerErrorDetails,
    isDeleteCustomerSuccess,
    isDeleteCustomerError,
    deleteCustomerErrorDetails,
    refetchCustomersData,
    drawerOpen,
    setDrawerOpen,
    customerId,
    setCustomerId,
    createNewCustomer,
    updateCustomer,
    deleteCustomer,
    updateStatus,
    isUpdateStatusError,
    isUpdateStatusSuccess,
    updateStatusError,
    setPopupType,
    setIsPopUpOpen,
    IsPopUpOpen,
    PopupType,
    isCreateCustomerOpen,
    setIsCreateCustomerOpen,
    isUpdateCustomerOpen,
    setIsUpdateCustomerOpen,
    isViewDetailsOpen,
    setIsViewDetailsOpen,
    userDetails,
    setUserDetails,
    IsViewCustomerError,
    IsViewCustomerSuccess,
    viewCustomerErrorDetails,
    createCustomerErrorDetails,
    viewCustomerData,
    isStale,
    setRowData,
    rowData,
    setIsEditable,
    isEditable,
    selectedCustomer,
    setSelectedCustomer,
    editTemplateInsertParameter,
    setEditTemplateInsertParameter,
    customerParameterList,
    setCustomerParameterList,
    customerList,
    setCustomerList,
    customerParameters,
    isCustomertParametersSuccess,
    refetchCustomerParameters,
    isFilterOpen,
    setIsFilterOpen,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isEnglish,
    setIsEnglish,
    allCustomersData,
    refetchAllCustomersData,
    isRefetchedDataError,
    errorMessage,
    isRefetchDataSuccess,
    CustomersData,
    isButtonText,
    setIsButtonText,
    deleteCustomerData,
    isGetCustomerLoading,
  };
};
