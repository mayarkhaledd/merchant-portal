import { Controller, FormState } from "react-hook-form";
import { Control } from "react-hook-form";
import { SelectSearch } from "eds-react";
import { TFunction } from "i18next";
import { EventGroupFilterMenuValues } from "../EventGroupFilter.types";
import { SelectSearchList } from "@ejada/screens/EventGroupManagement";

interface Props {
  control: Control<EventGroupFilterMenuValues>;
  formState: FormState<EventGroupFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  sourceSystemsMenu?: SelectSearchList[];
}

export const EventGroupFilterSourceSystems = ({
  control,
  t,
  sourceSystemsMenu,
  formState,
}: Props) => {
  return (
    <div className="mr-4">
      <Controller
        name="sourceSystem"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={field.value}
              multiSelect={false}
              items={sourceSystemsMenu ? sourceSystemsMenu : []}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("eventsManagement.filterMenu.source_system") as string}
              btnstyles="w-full"
              title={t("eventsManagement.filterMenu.source_system") as string}
              inputError={formState.errors.sourceSystem?.message}
              dropDownStyles="w-[30rem]"
              initialSelectedItems={[
                {
                  id: String(field.value),
                },
              ]}
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
