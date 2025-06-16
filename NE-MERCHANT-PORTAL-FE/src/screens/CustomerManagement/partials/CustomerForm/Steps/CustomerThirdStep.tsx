import { useState } from "react";
import { Button, InputField, PhoneInputField } from "eds-react";
import { validationRules } from "./ValidationSchema";
// import { ColorValues, Sizes } from "@ejada/common";
import { IconPlus, IconTrash } from "@tabler/icons-react";
//import { CustomerInitialValues } from "../CustomerManagementTypes";
import { CustomerFormProps } from "@ejada/screens/CustomerManagement/CustomerManagement.types";
import i18n from "@ejada/common/locals/i18n";
import { Controller } from "react-hook-form";
import { ColorValues, Sizes } from "@ejada/common";

export const CustomerThirdStep: React.FC<CustomerFormProps> = ({
  control,
  formState,
  //initialValues = {} as CustomerInitialValues,
  setValue,
  watch,
  drawerMode,
  unregister,
}) => {
  const [isSecondaryEmailVisible, setIsSecondaryEmailVisible] = useState(
    drawerMode === "edit",
  );
  const [isSecondaryMobileVisible, setIsSecondaryMobileVisible] = useState(
    drawerMode === "edit",
  );
  return (
    <div
      className="flex flex-col max-h-full mb-2 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      {/* Primary Email */}
      <div className="w-full mb-4">
        <Controller
          name="customerEmailDetails.0.email"
          control={control}
          defaultValue=""
          rules={validationRules.email}
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              placeHolder={
                i18n.t(
                  "customer.create_customer.third_step.primary_email",
                ) as string
              }
              size="medium"
              label={i18n.t(
                "customer.create_customer.third_step.primary_email",
              )}
              isRequired
              disabled={drawerMode === "view"}
              className="w-full"
              inputError={
                formState.errors.customerEmailDetails?.[0]?.email?.message
              }
            />
          )}
        />
      </div>

      {/* Secondary Email */}
      {isSecondaryEmailVisible && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-grow">
              <Controller
                name="customerEmailDetails.1.email"
                control={control}
                defaultValue=""
                rules={validationRules.extraEmail}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="text"
                    placeHolder={
                      i18n.t(
                        "customer.create_customer.third_step.secondary_email",
                      ) as string
                    }
                    size="medium"
                    label={i18n.t(
                      "customer.create_customer.third_step.secondary_email",
                    )}
                    //isRequired
                    disabled={drawerMode === "view"}
                    className="w-full"
                    inputError={
                      formState.errors.customerEmailDetails?.[1]?.email?.message
                    }
                  />
                )}
              />
            </div>
            <Button
              type="withIcon"
              label=""
              onClick={() => {
                const updatedEmailDetails =
                  watch?.("customerEmailDetails") || [];
                updatedEmailDetails.filter((_, index) => index !== 1);
                setValue?.("customerEmailDetails", updatedEmailDetails);
                unregister && unregister(`customerEmailDetails[1]`);
                setIsSecondaryEmailVisible(false);
              }}
              size="small"
              state="error"
              icon={<IconTrash />}
              className="ml-2 mt-[28px]"
            />
          </div>
        </div>
      )}
      {!isSecondaryEmailVisible && (
        <div className="w-full gap-[20px] my-4">
          <Button
            type="withIcon"
            buttonVariant="outlined"
            icon={<IconPlus />}
            onClick={() => setIsSecondaryEmailVisible(true)}
            label={
              i18n.t(
                "customer.create_customer.third_step.add_secondary_email",
              ) as string
            }
            size="large"
            state="default"
            className="w-full"
          />
        </div>
      )}

      {/* Primary Mobile */}
      <div className="w-full mb-4" dir={"ltr"}>
        <Controller
          name="customerMobileDetails.0.mobileNumber"
          control={control}
          rules={validationRules.mobile}
          defaultValue=""
          render={({ field }) => (
            <PhoneInputField
              defaultValue=""
              setIsValidPhone={() => {}}
              placeholder="57979797"
              country="SA"
              color={ColorValues.Gray}
              size={Sizes.Medium}
              label={i18n.t(
                "customer.create_customer.third_step.primary_mobile",
              )}
              disabled={drawerMode === "view"}
              error={formState.errors.customerMobileDetails?.[0]?.mobileNumber}
              className="w-full"
              isRequired
              {...field}
            />
          )}
        />
      </div>

      {/* Secondary Mobile */}
      {isSecondaryMobileVisible && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-grow" dir={"ltr"}>
              <Controller
                name="customerMobileDetails.1.mobileNumber"
                control={control}
                defaultValue={""}
                rules={validationRules.extraMobile}
                render={({ field }) => (
                  <PhoneInputField
                    country="SA"
                    setIsValidPhone={() => {}}
                    placeholder="57979797"
                    color={ColorValues.Gray}
                    size={Sizes.Medium}
                    label={i18n.t(
                      "customer.create_customer.third_step.secondary_mobile",
                    )}
                    disabled={drawerMode === "view"}
                    error={
                      formState.errors?.customerMobileDetails?.[1]?.mobileNumber
                    }
                    className="w-full"
                    {...field}
                  />
                )}
              />
            </div>
            <Button
              type="withIcon"
              label=""
              onClick={() => {
                const updatedMobileDetails = watch?.(
                  "customerMobileDetails",
                )?.filter((_, index) => index !== 1);
                updatedMobileDetails &&
                  setValue?.("customerMobileDetails", updatedMobileDetails);
                unregister && unregister(`customerMobileDetails[1]`);
                setIsSecondaryMobileVisible(false);
              }}
              size="small"
              state="error"
              icon={<IconTrash />}
              className="ml-2 mt-[28px]"
            />
          </div>
        </div>
      )}
      {!isSecondaryMobileVisible && (
        <div className="w-full gap-[20px] my-4">
          <Button
            type="withIcon"
            buttonVariant="outlined"
            icon={<IconPlus />}
            onClick={() => setIsSecondaryMobileVisible(true)}
            label={
              i18n.t(
                "customer.create_customer.third_step.add_secondary_mobile",
              ) as string
            }
            size="large"
            state="default"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};
