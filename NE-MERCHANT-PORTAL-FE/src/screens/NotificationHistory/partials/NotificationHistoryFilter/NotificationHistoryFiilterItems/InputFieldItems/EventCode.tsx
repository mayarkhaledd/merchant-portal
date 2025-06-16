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

export const EventCode = ({ control, formState, t }: Props) => {
  return (
    <Controller
      name="eventCode"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className="relative">
          <InputField
            type={Types.TextType}
            placeHolder="e.g. ELMS_OTP"
            color={ColorValues.Gray}
            size={Sizes.Small}
            style={{ width: "100%" }}
            className="text-primary-blue font-readexProMedium500"
            label={t("notificationHistory.event_code")}
            inputError={formState.errors.eventCode?.message}
            {...field}
          />
          <span className="text-neutrals/N3 text-xs font-readexProRegular">
            {t("notificationHistory.enter_event_code")}
          </span>
        </div>
      )}
    />
  );
};
