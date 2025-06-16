import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  InputField,
  Select,
  Button,
  DynamicLabel,
  PhoneInputField,
} from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import { ColorValues, Types } from "@ejada/common";
import {
  EventFormStepProps,
  TRecipientNotificationsState,
} from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { isEmailUniqueInChannel, validationRules } from "./ValidationSchema";
import { CreateEventInitialValues } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage";

import {
  RecipientType,
  channelArray,
  language,
  notifyRecipientMode,
  relationType,
  osType,
  recipientTypeArray,
} from "@ejada/screens/RecipientNotifications/partials/RecipientNotification.constants";
import { NotificationEventParameter } from "@ejada/types";
import { RecipientNotificationsContext } from "@ejada/screens/RecipientNotifications/RecipientNotificationsProvider";
import { Context, useContext, useEffect } from "react";
import { t } from "i18next";

export const CreateEventFirstStep: React.FC<EventFormStepProps> = ({
  control,
  initialValues = {} as CreateEventInitialValues,
  watch,
  formState,
  setValue,
  getValues,
  eventParameters = [] as NotificationEventParameter[],
}) => {
  const {
    languageSelected,
    setLanguageSelected,
    paramCodeGot,
    setParamCodeGot,
    channelIds,
  } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );
  // Converts an array of channel keys to an array of { value, label } options for Select
  const channelIdsToObject = () => {
    return channelArray
      .filter((item) => channelIds.includes(item.key))
      .map((item) => ({
        key: item.key,
        node: item.node,
      }));
  };
  useEffect(() => {
    if (eventParameters && eventParameters.length > 0) {
      const paramCodes = eventParameters.map(
        (param) => param?.parameterName || "",
      );
      setParamCodeGot(paramCodes);
    } else {
      setParamCodeGot([]); // Ensure it's reset if no parameters exist
    }
  }, [eventParameters, setParamCodeGot]);

  const recipientType = watch && watch("recipientType");
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "recipients",
  });
  useEffect(() => {
    if (eventParameters && eventParameters.length > 0) {
      fields.forEach((_, recipientIndex) => {
        eventParameters.forEach((param, parameterIndex) => {
          setValue?.(
            `recipients.${recipientIndex}.parameters.${parameterIndex}.parameterCode`,
            param?.parameterName || "",
          );
        });
      });
    }
  }, [eventParameters, fields, setValue]);

  //adding new recipient to recepients array by the channels default values
  const handleAddRecipient = () => {
    append({
      channels: [
        {
          notificationChannel: "",
          email: "",
          mobile: undefined,
        },
      ],
      parameters: eventParameters.map((param) => ({
        parameterCode: param?.parameterName || "",
        parameterValue: "",
      })), // Initialize parameters
    });
  };
  //adding a new channel to a specific recipient with channel default values
  const handleAddChannel = (recipientIndex: number) => {
    const updatedChannels = [
      ...fields[recipientIndex].channels,
      {
        notificationChannel: "",
        contact: "",
      },
    ];
    update(recipientIndex, {
      ...fields[recipientIndex],
      channels: updatedChannels,
    });
  };
  // Localize RecepientList
  const localizedRecepientTypeList = recipientTypeArray.map((item) => ({
    ...item,
    node: t(`recipient_notifications.${item.key}`),
  }));
  return (
    <div
      className="flex flex-col max-h-full mb-2 pr-5 pl-2 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="flex gap-[20px] mb-8 flex-grow">
        <div className="w-full">
          <Controller
            name="recipientType"
            control={control}
            defaultValue={initialValues.recipientType || ""}
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
                inputError={formState.errors.recipientType?.message as string}
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
            defaultValue={initialValues.notifyRecipientMode || ""}
            rules={validationRules.required}
            render={({ field }) => (
              <Select
                {...field}
                isRequired
                label={i18n.t(
                  "recipient_notifications.event_message.notifyMode",
                )}
                options={notifyRecipientMode}
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
      {recipientType && (
        <>
          <div className="flex mb-4">
            <span className="font-readexProSemiBold600 flex-1">
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
                {fields.length > 1 && (
                  <Button
                    type="withIcon"
                    onClick={() => remove(recipientIndex)}
                    icon={<IconTrash />}
                    label=""
                    state="error"
                    size="large"
                    buttonVariant="link"
                  />
                )}
              </div>
              <div className="border-neutrals/N5 border-[1px] my-2"></div>

              <div className="w-full mb-4">
                <Controller
                  name={`recipients.${recipientIndex}.messageLanguage`}
                  defaultValue={languageSelected}
                  rules={validationRules.required}
                  control={control}
                  render={({ field }) => {
                    const currentValue = watch(
                      `recipients.${recipientIndex}.messageLanguage`,
                    );
                    if (currentValue === "" && languageSelected) {
                      setValue?.(
                        `recipients.${recipientIndex}.messageLanguage`,
                        languageSelected ?? "",
                      );
                    }
                    return (
                      <Select
                        {...field}
                        isRequired
                        label={
                          i18n.t(
                            "recipient_notifications.event_message.language",
                          ) as string
                        }
                        options={language}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setLanguageSelected(selectedOption);
                          setValue?.(
                            `recipients.${recipientIndex}.messageLanguage`,
                            selectedOption,
                          );
                        }}
                        placeholder={
                          i18n.t(
                            "recipient_notifications.event_message.language",
                          ) as string
                        }
                        value={field.value}
                        inputError={
                          formState.errors.recipients?.[recipientIndex]
                            ?.messageLanguage?.message as string
                        }
                      />
                    );
                  }}
                />
              </div>

              {recipientType === RecipientType.CUSTOMER && (
                <>
                  <div className="mb-4">
                    <div className="flex gap-[20px] mb-4">
                      <div className="w-full">
                        <Controller
                          name={`recipients.${recipientIndex}.relationType`}
                          control={control}
                          rules={validationRules.required}
                          defaultValue={""}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isRequired
                              label={i18n.t(
                                "recipient_notifications.adhoc_message.first_step.relation_type",
                              )}
                              options={relationType}
                              placeholder={
                                i18n.t(
                                  "recipient_notifications.adhoc_message.first_step.relation_type",
                                ) as string
                              }
                              inputError={
                                formState.errors.recipients?.[recipientIndex]
                                  ?.relationType?.message as string
                              }
                            />
                          )}
                        />
                      </div>

                      <div className="w-full">
                        <Controller
                          name={`recipients.${recipientIndex}.relationValue`}
                          control={control}
                          rules={validationRules.required}
                          defaultValue={""}
                          render={({ field }) => (
                            <InputField
                              {...field}
                              label={i18n.t(
                                "recipient_notifications.adhoc_message.first_step.relation_value",
                              )}
                              placeHolder={
                                i18n.t(
                                  "recipient_notifications.adhoc_message.first_step.relation_value",
                                ) as string
                              }
                              className="w-full"
                              type={Types.TextType}
                              inputError={
                                formState.errors.recipients?.[recipientIndex]
                                  ?.relationValue?.message
                              }
                              isRequired
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {recipientType === "CONTACT" && (
                <>
                  <div className="border-t border-gray-300 mt-4 mb-2 pt-2"></div>

                  {recipient.channels.map((_, channelIndex) => (
                    <div key={channelIndex} className="bg-[#F2F4FF] mb-4">
                      <div className="flex items-center justify-between p-2">
                        <span className="font-semibold">
                          {i18n.t("recipient_notifications.channel", {
                            index: channelIndex + 1,
                          })}
                        </span>
                        {recipient.channels.length > 1 && (
                          <Button
                            type="withIcon"
                            onClick={() =>
                              update(recipientIndex, {
                                ...recipient,
                                channels: recipient.channels.filter(
                                  (_, index) => index !== channelIndex,
                                ),
                              })
                            }
                            icon={<IconTrash />}
                            label=""
                            state="error"
                            size="large"
                            buttonVariant="link"
                          />
                        )}
                      </div>
                      <div className="border-b border-gray-300"></div>
                      <div className="flex gap-[20px] mt-2 p-2">
                        <div className="w-full">
                          <Controller
                            name={`recipients.${recipientIndex}.channels.${channelIndex}.notificationChannel`}
                            control={control}
                            rules={validationRules.required}
                            defaultValue={""}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isRequired
                                label={i18n.t(
                                  "recipient_notifications.adhoc_message.first_step.notificationChannel",
                                )}
                                options={channelIdsToObject()}
                                placeholder={
                                  i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.notificationChannel",
                                  ) as string
                                }
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption);
                                  const updatedChannel = {
                                    notificationChannel: selectedOption,
                                    contact: "",
                                  };
                                  const updatedChannels = [
                                    ...recipient.channels,
                                  ];
                                  updatedChannels[channelIndex] =
                                    updatedChannel;
                                  update(recipientIndex, {
                                    ...recipient,
                                    messageLanguage: languageSelected,
                                    channels: updatedChannels,
                                    parameters: (
                                      recipient.parameters || []
                                    ).map((param, idx) => ({
                                      ...param,
                                      parameterCode: paramCodeGot[idx] || "",
                                    })),
                                  });
                                }}
                                inputError={
                                  formState.errors.recipients?.[recipientIndex]
                                    ?.channels?.[channelIndex]
                                    ?.notificationChannel?.message
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      {recipient.channels[channelIndex].notificationChannel ===
                        "EMAIL" && (
                        <div className="gap-[20px] mb-6 mt-2 p-2">
                          <div className="w-full">
                            <Controller
                              name={`recipients.${recipientIndex}.channels.${channelIndex}.email`}
                              control={control}
                              rules={validationRules.email}
                              defaultValue={""}
                              render={({ field }) => (
                                <InputField
                                  {...field}
                                  placeHolder={
                                    i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.email",
                                    ) as string
                                  }
                                  label={
                                    i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.email",
                                    ) as string
                                  }
                                  className="w-full"
                                  inputError={
                                    formState.errors.recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]?.email?.message
                                  }
                                  isRequired
                                  type={Types.EmailType}
                                />
                              )}
                            />
                          </div>
                          <div className="mt-2">
                            <Controller
                              name={`recipients.${recipientIndex}.channels.${channelIndex}.additionalEmailDetails.emailCC`}
                              control={control}
                              rules={{
                                ...validationRules.extraEmail,
                                validate: (value) =>
                                  isEmailUniqueInChannel(
                                    value,
                                    `recipients.${recipientIndex}.channels.${channelIndex}`,
                                    getValues?.(),
                                  ),
                              }}
                              defaultValue={""}
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
                                    formState.errors.recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]
                                      ?.additionalEmailDetails?.emailCC?.message
                                  }
                                  // isRequired
                                />
                              )}
                            />
                          </div>
                          <div className="mt-2">
                            <Controller
                              name={`recipients.${recipientIndex}.channels.${channelIndex}.additionalEmailDetails.emailBCC`}
                              control={control}
                              rules={{
                                ...validationRules.extraEmail,
                                validate: (value) =>
                                  isEmailUniqueInChannel(
                                    value,
                                    `recipients.${recipientIndex}.channels.${channelIndex}`,
                                    getValues?.(),
                                  ),
                              }}
                              defaultValue={""}
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
                                    formState.errors.recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]
                                      ?.additionalEmailDetails?.emailBCC
                                      ?.message
                                  }
                                  // isRequired
                                />
                              )}
                            />
                          </div>{" "}
                          <div className="mt-2">
                            <Controller
                              name={`recipients.${recipientIndex}.channels.${channelIndex}.additionalEmailDetails.emailReplyTo`}
                              control={control}
                              rules={{
                                ...validationRules.extraEmail,
                                validate: (value) =>
                                  isEmailUniqueInChannel(
                                    value,
                                    `recipients.${recipientIndex}.channels.${channelIndex}`,
                                    getValues?.(),
                                  ),
                              }}
                              defaultValue={""}
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
                                    formState.errors.recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]
                                      ?.additionalEmailDetails?.emailReplyTo
                                      ?.message
                                  }
                                  // isRequired
                                />
                              )}
                            />
                          </div>
                        </div>
                      )}
                      {recipient.channels[channelIndex].notificationChannel ===
                        "INBOX" && (
                        <div className="gap-[20px] mb-6 mt-2 p-2">
                          <Controller
                            name={`recipients.${recipientIndex}.channels.${channelIndex}.inbox`}
                            control={control}
                            rules={validationRules.required}
                            defaultValue={""}
                            render={({ field }) => (
                              <InputField
                                {...field}
                                placeHolder={
                                  i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.inbox",
                                  ) as string
                                }
                                label={
                                  i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.inbox",
                                  ) as string
                                }
                                className="w-full"
                                inputError={
                                  formState.errors.recipients?.[recipientIndex]
                                    ?.channels?.[channelIndex]?.inbox?.message
                                }
                                isRequired
                                type={Types.TextType}
                              />
                            )}
                          />
                        </div>
                      )}
                      {recipient.channels[channelIndex].notificationChannel ===
                        "PUSH_NOTIFICATION" && (
                        <div className="flex gap-[20px] mb-6 mt-2 p-2">
                          <div className="w-full">
                            <Controller
                              name={`recipients.${recipientIndex}.channels.${channelIndex}.push`}
                              control={control}
                              rules={validationRules.required}
                              defaultValue={""}
                              render={({ field }) => (
                                <InputField
                                  {...field}
                                  label={i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.push",
                                  )}
                                  placeHolder={
                                    i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.push",
                                    ) as string
                                  }
                                  className="w-full"
                                  type={Types.TextType}
                                  inputError={
                                    formState.errors.recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]?.push?.message
                                  }
                                  isRequired
                                />
                              )}
                            />
                          </div>
                          <div className="w-full">
                            <Controller
                              name={`recipients.${recipientIndex}.channels.${channelIndex}.operatingSystemType`}
                              control={control}
                              rules={validationRules.required}
                              defaultValue={""}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={osType}
                                  label={i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.osType",
                                  )}
                                  placeholder={
                                    i18n.t(
                                      "recipient_notifications.adhoc_message.first_step.osType",
                                    ) as string
                                  }
                                  inputError={
                                    formState.errors.recipients?.[
                                      recipientIndex
                                    ]?.channels?.[channelIndex]
                                      ?.operatingSystemType?.message
                                  }
                                  isRequired
                                />
                              )}
                            />
                          </div>
                        </div>
                      )}
                      {recipient.channels[channelIndex].notificationChannel ===
                        "SMS" && (
                        <Controller
                          name={`recipients.${recipientIndex}.channels.${channelIndex}.mobile`}
                          control={control}
                          rules={validationRules.mobile}
                          defaultValue={0}
                          render={({ field }) => (
                            <div
                              className="gap-[20px] mb-6 mt-2 p-2"
                              dir={"ltr"}
                            >
                              <PhoneInputField
                                country="SA"
                                setIsValidPhone={() => {}}
                                className="w-full"
                                placeholder="97979797"
                                color={ColorValues.Gray}
                                size="large"
                                label={
                                  i18n.t(
                                    "recipient_notifications.adhoc_message.first_step.mobile",
                                  ) as string
                                }
                                isRequired
                                error={
                                  formState.errors.recipients?.[recipientIndex]
                                    ?.channels?.[channelIndex]?.mobile
                                }
                                {...field}
                                value={field.value?.toString() || ""}
                              />
                            </div>
                          )}
                        />
                      )}{" "}
                    </div>
                  ))}
                </>
              )}
              {recipientType === RecipientType.CONTACT && (
                <div className="w-full">
                  <Button
                    onClick={() => handleAddChannel(recipientIndex)}
                    label={
                      i18n.t(
                        "recipient_notifications.adhoc_message.first_step.addChannel",
                      ) as string
                    }
                    type="withIcon"
                    icon={<IconPlus />}
                    buttonVariant="outlined"
                    state="default"
                    size="large"
                    className=" w-full"
                  />
                </div>
              )}

              {eventParameters?.length > 0 &&
                eventParameters.map((_, parameterIndex) => (
                  <div
                    key={parameterIndex}
                    className="flex gap-[20px] mb-2 flex-grow"
                  >
                    <div className="w-full mt-4">
                      <Controller
                        name={`recipients.${recipientIndex}.parameters.${parameterIndex}.parameterCode`}
                        control={control}
                        defaultValue={paramCodeGot?.[parameterIndex] || ""}
                        render={({ field }) => (
                          <InputField
                            {...field}
                            label={
                              i18n.t(
                                "recipient_notifications.event_message.parameterCode",
                              ) as string
                            }
                            placeHolder={
                              i18n.t(
                                "recipient_notifications.event_message.parameterCode",
                              ) as string
                            }
                            className="w-full"
                            type={Types.TextType}
                            inputError={
                              formState.errors.recipients?.[recipientIndex]
                                ?.parameters?.[parameterIndex]?.parameterCode
                                ?.message
                            }
                            disabled={true}
                          />
                        )}
                      />
                    </div>
                    <div className="w-full mt-4">
                      <Controller
                        name={`recipients.${recipientIndex}.parameters.${parameterIndex}.parameterValue`}
                        control={control}
                        render={({ field }) => (
                          <InputField
                            {...field}
                            label={
                              i18n.t(
                                "recipient_notifications.event_message.parameterValue",
                              ) as string
                            }
                            placeHolder={
                              i18n.t(
                                "recipient_notifications.event_message.parameterValue",
                              ) as string
                            }
                            className="w-full"
                            type={Types.TextType}
                            inputError={
                              formState.errors.recipients?.[recipientIndex]
                                ?.parameters?.[parameterIndex]?.parameterValue
                                ?.message
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
