import { Controller } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { Select, InputField, Info, SelectSearch } from "eds-react";
import {
  EventGroupManagementProps,
  eventGroupTypes,
  EventGroupInitialValues,
} from "@ejada/screens/EventGroupManagement";
import { ValidationSchema } from "./ValidationSchema";
import { useTranslation } from "react-i18next";

export const EventGroupManagementData = ({
  control,
  mode,
  formState,
  initialValues = {} as EventGroupInitialValues,
  sourceSystemsMenu,
}: EventGroupManagementProps) => {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col max-h-full  overflow-y-hidden overflow-x-hidden pb-12 pt-2"
      style={{ height: "100%" }}
    >
      <div className="pe-6 mb-4">
        <div className="flex justify-between  gap-6">
          <Controller
            name="eventGroupId"
            control={control}
            defaultValue={initialValues.eventGroupId}
            rules={mode === "add" ? ValidationSchema.eventGroupCode : {}}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  type={Types.TextType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("eventGroupManagement.event_code")}
                  isRequired={true}
                  placeHolder={
                    t("eventGroupManagement.eventCode_placeholder") as string
                  }
                  className="text-primary-blue"
                  inputError={formState.errors.eventCode?.message as string}
                  disabled={mode === "edit" || mode === "view" ? true : false}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="eventGroupPushFlag"
            control={control}
            defaultValue={initialValues.eventGroupPushFlag}
            rules={ValidationSchema.required}
            render={({ field }) => {
              return (
                <div className="relative w-[100%] ">
                  <Select
                    options={eventGroupTypes}
                    label={t("eventGroupManagement.event_group_type")}
                    onChange={field.onChange}
                    value={
                      mode === "edit" || mode === "view"
                        ? initialValues.eventGroupPushFlag
                          ? initialValues.eventGroupPushFlag
                          : field.value
                        : field.value
                    }
                    isRequired
                    disabled={mode === "view"}
                    placeholder={
                      t("eventGroupManagement.event_group_type") as string
                    }
                    inputError={
                      formState.errors.eventGroupType?.message as string
                    }
                  />
                </div>
              );
            }}
          />
        </div>
        {mode === "add" && (
          <span className="text-neutrals/N3 text-[12px] -mt-3">
            {t("eventGroupManagement.applied_once")}
          </span>
        )}
      </div>
      <div className="">
        <Controller
          name="sourceSystem"
          control={control}
          rules={ValidationSchema.required}
          defaultValue={""}
          render={({ field }) => (
            <div className="w-full">
              <SelectSearch
                isRequired
                isDisabled={mode === "view"}
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
                    id: field.value,
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
      <div className="w-full mb-4">
        <Controller
          name="eventGroupDescriptionEn"
          control={control}
          defaultValue={initialValues.eventGroupDescriptionEn}
          rules={ValidationSchema.english}
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                type={Types.TextAreaType}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                isRequired={false}
                disabled={mode === "view"}
                label={t(
                  "eventGroupManagement.event_group_english_description",
                )}
                placeHolder={
                  t(
                    "eventGroupManagement.enter_the_event's_english_description",
                  ) as string
                }
                className="text-primary-blue"
                inputError={
                  formState.errors.eventGroupEnglishDescription
                    ?.message as string
                }
                {...field}
              />
            </div>
          )}
        />
      </div>
      <div className="w-full mb-4">
        <Controller
          name="eventGroupDescriptionAr"
          control={control}
          rules={ValidationSchema.arabic}
          defaultValue={initialValues.eventGroupDescriptionAr}
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                type={Types.TextAreaType}
                isRequired={false}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                disabled={mode === "view"}
                label={t("eventGroupManagement.event_group_arabic_description")}
                placeHolder={
                  t(
                    "eventGroupManagement.enter_the_event's_arabic_description",
                  ) as string
                }
                className="text-primary-blue"
                inputError={
                  formState.errors.eventGroupArabicDescription
                    ?.message as string
                }
                {...field}
              />
            </div>
          )}
        />
      </div>
      {mode === "add" && (
        <Info
          text={t("eventGroupManagement.edit_event_group_later")}
          //classNames="-ml-2 text-[#42566B]"
        />
      )}
    </div>
  );
};
