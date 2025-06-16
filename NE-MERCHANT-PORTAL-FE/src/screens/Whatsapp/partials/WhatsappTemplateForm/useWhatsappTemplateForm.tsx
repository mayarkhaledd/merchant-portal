import { useForm } from "react-hook-form";
import {
  WhatsappFormValues,
  WhatsappInitialValues,
} from "@ejada/screens/Whatsapp/partials/WhatsappTemplateForm";
import { useContext, useEffect } from "react";
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

  const {
    setWhatsappTemplateId,
    createWhatsappTemplate,
    updateWhatsappTemplate,
    whatsappTemplateId,
    whatsappTemplateByIdData,
  } = useContext<TWhatsappState>(WhatsappContext);

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
      updateWhatsappTemplate({
        ...formattedDataPayload,
        templateId: whatsappTemplateId,
      } as UpdateTemplatePayload);
    }
    setWhatsappTemplateId("");
  };
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
