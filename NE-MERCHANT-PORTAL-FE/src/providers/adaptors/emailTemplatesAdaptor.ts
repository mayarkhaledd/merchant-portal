import {
  EmailTemplate,
  CreateEmailTemplateResponse,
  GetEmailTemplateInterface,
  GetEmailTemplatesResponse,
  UpdateEmailTemplateResponse,
  ToggleEmailTemplateStatusResponse,
} from "@ejada/types/api/emailInterface";

export function adaptGetEmailTemplates(
  res: GetEmailTemplatesResponse,
): GetEmailTemplateInterface {
  return {
    templates: res.data.templates.map((template) => ({
      id: template.id,
      templateCode: template.templateCode,
      templateName: template.templateName,
      description: template.description,
      subject: template.subject,
      htmlContent: template.htmlContent,
      textContent: template.textContent,
      documentData: template.documentData,
      thumbnail: template.thumbnail,
      enabledFlag: template.enabledFlag,
      language: template.language,
      tenantId: template.tenantId,
      appTypeId: template.appTypeId,
      systemFlag: template.systemFlag,
      version: template.version,
      createdDate: template.createdDate,
      updatedDate: template.updatedDate,
      parametersList: template.parametersList,
    })),
  };
}

export function adaptCreateEmailTemplate(
  data: CreateEmailTemplateResponse,
): EmailTemplate {
  return {
    id: data.data.id,
    templateCode: data.data.templateCode,
    templateName: data.data.templateName,
    description: data.data.description,
    subject: data.data.subject,
    htmlContent: data.data.htmlContent,
    textContent: data.data.textContent,
    documentData: data.data.documentData,
    thumbnail: data.data.thumbnail,
    enabledFlag: data.data.enabledFlag,
    language: data.data.language,
    tenantId: data.data.tenantId,
    appTypeId: data.data.appTypeId,
    systemFlag: data.data.systemFlag,
    version: data.data.version,
    createdDate: data.data.createdDate,
    updatedDate: data.data.updatedDate,
    parametersList: data.data.parametersList,
  };
}

export function adaptUpdateEmailTemplate(
  data: UpdateEmailTemplateResponse,
): EmailTemplate {
  return {
    id: data.data.id,
    templateCode: data.data.templateCode,
    templateName: data.data.templateName,
    description: data.data.description,
    subject: data.data.subject,
    htmlContent: data.data.htmlContent,
    textContent: data.data.textContent,
    documentData: data.data.documentData,
    thumbnail: data.data.thumbnail,
    enabledFlag: data.data.enabledFlag,
    language: data.data.language,
    tenantId: data.data.tenantId,
    appTypeId: data.data.appTypeId,
    systemFlag: data.data.systemFlag,
    version: data.data.version,
    createdDate: data.data.createdDate,
    updatedDate: data.data.updatedDate,
    parametersList: data.data.parametersList,
  };
}

export function adaptToggleEmailTemplateStatus(
  data: ToggleEmailTemplateStatusResponse,
): EmailTemplate {
  return {
    id: data.data.id,
    templateCode: data.data.templateCode,
    templateName: data.data.templateName,
    description: data.data.description,
    subject: data.data.subject,
    htmlContent: data.data.htmlContent,
    textContent: data.data.textContent,
    documentData: data.data.documentData,
    thumbnail: data.data.thumbnail,
    enabledFlag: data.data.enabledFlag,
    language: data.data.language,
    tenantId: data.data.tenantId,
    appTypeId: data.data.appTypeId,
    systemFlag: data.data.systemFlag,
    version: data.data.version,
    createdDate: data.data.createdDate,
    updatedDate: data.data.updatedDate,
    parametersList: data.data.parametersList,
  };
}
