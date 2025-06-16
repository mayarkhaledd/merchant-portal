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
  // nameArabicRule: { validate: (value: string) => string | true };
}

export const CustomerNameArabic = ({
  control,
  formState,
  t,
  // nameArabicRule,
}: Props) => {
  return (
    <Controller
      name="customerNameArabic"
      control={control}
      defaultValue=""
      rules={CustomerFilterValidationRules.arabic}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder={t("customer.arabic_name") as string}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("customer.arabic_name") as string}
            inputError={formState.errors.customerNameArabic?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
