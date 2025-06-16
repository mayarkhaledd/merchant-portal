import { Controller } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { Select, InputField, DatePicker } from "eds-react";

import {
  NotificationHistoryInitialValues,
  NotificatioHistoryDetailsFormProps,
  NotificationHistoryContext,
  NotificationHistoryState,
} from "@ejada/screens/NotificationHistory";
import { Context, useContext } from "react";

export const MessageHistoryLog = ({
  control,
  t,
  initialValues = {} as NotificationHistoryInitialValues,
}: NotificatioHistoryDetailsFormProps) => {
  const { messageStatus } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );
  return (
    <div
      className="flex flex-col max-h-full  overflow-y-hidden overflow-x-hidden py-12"
      style={{ height: "100%" }}
    >
      <div className="pe-6">
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryMessageHistoryLog.messageStatus"
            control={control}
            defaultValue=""
            disabled={true}
            render={({ field }) => (
              <div className="relative w-[100%] -mt-2">
                <Select
                  options={messageStatus}
                  label={t("notificationHistory.message_status")}
                  onChange={field.onChange}
                  value={
                    initialValues.NotificationHistoryMessageHistoryLog
                      .messageStatus
                      ? initialValues.NotificationHistoryMessageHistoryLog
                          .messageStatus
                      : field.value
                  }
                  disabled={true}
                />
              </div>
            )}
          />
        </div>

        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryMessageHistoryLog.statusDetails"
            control={control}
            defaultValue={
              initialValues.NotificationHistoryMessageHistoryLog.statusDetails
            }
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  disabled={true}
                  //control={control}
                  type={Types.TextAreaType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("notificationHistory.status_details")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryMessageHistoryLog.statusDateTime"
            control={control}
            defaultValue={
              initialValues.NotificationHistoryMessageHistoryLog.statusDateTime
            }
            render={({ field: { onChange, value } }) => (
              <div className="relative w-[100%]">
                <DatePicker
                  label={t("notificationHistory.status_date_time") as string}
                  disabled={true}
                  value={value ? new Date(value) : undefined}
                  onChange={(date) => {
                    if (date) {
                      onChange(date.toISOString());
                    } else {
                      onChange(undefined);
                    }
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex justify-between mb-4 gap-6">
        <Controller
          name="NotificationHistoryMessageHistoryLog.statusConsumedUnit"
          control={control}
          defaultValue={
            initialValues.NotificationHistoryMessageHistoryLog
              .statusConsumedUnit
          }
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                disabled={true}
                //control={control}
                type={Types.TextType}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={t("notificationHistory.status_consumed_unit")}
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="NotificationHistoryMessageHistoryLog.statusConsumedAmount"
          control={control}
          defaultValue={
            initialValues.NotificationHistoryMessageHistoryLog
              .statusConsumedAmount
          }
          render={({ field }) => (
            <div className="relative w-[100%]">
              <InputField
                disabled={true}
                //control={control}
                type={Types.TextType}
                color={ColorValues.Gray}
                size={Sizes.Medium}
                style={{ width: "100%" }}
                label={t("notificationHistory.status_consumed_amount")}
                {...field}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};
