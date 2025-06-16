import { Control, Controller, FormState, UseFormWatch } from "react-hook-form";
import { EventFilterMenuValues } from "../EventFilterMenu.types";
import { InputField } from "eds-react";
import { TFunction } from "i18next";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { EventFilterMenuValidationRules } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuValidationRules";
interface Props {
  control: Control<EventFilterMenuValues>;
  formState: FormState<EventFilterMenuValues>;
  watch: UseFormWatch<EventFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
}

export const EventEnglishDescription = ({ control, t, formState }: Props) => {
  return (
    <Controller
      name="eventEnglishDescription"
      control={control}
      rules={EventFilterMenuValidationRules.english}
      defaultValue={""}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextAreaType}
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            label={t("eventsManagement.filterMenu.event_english_description")}
            placeHolder={
              t(
                "eventsManagement.enter_the_event's_english_description",
              ) as string
            }
            inputError={
              formState.errors.eventEnglishDescription?.message as string
            }
            {...field}
          />
        </div>
      )}
    />
  );
};
