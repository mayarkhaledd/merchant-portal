import { Controller, UseFormGetValues } from "react-hook-form";
import { Control } from "react-hook-form";
import { EventFilterMenuValues } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenu.types";

import { SelectSearch } from "eds-react";
import { TFunction } from "i18next";
import { SelectSearchMenuList } from "@ejada/screens";

interface Props {
  control: Control<EventFilterMenuValues>;
  getValues: UseFormGetValues<EventFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  selectSearchKey: boolean;
  sourceSystemsMenu: SelectSearchMenuList[] | undefined;
}

export const SourceSystem = ({
  control,
  t,
  selectSearchKey,
  sourceSystemsMenu,
}: Props) => {
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
              items={sourceSystemsMenu ? sourceSystemsMenu : []}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("eventsManagement.filterMenu.source_system") as string}
              title={t("eventsManagement.filterMenu.source_system") as string}
              btnstyles="w-[30rem]"
              dropDownStyles="w-[30rem]"
              initialSelectedItems={[{ id: field.value, label: "" }]}
              fullWidth={true}
              onChange={(selectedOption) => {
                field.onChange(selectedOption[0]);
              }}
            />
          </div>
        )}
      />
    </div>
  );
};
