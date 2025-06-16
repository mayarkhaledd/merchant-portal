import { Controller, FormState } from "react-hook-form";
import { Control } from "react-hook-form";
import {
  SelectSearchMenuList,
  // SOURCE_SYSTEM,
} from "../../../../NotificationHistory.types";
import { SelectSearch } from "eds-react";
import { useTranslation } from "react-i18next";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: FormState<NotificationHistoryFilterMenuValues>;
  selectSearchKey: boolean;
  sourceSystemMenu: SelectSearchMenuList[];
}

export const SourceSystem = ({
  control,
  formState,
  selectSearchKey,
  sourceSystemMenu,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="-mr-4">
      <Controller
        name="sourceSystem"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={Number(selectSearchKey)}
              multiSelect={false}
              items={sourceSystemMenu}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("notificationHistory.source_system") as string}
              title={t("notificationHistory.source_system") as string}
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
              inputError={formState.errors.sourceSystem?.message}
            />
          </div>
        )}
      />
    </div>
  );
};
