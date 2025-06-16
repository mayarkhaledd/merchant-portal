import { ButtonGetByID } from "@ejada/screens/Whatsapp";
import { ResponseInterface } from "./responseInterface";

export interface DeleteWhatsappTemplatePayload {
  templateId: string;
}
export interface DeleteWhatsappTemplateResponse
  extends ResponseInterface<void> {}

export interface TemplateParameterList {
  type: string;
  parameterId?: string;
  name?: string;
  example: string;
  position: number;
}

export interface TemplateButtonList {
  buttonType?: string;
  type?: string;
  text: string;
  name?: string;
  buttonId?: string;
  parameterPosition: number;
  exampleValue: string;
}
export interface TemplateExamples {
  additionalProp1: string[][];
  additionalProp2: string[][];
  additionalProp3: string[][];
}
export interface TemplateComponentListByID
  extends Omit<TemplateComponentsList, "buttons"> {
  componentType: string;
  buttons: Omit<ButtonGetByID, "buttons">[];
}
export interface TemplateComponentsList {
  type: string;
  text: string;
  format: string;
  mediaUrl: string;
  mediaCaption: string;
  addSecurityRecommendation?: boolean;
  codeExpirationMinutes?: string;
  parameters: {
    type: string;
    name: string;
    example: string;
    position: number;
  }[];
  buttons: {
    type: string;
    otpType: string;
    text: string;
    name: string;
    phoneNumber: string;
    url: string;
    supportedApp: {
      packageName: string;
      signatureHash: string;
    }[];
    parameterPosition: number;
    exampleValue: string;
  }[];
  example: {
    bodyText: string[][];
    headerText: string[];
    headerHandle: string[];
  };
}

//get by id interface
export interface WhatsappTemplate {
  templateId?: string;
  templateName: string;
  languageCode: string;
  category: string;
  status?: string;
  namespace: string;
  rejectionReason: string;
  tenantId: string;
  components: TemplateComponentListByID[];
}
export interface GetWhatsappTemplatesResponse
  extends ResponseInterface<GetWhatsappTemplatesInterface> {}

export interface GetWhatsappTemplatesPayload {
  templateId?: string;
  templateName?: string;
  languageCode?: string;
  category?: string;
  namespace?: string;
  //components?: TemplateComponentsList[];
  tenantId?: string;
}
export interface CreateTemplatePayload {
  templateId?: string;
  templateName: string;
  languageCode: string;
  category: string;
  namespace: string;
  components: TemplateComponentsList[];
  tenantId: string;
}
export interface UpdateTemplatePayload extends CreateTemplatePayload {
  templateId: string;
}
export interface CreateTemplateInterface {
  tenantId: string;
  rejectionReason: string;
  templateId?: string;
  templateName: string;
  languageCode: string;
  namespace: string;
  status: string;
  category: string;
  components: TemplateComponentsList[];
}
export interface CreateTemplateResponse
  extends ResponseInterface<CreateTemplateInterface> {}

export interface UpdateTemplateResponse
  extends ResponseInterface<CreateTemplateInterface> {}
export interface GetWhatsappTemplatesInterface {
  templates: WhatsappTemplate[];
}

export interface GetWhatsappTemplateByIdPayload {
  templateId: string;
}

export interface GetWhatsappTemplateByIdResponse
  extends ResponseInterface<WhatsappTemplate> {}
