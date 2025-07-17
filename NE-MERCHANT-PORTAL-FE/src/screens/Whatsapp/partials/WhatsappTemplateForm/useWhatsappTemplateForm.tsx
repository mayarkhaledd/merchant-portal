import { useForm } from "react-hook-form";
import {
  WhatsappFormValues,
  WhatsappInitialValues,
} from "@ejada/screens/Whatsapp/partials/WhatsappTemplateForm";
import { Context, useContext, useEffect } from "react";
import { WhatsappContext } from "@ejada/screens/Whatsapp";
import { TWhatsappState } from "@ejada/screens/Whatsapp";
import { colors } from "@ejada/common";
import {
  formatWhatsappTemplatePayload,
  mapWhatsappTemplateInterfaceToInitialValues,
} from "@ejada/screens/Whatsapp";
import {
  UpdateTemplatePayload,
  WhatsappTemplate,
} from "@ejada/types/api/whatsappInterface";
import { filterEmptyValues } from "@ejada/screens/shared";
import { AppRoutes } from "@ejada/navigation";
import { useNavigate } from "react-router-dom";

export const useWhatsappTemplateForm = (
  drawerMode?: "add" | "edit" | "view",
  initialValues?: WhatsappInitialValues,
) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    trigger,
    watch,
    setValue,
    unregister,
    register,
    getValues,
  } = useForm<WhatsappFormValues>({
    mode: "onChange",
    defaultValues: {
      ...initialValues,
      headerVariables: [],
      bodyVariables: [],
    },
  });
  const navigate = useNavigate();
  const {
    setWhatsappTemplateId,
    createWhatsappTemplate,
    updateWhatsappTemplate,
    whatsappTemplateByIdData,
    isUpdateWhatsappTemplateSuccess,
    isCreateWhatsappTemplateSuccess,
    isCreateWhatsappTemplateError,
    isUpdateWhatsappTemplateError,
    isCreateWhatsappTemplateAxiosError,
    isUpdateWhatsappTemplateAxiosError,
  } = useContext<TWhatsappState>(WhatsappContext as Context<TWhatsappState>);

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    setWhatsappTemplateId("");
  };

  const onSubmit = (data: WhatsappFormValues) => {
    const formattedDataPayload = formatWhatsappTemplatePayload(data);
    if (drawerMode === "add") {
      createWhatsappTemplate(formattedDataPayload);
    } else if (drawerMode === "edit") {
      const editPayload = {
        ...formattedDataPayload,
        languageCode: "",
      };
      updateWhatsappTemplate(
        filterEmptyValues(editPayload) as UpdateTemplatePayload,
      );
      setWhatsappTemplateId("");
    }
  };

  useEffect(() => {
    if (
      isUpdateWhatsappTemplateSuccess ||
      isUpdateWhatsappTemplateError ||
      isUpdateWhatsappTemplateAxiosError
    ) {
      navigate(`/${AppRoutes.templates}`, { replace: true });
    }
  }, [
    isUpdateWhatsappTemplateSuccess,
    isUpdateWhatsappTemplateError,
    isUpdateWhatsappTemplateAxiosError,
    navigate,
  ]);

  useEffect(() => {
    if (
      isCreateWhatsappTemplateSuccess ||
      isCreateWhatsappTemplateError ||
      isCreateWhatsappTemplateAxiosError
    ) {
      navigate(`/${AppRoutes.templates}`, { replace: true });
    }
  }, [
    isCreateWhatsappTemplateSuccess,
    isCreateWhatsappTemplateError,
    isCreateWhatsappTemplateAxiosError,
    navigate,
  ]);

  useEffect(() => {
    if (
      whatsappTemplateByIdData &&
      (drawerMode === "edit" || drawerMode === "view")
    ) {
      const initialFormValues = mapWhatsappTemplateInterfaceToInitialValues(
        whatsappTemplateByIdData as WhatsappTemplate,
      );
      reset(initialFormValues);
    }
  }, [whatsappTemplateByIdData, drawerMode, reset]);

  return {
    control,
    handleSubmit,
    formState,
    handleCancel,
    onSubmit,
    setValue,
    watch,
    trigger,
    unregister,
    register,
    getValues,
    drawerMode,
    colors: {
      errorDefault: colors.errorDefault,
    },
  };
};
