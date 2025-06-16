import { Controller } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { Select, InputField, DatePicker } from "eds-react";
import {
  NotificationHistoryContext,
  NotificationHistoryState,
  NotificatioHistoryDetailsFormProps,
} from "@ejada/screens/NotificationHistory";
import { Context, useContext } from "react";
import Cookies from "js-cookie";

export const NotificationDetails = ({
  control,
  t,
  initialValues,
}: NotificatioHistoryDetailsFormProps) => {
  const {
    notificationChannel,
    messageLanguage,
    sourceSystem,
    eventCode,
    eventPriority,
    relationType,
  } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );
  return (
    <div
      className="flex flex-col max-h-full  overflow-y-hidden overflow-x-hidden py-12"
      style={{ height: "100%" }}
    >
      <div className="pe-6">
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="NotificationHistoryFormData.sourceSystem"
            control={control}
            defaultValue=""
            disabled={true}
            render={({ field }) => (
              <div className="relative w-[100%] -mt-2">
                <Select
                  options={sourceSystem}
                  label={t("notificationHistory.source_system")}
                  onChange={field.onChange}
                  value={
                    initialValues?.NotificationHistoryFormData.sourceSystem
                      ? initialValues.NotificationHistoryFormData.sourceSystem
                      : field.value
                  }
                  disabled={true}
                />
              </div>
            )}
          />

          <Controller
            name="NotificationHistoryFormData.eventCode"
            control={control}
            defaultValue=""
            disabled={true}
            render={({ field }) => (
              <div className="relative w-[100%] -mt-2">
                <Select
                  options={eventCode}
                  label={t("notificationHistory.event_code")}
                  onChange={field.onChange}
                  value={
                    initialValues?.NotificationHistoryFormData.eventCode
                      ? initialValues.NotificationHistoryFormData.eventCode
                      : field.value
                  }
                  disabled={true}
                />
              </div>
            )}
          />
        </div>

        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="NotificationHistoryFormData.notificationChannel"
            control={control}
            defaultValue=""
            disabled={true}
            render={({ field }) => (
              <div className="relative w-[100%] -mt-2">
                <Select
                  options={notificationChannel}
                  label={t("notificationHistory.notification_channel")}
                  onChange={field.onChange}
                  value={
                    initialValues?.NotificationHistoryFormData
                      .notificationChannel
                      ? initialValues.NotificationHistoryFormData
                          .notificationChannel
                      : field.value
                  }
                  disabled={true}
                />
              </div>
            )}
          />

          <Controller
            name="NotificationHistoryFormData.messageLanguage"
            control={control}
            defaultValue=""
            disabled={true}
            render={({ field }) => (
              <div className="relative w-[100%] -mt-2">
                <Select
                  options={messageLanguage}
                  label={t("notificationHistory.message_language")}
                  onChange={field.onChange}
                  value={
                    initialValues?.NotificationHistoryFormData.messageLanguage
                      ? initialValues.NotificationHistoryFormData
                          .messageLanguage
                      : field.value
                  }
                  disabled={true}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="NotificationHistoryFormData.tenancyID"
            control={control}
            defaultValue={Cookies.get("tenantId")}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  disabled={true}
                  //control={control}
                  type={Types.TextType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("notificationHistory.tenancy_id")}
                  {...field}
                />
              </div>
            )}
          />
          <Controller
            name="NotificationHistoryFormData.eventPriority"
            control={control}
            defaultValue=""
            disabled={true}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <Select
                  options={eventPriority}
                  label={t("notificationHistory.event_priority")}
                  onChange={field.onChange}
                  value={
                    initialValues?.NotificationHistoryFormData.eventPriority
                      ? initialValues.NotificationHistoryFormData.eventPriority
                      : field.value
                  }
                  disabled={true}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between mb-4">
          <Controller
            name="NotificationHistoryFormData.messageID"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  disabled={true}
                  //control={control}
                  type={Types.TextType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("notificationHistory.message_id")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="NotificationHistoryFormData.requestID"
            control={control}
            defaultValue={initialValues?.NotificationHistoryFormData.requestID}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  disabled={true}
                  //control={control}
                  type={Types.TextType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("notificationHistory.request_id")}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="NotificationHistoryFormData.externalRequestID"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.externalRequestID
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
                  label={t("notificationHistory.external_request_id")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryFormData.notificationSenderInfo"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.notificationSenderInfo
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
                  label={t("notificationHistory.notification_sender_info")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="NotificationHistoryFormData.relationType"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.relationType
            }
            render={({ field }) => (
              <div className="relative w-[100%]">
                <Select
                  label={t("notificationHistory.relation_type")}
                  options={relationType}
                  disabled={true}
                  value={
                    initialValues?.NotificationHistoryFormData.relationType
                      ? initialValues.NotificationHistoryFormData.relationType
                      : field.value
                  }
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <Controller
            name="NotificationHistoryFormData.relationValue"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.relationValue
            }
            render={({ field }) => (
              <div className="relative w-[100%] ">
                <InputField
                  disabled={true}
                  //control={control}
                  type={Types.TextType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("notificationHistory.relation_value")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryFormData.sentDateTime"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.sentDateTime
            }
            render={({ field: { onChange, value } }) => (
              <div className="relative w-[100%]">
                <DatePicker
                  label={t("notificationHistory.sent_date_time") as string}
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
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryFormData.deliveryDateTime"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.deliveryDateTime
            }
            render={({ field: { onChange, value } }) => (
              <div className="relative w-[100%]">
                <DatePicker
                  label={t("notificationHistory.delivery_date_time") as string}
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
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryFormData.DeliveryDescription"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.DeliveryDescription
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
                  label={t("notificationHistory.delivery_description")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryFormData.expiryDateTime"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.expiryDateTime
            }
            render={({ field: { onChange, value } }) => (
              <div className="relative w-[100%]">
                <DatePicker
                  label={t("notificationHistory.expiry_date_time") as string}
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
    </div>
  );
};
