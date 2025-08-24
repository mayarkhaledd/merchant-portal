import { useState, useMemo, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

import { DashboardFilterValues } from "./DashboardFilter.types";
import { useTranslation } from "react-i18next";
import { DashboardContext } from "../../DashboardProvider";

export const useDashboardFilterForm = () => {
  const {
    control,
    handleSubmit,
    formState,
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<DashboardFilterValues>({
    mode: "onTouched",
    defaultValues: {
      fromDate: "",
      toDate: "",
    },
  });
  const { t } = useTranslation();
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const formValues = watch();
  const isFormValid = formState?.isValid ?? false;
  const hasValues = useMemo(() => {
    return Object.values(formValues).some((value) => value && value.length > 0);
  }, [formValues]);

  const { fromDate, toDate, setFromDate, setToDate } =
    useContext(DashboardContext);

  useEffect(() => {
    setValue("fromDate", fromDate);
    setValue("toDate", toDate);
  }, [fromDate, toDate, setValue]);

  useEffect(() => {
    setIsApplyButtonDisabled(!hasValues || !isFormValid);
  }, [hasValues, isFormValid]);

  const onSubmit = (data: DashboardFilterValues) => {
    console.log("Submitted data:", data);
    setFromDate(data.fromDate);
    setToDate(data.toDate);
  };

  return {
    control,
    formState,
    formValues,
    isApplyButtonDisabled,
    t,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    trigger,
  };
};
