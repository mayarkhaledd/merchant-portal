import {
  CreateTemplatePayload,
  CreateTemplateResponse,
  DeleteWhatsappTemplatePayload,
  DeleteWhatsappTemplateResponse,
  GetWhatsappTemplateByIdPayload,
  GetWhatsappTemplateByIdResponse,
  GetWhatsappTemplatesPayload,
  GetWhatsappTemplatesResponse,
  UpdateTemplatePayload,
  UpdateTemplateResponse,
} from "@ejada/types/api/whatsappInterface";
import httpClient from "./httpClient";
import { API } from "@ejada/common";
export const WhatsappService = {
  getWhatsappTemplates: async (
    data: GetWhatsappTemplatesPayload,
  ): Promise<GetWhatsappTemplatesResponse> => {
    const response = await httpClient.get(API.whatsapp, {
      params: {
        ...data,
      },
    });
    return {
      ...response.data,
    };
  },

  getWhatsappTemplateById: async (
    data: GetWhatsappTemplateByIdPayload,
  ): Promise<GetWhatsappTemplateByIdResponse> => {
    const response = await httpClient.get(`${API.whatsapp}/templateId`, {
      params: { ...data },
    });
    return {
      ...response.data,
    };
  },

  createWhatsappTemplate: async (
    data: CreateTemplatePayload,
  ): Promise<CreateTemplateResponse> => {
    const response = await httpClient.post(API.whatsapp, data);
    return {
      status: response.status,
      ...response.data,
    };
  },

  updateWhatsappTemplate: async (
    data: UpdateTemplatePayload,
  ): Promise<UpdateTemplateResponse> => {
    const response = await httpClient.put(
      `${API.whatsapp}/${data.templateId}`,
      data,
    );
    return {
      status: response.status,
      ...response.data,
    };
  },

  deleteWhatsappTemplateById: async (
    data: DeleteWhatsappTemplatePayload,
  ): Promise<DeleteWhatsappTemplateResponse> => {
    const response = await httpClient.delete(
      `${API.whatsapp}/${data.templateId}`,
    );
    return {
      status: response.status,
      ...response.data,
    };
  },
};
