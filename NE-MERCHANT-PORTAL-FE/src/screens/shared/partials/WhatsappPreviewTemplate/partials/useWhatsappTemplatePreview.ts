/**
 * Pure logic – NO React-Hook-Form here.
 * Extracts template slices + {{n}} param arrays.
 */
import { WhatsappTemplate } from "@ejada/types/api/whatsappInterface";
import {
  sliceTemplateComponents,
  extractParams,
} from "./whatsappTemplateUtils";

export const useWhatsappTemplatePreview = (template: WhatsappTemplate) => {
  const components = sliceTemplateComponents(template);
  const headerParams = extractParams(components.header?.text || "");
  const bodyParams = extractParams(components.body?.text || "");

  return { components, headerParams, bodyParams };
};
