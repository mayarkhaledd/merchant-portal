import { Controller, UseFormGetValues } from "react-hook-form";
import { Control } from "react-hook-form";
import { EventFilterMenuValues } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenu.types";
import { SelectSearch } from "eds-react";
import { TFunction } from "i18next";
import { SelectSearchMenuList } from "@ejada/screens";

interface Props {
  control: Control<EventFilterMenuValues>;
  getValues: UseFormGetValues<EventFilterMenuValues>;
  //formState: FormState<EventFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  selectSearchKey: boolean;
  eventGroupListData: SelectSearchMenuList[] | undefined;
}

export const EventGroup = ({
  control,
  t,
  selectSearchKey,
  eventGroupListData,
}: Props) => {
  return (
    <div className="-mr-4">
      <Controller
        name="eventGroup"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={Number(selectSearchKey)}
              multiSelect={false}
              items={eventGroupListData ? eventGroupListData : []}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("eventsManagement.filterMenu.event_group") as string}
              title={t("eventsManagement.filterMenu.event_group") as string}
              btnstyles="w-[30rem]"
              dropDownStyles="w-[30rem]"
              initialSelectedItems={[{ id: field.value, label: "" }]}
              onChange={(selectedOption) => {
                field.onChange(selectedOption[0]);
              }}
              fullWidth={true}
            />
          </div>
        )}
      />
    </div>
  );
};
