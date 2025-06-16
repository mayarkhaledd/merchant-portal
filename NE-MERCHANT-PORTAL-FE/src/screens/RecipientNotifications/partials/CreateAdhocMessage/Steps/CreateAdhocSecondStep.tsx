import React from "react";
import { Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FileInputField,
  InputField,
  OnChangeHandler,
  UploaderformValue,
  colors,
} from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { CreateAdhocInitialValues } from "@ejada/screens/RecipientNotifications";
import { FormStepProps } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { validationRules } from "./ValidationSchema";

export const CreateAdhocSecondStep: React.FC<FormStepProps> = ({
  control,
  formState,
  initialValues = {} as CreateAdhocInitialValues,
}) => {
  const { t } = useTranslation();

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
  return (
    <div className="max-h-full overflow-y-auto pr-5" style={{ height: "100%" }}>
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
                      acceptedFormats={[
                        "image/jpeg",
                        "image/png",
                        "application/pdf",
                      ]}
                      acceptedFormatsText={[".jpeg", ".png", ".pdf"]}
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
    </div>
  );
};
