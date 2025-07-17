import React, { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FileInputField,
  InputField,
  OnChangeHandler,
  UploaderformValue,
  colors,
  Select,
} from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { CreateAdhocInitialValues } from "@ejada/screens/RecipientNotifications";
import { FormStepProps } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { validationRules } from "./ValidationSchema";
import { WhatsappTemplatePreview } from "@ejada/screens/shared";
import { RecipientNotificationsContext } from "@ejada/screens/RecipientNotifications/RecipientNotificationsProvider";
import { Context, useContext, useMemo } from "react";
import { TRecipientNotificationsState } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import i18n from "@ejada/common/locals/i18n";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";

export const CreateAdhocSecondStep: React.FC<FormStepProps> = ({
  control,
  formState,
  initialValues = {} as CreateAdhocInitialValues,
  setValue,
  watch,
}) => {
  const { t } = useTranslation();

  const {
    selectedWhatsappTemplate,
    setSelectedWhatsappTemplate,
    getWhatsappTemplateDetails,
    refetchAllWhatsappTemplatesData,
    selectedWabaId,
    setSelectedWabaId,
    allWhatsappTemplatesData,
  } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );

  const recipientDetails = useWatch({
    control,
    name: "Recipients",
  });
  const attachtment = useWatch({ control, name: "AttachmentType" });
  const selectedChannels =
    recipientDetails?.flatMap((recipient) =>
      recipient.channels.map((channel) => channel.notificationChannel),
    ) || [];

  const isSMSOnly =
    selectedChannels.length === 1 && selectedChannels[0] === "SMS";

  const hasWhatsappChannel = selectedChannels.includes("WHATSAPP");
  const hasOtherChannels = selectedChannels.some(
    (channel) => channel !== "WHATSAPP",
  );
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

  useEffect(() => {
    if (hasWhatsappChannel) {
      refetchAllWhatsappTemplatesData?.();
    }
  }, []);

  return (
    <div className="max-h-full overflow-y-auto pr-5" style={{ height: "100%" }}>
      {/* WhatsApp Template Selection - Show when WhatsApp is selected */}
      {hasWhatsappChannel && (
        <div className="mb-6">
          <div className="text-lg font-semibold mb-4">
            {t("eventsManagement.templates")}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            {recipientDetails?.map((recipient, recipientIndex) =>
              recipient.channels.map((channel, channelIndex) =>
                channel.notificationChannel === "WHATSAPP" ? (
                  <>
                    <div className="w-full">
                      <Controller
                        name={`Recipients.${recipientIndex}.channels.${channelIndex}.whatsappBusinessAccountId`}
                        control={control}
                        defaultValue={undefined}
                        rules={validationRules.required}
                        render={({ field }) => {
                          const selectedWhatsappBusinessId = watch
                            ? watch(
                                `Recipients.${recipientIndex}.channels.${channelIndex}.whatsappBusinessAccountId`,
                              )
                            : "";
                          setSelectedWabaId(
                            selectedWhatsappBusinessId as string,
                          );
                          return (
                            <Select
                              label={i18n.t(
                                "whatsapp.create_template.first_step.whatsappBusinessAccountId",
                              )}
                              options={whatsappBusinessAccountOptions}
                              value={field.value}
                              onChange={field.onChange}
                              inputError={
                                formState?.errors?.Recipients?.[recipientIndex]
                                  ?.channels?.[channelIndex]
                                  ?.whatsappBusinessAccountId?.message as string
                              }
                              isRequired
                              placeholder={
                                i18n.t(
                                  "whatsapp.create_template.first_step.whatsappBusinessAccountId_placeholder",
                                ) as string
                              }
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="w-full mt-4">
                      <Controller
                        name={`Recipients.${recipientIndex}.channels.${channelIndex}.whatsappSender`}
                        control={control}
                        defaultValue={undefined}
                        rules={validationRules.required}
                        render={({ field }) => {
                          return (
                            <Select
                              label={i18n.t(
                                "whatsapp.create_template.first_step.whatsappSender",
                              )}
                              options={filteredSenderOptions}
                              value={field.value}
                              onChange={field.onChange}
                              inputError={
                                formState?.errors?.Recipients?.[recipientIndex]
                                  ?.channels?.[channelIndex]?.whatsappSender
                                  ?.message as string
                              }
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
                    <div
                      key={`${recipientIndex}-${channelIndex}`}
                      className="mb-4 mt-4"
                    >
                      <Controller
                        name={`Recipients.${recipientIndex}.channels.${channelIndex}.whatsappTemplateId`}
                        control={control}
                        defaultValue={undefined}
                        rules={validationRules.required}
                        render={({ field }) => (
                          <div className="relative w-full">
                            <Select
                              options={filteredTemplateOptions || []}
                              label={t("eventsManagement.templates") as string}
                              onChange={(value) => {
                                field.onChange(value);
                                // Update the selected template for preview
                                if (value) {
                                  const templateDetails =
                                    getWhatsappTemplateDetails(value);
                                  setSelectedWhatsappTemplate(templateDetails);
                                } else {
                                  setSelectedWhatsappTemplate(null);
                                }
                              }}
                              disabled={!selectedWabaId}
                              value={field.value}
                              placeholder={
                                t("eventsManagement.select_template") as string
                              }
                            />
                          </div>
                        )}
                      />

                      {/* Template Preview with Form Integration */}
                      {selectedWhatsappTemplate && (
                        <div className="mt-4">
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            {t("eventsManagement.template_preview")}
                          </div>
                          <WhatsappTemplatePreview
                            selectedTemplate={selectedWhatsappTemplate}
                            control={control}
                            setValue={setValue}
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : null,
              ),
            )}
          </div>
        </div>
      )}

      {/* Regular Message Fields - Show when other channels are selected OR when mixed channels */}
      {hasOtherChannels && (
        <>
          <div className="mb-6">
            <div className="text-lg font-semibold mb-4">
              {t("recipient_notifications.message_details")}
            </div>
          </div>

          {isSMSOnly ? (
            <div className="flex gap-[20px] mb-4">
              <div className="w-full">
                <Controller
                  name="MessageContent"
                  defaultValue={initialValues?.MessageContent}
                  rules={validationRules.required}
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <InputField
                        className="resize-none w-full"
                        type={Types.TextAreaType}
                        placeHolder={
                          t(
                            "recipient_notifications.adhoc_message.second_step.content",
                          ) as string
                        }
                        color={ColorValues.Gray}
                        size={Sizes.Medium}
                        style={{ width: "100%" }}
                        label={
                          t(
                            "recipient_notifications.adhoc_message.second_step.content",
                          ) as string
                        }
                        isRequired
                        inputError={formState.errors.MessageContent?.message}
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-[20px] mb-4">
                <div className="w-full">
                  <Controller
                    name="MessageSubject"
                    control={control}
                    defaultValue={initialValues.MessageSubject}
                    rules={validationRules.required}
                    render={({ field }) => (
                      <div className="relative">
                        <InputField
                          isRequired
                          type={Types.TextAreaType}
                          placeHolder={
                            t(
                              "recipient_notifications.adhoc_message.second_step.subject",
                            ) as string
                          }
                          color={ColorValues.Gray}
                          size={Sizes.Medium}
                          style={{ width: "100%" }}
                          label={
                            t(
                              "recipient_notifications.adhoc_message.second_step.subject",
                            ) as string
                          }
                          inputError={
                            formState.errors.MessageSubject?.message as string
                          }
                          {...field}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="relative">
                  <Controller
                    name="MessageContent"
                    rules={validationRules.required}
                    defaultValue={initialValues?.MessageContent}
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <InputField
                          className="resize-none w-full"
                          type={Types.TextAreaType}
                          placeHolder={
                            t(
                              "recipient_notifications.adhoc_message.second_step.content",
                            ) as string
                          }
                          color={ColorValues.Gray}
                          size={Sizes.Medium}
                          style={{ width: "100%" }}
                          label={
                            t(
                              "recipient_notifications.adhoc_message.second_step.content",
                            ) as string
                          }
                          isRequired
                          inputError={formState.errors.MessageContent?.message}
                          {...field}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              {!isSMSOnly && attachtment === "INLINE_CONTENT" && (
                <div className="w-full mb-4">
                  <Controller
                    name="MessageFile"
                    control={control}
                    defaultValue={initialValues?.MessageFile}
                    // rules={validationRules.required}
                    render={({ field }) => (
                      <div className="relative">
                        <FileInputField
                          acceptedFormats={[".jpeg", ".jpg", ".png", ".pdf"]}
                          acceptedFormatsText={["JPEG", "JPG", "PNG", "PDF"]}
                          label={t("recipient_notifications.attachment_title")}
                          onChange={field.onChange as OnChangeHandler}
                          value={field.value as UploaderformValue}
                          onChangeRjectedFiles={() => {}}
                        />
                        {formState.errors.MessageFile && (
                          <span className="text-error-default mt-1 flex text-sm items-center">
                            <IconAlertCircleFilled
                              color={colors.errorDefault}
                              size={16}
                              className="mx-1"
                            />
                            {formState.errors.MessageFile?.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
