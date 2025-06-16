import { getLookUpParametersInterface } from "@ejada/types";
import {
  CreateCustomerPayload,
  CustomerStatusPayload,
  UpdateCustomerPayload,
  GetCustomersPayload,
  CustomerInterface,
  GetCustomersInterface,
  DeleteCustomerResponse,
  DeleteCustomerPayload,
} from "@ejada/types/api/customerManagementInterface";
import { AxiosError } from "axios";
import { TTableColumns } from "eds-react";
import { Dispatch, SetStateAction } from "react";
import { CustomerInitialValues } from "./partials/CustomerForm";
import { CustomerFormValues } from "@ejada/screens/CustomerManagement/partials/CustomerForm/CustomerManagementTypes";
import { Control, FieldErrors, UseFormReturn } from "react-hook-form";

export type TCustomerManagementState = {
  setSearchQuery: Dispatch<
    SetStateAction<boolean | Partial<GetCustomersPayload>>
  >;
  createNewCustomer: (data: CreateCustomerPayload) => void;
  CustomerManagementData: TTableColumns[];
  updateCustomer: (data: UpdateCustomerPayload) => void;
  allCustomersData: GetCustomersInterface | null;
  refetchCustomersData: (() => void) | undefined;
  refetchAllCustomersData: (() => void) | undefined;
  itemsPerPage: number;
  currentPage: number;
  isEnglish: boolean;
  setIsEnglish: (state: boolean) => void;
  setIsViewDetailsOpen: (state: boolean) => void;
  setIsUpdateCustomerOpen: (state: boolean) => void;
  setIsCreateCustomerOpen: (state: boolean) => void;
  setUserDetails: React.Dispatch<
    React.SetStateAction<TTableColumns | undefined>
  >;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  totalListSize: number;
  setTotalListSize: Dispatch<SetStateAction<number>>;
  setIsPopUpOpen: (value: boolean) => void;
  setPopupType: (value: string) => void;
  setCustomerId: (value: number) => void;
  customerId: number;
  setIsEditable: (state: boolean) => void;
  isViewDetailsOpen: boolean;
  isEditable: boolean;
  isCreateCustomerOpen: boolean;
  isUpdateCustomerOpen: boolean;
  IsPopUpOpen: boolean;
  userDetails: TTableColumns | undefined;
  PopupType: string;
  isUpdateStatusError: boolean;
  isUpdateStatusSuccess: boolean;
  IsEditCustomerError: boolean;
  updateStatus: (data: CustomerStatusPayload) => void;
  searchQuery: boolean | Partial<GetCustomersPayload>;
  customerParameterList: SelectSearchList[];
  setCustomerParameterList: Dispatch<SetStateAction<SelectSearchList[]>>;
  customerList: SelectSearchList[];
  setCustomerList: Dispatch<SetStateAction<SelectSearchList[]>>;
  setEditTemplateInsertParameter: Dispatch<SetStateAction<SelectSearchList[]>>;
  editTemplateInsertParameter: SelectSearchList[];
  customerParameters: getLookUpParametersInterface[] | null;
  isCustomertParametersSuccess: boolean;
  refetchCustomerParameters: () => void;
  isCreateCustomerSuccess: boolean;
  isDeleteCustomerSuccess: boolean;
  isDeleteCustomerError: boolean;
  isEditCustomerSuccess: boolean;
  isCreateCustomerError: boolean;
  editCustomerErrorDetails: AxiosError | null;
  deleteCustomerErrorDetails: AxiosError | null;
  updateStatusError: AxiosError | null;
  createCustomerErrorDetails: AxiosError | null;
  isFilterOpen: boolean;
  setIsFilterOpen: (state: boolean) => void;
  viewCustomerData: CustomerInterface | null;
  activeSearchCriteria: Partial<GetCustomersPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetCustomersPayload>>
  >;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  CustomersData: GetCustomersInterface | null;
  isButtonText: boolean;
  setIsButtonText: (value: boolean) => void;
  deleteCustomerData: DeleteCustomerResponse | undefined;
  isGetCustomerLoading: boolean;
  deleteCustomer: (data: DeleteCustomerPayload) => void;
};

export interface SelectSearchList {
  id: string;
  label?: string;
}

export interface Select {
  key: string;
  node?: string;
}

export interface CustomerFormProps {
  closeDrawer: () => void;
  drawerMode: "add" | "edit" | "view";
  customerId?: number | null;
  initialValues?: CustomerInitialValues;
  control: Control<CustomerFormValues>;
  formState: {
    errors: FieldErrors<CustomerFormValues>;
  };
  colors: {
    errorDefault: string;
  };
  setValue?: UseFormReturn<CustomerFormValues>["setValue"];
  watch?: UseFormReturn<CustomerFormValues>["watch"];
  unregister?: UseFormReturn<CustomerFormValues>["unregister"];
}
