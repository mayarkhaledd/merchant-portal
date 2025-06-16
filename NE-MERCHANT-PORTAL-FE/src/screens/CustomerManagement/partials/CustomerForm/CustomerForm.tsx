import { Button, Stepper, Tabs } from "eds-react";
import { colors } from "@ejada/common";
import React, { Context, useContext } from "react";
import { CustomerFirstStep } from "./Steps/CustomerFirstStep";
import { CustomerSecondStep } from "./Steps/CustomerSecondStep";
import { CustomerThirdStep } from "./Steps/CustomerThirdStep";
import { useCustomerForm } from "./useCustomerForm";
import { CustomerFormProps } from "@ejada/screens/CustomerManagement/CustomerManagement.types";
import { TCustomerManagementState } from "../../CustomerManagement.types";
import { CustomerManagementContext } from "../../CustomerManagementProvider";
import { t } from "i18next";

export const CustomerForm: React.FC<CustomerFormProps> = ({
  closeDrawer,
  drawerMode,
  initialValues,
}) => {
  const {
    control,
    handleSubmit,
    formState,
    onSubmit,
    trigger,
    watch,
    setValue,
    unregister,
  } = useCustomerForm(closeDrawer, drawerMode, initialValues);

  const {
    setIsViewDetailsOpen,
    setIsCreateCustomerOpen,
    setIsUpdateCustomerOpen,
    customerId,
  } = useContext<TCustomerManagementState>(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );

  const handleStepperSubmit = async () => {
    if (customerId) {
      setValue("customerId", customerId);
    }
    await handleSubmit(onSubmit)();
  };

  const handleCreateSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      await handleSubmit(onSubmit)();
    } else {
      console.log("Form validation failed!");
    }
  };

  return drawerMode === "add" ? (
    <form className="flex flex-col h-screen">
      <div className="flex-1">
        <Stepper
          validateForm={trigger}
          onSubmit={handleCreateSubmit}
          drawerClose={closeDrawer}
          labelPosition="below"
          orientation="horizontal"
        >
          <Stepper.Step title={t("customer.identification")}>
            <div className="flex flex-col h-full">
              <CustomerFirstStep
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                drawerMode={drawerMode}
                watch={watch}
                closeDrawer={() => {
                  setIsViewDetailsOpen(false);
                  setIsCreateCustomerOpen(false);
                  setIsUpdateCustomerOpen(false);
                }}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step title={t("customer.details")}>
            <div className="flex flex-col h-full">
              <CustomerSecondStep
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                drawerMode={drawerMode}
                watch={watch}
                closeDrawer={() => {
                  setIsViewDetailsOpen(false);
                  setIsCreateCustomerOpen(false);
                  setIsUpdateCustomerOpen(false);
                }}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step title={t("customer.contact_info")}>
            <div className="flex flex-col h-full">
              <CustomerThirdStep
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                setValue={setValue}
                drawerMode={drawerMode}
                watch={watch}
                closeDrawer={() => {
                  setIsViewDetailsOpen(false);
                  setIsCreateCustomerOpen(false);
                  setIsUpdateCustomerOpen(false);
                }}
                unregister={unregister}
              />
            </div>
          </Stepper.Step>
        </Stepper>
      </div>
    </form>
  ) : (
    <form className="flex flex-col h-screen">
      <div className="flex-1">
        <Tabs
          tabs={[
            {
              label: t("customer.identification"),
              value: t("customer.identification"),
              content: (
                <CustomerFirstStep
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  drawerMode={drawerMode}
                  watch={watch}
                  closeDrawer={() => {
                    setIsViewDetailsOpen(false);
                    setIsCreateCustomerOpen(false);
                    setIsUpdateCustomerOpen(false);
                  }}
                />
              ),
            },
            {
              label: t("customer.details"),
              value: t("customer.details"),
              content: (
                <CustomerSecondStep
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  drawerMode={drawerMode}
                  watch={watch}
                  closeDrawer={() => {
                    setIsViewDetailsOpen(false);
                    setIsCreateCustomerOpen(false);
                    setIsUpdateCustomerOpen(false);
                  }}
                />
              ),
            },
            {
              label: t("customer.contact_info"),
              value: t("customer.contact_info"),
              content: (
                <CustomerThirdStep
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  setValue={setValue}
                  drawerMode={drawerMode}
                  unregister={unregister}
                  watch={watch}
                  closeDrawer={() => {
                    setIsViewDetailsOpen(false);
                    setIsCreateCustomerOpen(false);
                    setIsUpdateCustomerOpen(false);
                  }}
                />
              ),
            },
          ]}
        />
      </div>
      <div className="border-b-[0.5px] border-divider-color w-[100%] mt-auto py-4"></div>
      <div className="w-full flex justify-end gap-[20px] p-4">
        <Button
          size="large"
          onClick={closeDrawer}
          label={t("customer.cancel")}
          type={"default"}
          state={"default"}
          buttonVariant="outlined"
        />
        <Button
          size="large"
          onClick={async () => {
            const isValid = await trigger();
            if (isValid) {
              await handleStepperSubmit();
            }
          }}
          label={t("customer.submit")}
          type={"default"}
          state={"default"}
        />
      </div>
    </form>
  );
};
