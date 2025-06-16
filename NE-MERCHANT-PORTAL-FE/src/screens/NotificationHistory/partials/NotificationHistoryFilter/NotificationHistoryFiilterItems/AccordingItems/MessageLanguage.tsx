import { Controller, FormState } from "react-hook-form";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectSearch } from "eds-react";
import { Message_Language } from "@ejada/screens/NotificationHistory";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: FormState<NotificationHistoryFilterMenuValues>;
  selectSearchKey: boolean;
}

export const MessageLanguage = ({
  control,
  formState,
  selectSearchKey,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="-mr-4">
      <Controller
        name="messageLanguage"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={Number(selectSearchKey)}
              multiSelect={false}
              items={Message_Language}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("notificationHistory.message_language") as string}
              title={t("notificationHistory.message_language") as string}
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
              inputError={formState.errors.messageLanguage?.message}
            />
          </div>
        )}
      />
    </div>
  );
};
