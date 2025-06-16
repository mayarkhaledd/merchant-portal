import { Control, Controller, FieldErrors } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { InputField } from "eds-react";
import { TFunction } from "i18next";
import { NotificationHistoryValidationSchema } from "../../NotificationHistoryValidationSchema";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: {
    errors: FieldErrors<NotificationHistoryFilterMenuValues>;
  };
  t: TFunction<"translation", undefined, "translation">;
}

export const MessageID = ({ control, formState, t }: Props) => {
  return (
    <Controller
      name="messageId"
      control={control}
      defaultValue=""
      rules={NotificationHistoryValidationSchema.messageId}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder="e.g. 2301"
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            className="text-primary-blue font-readexProMedium500"
            label={t("notificationHistory.message_id")}
            inputError={formState.errors.messageId?.message}
            {...field}
          />
        </div>
      )}
    />
  );
};
