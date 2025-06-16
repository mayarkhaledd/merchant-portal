import {
  EventsManagementFormStepProps,
  TEventsManagementState,
  EventsManagementContext,
  EVENT_PRIORITY,
  EVENT_STATUS,
} from "@ejada/screens/EventsManagement";
import { Context, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { colors, InputField, Select, SelectSearch } from "eds-react";
import { Controller } from "react-hook-form";
import { EventManagementFormValidationSchema } from "../EventManagementFormValidationSchema";
import { EventManagementInitialValues } from "../types";
import i18n from "@ejada/common/locals/i18n";

export const EventManagementFirstStep: React.FC<
  EventsManagementFormStepProps
> = ({
  control,
  formState,
  mode,
  initialValues = {} as EventManagementInitialValues,
}) => {
  const { t } = useTranslation();
  const { eventGroupList, eventParameterList, selectedEventGroup } =
    useContext<TEventsManagementState>(
      EventsManagementContext as Context<TEventsManagementState>,
    );
  const isRtl = i18n.language === "ar";
  return (
    <div className={`h-full ${(mode == "edit" || mode == "view") && "mt-16"} `}>
      <div className="flex justify-between mb-4 gap-6">
        <Controller
          name="eventCode"
          control={control}
          defaultValue={""}
          rules={EventManagementFormValidationSchema.eventCode}
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                type={Types.EmailType}
                placeHolder={t("eventsManagement.eventCode") as string}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={t("eventsManagement.eventCode")}
                inputError={formState.errors.eventCode?.message}
                disabled={mode === "edit" || mode === "view"}
                isRequired={mode !== "view"}
                {...field}
              />
              <span className=" mt-1  text-xs font-readexProRegular text-gray-400">
                {t("eventsManagement.eventCodeHelperText")}
              </span>
            </div>
          )}
        />
      </div>

      <div className="flex justify-between mb-4 gap-6">
        <Controller
          name="eventPriority"
          control={control}
          defaultValue={""}
          rules={
            mode !== "view"
              ? EventManagementFormValidationSchema.required
              : undefined
          }
          render={({ field }) => (
            <div className="relative w-[100%]">
              <Select
                options={EVENT_PRIORITY}
                label={t("eventsManagement.eventPriority")}
                onChange={field.onChange}
                value={field.value}
                isRequired={mode !== "view"}
                disabled={mode === "view"}
                placeholder={t("eventsManagement.select_option") as string}
              />
              <span className="mt-1  text-xs font-readexProRegular text-gray-400">
                {t("eventsManagement.one_is_highest")}
              </span>
              {formState.errors.eventPriority && (
                <span className="text-error-default mt-1 flex text-sm items-center -bottom-3">
                  <IconAlertCircleFilled
                    color={colors.errorDefault}
                    size={16}
                    className="mx-1"
                  />
                  {formState.errors.eventPriority?.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className={`${isRtl ? "" : "-mr-4"}`}>
        <Controller
          name="eventGroup"
          rules={EventManagementFormValidationSchema.required}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <div className="w-full">
              <SelectSearch
                isDisabled={mode === "view"}
                multiSelect={false}
                initialSelectedItems={[
                  {
                    id: field.value,
                  },
                ]}
                items={eventGroupList ? eventGroupList : []}
                displayKey={"id"}
                placeholder={t("SearchCriteria.searchPlaceHolder") as string}
                label={t("eventsManagement.filterMenu.event_group") as string}
                btnstyles="w-[30rem]"
                key={selectedEventGroup.id}
                dropDownStyles="w-[30rem]"
                onChange={(selectedOption) => {
                  field.onChange(selectedOption[0]);
                }}
                fullWidth={true}
                enableSearch={true}
                title={t("eventsManagement.filterMenu.event_group") as string}
                isRequired={mode !== "view"}
                inputError={formState.errors.eventGroupId?.message?.toString()}
              />
            </div>
          )}
        />
      </div>
      <div className="flex justify-between my-4 gap-6 pt-2">
        <Controller
          name="eventEnglishDescription"
          control={control}
          defaultValue={""}
          rules={EventManagementFormValidationSchema.english}
          render={({ field }) => (
            <div className="relative w-full">
              <InputField
                className="resize-none w-full"
                type={Types.TextAreaType}
                placeHolder={
                  t("eventsManagement.eventEnglishDescription") as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                //isRequired={mode !== "view"}
                disabled={mode === "view"}
                label={t("eventsManagement.eventEnglishDescription") as string}
                inputError={formState.errors.eventEnglishDescription?.message}
                {...field}
              />
            </div>
          )}
        />
      </div>
      <div className="flex justify-between mb-4 gap-6">
        <Controller
          name="eventArabicDescription"
          control={control}
          defaultValue={""}
          rules={EventManagementFormValidationSchema.arabic}
          render={({ field }) => (
            <div className="relative w-full">
              <InputField
                className="resize-none w-full"
                type={Types.TextAreaType}
                placeHolder={
                  t("eventsManagement.eventArabicDescription") as string
                }
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                //isRequired={mode !== "view"}
                disabled={mode === "view"}
                label={t("eventsManagement.eventArabicDescription") as string}
                inputError={formState.errors.eventArabicDescription?.message}
                {...field}
              />
            </div>
          )}
        />
      </div>
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
      <div className="flex justify-between mb-4 gap-6">
        <Controller
          name="eventStatus"
          control={control}
          defaultValue={initialValues.eventStatus}
          render={({ field }) => (
            <div className="relative w-[100%]">
              <Select
                options={EVENT_STATUS}
                label={t("eventsManagement.eventStatus")}
                onChange={field.onChange}
                value={field.value}
                disabled={mode === "view"}
                placeholder={t("eventsManagement.select_option") as string}
              />

              {formState.errors.eventStatus && (
                <span className="text-error-default mt-1 flex text-sm items-center -bottom-3">
                  <IconAlertCircleFilled
                    color={colors.errorDefault}
                    size={16}
                    className="mx-1"
                  />
                  {formState.errors.eventStatus?.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
