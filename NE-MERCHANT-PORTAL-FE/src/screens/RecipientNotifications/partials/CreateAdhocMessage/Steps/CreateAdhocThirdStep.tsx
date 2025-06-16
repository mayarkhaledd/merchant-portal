import { Controller } from "react-hook-form";
import { DatePicker, InputField, TimePicker } from "eds-react";
import { useTranslation } from "react-i18next";
import { ColorValues, Sizes, Types } from "@ejada/common";

import i18n from "@ejada/common/locals/i18n";
import { CreateAdhocInitialValues } from "@ejada/screens/RecipientNotifications";
import { FormStepProps } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { validationRules } from "./ValidationSchema";
import { formattingDate } from "@ejada/screens";

export const CreateAdhocThirdStep: React.FC<FormStepProps> = ({
  control,
  formState,
  initialValues = {} as CreateAdhocInitialValues,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col max-h-full mb-4 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="flex items-center gap-[20px] mb-8">
        <div className="w-full">
          <Controller
            name="DueDate"
            control={control}
            defaultValue={initialValues?.DueDate}
            rules={validationRules.date}
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                label={
                  t(
                    "recipient_notifications.adhoc_message.third_step.due_date",
                  ) as string
                }
                classes="border-grey"
                onChange={(date) => {
                  if (date) {
                    field.onChange(formattingDate(date));
                  } else {
                    field.onChange(undefined);
                  }
                }}
                //isRequired
                inputError={formState.errors.DueDate?.message as string}
              />
            )}
          />
        </div>
        <div className="relative w-[100%] flex items-center gap-6">
          <Controller
            name="DueTime"
            control={control}
            defaultValue={"00:00"}
            // rules={validationRules.relationType}
            render={({ field }) => (
              <div className="relative w-[100%] ">
                <TimePicker
                  label={
                    t(
                      "recipient_notifications.adhoc_message.third_step.due_time",
                    ) as string
                  }
                  value={field.value || undefined}
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
      <div className="flex gap-[20px]">
        <div className=" w-full">
          <Controller
            name="NotificationValidity"
            control={control}
            defaultValue={initialValues?.NotificationValidity}
            rules={validationRules.notificationValidity}
            render={({ field }) => (
              <div className="relative">
                <InputField
                  type={Types.TextType}
                  placeHolder={
                    i18n.t(
                      "recipient_notifications.adhoc_message.second_step.validity",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    i18n.t(
                      "recipient_notifications.adhoc_message.second_step.validity",
                    ) as string
                  }
                  inputError={
                    formState.errors.NotificationValidity?.message as string
                  }
                  {...field}
                />
              </div>
            )}
          />
        </div>
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
                      "recipient_notifications.adhoc_message.third_step.priority",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    t(
                      "recipient_notifications.adhoc_message.third_step.priority",
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
