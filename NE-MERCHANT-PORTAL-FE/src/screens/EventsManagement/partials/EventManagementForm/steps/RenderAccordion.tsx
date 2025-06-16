import React, { Context, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {
  NotificationEventFormValues,
  extraEventChannelsInitialValues,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement/EventsManagement.types";
import { Accordion, InputField, SelectSearch } from "eds-react";
import { EventManagementFormValidationSchema } from "../EventManagementFormValidationSchema";
import { EventsManagementContext } from "@ejada/screens/EventsManagement/EventsManagementProvider";
import { Types } from "@ejada/common/utils/Enum";
interface RenderAccordionProps {
  type: string;
  control:
    | Control<NotificationEventFormValues>
    | Control<extraEventChannelsInitialValues>;
  formState: {
    errors: FieldErrors<
      NotificationEventFormValues | extraEventChannelsInitialValues
    >;
  };
  id: number;
  setValue?:
    | UseFormSetValue<NotificationEventFormValues>
    | UseFormSetValue<extraEventChannelsInitialValues>;
  mode: string;
  getValues?:
    | UseFormGetValues<NotificationEventFormValues>
    | UseFormGetValues<extraEventChannelsInitialValues>;
}

const RenderAccordion: React.FC<RenderAccordionProps> = ({
  type,
  control,
  formState,
  id,
  setValue,
  mode,
}) => {
  const { t } = useTranslation();
  const testSender = `eventChannels.${id}.sender`;
  const testHeader = `eventChannels.${id}.header`;
  const notificationChannelIdName = `eventChannels.${id}.channelId`;
  const notificationEventChannelId = `eventChannels.${id}.eventChannelId`;
  const languageCode = `eventChannels.${id}.languageCode`;
  const body = `eventChannels.${id}.body`;

  const { smsSender, emailSender } = useContext<TEventsManagementState>(
    EventsManagementContext as Context<TEventsManagementState>,
  );

  // Update hidden value every time the type changes
  useEffect(() => {
    if (mode !== "edit") {
      setValue &&
        (
          setValue as UseFormSetValue<
            NotificationEventFormValues | extraEventChannelsInitialValues
          >
        )(notificationChannelIdName, type);
      setValue &&
        (
          setValue as UseFormSetValue<
            NotificationEventFormValues | extraEventChannelsInitialValues
          >
        )(testSender, "");
      setValue &&
        (
          setValue as UseFormSetValue<
            NotificationEventFormValues | extraEventChannelsInitialValues
          >
        )(testHeader, "");
      setValue &&
        (
          setValue as UseFormSetValue<
            NotificationEventFormValues | extraEventChannelsInitialValues
          >
        )(notificationEventChannelId, "");
      setValue &&
        (
          setValue as UseFormSetValue<
            NotificationEventFormValues | extraEventChannelsInitialValues
          >
        )(languageCode, "");
      setValue &&
        (
          setValue as UseFormSetValue<
            NotificationEventFormValues | extraEventChannelsInitialValues
          >
        )(body, "");
    }
  }, [type, id]);

  switch (type) {
    case "SMS":
      return (
        <Accordion
          items={[
            {
              label: t("eventsManagement.sms"),
              value: "SMS",
              isRequired: true,
              content: (
                <>
                  <Controller
                    name={notificationChannelIdName}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={type}
                    render={({ field }) => (
                      <input
                        type="hidden"
                        {...field}
                        value={type}
                        onChange={() => field.onChange(type)}
                      />
                    )}
                  />
                  <Controller
                    name={testHeader}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%]">
                        <InputField
                          type="text"
                          placeHolder={
                            t(
                              "eventsManagement.template_header_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_header")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.header
                              ?.message
                          }
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name={testSender}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    rules={EventManagementFormValidationSchema.required}
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <SelectSearch
                          items={smsSender || []}
                          displayKey={"id"}
                          title={t("eventsManagement.sender") as string}
                          label={t("eventsManagement.sender") as string}
                          fullWidth
                          dropDownStyles="w-[38rem]"
                          onChange={field.onChange}
                          isRequired
                          multiSelect={false}
                          placeholder={
                            t("SearchCriteria.searchPlaceHolder") as string
                          }
                          inputError={
                            formState.errors?.eventChannels?.[id]?.sender
                              ?.message
                          }
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name={body}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={""}
                    rules={EventManagementFormValidationSchema.required}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <InputField
                          type={Types.TextAreaType}
                          placeHolder={
                            t(
                              "eventsManagement.template_body_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_body")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.body?.message
                          }
                          {...field}
                          onchange={field.onChange}
                          isRequired
                        />
                      </div>
                    )}
                  />
                </>
              ),
            },
          ]}
          variant="underlined"
        />
      );
    case "EMAIL":
      return (
        <Accordion
          items={[
            {
              isRequired: true,
              label: t("eventsManagement.email"),
              value: "EMAIL",
              content: (
                <div className="my-4">
                  <Controller
                    name={notificationChannelIdName}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={type}
                    render={({ field }) => (
                      <input
                        type="hidden"
                        {...field}
                        value={type}
                        onChange={() => field.onChange(type)}
                      />
                    )}
                  />
                  <Controller
                    name={testHeader}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    rules={EventManagementFormValidationSchema.required}
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%]">
                        <InputField
                          type="text"
                          placeHolder={
                            t(
                              "eventsManagement.template_header_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_header")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.header
                              ?.message
                          }
                          isRequired
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name={testSender}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    rules={EventManagementFormValidationSchema.required}
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <SelectSearch
                          items={emailSender || []}
                          displayKey={"id"}
                          title={t("eventsManagement.sender") as string}
                          label={t("eventsManagement.sender") as string}
                          fullWidth
                          dropDownStyles="w-[38rem]"
                          onChange={field.onChange}
                          isRequired
                          multiSelect={false}
                          placeholder={
                            t("SearchCriteria.searchPlaceHolder") as string
                          }
                          inputError={
                            formState.errors?.eventChannels?.[id]?.sender
                              ?.message
                          }
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name={body}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={""}
                    rules={EventManagementFormValidationSchema.required}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <InputField
                          type={Types.TextAreaType}
                          placeHolder={
                            t(
                              "eventsManagement.template_body_placeholder",
                            ) as string
                          }
                          color="gray"
                          isRequired
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_body")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.body?.message
                          }
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                </div>
              ),
            },
          ]}
          variant="underlined"
        />
      );
    case "PUSH_NOTIFICATION":
      return (
        <Accordion
          items={[
            {
              isRequired: true,
              label: t("eventsManagement.push_notification"),
              value: "PUSH_NOTIFICATION",
              content: (
                <div className="my-4" key={id}>
                  <Controller
                    name={notificationChannelIdName}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={type}
                    render={({ field }) => (
                      <input
                        type="hidden"
                        {...field}
                        value={type}
                        onChange={() => field.onChange(type)}
                      />
                    )}
                  />
                  <Controller
                    name={testHeader}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    rules={EventManagementFormValidationSchema.required}
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%]">
                        <InputField
                          type="text"
                          placeHolder={
                            t(
                              "eventsManagement.template_header_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_header")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.header
                              ?.message
                          }
                          isRequired
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name={testSender}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <InputField
                          type="text"
                          placeHolder={
                            t(
                              "eventsManagement.template_sender_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.sender") as string}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.sender
                              ?.message
                          }
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name={body}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    rules={EventManagementFormValidationSchema.required}
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <InputField
                          type={Types.TextAreaType}
                          placeHolder={
                            t(
                              "eventsManagement.template_body_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          isRequired
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_body")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.body?.message
                          }
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                </div>
              ),
            },
          ]}
          variant="underlined"
        />
      );
    case "INBOX":
      return (
        <Accordion
          items={[
            {
              isRequired: true,
              label: t("eventsManagement.INBOX"),
              value: "INBOX",
              content: (
                <div className="my-4" key={id}>
                  <Controller
                    name={notificationChannelIdName}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={type}
                    render={({ field }) => (
                      <input
                        type="hidden"
                        {...field}
                        value={type}
                        onChange={() => field.onChange(type)}
                      />
                    )}
                  />
                  <Controller
                    name={testHeader}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    rules={EventManagementFormValidationSchema.required}
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%]">
                        <InputField
                          type="text"
                          placeHolder={
                            t(
                              "eventsManagement.template_header_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_header")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.header
                              ?.message
                          }
                          isRequired
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name={testSender}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <InputField
                          type="text"
                          placeHolder={
                            t(
                              "eventsManagement.template_sender_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.sender") as string}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.sender
                              ?.message
                          }
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name={body}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={""}
                    render={({ field }) => (
                      <div className="relative w-[100%] mt-3">
                        <InputField
                          type={Types.TextAreaType}
                          placeHolder={
                            t(
                              "eventsManagement.template_body_placeholder",
                            ) as string
                          }
                          color="gray"
                          size="medium"
                          style={{ width: "100%" }}
                          label={t("eventsManagement.template_body")}
                          inputError={
                            formState.errors?.eventChannels?.[id]?.body?.message
                          }
                          {...field}
                          onchange={field.onChange}
                        />
                      </div>
                    )}
                  />
                </div>
              ),
            },
          ]}
          variant="underlined"
        />
      );
    default:
      return null;
  }
};

export default RenderAccordion;
