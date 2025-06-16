import { Context, useContext } from "react";
import { Drawer } from "eds-react";
import { useTranslation } from "react-i18next";
import edit from "@ejada/common/assets/editIcon.svg";
import {
  useSuccessToast,
  useErrorToast,
  getLocalizedErrorMessage,
  ErrorCode,
} from "@ejada/screens/shared";
import {
  CustomerManagementContext,
  TCustomerManagementState,
} from "@ejada/screens/CustomerManagement";
import { mapCustomerInterfaceToInitialValues } from "@ejada/screens/CustomerManagement/partials/utils";
import { CustomerForm } from "@ejada/screens/CustomerManagement/partials/CustomerForm/CustomerForm";
import { useCustomerForm } from "@ejada/screens/CustomerManagement/partials/CustomerForm/useCustomerForm";
import { ContextPopup } from "@ejada/screens/shared/partials/PopUp/ContextPopup";
import { CustomerFilterMenuForm } from "./partials/CustomerFilterMenu/CustomerFilterForm";
import i18n from "@ejada/common/locals/i18n";
import { AxiosError } from "axios";

export function CustomerManagementModal() {
  const {
    isViewDetailsOpen,
    setIsViewDetailsOpen,
    setIsEditable,
    isCreateCustomerOpen,
    setIsCreateCustomerOpen,
    setIsUpdateCustomerOpen,
    isUpdateCustomerOpen,
    IsPopUpOpen,
    setIsPopUpOpen,
    userDetails,
    PopupType,
    isUpdateStatusSuccess,
    isEditCustomerSuccess,
    updateStatus,
    editCustomerErrorDetails,
    updateStatusError,
    isFilterOpen,
    setIsFilterOpen,
    setSearchQuery,
    setCustomerId,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isCreateCustomerSuccess,
    isDeleteCustomerSuccess,
    deleteCustomerErrorDetails,
    deleteCustomer,
    deleteCustomerData,
    viewCustomerData,
    createCustomerErrorDetails,
  } = useContext(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );

  const { t } = useTranslation();

  const successToast = useSuccessToast;
  const errorToast = useErrorToast;

  const handleSuccessToast = (condition: boolean, message: string) => {
    successToast(condition, t(message));
  };
  const handleErrorToast = (
    condition: boolean,
    message: string,
    errorDetail: AxiosError<unknown, unknown> | null | ErrorCode,
  ) => {
    errorToast(
      condition,
      t(message),
      getLocalizedErrorMessage(errorDetail, t(message) as string),
    );
  };
  const isRtl = i18n.language === "ar";
  // Handle success and error toasts
  const handleToasts = () => {
    const toastConfigs = [
      {
        condition: isCreateCustomerSuccess,
        successMessage: "customer.customer-create-success",
        errorCondition: createCustomerErrorDetails?.message !== undefined,
        errorMessage: "customer.customer-create-fail",
        errorDetail: createCustomerErrorDetails as ErrorCode,
      },
      {
        condition: isUpdateStatusSuccess && PopupType === "deactivateCustomer",
        successMessage: "customer.customer-deactivate-success",
        errorCondition:
          updateStatusError?.message !== undefined &&
          PopupType === "deactivateCustomer",
        errorMessage: "customer.customer-deactivate-fail",
        errorDetail: updateStatusError as ErrorCode,
      },
      {
        condition: isUpdateStatusSuccess && PopupType === "reactivateCustomer",
        successMessage: "customer.customer-reactivate-success",
        errorCondition:
          updateStatusError?.message !== undefined &&
          PopupType === "reactivateCustomer",
        errorMessage: "customer.customer-reactivate-fail",
        errorDetail: updateStatusError as ErrorCode,
      },
      {
        condition: isEditCustomerSuccess,
        successMessage: "customer.customer-update-success",
        errorCondition: editCustomerErrorDetails?.message !== undefined,
        errorMessage: "customer.customer-update-fail",
        errorDetail: editCustomerErrorDetails as ErrorCode,
      },
      {
        condition:
          isDeleteCustomerSuccess ||
          deleteCustomerData?.status === 200 ||
          deleteCustomerData?.header?.status.code === "I000000",
        successMessage: "customer.customer-delete-success",
        errorCondition:
          deleteCustomerErrorDetails?.message !== undefined &&
          PopupType === "deleteCustomer",
        errorMessage: "customer.customer-delete-fail",
        errorDetail: deleteCustomerErrorDetails as ErrorCode,
      },
    ];

    toastConfigs.forEach(
      ({
        condition,
        successMessage,
        errorCondition,
        errorMessage,
        errorDetail,
      }) => {
        handleSuccessToast(condition, successMessage);
        handleErrorToast(errorCondition, errorMessage, errorDetail);
      },
    );
  };

  handleToasts();

  const createCustomerFormProps = useCustomerForm(
    () => setIsCreateCustomerOpen(false),
    "add",
    undefined,
  );

  const updateCustomerFormProps = useCustomerForm(
    () => setIsUpdateCustomerOpen(false),
    "edit",
    viewCustomerData
      ? mapCustomerInterfaceToInitialValues(viewCustomerData)
      : undefined,
  );

  const viewCustomerFormProps = useCustomerForm(
    () => setIsViewDetailsOpen(false),
    "view",
    viewCustomerData
      ? mapCustomerInterfaceToInitialValues(viewCustomerData)
      : undefined,
  );

  return (
    <>
      {IsPopUpOpen && (
        <ContextPopup
          option={PopupType}
          customerId={userDetails?.customerId as string}
          relationType={userDetails?.relationTypeCode as string}
          relationValue={userDetails?.relationValue as string}
          onConfirm={() => {
            deleteCustomer({
              customerId: userDetails?.customerId as number,
            });
            setIsPopUpOpen(false);
          }}
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          updateStatus={updateStatus}
          //deleteCustomer={deleteCustomer}
        />
      )}
      <Drawer
        width="w-[740px]"
        isOpen={isCreateCustomerOpen}
        onOpenChange={setIsCreateCustomerOpen}
        drawerTitle={t("customer.create_new_customer")}
      >
        <CustomerForm
          {...createCustomerFormProps}
          closeDrawer={() => {
            setIsCreateCustomerOpen(false);
            setCustomerId(-1);
          }}
          drawerMode="add"
        />
      </Drawer>
      <Drawer
        width="w-[740px]"
        isOpen={isUpdateCustomerOpen}
        onOpenChange={setIsUpdateCustomerOpen}
        drawerTitle={t("customer.update_customer")}
      >
        {viewCustomerData ? (
          <CustomerForm
            {...updateCustomerFormProps}
            closeDrawer={() => {
              setIsUpdateCustomerOpen(false);
              setCustomerId(-1);
            }}
            drawerMode="edit"
            initialValues={mapCustomerInterfaceToInitialValues(
              viewCustomerData,
            )}
          />
        ) : (
          <></>
        )}
      </Drawer>

      <Drawer
        width="w-[740px]"
        isOpen={isViewDetailsOpen}
        onOpenChange={setIsViewDetailsOpen}
        drawerTitle={t("customer.customer_details")}
      >
        <>
          <button
            className={`position absolute -mt-7 top-16 ${isRtl ? "left-9" : "right-9"} font-readexProSemiBold600`}
            onClick={() => {
              setIsViewDetailsOpen(false);
              setIsUpdateCustomerOpen(true);
            }}
          >
            <div className="flex items-center">
              <img src={edit} alt="editIcon" className="mr-1" />
              <span className="font-readexProMedium500 text-primary-blue pr-1">
                {t("customer.edit")}
              </span>
            </div>
          </button>
          {viewCustomerData ? (
            <CustomerForm
              {...viewCustomerFormProps}
              closeDrawer={() => {
                setIsViewDetailsOpen(false);
                setIsEditable(false);
                setCustomerId(-1);
              }}
              drawerMode="view"
              initialValues={
                viewCustomerData
                  ? mapCustomerInterfaceToInitialValues(viewCustomerData)
                  : undefined
              }
            />
          ) : (
            <></>
          )}
        </>
      </Drawer>
      <Drawer
        width="w-[630px]"
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        drawerTitle={t("customer.filterMenu.filter")}
      >
        <>
          <CustomerFilterMenuForm
            closeDrawer={() => setIsFilterOpen(false)}
            setSearchQuery={setSearchQuery}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
          />
        </>
      </Drawer>
    </>
  );
}
