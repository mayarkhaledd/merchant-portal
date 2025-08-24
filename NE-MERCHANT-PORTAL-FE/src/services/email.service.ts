import {
  CreateEmailTemplatePayload,
  CreateEmailTemplateResponse,
  DeleteEmailTemplatePayload,
  DeleteEmailTemplateResponse,
  GetEmailTemplatePayload,
  GetEmailTemplatesResponse,
  UpdateEmailTemplatePayload,
  UpdateEmailTemplateResponse,
  ToggleEmailTemplateStatusPayload,
  ToggleEmailTemplateStatusResponse,
} from "@ejada/types/api/emailInterface";
import httpClient from "./httpClient";
import { API } from "@ejada/common";

export const EmailTemplatesService = {
  getEmailTemplates: async (
    data: GetEmailTemplatePayload,
  ): Promise<GetEmailTemplatesResponse> => {
    const response = await httpClient.get(API.emailTemplate, {
      params: {
        ...data,
      },
    });
    return {
      ...response.data,
    };
  },

  createEmailTemplate: async (
    data: CreateEmailTemplatePayload,
  ): Promise<CreateEmailTemplateResponse> => {
    const response = await httpClient.post(API.emailTemplate, data);
    return {
      status: response.status,
      ...response.data,
    };
  },

  updateEmailTemplate: async (
    data: UpdateEmailTemplatePayload,
  ): Promise<UpdateEmailTemplateResponse> => {
    const { emailTemplateId, ...updateData } = data;
    const response = await httpClient.put(
      `${API.emailTemplate}/${emailTemplateId}`,
      updateData,
    );
    return {
      status: response.status,
      ...response.data,
    };
  },

  toggleEmailTemplateStatus: async (
    data: ToggleEmailTemplateStatusPayload,
  ): Promise<ToggleEmailTemplateStatusResponse> => {
    const { emailTemplateId, ...toggleData } = data;
    const response = await httpClient.put(
      `${API.emailTemplate}/toggleFlag/${emailTemplateId}`,
      toggleData,
    );
    return {
      status: response.status,
      ...response.data,
    };
  },

  deleteEmailTemplateById: async (
    data: DeleteEmailTemplatePayload,
  ): Promise<DeleteEmailTemplateResponse> => {
    const response = await httpClient.delete(
      `${API.emailTemplate}/${data.emailTemplateId}`,
    );
    return {
      status: response.status,
      ...response.data,
    };
  },
};
