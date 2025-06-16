import { TFunction } from "i18next";
import { Control, Controller, FormState } from "react-hook-form";
import { WhatsappFilterMenuValues } from "../WhatsappFilter.types";
import { InputField } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { useWhatsappFilterValidation } from "../useWhatsappFilterValidation";

interface Props {
  control: Control<WhatsappFilterMenuValues>;
  formState: FormState<WhatsappFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
}

export const TemplateName = ({ control, formState, t }: Props) => {
  const validationRules = useWhatsappFilterValidation();
  return (
    <Controller
      name="templateName"
      control={control}
      defaultValue=""
      rules={validationRules.english}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("whatsapp.template_name")}
            placeHolder={t("whatsapp.template_name") as string}
            inputError={formState.errors.templateName?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
