import { useTranslation } from "react-i18next";
import {
  EventGroupFilterMenuValues,
  useEventGroupFilterMenuFormProps,
} from "./EventGroupFilter.types";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useEventGroupFilterValidation } from "./useEventGroupFilterValidation";

export const useEventGroupFilterForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useEventGroupFilterMenuFormProps) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<EventGroupFilterMenuValues>({
    mode: "onTouched",
    defaultValues: {
      eventGroupId: "",
      eventGroupDescriptionEn: "",
      eventGroupDescriptionAr: "",
      eventGroupType: undefined,
    },
  });
  const [isMarketing, setIsMarketing] = useState(false);
  const [isEshaar, setIsEshaar] = useState(false);
  const [isTouchId, setIsTouchId] = useState(false);
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const { t } = useTranslation();
  const formValues = watch();
  const isFormValid = formState?.isValid ?? false;
  const validationRules = useEventGroupFilterValidation();
  const hasValues = useMemo(() => {
    return Object.values(formValues).some((value) => value && value.length > 0);
  }, [formValues]);

  useEffect(() => {
    setIsApplyButtonDisabled(!hasValues || !isFormValid);
  }, [hasValues, isFormValid]);

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    closeDrawer();
  };
  const handleClear = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset({
      eventGroupId: "",
      eventGroupDescriptionEn: "",
      eventGroupDescriptionAr: "",
      eventGroupType: undefined,
      sourceSystem: "",
    });
    setSearchQuery({});
    setActiveSearchCriteria({});
  };

  useEffect(() => {
    if (activeSearchCriteria) {
      // Initialize mappedValues as an empty object with the right type
      const mappedValues: Partial<EventGroupFilterMenuValues> = {};

      Object.entries(activeSearchCriteria).forEach(([key, value]) => {
        switch (key) {
          case "eventGroupId":
            mappedValues.eventGroupId = value as string;
            break;
          case "eventGroupDescriptionEn":
            mappedValues.eventGroupDescriptionEn = value as string;
            break;
          case "eventGroupDescriptionAr":
            mappedValues.eventGroupDescriptionAr = value as string;
            break;
          case "appTypeId":
            mappedValues.sourceSystem = String(value);
            break;
          case "eventGroupPushFlag":
            mappedValues.eventGroupType = value as string as
              | "MARKETING"
              | "ESHAAR"
              | "TOUCHID";
            break;
        }
      });
      // Reset the form with the mapped values
      reset(mappedValues);
    }
  }, []);

  const onSubmit = (data: EventGroupFilterMenuValues) => {
    const updatedData = {
      ...(data.eventGroupId && { eventGroupId: data.eventGroupId }),
      ...(data.eventGroupDescriptionEn && {
        descriptionEn: data.eventGroupDescriptionEn,
      }),
      ...(data.eventGroupDescriptionAr && {
        descriptionAr: data.eventGroupDescriptionAr,
      }),
      ...(data.sourceSystem && {
        appTypeId: Number(data.sourceSystem),
      }),
      ...(data.eventGroupType && {
        eventGroupPushFlag:
          data.eventGroupType === "MARKETING"
            ? "MARKETING"
            : data.eventGroupType === "ESHAAR"
              ? "ESHAAR"
              : "TOUCHID",
      }),
    };
    setSearchQuery({ ...updatedData });
    setIsMarketing(false);
    setIsEshaar(false);
    setIsTouchId(false);
    reset();
    closeDrawer();
  };

  return {
    control,
    handleSubmit,
    formState,
    watch,
    setValue,
    trigger,
    getValues,
    t,
    handleCancel,
    handleClear,
    formValues,
    onSubmit,
    setIsApplyButtonDisabled,
    isApplyButtonDisabled,
    validationRules,
    isMarketing,
    setIsMarketing,
    isEshaar,
    setIsEshaar,
    isTouchId,
    setIsTouchId,
  };
};
