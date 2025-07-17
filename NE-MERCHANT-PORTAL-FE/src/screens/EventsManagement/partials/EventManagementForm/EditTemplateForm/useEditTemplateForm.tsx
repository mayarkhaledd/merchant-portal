import { useForm } from "react-hook-form";
import {
  EditTemplatesFormValues,
  EventsManagementContext,
  formateToEditTemplateData,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import { Context, useContext, useEffect } from "react";
import { TemplateChannelsData } from "../types";

export const useEditTemplateForm = (closeDrawer: () => void) => {
  const {
    editTemplateData,
    eventParameterList,
    setChannelsTableDataEditMode,
    channelsTableDataEditMode,
    refetchAllWhatsappTemplatesData,
    getWhatsappTemplateDetails,
    setSelectedWhatsappTemplate,
  } = useContext(EventsManagementContext as Context<TEventsManagementState>);
  const { control, handleSubmit, formState, trigger, watch, reset, getValues } =
    useForm<EditTemplatesFormValues>({
      mode: "onTouched",
      defaultValues: {
        eventChannelId: "",
        header: "",
        body: "",
        sender: "",
        languageCode: "",
        channelId: "",
        whatsappTemplateId: "",
      },
    });

  const channelId = watch("channelId");
  const whatsappTemplateId = watch("whatsappTemplateId");

  //Edit Template Drawer assigning the data to the form
  useEffect(() => {
    if (editTemplateData) {
      const initialFormValues = {
        eventChannelId: editTemplateData?.eventChannelId || "",
        sender:
          editTemplateData.channelId === "WHATSAPP"
            ? editTemplateData?.whatsappSender?.toString()
            : editTemplateData?.sender?.toString() || "",
        header: editTemplateData?.header?.toString() || "",
        body: editTemplateData?.body?.toString() || "",
        languageCode: editTemplateData?.languageCode || "",
        channelId: editTemplateData?.channelId || "",
        whatsappTemplateId: editTemplateData?.whatsappTemplateId || "",
        whatsappBusinessAccountId:
          editTemplateData?.whatsappBusinessAccountId || "",
        whatsappSender: editTemplateData?.whatsappSender?.toString() || "",
      };
      reset(initialFormValues as TemplateChannelsData);
    }
  }, [editTemplateData, reset]);

  useEffect(() => {
    if (channelId === "WHATSAPP" && whatsappTemplateId) {
      const templateDetails = getWhatsappTemplateDetails(whatsappTemplateId);
      setSelectedWhatsappTemplate(templateDetails);
    }
  }, [
    channelId,
    whatsappTemplateId,
    getWhatsappTemplateDetails,
    setSelectedWhatsappTemplate,
  ]);

  const onSubmit = (data: EditTemplatesFormValues) => {
    const formattedData = formateToEditTemplateData(data);
    setChannelsTableDataEditMode((prev) => {
      // Filter out duplicates based on channelId and languageCode
      const uniqueData = prev.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.channelId === item.channelId &&
              t.languageCode === item.languageCode,
          ),
      );

      // Find the index of the item to be updated
      const updateIndex = uniqueData.findIndex(
        (item) =>
          item.channelId === formattedData[0].channelId &&
          item.languageCode === formattedData[0].languageCode,
      );

      // If found, update the item, otherwise return the original array
      if (updateIndex !== -1) {
        return [
          ...uniqueData.slice(0, updateIndex),
          {
            ...uniqueData[updateIndex],
            ...formattedData[0],
            eventChannelId: uniqueData[updateIndex].eventChannelId, // Preserve the original eventChannelId
          },
          ...uniqueData.slice(updateIndex + 1),
        ];
      }
      // If no matching item found, return the original array
      return uniqueData;
    });

    closeDrawer();
  };
  useEffect(() => {}, [channelsTableDataEditMode]);

  useEffect(() => {
    refetchAllWhatsappTemplatesData?.();
  }, []);

  return {
    control,
    handleSubmit,
    formState,
    onSubmit,
    trigger,
    watch,
    getValues,
    eventParameterList,
  };
};
