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

export const EmailContact = ({ control, formState, t }: Props) => {
  return (
    <Controller
      name="emailContact"
      control={control}
      defaultValue=""
      rules={NotificationHistoryValidationSchema.email}
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.EmailType}
            placeHolder="e.g. example@gmail.com"
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            className="text-primary-blue font-readexProMedium500"
            label={t("notificationHistory.email_contact")}
            inputError={formState.errors.emailContact?.message}
            {...field}
          />
        </div>
      )}
    />
  );
};
