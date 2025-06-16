import { Controller, FormState } from "react-hook-form";
import { Control } from "react-hook-form";
import { SelectSearch } from "eds-react";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";
import { useTranslation } from "react-i18next";
import { EVENTS_PRIORITY } from "@ejada/screens/NotificationHistory/NotificationHistory.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: FormState<NotificationHistoryFilterMenuValues>;
  selectSearchKey: boolean;
}

export const EventPriority = ({
  control,
  formState,
  selectSearchKey,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className="-mr-4">
      <Controller
        name="eventPriority"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={Number(selectSearchKey)}
              multiSelect={false}
              items={EVENTS_PRIORITY}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("notificationHistory.event_priority_message") as string}
              title={t("notificationHistory.event_priority") as string}
              btnstyles="w-[30rem]"
              dropDownStyles="w-[30rem]"
              initialSelectedItems={[
                {
                  id: String(field.value),
                  label: "",
                },
              ]}
              fullWidth={true}
              onChange={(selectedOption) => {
                field.onChange(selectedOption[0]);
              }}
              inputError={formState.errors.eventPriority?.message}
            />
          </div>
        )}
      />
    </div>
  );
};
