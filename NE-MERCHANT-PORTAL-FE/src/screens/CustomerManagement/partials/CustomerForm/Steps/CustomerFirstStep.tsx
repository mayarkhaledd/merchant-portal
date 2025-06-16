import {
  IconAlertCircleFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import React from "react";
import { Controller, FieldError } from "react-hook-form";
import { InputField, Select } from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import { validationRules } from "./ValidationSchema";
import { ColorValues, Sizes, Types } from "@ejada/common";
import {
  statusArray,
  relationType,
} from "@ejada/screens/CustomerManagement/CustomerManagement.constants";
import { CustomerInitialValues } from "../CustomerManagementTypes";
import { CustomerFormProps } from "@ejada/screens/CustomerManagement/CustomerManagement.types";
import {
  activeFlagToBoolean,
  booleanToActiveFlag,
} from "@ejada/screens/CustomerManagement/partials/utils";

export const CustomerFirstStep: React.FC<CustomerFormProps> = ({
  control,
  formState,
  drawerMode,
  initialValues = {} as CustomerInitialValues,
}) => {
  return (
    <div
      className="flex flex-col max-h-full mb-2 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="flex gap-[20px] mb-4 mt-2 flex-grow">
        <div className="w-full">
          <Controller
            name="relationTypeCode"
            control={control}
            defaultValue={initialValues.relationTypeCode}
            rules={validationRules.required}
            render={({ field }) => (
              <Select
                isRequired
                label={i18n.t(
                  "customer.create_customer.first_step.relation_type",
                )}
                options={relationType}
                disabled={drawerMode === "edit" || drawerMode === "view"}
                value={
                  drawerMode === "edit" || drawerMode === "view"
                    ? initialValues.relationTypeCode
                    : field.value
                }
                onChange={field.onChange}
                placeholder={
                  i18n.t(
                    "customer.create_customer.first_step.relation_type",
                  ) as string
                }
                inputError={formState.errors.relationTypeCode?.message}
              />
            )}
          />
        </div>

        <div className="w-full">
          <Controller
            name="relationValue"
            control={control}
            defaultValue={initialValues.relationValue}
            rules={validationRules.relationValue}
            render={({ field }) => (
              <InputField
                disabled={drawerMode === "edit" || drawerMode === "view"}
                type={Types.TextType}
                placeHolder={
                  i18n.t(
                    "customer.create_customer.first_step.relation_value",
                  ) as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={
                  i18n.t(
                    "customer.create_customer.first_step.relation_value",
                  ) as string
                }
                {...field}
                isRequired
                inputError={formState.errors.relationValue?.message as string}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-grow">
        <div className="w-full">
          <span className="text-secondary-dark flex text-sm items-center">
            <IconInfoCircleFilled className="mr-2" />
            {i18n.t("customer.applied") as string}
          </span>
        </div>
      </div>

      <div className="flex gap-[20px] mb-4 flex-grow">
        <div className="w-full">
          <Controller
            name="activeFlag"
            control={control}
            rules={drawerMode === "add" ? validationRules.required : {}}
            defaultValue={
              initialValues.activeFlag
                ? booleanToActiveFlag(initialValues.activeFlag as boolean)
                : "A"
            }
            render={({ field, formState: { errors } }) => (
              <div className="relative">
                <Select
                  disabled={drawerMode === "view" || drawerMode === "edit"}
                  isRequired
                  label={i18n.t("customer.create_customer.first_step.status")}
                  options={statusArray}
                  value={
                    drawerMode === "edit" || drawerMode === "view"
                      ? booleanToActiveFlag(initialValues.activeFlag as boolean)
                      : initialValues.activeFlag
                        ? booleanToActiveFlag(field.value as boolean)
                        : "A"
                  }
                  onChange={(value) => {
                    field.onChange(
                      String(activeFlagToBoolean(value as string)),
                    );
                  }}
                  placeholder={
                    i18n.t(
                      "customer.create_customer.first_step.status",
                    ) as string
                  }
                />
                {errors["activeFlag"] && (
                  <span className="text-error-default mt-1 flex text-sm items-center">
                    <IconAlertCircleFilled size={16} className="mx-1" />
                    {(errors["activeFlag"] as FieldError).message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
