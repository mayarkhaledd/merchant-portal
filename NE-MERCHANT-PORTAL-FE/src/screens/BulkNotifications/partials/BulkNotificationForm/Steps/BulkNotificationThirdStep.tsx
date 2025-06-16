import { FormStepProps } from "@ejada/screens/BulkNotifications/BulkNotificationsManagement.types";
import { Controller } from "react-hook-form";
import { DatePicker, InputField, TimePicker } from "eds-react";
import { useTranslation } from "react-i18next";
import { ColorValues, Sizes, Types } from "@ejada/common";
import {
  BulkNotificationInitialValues,
  formattingDate,
} from "@ejada/screens/BulkNotifications";
import { validationRules } from "./ValidationSchema";

export const BulkNotificationThirdStep: React.FC<FormStepProps> = ({
  control,
  formState,
  initialValues = {} as BulkNotificationInitialValues,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col max-h-full mb-2 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="flex items-center gap-[20px] mb-[16px]">
        <div className="w-full">
          <Controller
            name="DueDate"
            control={control}
            rules={validationRules.date}
            defaultValue={initialValues?.DueDate}
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                label={
                  t(
                    "bulk-notifications.adhoc_message.third_step.due_date",
                  ) as string
                }
                classes="border-grey"
                // isRequired
                onChange={(date) => {
                  if (date) {
                    field.onChange(formattingDate(date));
                  } else {
                    field.onChange(undefined);
                  }
                }}
                inputError={formState.errors.DueDate?.message}
              />
            )}
          />
        </div>
        <div className="relative w-[100%] flex items-center gap-6">
          <Controller
            name="DueTime"
            control={control}
            defaultValue={initialValues.DueTime}
            render={({ field }) => (
              <div className="relative w-[100%] ">
                <TimePicker
                  label={
                    t(
                      "bulk-notifications.adhoc_message.third_step.due_time",
                    ) as string
                  }
                  value={field.value || "00:00"}
                  onChange={field.onChange}
                  buttonStyle="w-full"
                  dropDownStyle="w-full"
                  // isRequired
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex gap-[20px] mb-4">
        <div className="w-full">
          <Controller
            name="NotificationPriority"
            control={control}
            defaultValue={initialValues.NotificationPriority}
            rules={validationRules.notificationPriority}
            render={({ field }) => (
              <div className="relative">
                <InputField
                  type={Types.TextType}
                  placeHolder={
                    t(
                      "bulk-notifications.adhoc_message.third_step.priority",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    t(
                      "bulk-notifications.adhoc_message.third_step.priority",
                    ) as string
                  }
                  inputError={
                    formState.errors.NotificationPriority?.message as string
                  }
                  {...field}
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
