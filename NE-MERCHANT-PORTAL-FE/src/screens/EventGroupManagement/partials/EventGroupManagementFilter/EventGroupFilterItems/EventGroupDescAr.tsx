import { TFunction } from "i18next";
import { Control, Controller, FormState } from "react-hook-form";
import { EventGroupFilterMenuValues } from "../EventGroupFilter.types";
import { InputField } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";

interface Props {
  control: Control<EventGroupFilterMenuValues>;
  formState: FormState<EventGroupFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  descArabicRule: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
}

export const EventGroupDescriptionAr = ({
  control,
  formState,
  t,
  descArabicRule,
}: Props) => {
  return (
    <Controller
      name="eventGroupDescriptionAr"
      control={control}
      defaultValue=""
      rules={descArabicRule}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextAreaType}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("eventGroupManagement.event_group_arabic_description")}
            placeHolder={
              t(
                "eventGroupManagement.enter_the_event's_arabic_description",
              ) as string
            }
            inputError={
              formState.errors.eventGroupDescriptionAr?.message as string
            }
            {...field}
          />
        </div>
      )}
    />
  );
};
