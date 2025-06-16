import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Context, useContext, useEffect, useState } from "react";
import {
  EventGroupManagementContext,
  TEventGroupManagementState,
} from "@ejada/screens/EventGroupManagement";
import { mapEventGroupInterfaceToInitialValues, mapToPayload } from "./utils";
import {
  EventGroupFormValues,
  EventGroupInitialValues,
} from "./eventGroupManagementForm.type";
import { EventGroup } from "@ejada/types/api/eventGroupsInterface";

export const useEventGroupManagementForm = (
  closeDrawer: () => void,
  mode: "add" | "edit" | "view",
  initialValues?: EventGroupInitialValues,
) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<EventGroupFormValues>({
    mode: "onTouched",
    defaultValues: {
      ...initialValues,
    },
  });

  const [clearDynamicLabels, setClearDynamicLabels] = useState(false);
  const {
    eventGroupId,
    addEventGroup,
    editEventGroup,
    sourceSystemsMenu,
    eventGroupByIdData,
    setEventGroupId,
  } = useContext<TEventGroupManagementState>(
    EventGroupManagementContext as Context<TEventGroupManagementState>,
  );
  const formValues = watch();

  const onSubmit = async (data: EventGroupFormValues) => {
    //const cleanedData = cleanData(data);
    const mappedData = mapToPayload(data, mode);

    if (mode === "add") {
      const addpayload = {
        ...mappedData,
        appTypeId: data.sourceSystem ? data.sourceSystem : "",
      };
      addEventGroup(addpayload);
    } else if (mode === "edit") {
      const editpayload = {
        ...mappedData,
        appTypeId: data.sourceSystem ? data.sourceSystem : "",
        id: eventGroupId,
      };
      editEventGroup(editpayload);
    }
    closeDrawer();
    setEventGroupId("");
  };

  useEffect(() => {
    if (eventGroupByIdData && (mode === "edit" || mode === "view")) {
      const initialFormValues = mapEventGroupInterfaceToInitialValues(
        eventGroupByIdData as EventGroup,
      );
      //setting the initial values got from API to form values
      reset(initialFormValues as unknown as EventGroupInitialValues);
    }
  }, [eventGroupByIdData]);

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    setEventGroupId("");
    closeDrawer();
  };

  const { t } = useTranslation();

  return {
    control,
    handleSubmit,
    formState,
    handleCancel,
    onSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    t,
    clearDynamicLabels,
    setClearDynamicLabels,
    formValues,
    sourceSystemsMenu,
    eventGroupByIdData,
  };
};
