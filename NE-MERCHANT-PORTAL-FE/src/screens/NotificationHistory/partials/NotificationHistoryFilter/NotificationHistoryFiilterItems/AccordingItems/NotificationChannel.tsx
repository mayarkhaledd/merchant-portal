import { Controller, FormState } from "react-hook-form";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectSearch } from "eds-react";
import { SelectSearchMenuList } from "../../../../NotificationHistory.types";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: FormState<NotificationHistoryFilterMenuValues>;
  selectSearchKey: boolean;
  channelMenu: SelectSearchMenuList[];
}

export const NotificationChannel = ({
  control,
  formState,
  selectSearchKey,
  channelMenu,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="-mr-4">
      <Controller
        name="notificationChannel"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={Number(selectSearchKey)} // key= field.value if it is not rendered, to force rerender
              multiSelect={false}
              items={channelMenu}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("notificationHistory.notification_channel") as string}
              title={t("notificationHistory.notification_channel") as string}
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
              inputError={formState.errors.notificationChannel?.message}
            />
          </div>
        )}
      />
    </div>
  );
};
