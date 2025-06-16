import { Control, Controller, FormState, UseFormWatch } from "react-hook-form";

import { EventFilterMenuValues } from "../EventFilterMenu.types";
import { InputField } from "eds-react";
import { TFunction } from "i18next";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { EventFilterMenuValidationRules } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuValidationRules";
interface Props {
  control: Control<EventFilterMenuValues>;
  watch: UseFormWatch<EventFilterMenuValues>;
  formState: FormState<EventFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
}
export const EventArabicDescription = ({ control, formState, t }: Props) => {
  return (
    <Controller
      name="eventArabicDescription"
      control={control}
      rules={EventFilterMenuValidationRules.arabic}
      defaultValue={""}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextAreaType}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("eventsManagement.filterMenu.event_arabic_description")}
            placeHolder={
              t(
                "eventsManagement.enter_the_event's_arabic_description",
              ) as string
            }
            inputError={
              formState.errors.eventArabicDescription?.message as string
            }
            {...field}
          />
        </div>
      )}
    />
  );
};
