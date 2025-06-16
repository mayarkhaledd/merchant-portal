import {
  CreateTemplateInterface,
  CreateTemplateResponse,
  GetWhatsappTemplateByIdResponse,
  GetWhatsappTemplatesInterface,
  GetWhatsappTemplatesResponse,
  WhatsappTemplate,
  //WhatsappTemplate,
} from "@ejada/types/api/whatsappInterface";

export function adaptGetWhatsappTemplates(
  res: GetWhatsappTemplatesResponse,
): GetWhatsappTemplatesInterface {
  return {
    templates: res.data.templates.map((template) => ({
      templateId: template.templateId,
      templateName: template.templateName,
      status: template.status,
      tenantId: template.tenantId,
      category: template.category,
      languageCode: template.languageCode,
      namespace: template.namespace,
      rejectionReason: template.rejectionReason,
      components: template.components.map((component) => ({
        type: component.type,
        componentType: component.componentType,
        text: component.text,
        format: component.format,
        example: component.example,
        mediaUrl: component.mediaUrl,
        mediaCaption: component.mediaCaption,
        addSecurityRecommendation: component.addSecurityRecommendation,
        parameters: component.parameters.map((parameter) => ({
          type: parameter.type,
          name: parameter.name,
          example: parameter.example,
          position: parameter.position,
        })),
        buttons: component.buttons.map((button) => ({
          buttonId: button.buttonId,
          buttonType: button.buttonType,
          text: button.text,
          parameterPosition: button.parameterPosition,
          exampleValue: button.exampleValue,
          url: button.url,
          phoneNumber: button.phoneNumber,
        })),
      })),
    })),
  };
}

export function adaptGetWhatsappTemplateById(
  res: GetWhatsappTemplateByIdResponse,
): WhatsappTemplate {
  return {
    templateId: res.data.templateId,
    templateName: res.data.templateName,
    languageCode: res.data.languageCode,
    category: res.data.category,
    status: res.data.status,
    namespace: res.data.namespace,
    rejectionReason: res.data.rejectionReason,
    tenantId: res.data.tenantId,
    components: res.data.components.map((component) => ({
      type: component.type,
      componentType: component.componentType,
      text: component.text,
      format: component.format,
      example: component.example,
      mediaUrl: component.mediaUrl,
      mediaCaption: component.mediaCaption,
      addSecurityRecommendation: component.addSecurityRecommendation,
      codeExpirationMinutes: component.codeExpirationMinutes,
      parameters: component.parameters.map((parameter) => ({
        type: parameter.type,
        name: parameter.name,
        example: parameter.example,
        position: parameter.position,
      })),
      buttons: component.buttons.map((button) => ({
        buttonId: button.buttonId,
        buttonType: button.buttonType,
        text: button.text,
        parameterPosition: button.parameterPosition,
        exampleValue: button.exampleValue,
        url: button.url,
        phoneNumber: button.phoneNumber,
      })),
    })),
  };
}

export function adaptCreateUpdateWhatsappTemplate(
  data: CreateTemplateResponse,
): CreateTemplateInterface {
  return {
    tenantId: data.data.tenantId,
    rejectionReason: data.data.rejectionReason,
    templateId: data.data.templateId,
    templateName: data.data.templateName,
    languageCode: data.data.languageCode,
    namespace: data.data.namespace,
    status: data.data.status,
    category: data.data.category,
    components: data.data.components,
  };
}
