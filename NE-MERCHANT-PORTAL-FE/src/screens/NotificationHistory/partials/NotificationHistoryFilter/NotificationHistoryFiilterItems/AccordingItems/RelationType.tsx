import { Controller, FormState } from "react-hook-form";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectSearch } from "eds-react";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";
import { RELATION_TYPE } from "@ejada/screens/NotificationHistory/NotificationHistory.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: FormState<NotificationHistoryFilterMenuValues>;
  selectSearchKey: boolean;
}

export const RelationType = ({
  control,
  formState,
  selectSearchKey,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className="-mr-4">
      <Controller
        name="relationType"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={Number(selectSearchKey)}
              multiSelect={false}
              items={RELATION_TYPE}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("notificationHistory.relation_type") as string}
              title={t("notificationHistory.relation_type") as string}
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
              inputError={formState.errors.relationType?.message}
            />
          </div>
        )}
      />
    </div>
  );
};
