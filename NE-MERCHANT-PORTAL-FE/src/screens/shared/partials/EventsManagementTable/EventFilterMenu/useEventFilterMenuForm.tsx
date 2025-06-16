import { useForm } from "react-hook-form";
import {
  EventFilterMenuValues,
  useEventFilterMenuFormProps,
} from "./EventFilterMenu.types";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { formatToSelectSearch, SelectSearchMenuList } from "@ejada/screens";
import { useGetSystems } from "@ejada/providers/systemProvider/systemProvider";
import Cookies from "js-cookie";
import { useGetEventGroups } from "@ejada/providers";

const useEventFilterMenuForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useEventFilterMenuFormProps) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<EventFilterMenuValues>({
    mode: "onTouched",
    defaultValues: {
      eventCode: "",
      eventGroup: "",
      sourceSystem: "",
      eventEnglishDescription: "",
      eventArabicDescription: "",
      status: undefined,
    },
  });
  const [eventGroupListData, setEventGroupListData] =
    useState<SelectSearchMenuList[]>();
  const [clearDynamicLabels, setClearDynamicLabels] = useState(false);

  const formValues = watch();
  const [sourceSystemsMenu, setSourceSystemsMenu] =
    useState<SelectSearchMenuList[]>();
  const [selectSearchKey, setSelectSearchKey] = useState(true);
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { updatedData: sourceSystemData } = useGetSystems(
    {
      tenantId: Cookies.get("tenantId")
        ? (Cookies.get("tenantId") as string)
        : " ",
    },
    true,
  );

  const { updatedData: eventGroupData, isSuccess: isEventGroupSuccess } =
    useGetEventGroups(
      {
        tenantId: Cookies.get("tenantId")
          ? (Cookies.get("tenantId") as string)
          : " ",
        appTypeId: Cookies.get("appTypeId")
          ? Number(Cookies.get("appTypeId"))
          : undefined,
      },
      false,
    );

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

  useEffect(() => {
    setIsApplyButtonDisabled(!hasValues || !isFormValid);
  }, [hasValues, isFormValid]);

  useEffect(() => {
    if (eventGroupData && eventGroupData.eventGroupList) {
      const eventGroupList = formatToSelectSearch(
        eventGroupData.eventGroupList,
        "eventGroupId",
        "eventGroupId",
      );
      setEventGroupListData(eventGroupList);
    }
  }, [eventGroupData]);

  const onSubmit = (data: EventFilterMenuValues) => {
    const updatedData = {
      ...(data.eventCode && { eventCode: data.eventCode }),
      ...(data.status && {
        enabledFlag: data.status === "enabled" ? true : false,
      }),
      ...(data.eventGroup && { eventGroupId: data.eventGroup }),
      ...(data.sourceSystem && { appTypeId: data.sourceSystem }),
      ...(data?.eventEnglishDescription && {
        descriptionEn: data?.eventEnglishDescription,
      }),
      ...(data?.eventArabicDescription && {
        descriptionAr: data?.eventArabicDescription,
      }),
    };
    setSearchQuery(updatedData);
    setIsDisabled(false);
    setIsEnabled(false);
    reset();
    closeDrawer();
  };
  useEffect(() => {
    if (activeSearchCriteria) {
      // Initialize mappedValues as an empty object with the right type
      const mappedValues: Partial<EventFilterMenuValues> = {};

      Object.entries(activeSearchCriteria).forEach(([key, value]) => {
        switch (key) {
          case "eventCode":
            mappedValues.eventCode = value as string;
            break;
          case "eventGroupId":
            mappedValues.eventGroup = value as string;
            break;
          case "appTypeId":
            mappedValues.sourceSystem = value as string;
            break;
          case "descriptionEn":
            mappedValues.eventEnglishDescription = value as string;
            break;
          case "descriptionAr":
            mappedValues.eventArabicDescription = value as string;
            break;
          case "enabledFlag":
            mappedValues.status = value === true ? "enabled" : "disabled";
            break;
        }
      });
      // Reset the form with the mapped values
      reset(mappedValues);
    }
  }, []);

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    closeDrawer();
  };
  const handleClear = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset({
      eventCode: "",
      eventGroup: "",
      sourceSystem: "",
      eventEnglishDescription: "",
      eventArabicDescription: "",
      status: undefined,
    });
    setClearDynamicLabels(true);
    setSelectSearchKey((prevKey) => !prevKey);
    setSearchQuery({});
    setActiveSearchCriteria({});
  };

  const { t } = useTranslation();

  return {
    control,
    handleSubmit,
    formState,
    handleCancel,
    handleClear,
    onSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    t,
    clearDynamicLabels,
    setClearDynamicLabels,
    formValues,
    setIsApplyButtonDisabled,
    isApplyButtonDisabled,
    selectSearchKey,
    sourceSystemsMenu,
    eventGroupListData,
    isEventGroupSuccess,
    isEnabled,
    setIsEnabled,
    isDisabled,
    setIsDisabled,
  };
};

export default useEventFilterMenuForm;
