import { useForm } from "react-hook-form";
import {
  CustomerFormValues,
  CustomerInitialValues,
} from "@ejada/screens/CustomerManagement/partials/CustomerForm/CustomerManagementTypes";
import { mapCustomerInterfaceToInitialValues, mapToPayload } from "../utils";
import { useContext, useEffect } from "react";
import { CustomerManagementContext } from "../../CustomerManagementProvider";
import { TCustomerManagementState } from "../../CustomerManagement.types";
import { colors } from "@ejada/common";
import { CustomerInterface } from "@ejada/types/api/customerManagementInterface";

export const useCustomerForm = (
  closeDrawer: () => void,
  drawerMode: "add" | "edit" | "view",
  initialValues?: CustomerInitialValues,
) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    trigger,
    watch,
    setValue,
    unregister,
  } = useForm<CustomerFormValues>({
    mode: "onChange",
    defaultValues: {
      ...initialValues,
      customerEmailDetails: initialValues?.customerEmailDetails
        ? [...initialValues.customerEmailDetails].sort((a) =>
            a.contactType === "P" ? -1 : 1,
          )
        : [],
      customerMobileDetails: initialValues?.customerMobileDetails
        ? [...initialValues.customerMobileDetails].sort((a) =>
            a.contactType === "P" ? -1 : 1,
          )
        : [],
    },
  });

  const {
    createNewCustomer,
    updateCustomer,
    setIsPopUpOpen,
    PopupType,
    deleteCustomerErrorDetails,
    createCustomerErrorDetails,
    editCustomerErrorDetails,
    viewCustomerData,
    setCustomerId,
  } = useContext<TCustomerManagementState>(CustomerManagementContext);

  const cleanData = (data: CustomerInitialValues): CustomerInitialValues => {
    const cleanedData = {
      relationTypeCode: data.relationTypeCode,
      relationValue: data.relationValue,
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== "" && value !== null,
        ),
      ),
      customerEmailDetails: data.customerEmailDetails?.map((email) =>
        Object.fromEntries(
          Object.entries(email).filter(
            ([_, value]) => value !== "" && value !== null,
          ),
        ),
      ),
      customerMobileDetails: data.customerMobileDetails?.map((mobile) =>
        Object.fromEntries(
          Object.entries(mobile).filter(
            ([_, value]) => value !== "" && value !== null,
          ),
        ),
      ),
    };
    return cleanedData as CustomerInitialValues;
  };

  const onSubmit = (data: CustomerFormValues) => {
    const cleanedData = cleanData(data);
    const mappedData = mapToPayload(cleanedData);

    if (drawerMode === "add") {
      createNewCustomer(mappedData);
    } else if (drawerMode === "edit") {
      updateCustomer(mappedData);
    }
    closeDrawer();
    setCustomerId(-1);
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    setCustomerId(-1);
    closeDrawer();
  };

  useEffect(() => {
    if (viewCustomerData && (drawerMode === "edit" || drawerMode === "view")) {
      const initialFormValues = mapCustomerInterfaceToInitialValues(
        viewCustomerData as CustomerInterface,
      );
      //setting the initial values got from API to form values
      reset(initialFormValues as unknown as CustomerInitialValues);
    }
  }, [viewCustomerData]);

  return {
    control,
    handleSubmit,
    formState,
    handleCancel,
    onSubmit,
    setValue,
    watch,
    trigger,
    unregister,
    drawerMode,
    colors: {
      errorDefault: colors.errorDefault,
    },
    deleteCustomerErrorDetails,
    createCustomerErrorDetails,
    editCustomerErrorDetails,
    PopupType,
    setIsPopUpOpen,
    viewCustomerData,
  };
};
