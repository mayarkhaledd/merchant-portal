import { TFunction } from "i18next";
import { Control, Controller, FormState } from "react-hook-form";
import { EventGroupFilterMenuValues } from "../EventGroupFilter.types";
import { InputField } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";

interface Props {
  control: Control<EventGroupFilterMenuValues>;
  formState: FormState<EventGroupFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  descEnglishRule: {
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

export const EventGroupDescriptionEn = ({
  control,
  formState,
  t,
  descEnglishRule,
}: Props) => {
  return (
    <Controller
      name="eventGroupDescriptionEn"
      control={control}
      defaultValue=""
      rules={descEnglishRule}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextAreaType}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("eventGroupManagement.event_group_english_description")}
            placeHolder={
              t(
                "eventGroupManagement.enter_the_event's_english_description",
              ) as string
            }
            inputError={
              formState.errors.eventGroupDescriptionEn?.message as string
            }
            {...field}
          />
        </div>
      )}
    />
  );
};
