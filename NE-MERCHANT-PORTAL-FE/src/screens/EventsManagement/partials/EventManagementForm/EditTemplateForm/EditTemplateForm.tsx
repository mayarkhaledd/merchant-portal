import { ColorValues, Sizes, Types } from "@ejada/common";
import { Button, InputField, SelectSearch } from "eds-react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  EditTemplateFormProps,
  EventsManagementContext,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import React, { useContext } from "react";
import { EventManagementFormValidationSchema } from "../EventManagementFormValidationSchema";
import { useEditTemplateForm } from "./useEditTemplateForm";

export const EditTemplateForm: React.FC<EditTemplateFormProps> = ({
  initialValues,
  closeDrawer,
}) => {
  const { t } = useTranslation();
  const { control, formState, handleSubmit, onSubmit, watch } =
    useEditTemplateForm(closeDrawer);

  // Watch the current value of channelId (or eventChannelId if that's the field)
  const channelId = watch("channelId") || initialValues?.channelId;

  const { smsSender, emailSender } = useContext<TEventsManagementState>(
    EventsManagementContext,
  );

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full pe-5"
      >
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="eventChannelId"
            control={control}
            defaultValue={initialValues?.eventChannelId}
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  type={Types.EmailType}
                  placeHolder={
                    t("eventsManagement.sender_id_placeholder") as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("eventsManagement.sender_id")}
                  disabled
                  inputError={formState.errors.eventChannelId?.message}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="header"
            control={control}
            defaultValue={initialValues?.header}
            rules={
              channelId !== "SMS"
                ? EventManagementFormValidationSchema.required
                : undefined
            }
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  isRequired={channelId !== "SMS"}
                  type={Types.EmailType}
                  placeHolder={
                    t("eventsManagement.template_header_placeholder") as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("eventsManagement.template_header")}
                  inputError={formState.errors.header?.message}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="body"
            control={control}
            defaultValue={initialValues?.body}
            rules={
              channelId !== "INBOX"
                ? EventManagementFormValidationSchema.required
                : undefined
            }
            render={({ field }) => (
              <div className="relative w-[100%]">
                <InputField
                  type={Types.TextAreaType}
                  placeHolder={
                    t("eventsManagement.template_body_placeholder") as string
                  }
                  isRequired={channelId !== "INBOX"}
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={t("eventsManagement.template_body")}
                  inputError={formState.errors.body?.message}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between mb-4 gap-6">
          <Controller
            name="sender"
            control={control}
            rules={
              channelId === "SMS" || channelId === "EMAIL"
                ? EventManagementFormValidationSchema.required
                : undefined
            }
            defaultValue={initialValues?.sender}
            render={({ field }) => (
              <div className="relative w-[100%]">
                {channelId === "EMAIL" && (
                  <SelectSearch
                    items={emailSender || []}
                    displayKey={"id"}
                    title={t("eventsManagement.template_sender") as string}
                    label={t("eventsManagement.template_sender") as string}
                    fullWidth
                    dropDownStyles="w-[38rem]"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption[0]);
                    }}
                    isRequired
                    multiSelect={false}
                    placeholder={
                      t(
                        "eventsManagement.template_sender_placeholder",
                      ) as string
                    }
                    inputError={formState.errors.sender?.message}
                    initialSelectedItems={
                      field.value ? [{ id: field.value }] : []
                    }
                  />
                )}
                {channelId === "SMS" && (
                  <SelectSearch
                    items={smsSender || []}
                    displayKey={"id"}
                    title={t("eventsManagement.template_sender") as string}
                    label={t("eventsManagement.template_sender") as string}
                    fullWidth
                    dropDownStyles="w-[38rem]"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption[0]);
                    }}
                    isRequired
                    multiSelect={false}
                    placeholder={
                      t(
                        "eventsManagement.template_sender_placeholder",
                      ) as string
                    }
                    inputError={formState.errors.sender?.message}
                    initialSelectedItems={
                      field.value ? [{ id: field.value }] : []
                    }
                  />
                )}
                {channelId === "PUSH_NOTIFICATION" && (
                  <InputField
                    type={Types.EmailType}
                    placeHolder={
                      t(
                        "eventsManagement.template_sender_placeholder",
                      ) as string
                    }
                    color={ColorValues.Gray}
                    size={Sizes.Medium}
                    style={{ width: "100%" }}
                    label={t("eventsManagement.template_sender")}
                    inputError={formState.errors.sender?.message}
                    {...field}
                  />
                )}
              </div>
            )}
          />
        </div>
      </form>
      <div className="border-b-[0.5px] border-divider-color w-[100%] mt-auto py-4"></div>
      <div className=" w-full flex justify-end gap-[20px] p-4">
        <Button
          size={"medium"}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            closeDrawer();
          }}
          label={t("eventsManagement.cancel")}
          buttonVariant="outlined"
          state="default"
          type="default"
        />
        <Button
          size={"medium"}
          label={t("eventsManagement.save")}
          state="default"
          type="default"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};
