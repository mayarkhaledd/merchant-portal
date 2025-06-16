import { useForm } from "react-hook-form";
import { Context, useContext, useEffect, useMemo, useState } from "react";
import {
  NotificationHistoryState,
  SelectSearchMenuList,
} from "../../NotificationHistory.types";
import { useTranslation } from "react-i18next";
import { useNotificationHistoryFilterValidationRules } from "./useNotificationHistoryFilterValidationRules";
import { GetNotificationMessageListPayload } from "@ejada/types";
import { isArray } from "lodash";
import { useGetSystems } from "@ejada/providers/systemProvider/systemProvider";
import Cookies from "js-cookie";
import {
  formatToSelectSearch,
  NotificationHistoryContext,
} from "@ejada/screens";
import { useGetNotificationChannels } from "@ejada/providers";
import {
  NotificationHistoryFilterMenuValues,
  useNotificationHistoryFilterMenuFormProps,
} from "./NotificationHistoryFilter.types";

const useNotificationHistoryForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useNotificationHistoryFilterMenuFormProps) => {
  const { sourceSystemsMenu, setSourceSystemsMenu } =
    useContext<NotificationHistoryState>(
      NotificationHistoryContext as Context<NotificationHistoryState>,
    );
  const { t } = useTranslation();
  const [selectSearchKey, setSelectSearchKey] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const {
    control,
    handleSubmit,
    formState,
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<NotificationHistoryFilterMenuValues>({
    mode: "onTouched",
    defaultValues: {
      sourceSystem: "",
      eventCode: "",
      relationType: "",
      relationValue: "",
      notificationChannel: "",
      attachmentContentType: "",
      eventPriority: "",
      messageLanguage: "",
      requestId: "",
      externalRequestId: "",
      messageId: "",
      emailContact: "",
      messageStatus: "",
    },
  });
  const [clearDynamicLabels, setClearDynamicLabels] = useState(false);
  const [channelsMenu, setChannelsMenu] = useState<SelectSearchMenuList[]>();
  const formValues = watch();
  const descriptionSchema = useNotificationHistoryFilterValidationRules();

  const eventCodeRule = descriptionSchema.eventCode;
  const relationValueRule = descriptionSchema.relationValue;
  const notificationEventRule = descriptionSchema.notificationEvent;
  const messageIDRule = descriptionSchema.messageID;
  const externalMessageIDRule = descriptionSchema.externalMessageID;
  const requestIDRule = descriptionSchema.requestID;
  const externalRequestIDRule = descriptionSchema.externalRequestID;

  const { updatedData: sourceSystemData } = useGetSystems(
    {
      tenantId: Cookies.get("tenantId")
        ? (Cookies.get("tenantId") as string)
        : " ",
    },
    true,
  );
  const { updatedData: eventChannels } = useGetNotificationChannels(true);
  useEffect(() => {
    if (eventChannels) {
      const mappedChannels = eventChannels.map((channel) => ({
        id: channel.notificationChannelId as string,
        label: channel.channelNameEn as string,
      }));

      setChannelsMenu(mappedChannels);
    }
  }, [eventChannels]);
  useEffect(() => {
    if (sourceSystemData && sourceSystemData.appTypeList) {
      const systemMenu = formatToSelectSearch(
        sourceSystemData.appTypeList,
        "appTypeId",
        "appTypeName",
      );
      setSourceSystemsMenu(systemMenu);
    }
  }, [sourceSystemData]);
  useEffect(() => {
    if (clearDynamicLabels) {
      setClearDynamicLabels(false);
    }
  }, [clearDynamicLabels, setClearDynamicLabels]);

  const hasValues = useMemo(() => {
    return Object.values(formValues).some((value) => value && value.length > 0);
  }, [formValues]);

  const isFormValid = formState?.isValid ?? false;
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const [isClearAllButtonDisabled, setIsClearAllButtonDisabled] =
    useState(true);

  useEffect(() => {
    setIsApplyButtonDisabled(!hasValues || !isFormValid);
    setIsClearAllButtonDisabled(!hasValues);
  }, [formState.errors, hasValues, isFormValid]);

  const mapData = (
    data: NotificationHistoryFilterMenuValues,
  ): Partial<GetNotificationMessageListPayload> => {
    const res: Partial<GetNotificationMessageListPayload> = {
      appType: data.sourceSystem ? (data.sourceSystem as string) : undefined,
      messageId: data.messageId,
      requestId: data.requestId,
      externalRequestId: data.externalRequestId,
      eventCode: data.eventCode,
      customerRelationType: data.relationType ? data.relationType : undefined,
      customerRelationValue: data.relationValue,
      mobileContact: data.mobileContact ? data.mobileContact : undefined,
      emailContact: data.emailContact,
      notificationChannel: data.notificationChannel
        ? data.notificationChannel
        : undefined,
      eventPriority: data.eventPriority ? data.eventPriority : undefined,
      messageStatus: data.messageStatus,
      messageLanguage: data.messageLanguage,
      attachmentContentType: data.attachmentContentType
        ? data.attachmentContentType
        : undefined,
    };
    return Object.fromEntries(
      Object.entries(res).filter(
        ([, value]) =>
          (value !== null && value !== "" && value !== undefined) ||
          (isArray(value) && value.length > 0),
      ),
    );
  };

  useEffect(() => {
    if (activeSearchCriteria) {
      // Initialize mappedValues as an empty object with the right type
      const mappedValues: Partial<NotificationHistoryFilterMenuValues> = {};
      Object.entries(activeSearchCriteria).forEach(([key, value]) => {
        switch (key) {
          case "appType":
            mappedValues.sourceSystem = value as string;
            break;
          case "messageId":
            mappedValues.messageId = value as string;
            break;
          case "requestId":
            mappedValues.requestId = value as string;
            break;
          case "externalRequestId":
            mappedValues.externalRequestId = value as string;
            break;
          case "eventCode":
            mappedValues.eventCode = value as string;
            break;
          case "customerRelationType":
            mappedValues.relationType = value as string as
              | "IDENTIFIER"
              | "IQAMA"
              | "NIN";
            break;
          case "customerRelationValue":
            mappedValues.relationValue = value as string;
            break;
          case "mobileContact":
            mappedValues.mobileContact = value as string;
            break;
          case "emailContact":
            mappedValues.emailContact = value as string;
            break;
          case "notificationChannel":
            mappedValues.notificationChannel = value as string;
            break;
          case "eventPriority":
            mappedValues.eventPriority = String(value);
            break;
          case "messageStatus":
            mappedValues.messageStatus =
              value === "S"
                ? "Sent"
                : value === "F"
                  ? "Failed"
                  : (value as string);
            break;
          case "messageLanguage":
            mappedValues.messageLanguage = value as string as
              | "English"
              | "Arabic";
            break;
          case "attachmentContentType":
            mappedValues.attachmentContentType = value as string as
              | "PDF"
              | "CSV"
              | "DOCX";
            break;
        }
      });
      // Reset the form with the mapped values
      reset(mappedValues);
    }
  }, [activeSearchCriteria, reset]);

  const onSubmit = (data: NotificationHistoryFilterMenuValues) => {
    const req = mapData(data);
    setSearchQuery(req);
    setIsSent(false);
    setIsFailed(false);
    reset();
    closeDrawer();
  };
  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setValue("sourceSystem", "");
    reset();
    closeDrawer();
  };
  const handleClear = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset({
      sourceSystem: "",
      eventCode: "",
      relationType: "",
      relationValue: "",
      notificationChannel: "",
      attachmentContentType: "",
      eventPriority: "",
      messageLanguage: "",
      requestId: "",
      externalRequestId: "",
      messageId: "",
      emailContact: "",
      messageStatus: "",
    });
    setClearDynamicLabels(true);
    setSelectSearchKey((prevKey) => !prevKey);
    setSearchQuery({});
    setActiveSearchCriteria({});
  };

  return {
    control,
    handleSubmit,
    isApplyButtonDisabled,
    formValues,
    formState,
    handleCancel,
    handleClear,
    onSubmit,
    watch,
    clearDynamicLabels,
    eventCodeRule,
    relationValueRule,
    notificationEventRule,
    messageIDRule,
    externalMessageIDRule,
    requestIDRule,
    externalRequestIDRule,
    setValue,
    getValues,
    t,
    setClearDynamicLabels,
    setIsApplyButtonDisabled,
    selectSearchKey,
    sourceSystemsMenu,
    isClearAllButtonDisabled,
    isSent,
    setIsSent,
    isFailed,
    setIsFailed,
    channelsMenu,
  };
};

export default useNotificationHistoryForm;
