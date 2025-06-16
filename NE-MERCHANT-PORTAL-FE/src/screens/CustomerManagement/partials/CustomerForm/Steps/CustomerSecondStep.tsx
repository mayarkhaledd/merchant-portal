import React from "react";
import { Controller } from "react-hook-form";
import { InputField, Select } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { validationRules } from "./ValidationSchema";
import { CustomerInitialValues } from "../CustomerManagementTypes";
import { CustomerFormProps } from "@ejada/screens/CustomerManagement/CustomerManagement.types";
import i18n from "@ejada/common/locals/i18n";

export const CustomerSecondStep: React.FC<CustomerFormProps> = ({
  control,
  formState,
  drawerMode,
  initialValues = {} as CustomerInitialValues,
}) => {
  return (
    <div className="max-h-full overflow-y-auto pr-5" style={{ height: "100%" }}>
      <div className="flex gap-[20px] mb-4">
        <div className="w-full">
          <Controller
            name="title"
            control={control}
            defaultValue={initialValues?.title || ""}
            rules={validationRules.english}
            render={({ field }) => (
              <InputField
                type={Types.TextType}
                placeHolder={
                  i18n.t("customer.create_customer.second_step.title") as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                disabled={drawerMode === "view"}
                style={{ width: "100%" }}
                label={
                  i18n.t("customer.create_customer.second_step.title") as string
                }
                inputError={formState.errors.title?.message as string}
                {...field}
              />
            )}
          />
        </div>

        <div className="w-full">
          <Controller
            name="preferredLanguage"
            control={control}
            defaultValue={initialValues?.preferredLanguage || ""}
            rules={validationRules.required}
            render={({ field }) => (
              <Select
                label={i18n.t("customer.create_customer.second_step.language")}
                options={[
                  { key: "EN", node: <>English</> },
                  { key: "AR", node: <>Arabic</> },
                ]}
                value={
                  drawerMode === "edit" || drawerMode === "view"
                    ? initialValues.preferredLanguage
                    : field.value
                }
                disabled={drawerMode === "view"}
                onChange={field.onChange}
                inputError={formState.errors.preferredLanguage?.message}
                isRequired
                placeholder={
                  i18n.t(
                    "customer.create_customer.second_step.prefered_language_placeholder",
                  ) as string
                }
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-[20px] mb-4">
        <div className="w-full">
          <Controller
            name="customerNameAr.firstName"
            control={control}
            defaultValue={initialValues?.customerNameAr?.firstName || ""}
            rules={validationRules.arabic}
            render={({ field }) => (
              <InputField
                type={Types.TextType}
                placeHolder={
                  i18n.t(
                    "customer.create_customer.second_step.first_name_ar",
                  ) as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={
                  i18n.t(
                    "customer.create_customer.second_step.first_name_ar",
                  ) as string
                }
                disabled={drawerMode === "view"}
                inputError={
                  formState.errors.customerNameAr?.firstName?.message as string
                }
                {...field}
              />
            )}
          />
        </div>

        <div className="w-full">
          <Controller
            name="customerNameEn.firstName"
            control={control}
            defaultValue={initialValues?.customerNameEn?.firstName || ""}
            rules={validationRules.english}
            render={({ field }) => (
              <InputField
                type={Types.TextType}
                placeHolder={
                  i18n.t(
                    "customer.create_customer.second_step.first_name_en",
                  ) as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={
                  i18n.t(
                    "customer.create_customer.second_step.first_name_en",
                  ) as string
                }
                disabled={drawerMode === "view"}
                inputError={
                  formState.errors.customerNameEn?.firstName?.message as string
                }
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-[20px] mb-4">
        <div className="w-full">
          <Controller
            name="customerNameAr.secondName"
            control={control}
            defaultValue={initialValues?.customerNameAr?.secondName || ""}
            rules={validationRules.arabic}
            render={({ field }) => (
              <InputField
                type={Types.TextType}
                placeHolder={
                  i18n.t(
                    "customer.create_customer.second_step.second_name_ar",
                  ) as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={
                  i18n.t(
                    "customer.create_customer.second_step.second_name_ar",
                  ) as string
                }
                disabled={drawerMode === "view"}
                inputError={
                  formState.errors.customerNameAr?.secondName?.message as string
                }
                {...field}
              />
            )}
          />
        </div>

        <div className="w-full">
          <Controller
            name="customerNameEn.secondName"
            control={control}
            defaultValue={initialValues?.customerNameEn?.secondName || ""}
            rules={validationRules.english}
            render={({ field }) => (
              <InputField
                type={Types.TextType}
                placeHolder={
                  i18n.t(
                    "customer.create_customer.second_step.second_name_en",
                  ) as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={
                  i18n.t(
                    "customer.create_customer.second_step.second_name_en",
                  ) as string
                }
                disabled={drawerMode === "view"}
                inputError={
                  formState.errors.customerNameEn?.secondName?.message as string
                }
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-grow">
        <div className="w-full">
          <span className="text-secondary-dark flex text-sm items-center">
            <IconInfoCircleFilled className="mr-2" />
            {i18n.t("customer.create_customer.second_step.edit") as string}
          </span>
        </div>
      </div>
    </div>
  );
};
