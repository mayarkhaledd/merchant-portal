import { useTranslation } from "react-i18next";
import {
  CustomerFilterMenuValues,
  useCustomerFilterMenuFormProps,
} from "./CustomerFilter.types";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
//import { CustomerFilterValidationRules } from "./CustomerFilterValidationRules";

export const useCustomerFilterForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useCustomerFilterMenuFormProps) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<CustomerFilterMenuValues>({
    mode: "onTouched",
    defaultValues: {
      title: "",
      email: "",
      mobile: "",
      relationValue: "",
      customerNameEnglish: "",
      customerNameArabic: "",
      status: undefined,
      relationType: undefined,
      preferredLanguage: undefined,
    },
  });
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const [isIqama, setIsIqama] = useState(false);
  const [isIdentifier, setIsIdentifier] = useState(false);
  const [isNin, setIsNin] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isInActive, setIsInActive] = useState(false);
  const { t } = useTranslation();
  const formValues = watch();
  const isFormValid = formState?.isValid ?? false;
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
      title: "",
      email: "",
      mobile: "",
      preferredLanguage: undefined,
      relationValue: "",
      relationType: undefined,
      customerNameEnglish: "",
      customerNameArabic: "",
      status: undefined,
    });
    setSearchQuery({});
    setActiveSearchCriteria({});
  };

  useEffect(() => {
    if (activeSearchCriteria) {
      // Initialize mappedValues as an empty object with the right type
      const mappedValues: Partial<CustomerFilterMenuValues> = {};

      Object.entries(activeSearchCriteria).forEach(([key, value]) => {
        switch (key) {
          case "relationTypeCode":
            mappedValues.relationType = value as string as
              | "IDENTIFIER"
              | "IQAMA"
              | "NIN";
            break;
          case "relationValue":
            mappedValues.relationValue = value as string;
            break;
          case "firstNameEnglish":
            mappedValues.customerNameEnglish = value as string;
            break;
          case "firstNameArabic":
            mappedValues.customerNameArabic = value as string;
            break;
          case "primaryEmail":
            mappedValues.email = value as string;
            break;
          case "primaryMobile":
            mappedValues.mobile = value as string;
            break;
          case "preferredLanguage":
            mappedValues.preferredLanguage =
              value === "EN" ? "English" : "Arabic";
            break;
          case "activeFlag":
            mappedValues.status = value ? "Active" : "InActive";
            break;
          default:
            break;
        }
      });
      // Reset the form with the mapped values
      reset(mappedValues);
    }
  }, []);

  const onSubmit = (data: CustomerFilterMenuValues) => {
    const updatedData = {
      ...(data.relationValue && { relationValue: data.relationValue }),
      ...(data.customerNameEnglish && {
        firstNameEnglish: data.customerNameEnglish,
      }),
      ...(data.customerNameEnglish && {
        secondNameEnglish: data.customerNameEnglish,
      }),
      ...(data.customerNameArabic && {
        firstNameArabic: data.customerNameArabic,
      }),
      ...(data.customerNameArabic && {
        secondNameArabic: data.customerNameArabic,
      }),
      ...(data.email && { primaryEmail: data.email }),
      ...(data.email && { secondaryEmail: data.email }),
      ...(data.mobile && { primaryMobile: data.mobile }),
      ...(data.mobile && { secondaryMobile: data.mobile }),
      ...(data.status && {
        activeFlag: data.status === "Active" ? true : false,
      }),
      ...(data.preferredLanguage && {
        preferredLanguage: data.preferredLanguage === "Arabic" ? "AR" : "EN",
      }),
      ...(data.relationType && {
        relationTypeCode:
          data.relationType === "IQAMA"
            ? "IQAMA"
            : data.relationType === "IDENTIFIER"
              ? "IDENTIFIER"
              : "NIN",
      }),
    };
    setSearchQuery(updatedData);
    reset();
    setIsActive(false);
    setIsInActive(false);
    setIsArabic(false);
    setIsEnglish(false);
    setIsIqama(false);
    setIsIdentifier(false);
    setIsNin(false);
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
    isIqama,
    setIsIqama,
    isIdentifier,
    setIsIdentifier,
    isNin,
    setIsNin,
    isEnglish,
    setIsEnglish,
    isArabic,
    setIsArabic,
    isActive,
    setIsActive,
    isInActive,
    setIsInActive,
  };
};
