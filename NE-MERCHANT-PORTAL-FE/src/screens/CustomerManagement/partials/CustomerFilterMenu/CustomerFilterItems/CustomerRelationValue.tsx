import { TFunction } from "i18next";
import { Control, Controller, FormState } from "react-hook-form";
import { CustomerFilterMenuValues } from "../CustomerFilter.types";
import { InputField } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { CustomerFilterValidationRules } from "@ejada/screens/CustomerManagement/partials/CustomerFilterMenu/CustomerFilterValidationRules";

interface Props {
  control: Control<CustomerFilterMenuValues>;
  formState: FormState<CustomerFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  // relationValueRule: { validate: (value: string) => string | true };
}

export const CustomerRelationValue = ({
  control,
  formState,
  t,
  // relationValueRule,
}: Props) => {
  return (
    <Controller
      name="relationValue"
      control={control}
      defaultValue=""
      rules={CustomerFilterValidationRules.relationValue}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder={
              t("customer.create_customer.first_step.relation_value") as string
            }
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={
              t("customer.create_customer.first_step.relation_value") as string
            }
            inputError={formState.errors.relationValue?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
