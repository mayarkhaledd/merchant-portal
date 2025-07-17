import React, { Context, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  NotificationEventFormValues,
  extraEventChannelsInitialValues,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement/EventsManagement.types";
import { Accordion, InputField, Select, SelectSearch } from "eds-react";
import { EventManagementFormValidationSchema } from "../EventManagementFormValidationSchema";
import { EventsManagementContext } from "@ejada/screens/EventsManagement/EventsManagementProvider";
import { Types } from "@ejada/common/utils/Enum";
import { WhatsappTemplatePreview } from "@ejada/screens/shared";
import i18n from "@ejada/common/locals/i18n";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";
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
  watch: UseFormWatch<extraEventChannelsInitialValues>;
}

const RenderAccordion: React.FC<RenderAccordionProps> = ({
  type,
  control,
  formState,
  id,
  setValue,
  mode,
  watch,
}) => {
  const { t } = useTranslation();
  const testSender = `eventChannels.${id}.sender`;
  const testHeader = `eventChannels.${id}.header`;
  const notificationChannelIdName = `eventChannels.${id}.channelId`;
  const notificationEventChannelId = `eventChannels.${id}.eventChannelId`;
  const languageCode = `eventChannels.${id}.languageCode`;
  const body = `eventChannels.${id}.body`;

  const {
    smsSender,
    emailSender,
    refetchAllWhatsappTemplatesData,
    allWhatsappTemplatesData,
    selectedWhatsappTemplate,
    setSelectedWhatsappTemplate,
    getWhatsappTemplateDetails,
    selectedWabaId,
    setSelectedWabaId,
  } = useContext<TEventsManagementState>(
    EventsManagementContext as Context<TEventsManagementState>,
  );
  const context = useWhatsappOnboardingParams();
  const params = context?.params;
  const whatsappAccounts =
    params?.onboardingMetaAuth?.metaBusinessAccounts?.[0]?.whatsappAccounts ||
    [];
  const whatsappBusinessAccountOptions = whatsappAccounts.map((account) => ({
    key: account.wabaId,
    node: account.name,
  }));

  const filteredSenderOptions = useMemo(() => {
    if (!selectedWabaId) return [];
    const account = whatsappAccounts.find(
      (acc) => acc.wabaId === selectedWabaId,
    );
    return (
      account?.whatsappPhoneNumbersResponses?.map((phone) => ({
        key: phone.phoneNumberId,
        node: phone.displayPhoneNumber,
      })) || []
    );
  }, [selectedWabaId, whatsappAccounts]);

  const filteredTemplateOptions = useMemo(() => {
    if (!selectedWabaId) return [];
    return allWhatsappTemplatesData?.templates
      .filter(
        (template) => template.whatsappBusinessAccountId === selectedWabaId,
      )
      .map((template) => ({
        key: template.templateId ?? template.templateName,
        node: template.templateName,
      }));
  }, [selectedWabaId, allWhatsappTemplatesData?.templates]);

  useEffect(() => {
    refetchAllWhatsappTemplatesData?.();
  }, []);

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
    case "WHATSAPP":
      return (
        <Accordion
          items={[
            {
              isRequired: true,
              label: t("eventsManagement.WHATSAPP"),
              value: "WHATSAPP",
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
                  <div className="w-full">
                    <Controller
                      name={`eventChannels.${id}.whatsappBusinessAccountId`}
                      control={
                        control as Control<extraEventChannelsInitialValues>
                      }
                      defaultValue={undefined}
                      rules={EventManagementFormValidationSchema.required}
                      render={({ field }) => (
                        <Select
                          label={i18n.t(
                            "whatsapp.create_template.first_step.whatsappBusinessAccountId",
                          )}
                          options={whatsappBusinessAccountOptions}
                          value={field.value}
                          onChange={field.onChange}
                          inputError={
                            formState?.errors?.eventChannels?.[0]
                              ?.whatsappBusinessAccountId?.message as string
                          }
                          isRequired
                          placeholder={
                            i18n.t(
                              "whatsapp.create_template.first_step.whatsappBusinessAccountId_placeholder",
                            ) as string
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="w-full mt-4 mb-4">
                    <Controller
                      name={`eventChannels.${id}.whatsappSender`}
                      control={
                        control as Control<extraEventChannelsInitialValues>
                      }
                      defaultValue={undefined}
                      rules={EventManagementFormValidationSchema.required}
                      render={({ field }) => {
                        const selectedWhatsappBusinessId = watch
                          ? watch(
                              `eventChannels.${id}.whatsappBusinessAccountId`,
                            )
                          : "";
                        setSelectedWabaId(selectedWhatsappBusinessId as string);
                        return (
                          <Select
                            label={i18n.t(
                              "whatsapp.create_template.first_step.whatsappSender",
                            )}
                            options={filteredSenderOptions}
                            value={field.value}
                            onChange={field.onChange}
                            inputError={
                              formState?.errors?.eventChannels?.[0]
                                ?.whatsappSender?.message as string
                            }
                            isRequired
                            placeholder={
                              i18n.t(
                                "whatsapp.create_template.first_step.whatsappSender_placeholder",
                              ) as string
                            }
                            disabled={!selectedWabaId}
                          />
                        );
                      }}
                    />
                  </div>
                  <Controller
                    name={`eventChannels.${id}.whatsappTemplateId`}
                    control={
                      control as Control<
                        | NotificationEventFormValues
                        | extraEventChannelsInitialValues
                      >
                    }
                    defaultValue={undefined}
                    rules={EventManagementFormValidationSchema.required}
                    render={({ field }) => (
                      <div className="relative w-[100%]">
                        <Select
                          options={filteredTemplateOptions || []}
                          label={t("eventsManagement.templates") as string}
                          onChange={(value) => {
                            field.onChange(value);
                            // Update the selected template for preview
                            if (value) {
                              const templateDetails =
                                getWhatsappTemplateDetails(value);

                              setSelectedWhatsappTemplate(templateDetails);
                            } else {
                              setSelectedWhatsappTemplate(null);
                            }
                          }}
                          value={selectedWhatsappTemplate?.templateId}
                          placeholder={
                            t("eventsManagement.select_template") as string
                          }
                          disabled={!selectedWabaId}
                        />
                      </div>
                    )}
                  />

                  {/* Template Preview */}
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {t("eventsManagement.template_preview")}
                    </div>
                    <WhatsappTemplatePreview
                      selectedTemplate={selectedWhatsappTemplate}
                    />
                  </div>
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
