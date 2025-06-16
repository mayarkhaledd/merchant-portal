import { Control, Controller, FieldErrors } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { InputField } from "eds-react";
import { TFunction } from "i18next";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: {
    errors: FieldErrors<NotificationHistoryFilterMenuValues>;
  };
  t: TFunction<"translation", undefined, "translation">;
}

export const RequestID = ({ control, formState, t }: Props) => {
  return (
    <Controller
      name="requestId"
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
            label={t("notificationHistory.request_id")}
            inputError={formState.errors.requestId?.message}
            {...field}
          />
        </div>
      )}
    />
  );
};
