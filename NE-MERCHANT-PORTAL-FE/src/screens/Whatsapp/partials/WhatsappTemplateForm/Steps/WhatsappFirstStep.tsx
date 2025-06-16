import { IconAlertCircleFilled, IconInfoCircle } from "@tabler/icons-react";
import React, { Context, useContext } from "react";
import { Controller } from "react-hook-form";
import { Button, colors, InputField, Select } from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import { validationRules } from "./ValidationSchema";
import { ColorValues, Sizes, Types } from "@ejada/common";
import {
  TWhatsappState,
  WhatsappContext,
  WhatsappFormProps,
  WhatsappLanguage,
} from "@ejada/screens/Whatsapp";
import { t } from "i18next";

export const WhatsappFirstStep: React.FC<WhatsappFormProps> = ({
  control,
  formState,
  drawerMode,
  //initialValues = {} as WhatsappInitialValues,
}) => {
  const { setTemplateType, templateType, whatsappTemplateByIdData } =
    useContext<TWhatsappState>(WhatsappContext as Context<TWhatsappState>);
  const categoryType =
    drawerMode !== "add" ? whatsappTemplateByIdData?.category : "";
  return (
    <div
      className="flex flex-col w-full max-h-full mb-2 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="mx-auto w-full">
        <div className="flex gap-[20px] mb-4 mt-2 flex-grow">
          <div className="w-full">
            <Controller
              name="templateName"
              control={control}
              defaultValue={""}
              rules={{
                ...validationRules.required,
                ...validationRules.lowerCase,
              }}
              render={({ field }) => (
                <InputField
                  disabled={drawerMode === "edit" || drawerMode === "view"}
                  type={Types.TextType}
                  placeHolder={
                    i18n.t(
                      "whatsapp.create_template.first_step.template_name",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    i18n.t(
                      "whatsapp.create_template.first_step.template_name",
                    ) as string
                  }
                  {...field}
                  isRequired
                  inputError={formState?.errors.templateName?.message as string}
                />
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              name="languageCode"
              control={control}
              defaultValue={""}
              rules={validationRules.required}
              render={({ field }) => (
                <Select
                  label={i18n.t("whatsapp.create_template.first_step.language")}
                  options={WhatsappLanguage}
                  value={field.value}
                  disabled={drawerMode === "view"}
                  onChange={field.onChange}
                  inputError={formState?.errors.language?.message as string}
                  isRequired
                  placeholder={
                    i18n.t(
                      "whatsapp.create_template.first_step.language_placeholder",
                    ) as string
                  }
                />
              )}
            />
          </div>
        </div>
        <div className="text-neutrals/N2 font-medium text-base mb-2 block">
          {i18n.t("whatsapp.create_template.first_step.category")}{" "}
          <span className="text-red-500 text-lg leading-none">&nbsp;*</span>
        </div>
        <div className="flex gap-[20px] mb-4 flex-grow">
          <Controller
            name="categoryButtons"
            control={control}
            defaultValue=""
            rules={validationRules.required}
            render={({ field }) => (
              <>
                <div className="w-full">
                  <Button
                    className={
                      categoryType !== "MARKETING"
                        ? " "
                        : " !bg-[#aba7a7] !text-black"
                    }
                    buttonVariant={
                      drawerMode === "add" && templateType !== "Marketing"
                        ? "outlined"
                        : "secondary"
                    }
                    icon={<IconInfoCircle />}
                    onClick={() => {
                      setTemplateType("Marketing");
                      field.onChange("Marketing");
                    }}
                    label={t("whatsapp.marketing")}
                    size="medium"
                    state={
                      drawerMode === "view" || drawerMode === "edit"
                        ? "disabled"
                        : "default"
                    }
                    type="withIcon"
                  />
                </div>
                <div className="w-full">
                  <Button
                    className={
                      categoryType !== "UTILITY"
                        ? " "
                        : " !bg-[#aba7a7] !text-black"
                    }
                    buttonVariant={`${templateType !== "Utility" ? "outlined" : "secondary"}`}
                    icon={<IconInfoCircle />}
                    onClick={() => {
                      setTemplateType("Utility");
                      field.onChange("Utility");
                    }}
                    label={t("whatsapp.utility")}
                    size="medium"
                    state={
                      drawerMode === "view" || drawerMode === "edit"
                        ? "disabled"
                        : "default"
                    }
                    type="withIcon"
                  />
                </div>
                <div className="w-full">
                  <Button
                    className={
                      categoryType !== "AUTHENTICATION"
                        ? " "
                        : " !bg-[#aba7a7] !text-black"
                    }
                    buttonVariant={`${templateType !== "Authentication" ? "outlined" : "secondary"}`}
                    icon={<IconInfoCircle />}
                    onClick={() => {
                      setTemplateType("Authentication");
                      field.onChange("Authentication");
                    }}
                    label={t("whatsapp.authentication")}
                    size="medium"
                    state={
                      drawerMode === "view" || drawerMode === "edit"
                        ? "disabled"
                        : "default"
                    }
                    type="withIcon"
                  />
                </div>
              </>
            )}
          />
        </div>
        {formState?.errors.categoryButtons && (
          <div className="text-red-500 text-lg leading-none">
            <span className="text-error-default flex items-center text-sm">
              <IconAlertCircleFilled
                color={colors.errorDefault}
                size={16}
                className="mr-1"
              />
              {formState?.errors.categoryButtons?.message as string}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
