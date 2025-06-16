import { Controller } from "react-hook-form";
import { DatePicker, InputField, TimePicker } from "eds-react";
import { useTranslation } from "react-i18next";
import { ColorValues, Sizes, Types } from "@ejada/common";

import i18n from "@ejada/common/locals/i18n";
import { EventFormStepProps } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { validationRules } from "./ValidationSchema";
import { CreateEventInitialValues } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage";
import { formattingDate } from "@ejada/screens";

export const CreateEventSecondStep: React.FC<EventFormStepProps> = ({
  control,
  formState,
  initialValues = {} as CreateEventInitialValues,
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
            name="dueDate"
            control={control}
            defaultValue={initialValues?.dueDate}
            rules={validationRules.date}
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                label={
                  t(
                    "recipient_notifications.adhoc_message.second_step.due_date",
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
                inputError={formState.errors.dueDate?.message}
              />
            )}
          />
        </div>
        <div className="relative w-[100%] flex items-center gap-6">
          <Controller
            name="dueTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="relative w-[100%] ">
                <TimePicker
                  label={
                    t(
                      "recipient_notifications.adhoc_message.second_step.due_time",
                    ) as string
                  }
                  value={field.value || "00:00"}
                  onChange={field.onChange}
                  buttonStyle="w-full"
                  dropDownStyle="w-full"
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex gap-[20px]">
        <div className=" w-full">
          <Controller
            name="notificationValidity"
            control={control}
            defaultValue={initialValues?.notificationValidity}
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
                    formState.errors.notificationValidity?.message as string
                  }
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full">
          <Controller
            name="notificationPriority"
            control={control}
            defaultValue={initialValues.notificationPriority}
            rules={validationRules.notificationPriority}
            render={({ field }) => (
              <div className="relative">
                <InputField
                  type={Types.TextType}
                  placeHolder={
                    t(
                      "recipient_notifications.adhoc_message.second_step.priority",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    t(
                      "recipient_notifications.adhoc_message.second_step.priority",
                    ) as string
                  }
                  inputError={
                    formState.errors.notificationPriority?.message as string
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
