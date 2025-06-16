import { Controller } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { Button, InputField } from "eds-react";
import { NotificatioHistoryDetailsFormProps } from "@ejada/screens/NotificationHistory";
import { AttachmentInfoAPIResponse } from "@ejada/types/api/notificationHistoryInterface";

export const MessageDetails = ({
  control,
  t,
  initialValues,
}: NotificatioHistoryDetailsFormProps) => {
  // handle viewing the attachment
  const viewAttch = (attachment: AttachmentInfoAPIResponse) => {
    // TODO opening a new window with the attachment URL
    const attachmentUrl = `https://your-api-endpoint/${attachment.attachmentECMReferenceId}`;
    window.open(attachmentUrl, "_blank");
  };

  return (
    <div
      className="flex flex-col max-h-full  overflow-y-hidden overflow-x-hidden py-12"
      style={{ height: "100%" }}
    >
      <div className="pe-6">
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryDetailsData.contact"
            control={control}
            defaultValue={initialValues?.NotificationHistoryDetailsData.contact}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  disabled={true}
                  //control={control}
                  type={Types.EmailType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("notificationHistory.contact")}
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryDetailsData.emailReplyTo"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryDetailsData.emailReplyTo
            }
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  disabled={true}
                  //control={control}
                  type={Types.EmailType}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("notificationHistory.email_reply_to")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryDetailsData.emailCC"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryDetailsData?.emailCC
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
                  label={t("notificationHistory.email_cc")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryDetailsData.emailBCC"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryDetailsData?.emailBCC
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
                  label={t("notificationHistory.email_bcc")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryDetailsData.messageSubject"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryDetailsData.messageSubject
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
                  label={t("notificationHistory.message_subject")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryDetailsData.messageContent"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryDetailsData.messageContent
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
                  label={t("notificationHistory.message_content")}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="w-full mb-4">
          <Controller
            name="NotificationHistoryFormData.attachments"
            control={control}
            defaultValue={
              initialValues?.NotificationHistoryFormData.attachments
            }
            render={({ field }) => {
              const attachments = field.value ? field.value : [];
              return (
                <div className="relative w-[100%]">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center mt-6">
                      <div>{attachment.attachmentFileName}</div>
                      <Button
                        label="View File"
                        size="small"
                        state="default"
                        type="default"
                        onClick={() => viewAttch(attachment)}
                        className="ml-4"
                      />
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
