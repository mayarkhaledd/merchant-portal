import { TFunction } from "i18next";
import { Control, Controller, FormState } from "react-hook-form";
import { EventGroupFilterMenuValues } from "../EventGroupFilter.types";
import { InputField } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";

interface Props {
  control: Control<EventGroupFilterMenuValues>;
  formState: FormState<EventGroupFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  eventCodeRule: {
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

export const EventGroupId = ({
  control,
  formState,
  t,
  eventCodeRule,
}: Props) => {
  return (
    <Controller
      name="eventGroupId"
      control={control}
      defaultValue=""
      rules={eventCodeRule}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("eventGroupManagement.eventGroupId")}
            placeHolder={
              t("eventGroupManagement.eventGroupId_placeholder") as string
            }
            inputError={formState.errors.eventGroupId?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
