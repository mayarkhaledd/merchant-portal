import React, { useEffect } from "react";
import { ExtendedWhatsappFormProps } from "@ejada/screens/Whatsapp/Whatsapp.types";
import { Controller, useFieldArray } from "react-hook-form";
import { useMarketing } from "./useMarketing";
import {
  MarketingDropDown,
  UtilityDropDown,
  validationRules,
} from "@ejada/screens/Whatsapp";
import { Button, InputField, PhoneInputField } from "eds-react";
import { Types, ColorValues, Sizes } from "@ejada/common";
import { IconBackspace, IconChevronDown, IconPlus } from "@tabler/icons-react";
import { PreviewSection } from "./PreviewSection";
import { useTranslation } from "react-i18next";

export const WhatsappMarketingUtilitySecondStep: React.FC<
  ExtendedWhatsappFormProps
> = ({
  control,
  watch,
  setValue,
  formState,
  unregister,
  getValues,
  templateType,
  drawerMode,
}) => {
  const { t } = useTranslation();
  const {
    fields: headerFields,
    append: appendHeaderVar,
    replace: replaceHeaderVar,
    remove: removeHeaderVar,
  } = useFieldArray({
    control,
    name: "headerVariables",
  });

  const {
    fields: bodyFields,
    append: appendBodyVar,
    replace: replaceBodyVar,
    remove: removeBodyVar,
  } = useFieldArray({ control, name: "bodyVariables" });

  const {
    fields: buttonFields,
    append: appendButton,
    remove: removeButton,
  } = useFieldArray({
    control,
    name: "buttons",
  });

  const {
    replaceVariables,
    handleRemoveVariable,
    handleAddVariable,
    header,
    body,
    footer,
    headerVariables,
    bodyVariables,
    buttons,
    handleButtonTypeChange,
    handleRemoveButton,
    handleAddButton,
  } = useMarketing({
    watch,
    control,
    unregister,
    setValue,
    appendHeaderVar,
    removeHeaderVar,
    appendBodyVar,
    removeBodyVar,
    replaceHeaderVar,
    replaceBodyVar,
    removeButton,
    getValues,
    appendButton,
    templateType: templateType || "Marketing",
  });
  useEffect(() => {
    if (headerVariables) {
      headerVariables.forEach((variable, index) => {
        setValue(`headerVariables.${index}.value`, variable.value);
      });
    }
    if (bodyVariables) {
      bodyVariables.forEach((variable, index) => {
        setValue(`bodyVariables.${index}.value`, variable.value);
      });
    }
  }, [headerVariables, bodyVariables, setValue]);
  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-col gap-4 w-3/5">
        {/* Header Field */}
        <Controller
          name="header"
          control={control}
          defaultValue=""
          rules={{ ...validationRules.header, ...validationRules.required }}
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                type={Types.TextType}
                placeHolder={t("whatsapp.header_placeholder") as string}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={t("whatsapp.header") as string}
                inputError={formState?.errors.header?.message}
                isRequired={true}
                disabled={drawerMode === "view"}
                {...field}
              />
            </div>
          )}
        />
        <Button
          label={t("whatsapp.add_header_variables") as string}
          size="medium"
          state={drawerMode === "view" ? "disabled" : "default"}
          type="default"
          onClick={() => handleAddVariable("HEADER")}
        />
        {headerFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center mt-2">
            <InputField
              type={Types.TextType}
              disabled
              placeHolder={`{{${index + 1}}}`}
              color={ColorValues.Gray}
              size={Sizes.Large}
              className="text-center bg-gray-100 w-full"
            />
            <Controller
              control={control}
              name={`headerVariables.${index}.value`}
              rules={{ ...validationRules.header, ...validationRules.required }}
              render={({ field }) => (
                <div className="w-[67%]">
                  <InputField
                    type={Types.TextType}
                    placeHolder={t("whatsapp.enter_value") as string}
                    color={ColorValues.Gray}
                    size={Sizes.Medium}
                    style={{ width: "100%" }}
                    disabled={drawerMode === "view"}
                    isRequired
                    inputError={
                      formState?.errors.headerVariables?.[index]?.value?.message
                    }
                    {...field}
                  />
                </div>
              )}
            />

            <Button
              buttonVariant="link"
              icon={
                <IconBackspace
                  className={`transform ${document.dir === "rtl" ? "rotate-180" : ""}`}
                />
              }
              label=""
              size="medium"
              state={drawerMode === "view" ? "disabled" : "default"}
              type="withIcon"
              onClick={() => handleRemoveVariable("HEADER", index)}
            />
          </div>
        ))}

        {/* Body Field */}
        <Controller
          name="body"
          control={control}
          defaultValue=""
          rules={{ ...validationRules.body, ...validationRules.required }}
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                type={Types.TextAreaType}
                placeHolder={t("whatsapp.body_placeholder") as string}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={t("whatsapp.body") as string}
                inputError={formState?.errors.body?.message}
                isRequired={true}
                disabled={drawerMode === "view"}
                {...field}
              />
            </div>
          )}
        />
        <Button
          label={t("whatsapp.add_body_variables") as string}
          size="medium"
          state={drawerMode === "view" ? "disabled" : "default"}
          type="default"
          onClick={() => handleAddVariable("BODY")}
        />
        {bodyFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center mt-2">
            <InputField
              type={Types.TextType}
              disabled
              placeHolder={`{{${index + 1}}}`}
              color={ColorValues.Gray}
              size={Sizes.Large}
              className="text-center bg-gray-100 w-full"
            />
            <Controller
              control={control}
              name={`bodyVariables.${index}.value`}
              rules={{ ...validationRules.body, ...validationRules.required }}
              //defaultValue={bodyVariables[index]?.value || ""} // Set defaultValue from bodyVariables
              render={({ field }) => (
                <div className="w-[67%]">
                  <InputField
                    type={Types.TextType}
                    placeHolder={t("whatsapp.enter_value") as string}
                    color={ColorValues.Gray}
                    size={Sizes.Medium}
                    style={{ width: "100%" }}
                    disabled={drawerMode === "view"}
                    isRequired
                    inputError={
                      formState?.errors.bodyVariables?.[index]?.value?.message
                    }
                    {...field}
                  />
                </div>
              )}
            />
            <Button
              buttonVariant="link"
              icon={
                <IconBackspace
                  className={`transform ${document.dir === "rtl" ? "rotate-180" : ""}`}
                />
              }
              label=""
              size="medium"
              state={drawerMode === "view" ? "disabled" : "default"}
              type="withIcon"
              onClick={() => handleRemoveVariable("BODY", index)}
            />
          </div>
        ))}

        {/* Footer Field */}
        <Controller
          name="footer"
          defaultValue=""
          control={control}
          rules={{ ...validationRules.footer, ...validationRules.required }}
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                type={Types.TextType}
                placeHolder={t("whatsapp.footer_placeholder") as string}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={t("whatsapp.footer") as string}
                inputError={formState?.errors.footer?.message}
                disabled={drawerMode === "view"}
                isRequired
                {...field}
              />
            </div>
          )}
        />

        <Button
          label={t("whatsapp.add_button") as string}
          buttonVariant="link"
          icon={<IconPlus color="#fff" />}
          size="medium"
          state={drawerMode === "view" ? "disabled" : "default"}
          type="withIcon"
          className=" !bg-primary-dark text-white hover:text-white"
          onClick={handleAddButton}
        />

        {buttonFields.map((field, index) => {
          const type = watch?.(`buttons.${index}.buttonType`);
          return (
            <div key={field.id} className="border p-4 rounded mb-4">
              <div className="flex items-center justify-between gap-4 w-full">
                {/* Type Select - Fixed width */}
                <div className="w-1/4">
                  <Controller
                    name={`buttons.${index}.buttonType`}
                    control={control}
                    render={({ field }) => {
                      const options: { value: string; label: string }[] =
                        templateType === "Utility"
                          ? UtilityDropDown
                          : MarketingDropDown;

                      return (
                        <div className="relative w-full">
                          <label
                            htmlFor={`buttons.${index}.buttonType`}
                            className="block mb-1 text-sm font-medium text-gray-700"
                          >
                            {t("whatsapp.type") as string}
                          </label>
                          <select
                            className="w-full pl-3 pr-8 py-2 bg-light-white border rounded-lg appearance-none"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                              const newValue = e.target.value as
                                | "URL"
                                | "CALL"
                                | "OFFER_CODE";
                              handleButtonTypeChange(
                                index,
                                newValue,
                                field.onChange,
                              );
                            }}
                            disabled={drawerMode === "view"}
                          >
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute top-1/2 right-3 transform translate-y-[15%] text-gray-500">
                            <IconChevronDown size={18} />
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>

                {/* Text Input - Flexible width */}
                <Controller
                  name={`buttons.${index}.text`}
                  control={control}
                  rules={validationRules.required}
                  render={({ field }) => (
                    <InputField
                      label={t("whatsapp.button_text") as string}
                      {...field}
                      isRequired
                      placeHolder={t("whatsapp.enter_label") as string}
                      inputError={
                        formState?.errors?.buttons?.[index]?.text
                          ?.message as string
                      }
                      disabled={drawerMode === "view"}
                      type={Types.TextType}
                    />
                  )}
                />

                {/* URL/Phone Input - Flexible width */}
                {type === "URL" && (
                  <Controller
                    name={`buttons.${index}.url`}
                    control={control}
                    rules={validationRules.required}
                    render={({ field }) => (
                      <InputField
                        isRequired
                        label={t("whatsapp.website_url") as string}
                        {...field}
                        placeHolder={t("whatsapp.enter_url") as string}
                        disabled={drawerMode === "view"}
                        inputError={
                          formState?.errors?.buttons?.[index]?.url
                            ?.message as string
                        }
                        type={Types.TextType}
                      />
                    )}
                  />
                )}
                {type === "CALL" && (
                  <Controller
                    name={`buttons.${index}.phone`}
                    control={control}
                    rules={validationRules.required}
                    render={({ field }) => (
                      <PhoneInputField
                        className=""
                        color={ColorValues.Gray}
                        isRequired
                        label={t("whatsapp.phone_number") as string}
                        placeholder={"eg.515020716"}
                        setIsValidPhone={() => {}}
                        size={Sizes.Small}
                        style={{ width: "100%" }}
                        error={formState?.errors?.buttons?.[index]?.phone}
                        disabled={drawerMode === "view"}
                        {...field}
                        value={field.value || ""}
                      />
                    )}
                  />
                )}

                {/* Delete Button - Fixed width with self-align */}
                <div className="self-end">
                  <Button
                    onClick={() => handleRemoveButton(index)}
                    label=""
                    icon={
                      <IconBackspace
                        className={`transform ${document.dir === "rtl" ? "rotate-180" : ""}`}
                      />
                    }
                    buttonVariant="link"
                    state={drawerMode === "view" ? "disabled" : "default"}
                    size="medium"
                    type="withIcon"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PreviewSection
        header={header}
        body={body}
        footer={footer}
        headerVariables={headerVariables}
        bodyVariables={bodyVariables}
        buttons={buttons}
        replaceVariables={replaceVariables}
      />
    </div>
  );
};
