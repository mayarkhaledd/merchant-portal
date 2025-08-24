import { ResponseInterface } from "./responseInterface";

export interface GetEmailTemplatePayload {
  templateId?: number;
  templateName?: string;
  enabledFlag?: string;
  language?: string;
  tenantId?: string;
}

export interface CreateEmailTemplatePayload {
  tenantId: string;
  templateName?: string;
  templateCode?: string;
  description?: string;
  subject?: string;
  enabledFlag?: string;
  htmlContent?: string;
  textContent?: string;
  documentData?: string;
  thumbnail?: string;
  appTypeId?: number;
  language?: string;
  parameters?: EmailTemplateParameterResource[];
}

export interface UpdateEmailTemplatePayload extends CreateEmailTemplatePayload {
  emailTemplateId: number;
}

export interface DeleteEmailTemplatePayload {
  emailTemplateId: number;
}

export interface ToggleEmailTemplateStatusPayload {
  emailTemplateId: number;
  enabledFlag?: string;
}

export interface EmailTemplateParameterResource {
  parameterName?: string;
  parameterType?: string;
  requiredFlag?: string;
  defaultValue?: string;
  description?: string;
  displayOrder?: number;
}

export interface EmailTemplateParameterAPIResponse {
  parameterName?: string;
  parameterType?: string;
  requiredFlag?: string;
  defaultValue?: string;
  description?: string;
  displayOrder?: number;
}

export interface EmailTemplate {
  id?: number;
  templateCode?: string;
  templateName?: string;
  description?: string;
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  documentData?: string;
  thumbnail?: string;
  enabledFlag?: string;
  language?: string;
  tenantId?: string;
  appTypeId?: number;
  systemFlag?: string;
  version?: number;
  createdDate?: string;
  updatedDate?: string;
  parametersList?: EmailTemplateParameterAPIResponse[];
}

export interface GetEmailTemplateInterface {
  templates: EmailTemplate[];
}

export interface GetEmailTemplatesResponse
  extends ResponseInterface<GetEmailTemplateInterface> {}

export interface CreateEmailTemplateResponse
  extends ResponseInterface<EmailTemplate> {}

export interface UpdateEmailTemplateResponse
  extends ResponseInterface<EmailTemplate> {}

export interface ToggleEmailTemplateStatusResponse
  extends ResponseInterface<EmailTemplate> {}

export interface DeleteEmailTemplateResponse extends ResponseInterface<void> {}
