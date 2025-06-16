import { TFunction } from "i18next";
import { Control, Controller, FormState } from "react-hook-form";
import { CustomerFilterMenuValues } from "../CustomerFilter.types";
import { InputField } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";

interface Props {
  control: Control<CustomerFilterMenuValues>;
  formState: FormState<CustomerFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  // titleRule: { validate: (value: string) => string | true };
}

export const CustomerTitle = ({
  control,
  formState,
  t,
  //  titleRule
}: Props) => {
  return (
    <Controller
      name="title"
      control={control}
      defaultValue=""
      // rules={titleRule}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder={
              t("customer.create_customer.second_step.title") as string
            }
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("customer.create_customer.second_step.title") as string}
            inputError={formState.errors.title?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
