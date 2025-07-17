import { ColorValues, Sizes, Types } from "@ejada/common";
import { Button, InputField, SelectSearch, Select } from "eds-react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  EditTemplateFormProps,
  EventsManagementContext,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import React, { useContext, useMemo } from "react";
import { EventManagementFormValidationSchema } from "../EventManagementFormValidationSchema";
import { useEditTemplateForm } from "./useEditTemplateForm";
import { WhatsappTemplatePreview } from "@ejada/screens/shared";
import i18n from "@ejada/common/locals/i18n";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";

export const EditTemplateForm: React.FC<EditTemplateFormProps> = ({
  initialValues,
  closeDrawer,
}) => {
  const { t } = useTranslation();
  const { control, formState, handleSubmit, onSubmit, watch } =
    useEditTemplateForm(closeDrawer);

  // Watch the current value of channelId (or eventChannelId if that's the field)
  const channelId = watch("channelId") || initialValues?.channelId;

  const {
    smsSender,
    emailSender,
    allWhatsappTemplatesData,
    selectedWhatsappTemplate,
    setSelectedWhatsappTemplate,
    getWhatsappTemplateDetails,
    setSelectedWabaId,
    selectedWabaId,
  } = useContext<TEventsManagementState>(EventsManagementContext);

  const context = useWhatsappOnboardingParams();
  const params = context?.params;
  const whatsappAccounts =
    params?.onboardingMetaAuth?.metaBusinessAccounts?.[0]?.whatsappAccounts ||
    [];
  const whatsappBusinessAccountOptions = whatsappAccounts.map((account) => ({
    key: account.wabaId,
    node: account.name,
  }));
  const filteredSenderOptions = useMemo(() => {
    if (!selectedWabaId) return [];
    const account = whatsappAccounts.find(
      (acc) => acc.wabaId === selectedWabaId,
    );
    return (
      account?.whatsappPhoneNumbersResponses?.map((phone) => ({
        key: phone.phoneNumberId,
        node: phone.displayPhoneNumber,
      })) || []
    );
  }, [selectedWabaId, whatsappAccounts]);

  const filteredTemplateOptions = useMemo(() => {
    if (!selectedWabaId) return [];
    return allWhatsappTemplatesData?.templates
      .filter(
        (template) => template.whatsappBusinessAccountId === selectedWabaId,
      )
      .map((template) => ({
        key: template.templateId ?? template.templateName,
        node: template.templateName,
      }));
  }, [selectedWabaId, allWhatsappTemplatesData?.templates]);

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full pe-5"
      >
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="eventChannelId"
            control={control}
            defaultValue={initialValues?.eventChannelId}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  type={Types.EmailType}
                  placeHolder={
                    t("eventsManagement.sender_id_placeholder") as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("eventsManagement.sender_id")}
                  disabled
                  inputError={formState.errors.eventChannelId?.message}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        {channelId !== "WHATSAPP" && (
          <div className="flex justify-between mb-4 gap-6">
            <Controller
              name="header"
              control={control}
              defaultValue={initialValues?.header}
              rules={
                channelId !== "SMS"
                  ? EventManagementFormValidationSchema.required
                  : undefined
              }
              render={({ field }) => (
                <div className="relative w-[100%]">
                  <InputField
                    isRequired={channelId !== "SMS"}
                    type={Types.EmailType}
                    placeHolder={
                      t(
                        "eventsManagement.template_header_placeholder",
                      ) as string
                    }
                    color={ColorValues.Gray}
                    size={Sizes.Medium}
                    style={{ width: "100%" }}
                    label={t("eventsManagement.template_header")}
                    inputError={formState.errors.header?.message}
                    {...field}
                  />
                </div>
              )}
            />
          </div>
        )}
        {channelId !== "WHATSAPP" && (
          <div className="flex justify-between mb-4 gap-6">
            <Controller
              name="body"
              control={control}
              defaultValue={initialValues?.body}
              rules={
                channelId !== "INBOX"
                  ? EventManagementFormValidationSchema.required
                  : undefined
              }
              render={({ field }) => (
                <div className="relative w-[100%]">
                  <InputField
                    type={Types.TextAreaType}
                    placeHolder={
                      t("eventsManagement.template_body_placeholder") as string
                    }
                    isRequired={channelId !== "INBOX"}
                    color={ColorValues.Gray}
                    size={Sizes.Medium}
                    style={{ width: "100%" }}
                    label={t("eventsManagement.template_body")}
                    inputError={formState.errors.body?.message}
                    {...field}
                  />
                </div>
              )}
            />
          </div>
        )}
        {channelId !== "WHATSAPP" && (
          <div className="flex justify-between mb-4 gap-6">
            <Controller
              name="sender"
              control={control}
              rules={
                channelId === "SMS" || channelId === "EMAIL"
                  ? EventManagementFormValidationSchema.required
                  : undefined
              }
              defaultValue={initialValues?.sender}
              render={({ field }) => (
                <div className="relative w-[100%]">
                  {channelId === "EMAIL" && (
                    <SelectSearch
                      items={emailSender || []}
                      displayKey={"id"}
                      title={t("eventsManagement.template_sender") as string}
                      label={t("eventsManagement.template_sender") as string}
                      fullWidth
                      dropDownStyles="w-[38rem]"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption[0]);
                      }}
                      isRequired
                      multiSelect={false}
                      placeholder={
                        t(
                          "eventsManagement.template_sender_placeholder",
                        ) as string
                      }
                      inputError={formState.errors.sender?.message}
                      initialSelectedItems={
                        field.value ? [{ id: field.value }] : []
                      }
                    />
                  )}
                  {channelId === "SMS" && (
                    <SelectSearch
                      items={smsSender || []}
                      displayKey={"id"}
                      title={t("eventsManagement.template_sender") as string}
                      label={t("eventsManagement.template_sender") as string}
                      fullWidth
                      dropDownStyles="w-[38rem]"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption[0]);
                      }}
                      isRequired
                      multiSelect={false}
                      placeholder={
                        t(
                          "eventsManagement.template_sender_placeholder",
                        ) as string
                      }
                      inputError={formState.errors.sender?.message}
                      initialSelectedItems={
                        field.value ? [{ id: field.value }] : []
                      }
                    />
                  )}
                  {channelId === "PUSH_NOTIFICATION" && (
                    <InputField
                      type={Types.EmailType}
                      placeHolder={
                        t(
                          "eventsManagement.template_sender_placeholder",
                        ) as string
                      }
                      color={ColorValues.Gray}
                      size={Sizes.Medium}
                      style={{ width: "100%" }}
                      label={t("eventsManagement.template_sender")}
                      inputError={formState.errors.sender?.message}
                      {...field}
                    />
                  )}
                </div>
              )}
            />
          </div>
        )}
        {channelId === "WHATSAPP" && (
          <>
            <div className="w-full">
              <Controller
                name={`whatsappBusinessAccountId`}
                control={control}
                defaultValue={undefined}
                rules={EventManagementFormValidationSchema.required}
                render={({ field }) => (
                  <Select
                    label={i18n.t(
                      "whatsapp.create_template.first_step.whatsappBusinessAccountId",
                    )}
                    options={whatsappBusinessAccountOptions}
                    value={field.value}
                    onChange={field.onChange}
                    isRequired
                    inputError={
                      formState?.errors.whatsappBusinessAccountId
                        ?.message as string
                    }
                    placeholder={
                      i18n.t(
                        "whatsapp.create_template.first_step.whatsappBusinessAccountId_placeholder",
                      ) as string
                    }
                  />
                )}
              />
            </div>
            <div className="w-full mt-4 mb-4">
              <Controller
                name={`whatsappSender`}
                control={control}
                defaultValue={undefined}
                rules={EventManagementFormValidationSchema.required}
                render={({ field }) => {
                  const selectedWhatsappBusinessId = watch
                    ? watch(`whatsappBusinessAccountId`)
                    : "";
                  setSelectedWabaId(selectedWhatsappBusinessId as string);
                  return (
                    <Select
                      label={i18n.t(
                        "whatsapp.create_template.first_step.whatsappSender",
                      )}
                      options={filteredSenderOptions}
                      value={field.value}
                      onChange={field.onChange}
                      isRequired
                      placeholder={
                        i18n.t(
                          "whatsapp.create_template.first_step.whatsappSender_placeholder",
                        ) as string
                      }
                      disabled={!selectedWabaId}
                    />
                  );
                }}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="whatsappTemplateId"
                control={control}
                defaultValue={undefined}
                rules={EventManagementFormValidationSchema.required}
                render={({ field }) => (
                  <div className="relative w-[100%]">
                    <Select
                      options={filteredTemplateOptions || []}
                      label={t("eventsManagement.templates") as string}
                      onChange={(value) => {
                        field.onChange(value);
                        if (value) {
                          const templateDetails =
                            getWhatsappTemplateDetails(value);
                          setSelectedWhatsappTemplate(templateDetails);
                        } else {
                          setSelectedWhatsappTemplate(null);
                        }
                      }}
                      value={field.value}
                      disabled={!selectedWabaId}
                      placeholder={
                        t("eventsManagement.select_template") as string
                      }
                    />
                  </div>
                )}
              />
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {t("eventsManagement.template_preview")}
                </div>
                <WhatsappTemplatePreview
                  selectedTemplate={selectedWhatsappTemplate}
                />
              </div>
            </div>
          </>
        )}
      </form>
      <div className="border-b-[0.5px] border-divider-color w-[100%] mt-auto py-4"></div>
      <div className=" w-full flex justify-end gap-[20px] p-4">
        <Button
          size={"medium"}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            closeDrawer();
          }}
          label={t("eventsManagement.cancel")}
          buttonVariant="outlined"
          state="default"
          type="default"
        />
        <Button
          size={"medium"}
          label={t("eventsManagement.save")}
          state="default"
          type="default"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};
