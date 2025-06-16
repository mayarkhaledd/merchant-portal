import { IconAlertCircleFilled } from "@tabler/icons-react";
import { Button, colors, SelectSearch } from "eds-react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  EventsManagementContext,
  LANGUAGES,
  RenderMobileAppName,
} from "@ejada/screens/EventsManagement";
import { Fragment, useContext, useEffect } from "react";
import RenderAccordion from "@ejada/screens/EventsManagement/partials/EventManagementForm/steps/RenderAccordion";
import { AddExtraEventFormProps } from "./addExtraEventsForm.types";
import { EventManagementFormValidationSchema } from "../EventManagementFormValidationSchema";

export const AddExtraEventForm: React.FC<AddExtraEventFormProps> = ({
  control,
  formState,
  selectedChannels,
  setSelectedChannels,
  setValue,
  getValues,
  channelList,
  watchedChannels,
  handleFormSubmit,
}) => {
  const { t } = useTranslation();
  const { savedChannel, savedLanguage } = useContext(EventsManagementContext);

  // Localize channelList for SelectSearch
  const localizedChannelList = channelList.map((item) => ({
    ...item,
    label: t(`eventsManagement.${item.id}`),
  }));

  useEffect(() => {
    setSelectedChannels && setSelectedChannels(watchedChannels);
  }, [watchedChannels]);

  return (
    <div className={`h-full `}>
      <div className=" w-full flex justify-end items-center">
        <Button
          size={"small"}
          label={t("eventsManagement.save_channels")}
          state="default"
          type="default"
          className="my-5"
          onClick={handleFormSubmit}
        />
      </div>
      <div className="relative w-[100%] mt-4">
        <Controller
          name="demoChannels"
          control={control}
          rules={EventManagementFormValidationSchema.required}
          defaultValue={savedChannel || []}
          render={({ field }) => (
            <div className="relative w-[100%] ">
              <SelectSearch
                initialSelectedItems={field.value.map((value: string) => ({
                  id: value,
                }))}
                items={localizedChannelList}
                displayKey={"id"}
                enableSearch={false}
                title={t("eventsManagement.channels") as string}
                label={t("eventsManagement.channels") as string}
                placeholder={t("SearchCriteria.searchPlaceHolder") as string}
                fullWidth
                dropDownStyles="w-[38rem]"
                onChange={(value) => {
                  field.onChange(value);
                }}
                isRequired
                inputError={formState.errors.demoChannels?.message}
                multiSelect={true}
              />
              {formState.errors.demoChannels && (
                <span className="text-error-default mt-1 flex text-sm items-center -bottom-3">
                  <IconAlertCircleFilled
                    color={colors.errorDefault}
                    size={16}
                    className="mx-1"
                  />
                  {formState.errors.demoChannels?.message}
                </span>
              )}
            </div>
          )}
        />
        <div className="relative w-[100%] mt-4">
          <Controller
            name="languageCode"
            control={control}
            rules={EventManagementFormValidationSchema.required}
            defaultValue={savedLanguage || []}
            render={({ field }) => (
              <div className="relative w-[100%] ">
                <SelectSearch
                  initialSelectedItems={(field.value || []).map(
                    (value: string) => ({ id: value }),
                  )}
                  items={LANGUAGES}
                  displayKey={"id"}
                  placeholder={t("SearchCriteria.searchPlaceHolder") as string}
                  title={t("eventsManagement.language") as string}
                  label={t("eventsManagement.language") as string}
                  fullWidth
                  dropDownStyles="w-[38rem]"
                  onChange={(selectedLang) => {
                    field.onChange(selectedLang);
                  }}
                  multiSelect={true}
                  isRequired
                  inputError={formState.errors.languageCode?.message}
                />
                {formState.errors.languageCode && (
                  <span className="text-error-default mt-1 flex text-sm items-center -bottom-3">
                    <IconAlertCircleFilled
                      color={colors.errorDefault}
                      size={16}
                      className="mx-1"
                    />
                    {formState.errors.languageCode?.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {(selectedChannels || savedChannel) &&
        selectedChannels.map((channel, index) => {
          return (
            <Fragment key={`accordion-${channel}-${index}`}>
              <RenderAccordion
                type={channel}
                control={control}
                formState={formState}
                id={index}
                setValue={setValue}
                key={index}
                mode={"add"}
                getValues={getValues}
              />
            </Fragment>
          );
        })}

      {watchedChannels?.includes("PUSH_NOTIFICATION") &&
        RenderMobileAppName("PUSH_NOTIFICATION", control, formState, 0)}
    </div>
  );
};
