import { useTranslation } from "react-i18next";
import {
  WhatsappFilterMenuValues,
  useWhatsappFilterMenuFormProps,
} from "./WhatsappFilter.types";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useWhatsappFilterValidation } from "./useWhatsappFilterValidation";

export const useWhatsappFilterForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useWhatsappFilterMenuFormProps) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<WhatsappFilterMenuValues>({
    mode: "onTouched",
    defaultValues: {
      templateName: "",
      languageCode: "",
      category: undefined,
      templateStatus: undefined,
    },
  });
  const [isMarketing, setIsMarketing] = useState(false);
  const [isUtility, setIsUtility] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const { t } = useTranslation();
  const formValues = watch();
  const isFormValid = formState?.isValid ?? false;
  const validationRules = useWhatsappFilterValidation();
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
      templateName: "",
      languageCode: "",
      category: undefined,
      templateStatus: undefined,
    });
    setSearchQuery({});
    setActiveSearchCriteria({});
  };

  useEffect(() => {
    if (activeSearchCriteria) {
      // Initialize mappedValues as an empty object with the right type
      const mappedValues: Partial<WhatsappFilterMenuValues> = {};

      Object.entries(activeSearchCriteria).forEach(([key, value]) => {
        switch (key) {
          case "templateName":
            mappedValues.templateName = value as string;
            break;
          case "languageCode":
            mappedValues.languageCode = value as string;
            break;
          case "templateStatus":
            mappedValues.templateStatus = value as string as
              | "Approved"
              | "Pending"
              | "Rejected";
            break;
          case "category":
            mappedValues.category = value as string as
              | "Marketing"
              | "Utility"
              | "Authentication";
            break;
        }
      });
      // Reset the form with the mapped values
      reset(mappedValues);
    }
  }, []);

  const onSubmit = (data: WhatsappFilterMenuValues) => {
    const updatedData = {
      ...(data.templateName && { templateName: data.templateName }),
      ...(data.languageCode && { languageCode: data.languageCode }),
      ...(data.templateStatus && {
        templateStatus:
          data.templateStatus === "Pending"
            ? "Pending"
            : data.templateStatus === "Approved"
              ? "Approved"
              : "Rejected",
      }),
      ...(data.category && {
        category:
          data.category === "Marketing"
            ? "Marketing"
            : data.category === "Utility"
              ? "Utility"
              : "Authentication",
      }),
    };
    setSearchQuery({ ...updatedData });
    setIsMarketing(false);
    setIsUtility(false);
    setIsAuthentication(false);
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
    isUtility,
    setIsUtility,
    isAuthentication,
    setIsAuthentication,
    isArabic,
    setIsArabic,
    isEnglish,
    setIsEnglish,
    isPending,
    setIsPending,
    isApproved,
    setIsApproved,
    isRejected,
    setIsRejected,
  };
};
