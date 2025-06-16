import {
  IconAlertCircleFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import React, { Context, useContext } from "react";
import { Controller } from "react-hook-form";
import {
  FileInputField,
  InputField,
  OnChangeHandler,
  Select,
  UploaderformValue,
} from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import {
  FormStepProps,
  TBulkNotificationsState,
} from "@ejada/screens/BulkNotifications/BulkNotificationsManagement.types";
import { BulkNotificationInitialValues } from "@ejada/screens/BulkNotifications";
import { validationRules } from "./ValidationSchema";
import { Checkbox } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { DownloadTemplateFile } from "../DownloadTemplateFile";
import { t } from "i18next";
import { recipientTypeArray } from "@ejada/screens/RecipientNotifications/partials/RecipientNotification.constants";
import { BulkNotificationsContext } from "@ejada/screens/BulkNotifications/BulkNotificationsProvider";
export const BulkNotificationFirstStep: React.FC<FormStepProps> = ({
  control,
  colors,
  formState,
  initialValues = {} as BulkNotificationInitialValues,
  watch,
}) => {
  const { isCreateAdhocMessageOpen } = useContext<TBulkNotificationsState>(
    BulkNotificationsContext as Context<TBulkNotificationsState>,
  );
  const recipientType = watch && watch("recipientType");
  const setRecipientType = watch && watch("RecipientType");
  // Localize RecepientList
  const localizedRecepientTypeList = recipientTypeArray.map((item) => ({
    ...item,
    node: t(`recipient_notifications.${item.key}`),
  }));
  return (
    <div
      className="flex flex-col max-h-full mb-2 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="flex gap-[20px] mb-8 flex-grow">
        <div className="w-full">
          <Controller
            name="RecipientType"
            control={control}
            defaultValue={initialValues.RecipientType}
            rules={validationRules.required}
            render={({ field }) => (
              <div className="relative">
                <Select
                  isRequired
                  label={i18n.t(
                    "bulk-notifications.adhoc_message.first_step.recipient_type",
                  )}
                  options={localizedRecepientTypeList}
                  value={recipientType}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  placeholder={
                    i18n.t(
                      "bulk-notifications.adhoc_message.first_step.recipient_type",
                    ) as string
                  }
                  inputError={formState.errors.RecipientType?.message as string}
                />
              </div>
            )}
          />
        </div>
      </div>
      {setRecipientType === "CUSTOMER" && (
        <div className="flex gap-[20px] mb-8 flex-grow">
          <div className="w-full">
            <Controller
              name="mobileAppName"
              control={control}
              defaultValue={initialValues.mobileAppName}
              // rules={validationRules.required}
              render={({ field }) => (
                <InputField
                  // isRequired
                  type={Types.TextType}
                  placeHolder={
                    i18n.t(
                      "recipient_notifications.adhoc_message.first_step.mobileApp",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    i18n.t(
                      "recipient_notifications.adhoc_message.first_step.mobileApp",
                    ) as string
                  }
                  inputError={formState.errors.mobileAppName?.message as string}
                  {...field}
                />
              )}
            />
          </div>
        </div>
      )}
      <div className="flex gap-2 mb-8 flex-grow">
        <div className="w-full">
          <span className="text-secondary-dark flex text-sm items-center">
            <IconInfoCircleFilled className="mr-2" />
            {i18n.t(
              "bulk-notifications.adhoc_message.first_step.applied_once_cannot_change",
            )}
          </span>
        </div>
      </div>

      <div className="w-full mb-4">
        <Controller
          name="RecipientFile"
          control={control}
          defaultValue={initialValues?.RecipientFile}
          rules={validationRules.required}
          render={({ field }) => (
            <div className="relative">
              <FileInputField
                isRequired
                acceptedFormats={[
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  "text/csv",
                ]}
                acceptedFormatsText={[".xlsx", ".csv"]}
                label={i18n.t(
                  "bulk-notifications.adhoc_message.first_step.upload_recipient",
                )}
                onChange={field.onChange as OnChangeHandler}
                value={field.value as UploaderformValue}
                onChangeRjectedFiles={(_) => {}}
              />
              {formState.errors.RecipientFile && (
                <span className="text-error-default mt-1 flex text-sm items-center">
                  <IconAlertCircleFilled
                    color={colors.errorDefault}
                    size={16}
                    className="mx-1"
                  />
                  {formState.errors.RecipientFile?.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      {setRecipientType && (
        <DownloadTemplateFile
          recipientType={setRecipientType}
          isAdhoc={isCreateAdhocMessageOpen}
        />
      )}
      <div className="w-full mt-4">
        <Controller
          name="NotifyRecipientMode"
          control={control}
          defaultValue={initialValues.NotifyRecipientMode || false}
          render={({ field }) => (
            <Checkbox
              {...field}
              label={
                i18n.t(
                  "bulk-notifications.adhoc_message.first_step.ignore_invalid_recipient",
                ) as string
              }
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
};
