import { IconTrash, IconPlus } from "@tabler/icons-react";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  InputField,
  Select,
  Button,
  DynamicLabel,
  PhoneInputField,
} from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import { ColorValues, Sizes, Types } from "@ejada/common";
import { CreateAdhocInitialValues } from "@ejada/screens/RecipientNotifications";
import { FormStepProps } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { isEmailUniqueInChannel, validationRules } from "./ValidationSchema";
import {
  channelArray,
  notifyRecipientMode,
  osType,
  recipientTypeArray,
  relationType,
} from "../../RecipientNotification.constants";
import { t } from "i18next";

export const CreateAdhocFirstStep: React.FC<FormStepProps> = ({
  control,
  initialValues = {} as CreateAdhocInitialValues,
  watch,
  formState,
  getValues,
}) => {
  const recipientType = watch && watch("RecipientType");
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "Recipients",
  });

  // Localize channelList
  const localizedChannelList = channelArray.map((item) => ({
    ...item,
    node: t(`eventsManagement.${item.key}`),
  }));

  // Localize Mode ( ALL, Any)
  const LocalizedNotifyRecipientMode = notifyRecipientMode.map((item) => ({
    ...item,
    node: t(`recipient_notifications.${item.key}`),
  }));

  // Localize RecepientList
  const localizedRecepientTypeList = recipientTypeArray.map((item) => ({
    ...item,
    node: t(`recipient_notifications.${item.key}`),
  }));

  // Localize RelationType
  const localizedRelationTypeList = relationType.map((item) => ({
    ...item,
    node: t(`recipient_notifications.${item.key}`),
  }));
  const handleAddRecipient = () => {
    append({
      channels: [
        {
          notificationChannel: "",
          senderId: undefined,
          email: "",
          mobile: undefined,
        },
      ],
    });
  };

  return (
    <div
      className="flex flex-col max-h-full mb-2 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="flex gap-[20px] mb-8 flex-grow">
        <div className="w-full">
          <Controller
            name="RecipientType"
            control={control}
            defaultValue={initialValues.RecipientType}
            rules={validationRules.required}
            render={({ field }) => (
              <Select
                {...field}
                isRequired
                label={i18n.t(
                  "recipient_notifications.adhoc_message.first_step.recipientType",
                )}
                options={localizedRecepientTypeList}
                placeholder={
                  i18n.t(
                    "recipient_notifications.adhoc_message.first_step.recipientType",
                  ) as string
                }
                inputError={formState.errors.RecipientType?.message as string}
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-[20px] mb-8 flex-grow">
        <div className="w-full">
          <Controller
            name="notifyRecipientMode"
            control={control}
            defaultValue={initialValues.notifyRecipientMode}
            rules={validationRules.required}
            render={({ field }) => (
              <Select
                {...field}
                isRequired
                label={i18n.t(
                  "recipient_notifications.event_message.notifyMode",
                )}
                options={LocalizedNotifyRecipientMode}
                placeholder={
                  i18n.t(
                    "recipient_notifications.event_message.notifyMode",
                  ) as string
                }
                inputError={
                  formState.errors.notifyRecipientMode?.message as string
                }
              />
            )}
          />
        </div>
      </div>
      {recipientType === "CUSTOMER" && (
        <div className="flex gap-[20px] mb-8 flex-grow">
          <div className="w-full">
            <Controller
              name="mobileAppName"
              control={control}
              defaultValue={initialValues.mobileAppName}
              render={({ field }) => (
                <InputField
                  type={Types.TextType}
                  placeHolder={
                    i18n.t(
                      "recipient_notifications.adhoc_message.first_step.mobileApp",
                    ) as string
                  }
                  color={ColorValues.Gray}
                  size={Sizes.Medium}
                  style={{ width: "100%" }}
                  label={
                    i18n.t(
                      "recipient_notifications.adhoc_message.first_step.mobileApp",
                    ) as string
                  }
                  inputError={formState.errors.mobileAppName?.message as string}
                  {...field}
                />
              )}
            />
          </div>
        </div>
      )}
      {recipientType && (
        <>
          <div className="flex mb-4">
            <span className="font-readexProSemiBold600 flex-1">
              {" "}
              {i18n.t("recipient_notifications.recipients") as string}
            </span>
            <DynamicLabel
              onClick={handleAddRecipient}
              label={
                i18n.t(
                  "recipient_notifications.event_message.addRecipient",
                ) as string
              }
            />
          </div>
          {fields.map((recipient, recipientIndex) => (
            <div key={recipient.id} className="mb-6 bg-[#F2F4FF] p-5">
              <div className="flex items-center justify-between">
                <span className="font-readexProRegular">
                  {
                    i18n.t("recipient_notifications.recipient", {
                      index: recipientIndex + 1,
                    }) as string
                  }
                </span>
                <Button
                  type="withIcon"
                  onClick={() => remove(recipientIndex)}
                  icon={<IconTrash />}
                  label=""
                  state="error"
                  size="large"
                  buttonVariant="link"
                />
              </div>
              <div className="border-neutrals/N5 border-[1px] my-2"></div>
              <div className="flex flex-col gap-[20px] mb-2">
                {recipient.channels.map((channel, channelIndex) => (
                  <div key={channelIndex}>
                    {recipientType === "CUSTOMER" && (
                      <div className="flex gap-[20px] mb-4 flex-grow">
                        <div className="w-full">
                          <Controller
                            name={`Recipients.${recipientIndex}.RelationType`}
                            control={control}
                            rules={validationRules.required}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isRequired
                                label={i18n.t(
                                  "customer.create_customer.first_step.relation_type",
                                )}
                                options={localizedRelationTypeList}
                                placeholder={
                                  i18n.t(
                                    "customer.create_customer.first_step.relation_type",
                                  ) as string
                                }
                                inputError={
                                  formState.errors.Recipients?.[recipientIndex]
                                    ?.RelationType?.message as string
                                }
                              />
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <Controller
                            name={`Recipients.${recipientIndex}.RelationValue`}
                            control={control}
                            defaultValue={recipient.RelationValue}
                            rules={validationRules.relationValue}
                            render={({ field }) => (
                              <InputField
                                isRequired
                                type={Types.TextType}
                                placeHolder={
                                  i18n.t(
                                    "customer.create_customer.first_step.relation_value",
                                  ) as string
                                }
                                color={ColorValues.Gray}
                                size={Sizes.Medium}
                                style={{ width: "100%" }}
                                label={
                                  i18n.t(
                                    "customer.create_customer.first_step.relation_value",
                                  ) as string
                                }
                                inputError={
                                  formState.errors.Recipients?.[recipientIndex]
                                    ?.RelationValue?.message as string
                                }
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>
                    )}
                    {recipientType === "CONTACT" && (
                      <>
                        {" "}
                        <div className="flex gap-[20px] mb-4">
                          <div className="w-full">
                            <Controller
                              name={`Recipients.${recipientIndex}.channels.${channelIndex}.notificationChannel`}
                              control={control}
                              defaultValue={channel.notificationChannel}
                              rules={validationRules.required}
                              render={({ field: controllerField }) => (
                                <Select
                                  {...controllerField}
                                  isRequired
                                  label={i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.notificationChannel",
                                  )}
                                  options={localizedChannelList}
                                  placeholder={
                                    i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.notificationChannel",
                                    ) as string
                                  }
                                  onChange={(selectedOption) => {
                                    controllerField.onChange(selectedOption);
                                    const updatedChannel = {
                                      notificationChannel: selectedOption,
                                      senderId: undefined,
                                      email: "",
                                      mobile: undefined,
                                    };
                                    const updatedChannels = [
                                      ...recipient.channels,
                                    ];
                                    updatedChannels[channelIndex] =
                                      updatedChannel;
                                    update(recipientIndex, {
                                      ...recipient,
                                      channels: updatedChannels,
                                    });
                                  }}
                                  value={controllerField.value || ""}
                                  inputError={
                                    formState.errors.Recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]
                                      ?.notificationChannel?.message
                                  }
                                />
                              )}
                            />
                          </div>
                        </div>
                        {channel.notificationChannel === "SMS" && (
                          <div dir={"ltr"}>
                            <Controller
                              control={control}
                              rules={validationRules.mobile}
                              name={`Recipients.${recipientIndex}.channels.${channelIndex}.mobile`}
                              render={({ field }) => (
                                <PhoneInputField
                                  country="SA"
                                  setIsValidPhone={() => {}}
                                  className="w-full"
                                  placeholder="97979797"
                                  color={ColorValues.Gray}
                                  size="large"
                                  label={t(
                                    "recipient_notifications.adhoc_message.first_step.primarymobile",
                                  )}
                                  isRequired
                                  error={
                                    formState.errors.Recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]?.mobile
                                  }
                                  {...field}
                                  value={field.value?.toString() || ""}
                                />
                              )}
                            />
                          </div>
                        )}
                        {channel.notificationChannel === "INBOX" && (
                          <div className="w-full">
                            <Controller
                              name={`Recipients.${recipientIndex}.channels.${channelIndex}.inbox`}
                              control={control}
                              rules={validationRules.required}
                              render={({ field }) => (
                                <InputField
                                  {...field}
                                  label={i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.inbox",
                                  )}
                                  placeHolder={
                                    i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.inbox",
                                    ) as string
                                  }
                                  className="w-full"
                                  type={Types.TextType}
                                  inputError={
                                    formState.errors.Recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]?.inbox?.message
                                  }
                                  isRequired={
                                    channel.notificationChannel === "INBOX"
                                  }
                                />
                              )}
                            />
                          </div>
                        )}
                        {channel.notificationChannel === "EMAIL" && (
                          <div>
                            <div className="w-full">
                              <Controller
                                name={`Recipients.${recipientIndex}.channels.${channelIndex}.email`}
                                control={control}
                                rules={{
                                  ...validationRules.email,
                                  validate: (value) =>
                                    isEmailUniqueInChannel(
                                      value,
                                      `Recipients.${recipientIndex}.channels.${channelIndex}`,
                                      getValues?.(),
                                    ),
                                }}
                                render={({ field }) => (
                                  <InputField
                                    {...field}
                                    label={i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.email",
                                    )}
                                    placeHolder={
                                      i18n.t(
                                        "recipient_notifications.adhoc_message.first_step.email",
                                      ) as string
                                    }
                                    className="w-full"
                                    type={Types.EmailType}
                                    inputError={
                                      formState.errors.Recipients?.[
                                        recipientIndex
                                      ]?.channels?.[channelIndex]?.email
                                        ?.message
                                    }
                                    isRequired={
                                      channel.notificationChannel === "EMAIL"
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div className="w-full">
                              <Controller
                                name={`Recipients.${recipientIndex}.channels.${channelIndex}.additionalEmailDetails.emailCC`}
                                control={control}
                                rules={{
                                  ...validationRules.extraEmail,
                                  validate: (value) =>
                                    isEmailUniqueInChannel(
                                      value,
                                      `Recipients.${recipientIndex}.channels.${channelIndex}`,
                                      getValues?.(),
                                    ),
                                }}
                                render={({ field }) => (
                                  <InputField
                                    {...field}
                                    label={i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.emailCC",
                                    )}
                                    placeHolder={
                                      i18n.t(
                                        "recipient_notifications.adhoc_message.first_step.emailCC",
                                      ) as string
                                    }
                                    className="w-full"
                                    type={Types.EmailType}
                                    inputError={
                                      formState.errors.Recipients?.[
                                        recipientIndex
                                      ]?.channels?.[channelIndex]
                                        ?.additionalEmailDetails?.emailCC
                                        ?.message
                                    }
                                    // isRequired={
                                    //   channel.notificationChannel === "EMAIL"
                                    // }
                                  />
                                )}
                              />
                              <Controller
                                name={`Recipients.${recipientIndex}.channels.${channelIndex}.additionalEmailDetails.emailBCC`}
                                control={control}
                                rules={{
                                  ...validationRules.extraEmail,
                                  validate: (value) =>
                                    isEmailUniqueInChannel(
                                      value,
                                      `Recipients.${recipientIndex}.channels.${channelIndex}`,
                                      getValues?.(),
                                    ),
                                }}
                                render={({ field }) => (
                                  <InputField
                                    {...field}
                                    label={i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.emailBCC",
                                    )}
                                    placeHolder={
                                      i18n.t(
                                        "recipient_notifications.adhoc_message.first_step.emailBCC",
                                      ) as string
                                    }
                                    className="w-full"
                                    type={Types.EmailType}
                                    inputError={
                                      formState.errors.Recipients?.[
                                        recipientIndex
                                      ]?.channels?.[channelIndex]
                                        ?.additionalEmailDetails?.emailBCC
                                        ?.message
                                    }
                                    // isRequired={
                                    //   channel.notificationChannel === "EMAIL"
                                    // }
                                  />
                                )}
                              />
                              <Controller
                                name={`Recipients.${recipientIndex}.channels.${channelIndex}.additionalEmailDetails.emailReplyTo`}
                                control={control}
                                rules={{
                                  ...validationRules.extraEmail,
                                  validate: (value) =>
                                    isEmailUniqueInChannel(
                                      value,
                                      `Recipients.${recipientIndex}.channels.${channelIndex}`,
                                      getValues?.(),
                                    ),
                                }}
                                render={({ field }) => (
                                  <InputField
                                    {...field}
                                    label={i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.emailReplyTo",
                                    )}
                                    placeHolder={
                                      i18n.t(
                                        "recipient_notifications.adhoc_message.first_step.emailReplyTo",
                                      ) as string
                                    }
                                    className="w-full"
                                    type={Types.EmailType}
                                    inputError={
                                      formState.errors.Recipients?.[
                                        recipientIndex
                                      ]?.channels?.[channelIndex]
                                        ?.additionalEmailDetails?.emailReplyTo
                                        ?.message
                                    }
                                    // isRequired={
                                    //   channel.notificationChannel === "EMAIL"
                                    // }
                                  />
                                )}
                              />
                            </div>
                          </div>
                        )}
                        {channel.notificationChannel ===
                          "PUSH_NOTIFICATION" && (
                          <div className="flex gap-[20px] mb-4">
                            <div className="w-full">
                              <Controller
                                name={`Recipients.${recipientIndex}.channels.${channelIndex}.push`}
                                control={control}
                                rules={validationRules.required}
                                render={({ field }) => (
                                  <InputField
                                    {...field}
                                    label={i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.token",
                                    )}
                                    placeHolder={
                                      i18n.t(
                                        "recipient_notifications.adhoc_message.first_step.token",
                                      ) as string
                                    }
                                    className="w-full"
                                    type={Types.TextType}
                                    inputError={
                                      formState.errors.Recipients?.[
                                        recipientIndex
                                      ]?.channels?.[channelIndex]?.push?.message
                                    }
                                    isRequired={
                                      channel.notificationChannel ===
                                      "PUSH_NOTIFICATION"
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div className="w-full">
                              <Controller
                                name={`Recipients.${recipientIndex}.channels.${channelIndex}.operatingSystemType`}
                                control={control}
                                rules={validationRules.required}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    label={i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.osType",
                                    )}
                                    options={osType}
                                    placeholder={
                                      i18n.t(
                                        "recipient_notifications.adhoc_message.first_step.osType",
                                      ) as string
                                    }
                                    inputError={
                                      formState.errors.Recipients?.[
                                        recipientIndex
                                      ]?.channels?.[channelIndex]
                                        ?.operatingSystemType?.message
                                    }
                                    isRequired={
                                      channel.notificationChannel ===
                                      "PUSH_NOTIFICATION"
                                    }
                                  />
                                )}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                {recipientType === "CONTACT" && (
                  <Button
                    type="withIcon"
                    label={t(
                      "recipient_notifications.adhoc_message.first_step.addChannel",
                    )}
                    state="default"
                    size="large"
                    buttonVariant="outlined"
                    icon={<IconPlus />}
                    onClick={() => {
                      const updatedChannels = [
                        ...recipient.channels,
                        {
                          notificationChannel: "",
                          senderId: undefined,
                        },
                      ];
                      update(recipientIndex, {
                        ...recipient,
                        channels: updatedChannels,
                      });
                    }}
                    className=" !w-full"
                  />
                )}{" "}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
