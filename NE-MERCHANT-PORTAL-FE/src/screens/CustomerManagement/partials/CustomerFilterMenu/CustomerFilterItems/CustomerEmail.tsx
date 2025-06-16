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
  //emailRule: { validate: (value: string) => string | true };
}

export const CustomerEmail = ({
  control,
  formState,
  t,
  //emailRule
}: Props) => {
  return (
    <Controller
      name="email"
      control={control}
      defaultValue=""
      rules={CustomerFilterValidationRules.email}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder={
              t("customer.create_customer.third_step.email") as string
            }
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("customer.create_customer.third_step.email") as string}
            inputError={formState.errors.email?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
