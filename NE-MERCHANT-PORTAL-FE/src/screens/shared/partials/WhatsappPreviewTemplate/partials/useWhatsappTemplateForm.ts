import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { WhatsappTemplate } from "@ejada/types/api/whatsappInterface";
import { CreateEventMessageValues } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage/CreateEventMessage.types";

export const useWhatsappTemplateForm = (
  template: WhatsappTemplate,
  control: Control<CreateEventMessageValues, any>,
  setValue: UseFormSetValue<CreateEventMessageValues>,
  headerParams: string[],
  bodyParams: string[],
) => {
  useEffect(() => {
    headerParams.forEach((_, i) => setValue(`headerVariable.${i}`, ""));
    bodyParams.forEach((_, i) => setValue(`bodyVariable.${i}`, ""));
  }, [template]);

  const headerVarArray =
    (useWatch({ control, name: "headerVariable" }) as string[]) || [];
  const bodyVarArray =
    (useWatch({ control, name: "bodyVariable" }) as string[]) || [];

  return { headerVarArray, bodyVarArray };
};
