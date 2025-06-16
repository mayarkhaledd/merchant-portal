import { Control, Controller, FieldErrors } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { InputField } from "eds-react";
import { TFunction } from "i18next";
import {
  NotificationHistoryFormValues,
  NotificationHistoryFormInitValues,
} from "@ejada/screens/NotificationHistory";

interface Props {
  control: Control<NotificationHistoryFormInitValues>;
  formState: {
    errors: FieldErrors<NotificationHistoryFormValues>;
  };
  t: TFunction<"translation", undefined, "translation">;
}

export const ExternalMessageID = ({ control, formState, t }: Props) => {
  return (
    <Controller
      name="externalMessageID"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder="e.g. 2301"
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            className="text-primary-blue font-readexProMedium500"
            label={t("notificationHistory.external_message_id")}
            inputError={formState.errors.externalMessageId?.message as string}
            {...field}
          />
        </div>
      )}
    />
  );
};
