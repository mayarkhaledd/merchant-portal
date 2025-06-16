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
  // nameEnglishRule: { validate: (value: string) => string | true };
}

export const CustomerNameEnglish = ({
  control,
  formState,
  t,
  // nameEnglishRule,
}: Props) => {
  return (
    <Controller
      name="customerNameEnglish"
      control={control}
      defaultValue=""
      rules={CustomerFilterValidationRules.english}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder={t("customer.english_name") as string}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("customer.english_name") as string}
            inputError={formState.errors.customerNameEnglish?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
