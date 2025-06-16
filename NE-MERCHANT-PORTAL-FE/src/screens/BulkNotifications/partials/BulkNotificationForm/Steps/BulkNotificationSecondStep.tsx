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
import {
  IconAlertCircleFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import { FormStepProps } from "@ejada/screens/BulkNotifications/BulkNotificationsManagement.types";
import { BulkNotificationInitialValues } from "@ejada/screens/BulkNotifications";
import { validationRules } from "./ValidationSchema";

export const BulkNotificationSecondStep: React.FC<FormStepProps> = ({
  control,
  formState,
  initialValues = {} as BulkNotificationInitialValues,
}) => {
  const { t } = useTranslation();

  const attachmentType = useWatch({
    control,
    name: "AttachmentType",
    defaultValue: initialValues.AttachmentType,
  });

  return (
    <div className="max-h-full overflow-y-auto pr-5" style={{ height: "100%" }}>
      <div className="flex gap-[20px] mb-2">
        <div className="w-full">
          <Controller
            name="MessageSubject"
            control={control}
            rules={validationRules.required}
            defaultValue={initialValues.MessageSubject}
            render={({ field }) => (
              <div className="relative">
                <InputField
                  type={Types.TextAreaType}
                  placeHolder={
                    t(
                      "bulk-notifications.adhoc_message.second_step.subject",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  isRequired
                  label={
                    t(
                      "bulk-notifications.adhoc_message.second_step.subject",
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
      <span className="text-secondary-dark flex text-sm items-center mb-4">
        <IconInfoCircleFilled className="mr-2" />
        {t("bulk-notifications.adhoc_message.second_step.used_only") as string}
      </span>

      <div className="w-full mb-4">
        <div className="relative">
          <Controller
            name="MessageContent"
            defaultValue={initialValues?.MessageContent}
            control={control}
            render={({ field }) => (
              <div className="relative">
                <InputField
                  className="resize-none w-full"
                  type={Types.TextAreaType}
                  placeHolder={
                    t(
                      "bulk-notifications.adhoc_message.second_step.content",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    t(
                      "bulk-notifications.adhoc_message.second_step.content",
                    ) as string
                  }
                  isRequired
                  inputError={formState.errors.MessageContent?.message}
                  {...field}
                />
              </div>
            )}
          />
          <span className="text-xs text-gray-400 absolute right-1">
            {/* {eventDescription.length}/50 */}
          </span>
        </div>
      </div>

      {attachmentType === "INLINE_CONTENT" && (
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
                  label={t("bulk-notifications.attachment_title")}
                  onChange={field.onChange as OnChangeHandler}
                  value={field.value as UploaderformValue}
                  onChangeRjectedFiles={(_) => {}}
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
    </div>
  );
};
