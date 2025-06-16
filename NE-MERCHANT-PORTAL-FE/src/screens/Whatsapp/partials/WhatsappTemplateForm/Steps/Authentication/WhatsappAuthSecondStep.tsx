import React from "react";
import { Checkbox, InputField } from "eds-react";
import { Controller } from "react-hook-form";
import { AuthenticationPreviewSection } from "./AuthenticationPreviewSection";
import { useAuthentication } from "./useAuthentication";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { validationRules } from "@ejada/screens/Whatsapp";
import { WhatsappInitialValues } from "../../WhatsappTemplateFormTypes";
import { WhatsappFormProps } from "@ejada/screens/Whatsapp/Whatsapp.types";
import { t } from "i18next";

export const WhatsappAuthSecondStep: React.FC<WhatsappFormProps> = ({
  control,
  watch,
  formState,
  setValue,
  getValues,
  drawerMode,
  initialValues = {} as WhatsappInitialValues,
}) => {
  const {
    securityBody,
    expiryCheckbox,
    securityCheckbox,
    expiryDuration,
    replaceVariable,
    copyCodeText,
  } = useAuthentication({
    watch,
    control,
    setValue,
    getValues,
  });
  return (
    <div
      className="flex max-h-full overflow-y-auto pr-5 justify-between"
      style={{ height: "100%" }}
    >
      {/* Left Section */}
      <div className="flex flex-col w-full gap-4">
        {/* Message Content Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {t("whatsapp.msg_content")}
          </h3>
          <div className="flex flex-col gap-2">
            <Controller
              name="securityCheckbox"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="relative w-[100%]">
                  <Checkbox
                    checked={securityCheckbox}
                    label={t("whatsapp.security_label") as string}
                    disabled={drawerMode === "view"}
                    onChange={() => {
                      field.onChange(!field.value);
                    }}
                    size="sm"
                  />
                </div>
              )}
            />
            <Controller
              name="expirationCheckbox"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="relative w-[100%]">
                  <Checkbox
                    checked={expiryCheckbox}
                    label={t("whatsapp.expiry_label") as string}
                    disabled={drawerMode === "view"}
                    onChange={() => {
                      field.onChange(!field.value);
                    }}
                    size="sm"
                  />
                  {expiryCheckbox && (
                    <div className="flex items-center mt-2">
                      <span className="mr-2 whitespace-nowrap text-nowrap">
                        {t("whatsapp.expirs_in")}
                      </span>
                      <Controller
                        name="expiryDuration"
                        control={control}
                        defaultValue={expiryDuration}
                        rules={validationRules.numbers}
                        render={({ field }) => (
                          <div className="relative w-[15%]">
                            <InputField
                              type={Types.TextType}
                              placeHolder={
                                t("whatsapp.expiry_placeholder") as string
                              }
                              color={ColorValues.Gray}
                              size={Sizes.Small}
                              style={{ width: "100%" }}
                              label={""}
                              inputError={
                                formState?.errors.expiryDuration
                                  ?.message as string
                              }
                              isRequired={true}
                              disabled={drawerMode === "view"}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value);
                              }}
                            />
                          </div>
                        )}
                      />
                      <span className="ml-2">{t("whatsapp.minutes")}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {t("whatsapp.buttons")}
          </h3>
          <Controller
            name="copyCodeButton"
            control={control}
            defaultValue={initialValues?.copyCodeButton}
            rules={{ ...validationRules.english, ...validationRules.required }}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  type={Types.TextType}
                  placeHolder={t("whatsapp.copy_code_placeholder") as string}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={""}
                  inputError={
                    formState?.errors.copyCodeButton?.message as string
                  }
                  isRequired={true}
                  disabled={drawerMode === "view"}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className=" pl-5 flex place-content-end w-full">
        <AuthenticationPreviewSection
          codeHeader={t("whatsapp.code_header") as string}
          securitybody={securityBody}
          isExpirySection={expiryCheckbox}
          isSecuritySection={securityCheckbox}
          expiryDuration={expiryDuration}
          copyCodeButton={copyCodeText}
          replaceVariable={replaceVariable}
        />
      </div>
    </div>
  );
};
