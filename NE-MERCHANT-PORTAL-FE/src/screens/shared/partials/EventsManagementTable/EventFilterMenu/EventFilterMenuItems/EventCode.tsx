import { Control, Controller, FormState } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { EventFilterMenuValues } from "../EventFilterMenu.types";
import { InputField } from "eds-react";
import { TFunction } from "i18next";

interface Props {
  control: Control<EventFilterMenuValues>;
  formState: FormState<EventFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
}

export const EventCode = ({ control, formState, t }: Props) => {
  return (
    <Controller
      name="eventCode"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className="relative">
          <InputField
            //control={control}
            type={Types.TextType}
            placeHolder="e.g. 2301"
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            className="text-primary-blue font-readexProMedium500"
            label={t("eventsManagement.filterMenu.event_code") as string}
            inputError={formState.errors.eventCode?.message}
            {...field}
          />
          <span className="font-readexProRegular text-neutrals/N3 text-xs">
            {t("eventsManagement.filterMenu.event_code_info")}
          </span>
        </div>
      )}
    />
  );
};
