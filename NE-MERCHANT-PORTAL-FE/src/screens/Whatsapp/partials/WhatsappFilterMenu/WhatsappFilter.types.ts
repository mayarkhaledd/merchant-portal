import { GetWhatsappTemplatesPayload } from "@ejada/types/api/whatsappInterface";
import { Dispatch, SetStateAction } from "react";

export interface WhatsappFilterMenuValues {
  templateName: string;
  languageCode: string;
  category: "Marketing" | "Utility" | "Authentication" | undefined;
  status: string;
}

export interface useWhatsappFilterMenuFormProps {
  setSearchQuery: (
    value: boolean | Partial<GetWhatsappTemplatesPayload>,
  ) => void;
  closeDrawer: () => void;
  activeSearchCriteria: Partial<GetWhatsappTemplatesPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetWhatsappTemplatesPayload>>
  >;
}
