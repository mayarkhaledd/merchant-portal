import { WhatsappTemplate } from "@ejada/types/api/whatsappInterface";
import {
  sliceTemplateComponents,
  extractParams,
} from "./whatsappTemplateUtils";

export const useWhatsappTemplatePreview = (template: WhatsappTemplate) => {
  const components = sliceTemplateComponents(template);
  const headerParams = extractParams(components.header?.text || "");
  const bodyParams = extractParams(components.body?.text || "");
  const category = template.category || "";

  return { components, headerParams, bodyParams, category };
};
