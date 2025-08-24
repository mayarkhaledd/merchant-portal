import { QueryConstant } from "@ejada/common";
import { useCustomQuery } from "../useCustomQuery";
import { WhatsappService } from "@ejada/services/whatsapp.service";
import { useCustomMutation } from "../useCustomMutation";
import {
  CreateTemplatePayload,
  CreateTemplateResponse,
  DeleteWhatsappTemplatePayload,
  DeleteWhatsappTemplateResponse,
  GetSystemParamsInterface,
  GetSystemParamsPayload,
  GetSystemParamsResponse,
  GetWhatsappOnboardingInterface,
  GetWhatsappOnboardingPayload,
  GetWhatsappOnboardingResponse,
  GetWhatsappTemplateByIdPayload,
  GetWhatsappTemplateByIdResponse,
  GetWhatsappTemplatesInterface,
  GetWhatsappTemplatesPayload,
  GetWhatsappTemplatesResponse,
  UpdateTemplatePayload,
  UpdateTemplateResponse,
  WhatsappOnboardingPayload,
  WhatsappOnboardingResponse,
  WhatsappTemplate,
} from "@ejada/types/api/whatsappInterface";
import {
  adaptCreateUpdateWhatsappTemplate,
  adaptGetSystemParams,
  adaptGetWhatsappTemplateById,
  adaptGetWhatsappTemplates,
  adaptGetWhatsappOnboarding,
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
    QueryConstant.WHATSAPP_TEMPLATES,
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
    QueryConstant.WHATSAPP_TEMPLATE_ID,
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

export function useGetSystemParams(
  data: GetSystemParamsPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetSystemParamsPayload,
    GetSystemParamsResponse,
    GetSystemParamsInterface
  >(
    QueryConstant.SYSTEM_PARAMS,
    () => {
      return WhatsappService.getsystemParams(data);
    },
    (data: GetSystemParamsResponse) => adaptGetSystemParams(data),
    enabled,
  );
}

export function useWhatsappOnboarding() {
  const onSuccess = (res: WhatsappOnboardingResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<
    WhatsappOnboardingPayload,
    WhatsappOnboardingResponse
  >((data: WhatsappOnboardingPayload) => {
    return WhatsappService.whatsappOnboarding(data);
  }, onSuccess);
}
export function useGetWhatsappOnboarding(
  data: GetWhatsappOnboardingPayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetWhatsappOnboardingPayload,
    GetWhatsappOnboardingResponse,
    GetWhatsappOnboardingInterface
  >(
    QueryConstant.WHATSAPP_ONBOARDING,
    () => {
      return WhatsappService.getWhatsappOnboarding(data);
    },
    (data: GetWhatsappOnboardingResponse) => adaptGetWhatsappOnboarding(data),
    enabled,
  );
}
