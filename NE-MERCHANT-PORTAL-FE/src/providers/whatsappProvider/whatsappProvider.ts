import { QueryCosntant } from "@ejada/common";
import { useCustomQuery } from "../useCustomQuery";
import { WhatsappService } from "@ejada/services/whatsapp.service";
import { useCustomMutation } from "../useCustomMutation";
import {
  CreateTemplatePayload,
  CreateTemplateResponse,
  DeleteWhatsappTemplatePayload,
  DeleteWhatsappTemplateResponse,
  GetWhatsappTemplateByIdPayload,
  GetWhatsappTemplateByIdResponse,
  GetWhatsappTemplatesInterface,
  GetWhatsappTemplatesPayload,
  GetWhatsappTemplatesResponse,
  UpdateTemplatePayload,
  UpdateTemplateResponse,
  WhatsappTemplate,
} from "@ejada/types/api/whatsappInterface";
import {
  adaptCreateUpdateWhatsappTemplate,
  adaptGetWhatsappTemplateById,
  adaptGetWhatsappTemplates,
} from "../adaptors/whatsappAdaptor";

export function useGetWhatsappTemplates(
  data: GetWhatsappTemplatesPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetWhatsappTemplatesPayload,
    GetWhatsappTemplatesResponse,
    GetWhatsappTemplatesInterface
  >(
    QueryCosntant.WHATSAPP_TEMPLATES,
    () => {
      return WhatsappService.getWhatsappTemplates(data);
    },
    (data: GetWhatsappTemplatesResponse) => adaptGetWhatsappTemplates(data),
    enabled,
  );
}

export function useGetWhatsappTemplateById(
  data: GetWhatsappTemplateByIdPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetWhatsappTemplateByIdPayload,
    GetWhatsappTemplateByIdResponse,
    WhatsappTemplate
  >(
    QueryCosntant.WHATSAPP_TEMPLATE_ID,
    () => {
      return WhatsappService.getWhatsappTemplateById(data);
    },
    (data: GetWhatsappTemplateByIdResponse) =>
      adaptGetWhatsappTemplateById(data),
    enabled,
  );
}

export function useCreateWhatsappTemplate() {
  const onSuccess = (res: CreateTemplateResponse) => {
    const updatedData = adaptCreateUpdateWhatsappTemplate(res);
    return updatedData;
  };

  return useCustomMutation<CreateTemplatePayload, CreateTemplateResponse>(
    (data: CreateTemplatePayload) => {
      return WhatsappService.createWhatsappTemplate(data);
    },
    onSuccess,
  );
}

export function useUpdateWhatsappTemplate() {
  const onSuccess = (res: UpdateTemplateResponse) => {
    const updatedData = adaptCreateUpdateWhatsappTemplate(res);
    return updatedData;
  };

  return useCustomMutation<UpdateTemplatePayload, UpdateTemplateResponse>(
    (data: UpdateTemplatePayload) => {
      return WhatsappService.updateWhatsappTemplate(data);
    },
    onSuccess,
  );
}

export function useDeleteWhatsappTemplateById() {
  const onSuccess = (res: DeleteWhatsappTemplateResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<
    DeleteWhatsappTemplatePayload,
    DeleteWhatsappTemplateResponse
  >((data: DeleteWhatsappTemplatePayload) => {
    return WhatsappService.deleteWhatsappTemplateById(data);
  }, onSuccess);
}
