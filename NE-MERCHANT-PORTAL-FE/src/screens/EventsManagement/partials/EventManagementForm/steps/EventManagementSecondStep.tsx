import { Button, colors, SelectSearch } from "eds-react";
//import { useWatch } from "react-hook-form";
import {
  EventsManagementContext,
  EventsManagementFormStepProps,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import { Context, useContext } from "react";
import { ExtraEventChannelForm } from "../AddExtraChannelsForm";
import { t } from "i18next";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import { WhatsappParametersHint } from "@ejada/screens/shared";

export const EventManagementSecondStep: React.FC<
  EventsManagementFormStepProps
> = ({ control, formState, mode }) => {
  const { addExtraChannelBtn, eventParameterList, setAddExtraChannelBtn } =
    useContext(EventsManagementContext as Context<TEventsManagementState>);
  return (
    <>
      <div className="flex justify-between mb-4 gap-6">
        <Controller
          name="parameters"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <div className="relative w-full ">
              <SelectSearch
                initialSelectedItems={field?.value?.map((value: string) => ({
                  id: value,
                }))}
                items={eventParameterList || []}
                displayKey={"id"}
                placeholder={t("SearchCriteria.searchPlaceHolder") as string}
                title={t("eventsManagement.parameters") as string}
                label={t("eventsManagement.parameters") as string}
                fullWidth
                dropDownStyles="w-[38rem]"
                onChange={field.onChange}
                isDisabled={mode === "view"}
              />
              {formState.errors.usersList && (
                <span className="text-error-default mt-1 flex text-sm items-center -bottom-3">
                  <IconAlertCircleFilled
                    color={colors.errorDefault}
                    size={16}
                    className="mx-1"
                  />
                  {formState.errors.parameters?.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <WhatsappParametersHint className="mb-4" />

      {!addExtraChannelBtn && (
        <Button
          size={"medium"}
          label={t("eventsManagement.add_extra_channel")}
          state={`${addExtraChannelBtn ? "disabled" : "default"}`}
          type="default"
          onClick={() => setAddExtraChannelBtn(true)}
        />
      )}
      {addExtraChannelBtn && <ExtraEventChannelForm />}
    </>
  );
};
