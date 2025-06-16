import { TFunction } from "i18next";
import { Control, Controller, FormState } from "react-hook-form";
import { CustomerFilterMenuValues } from "../CustomerFilter.types";
import { PhoneInputField } from "eds-react";
import { ColorValues, Sizes } from "@ejada/common";
import { CustomerFilterValidationRules } from "@ejada/screens/CustomerManagement/partials/CustomerFilterMenu/CustomerFilterValidationRules";
interface Props {
  control: Control<CustomerFilterMenuValues>;
  formState: FormState<CustomerFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  //mobileRule: { validate: (value: string) => string | true };
}

export const CustomerMobile = ({
  control,
  formState,
  t,
  //mobileRule,
}: Props) => {
  return (
    <Controller
      name="mobile"
      control={control}
      defaultValue=""
      rules={CustomerFilterValidationRules.mobile}
      render={({ field }) => (
        <div className="relative" dir={"ltr"}>
          <PhoneInputField
            className=""
            color={ColorValues.Gray}
            label={t("customer.create_customer.third_step.mobile") as string}
            placeholder={
              t("customer.create_customer.third_step.mobile") as string
            }
            setIsValidPhone={() => {}}
            size={Sizes.Small}
            style={{ width: "100%" }}
            error={formState.errors?.mobile}
            {...field}
          />
        </div>
      )}
    />
  );
};
