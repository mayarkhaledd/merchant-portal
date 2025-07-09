// utils/whatsappTemplateUtils.ts
import { WhatsappTemplate } from "@ejada/types/api/whatsappInterface";

/* ---------- params helpers ---------- */
export const extractParams = (text = ""): string[] => {
  const matches = text.match(/\{\{(\d+)\}\}/g);
  return matches
    ? Array.from(new Set(matches.map((m) => m.replace(/[^\d]/g, ""))))
    : [];
};

const replaceParams = (text: string, vars: string[]) => {
  let res = text;
  vars.forEach((v, i) => {
    const rex = new RegExp(`\\{\\{${i + 1}\\}\\}`, "g");
    res = res.replace(rex, v || `{{${i + 1}}}`);
  });
  return res;
};

export const replaceHeaderParams = replaceParams;
export const replaceBodyParams = replaceParams;

/* ---------- button helpers ---------- */
export interface WhatsappButton {
  buttonId: string;
  buttonType: string; // URL | PHONE_NUMBER | OTP | ..
  text: string;
  parameterPosition: number;
  exampleValue: string;
  url: string;
  phoneNumber: string;
}

export const getButtonStyles = (type: string) => {
  switch (type) {
    case "URL":
      return "border-blue-500 text-blue-500";
    case "PHONE_NUMBER":
      return "border-green-500 text-green-500";
    case "OTP":
      return "border-purple-500 text-purple-500";
    default:
      return "border-gray-500 text-gray-500";
  }
};

export const getButtonContent = (btn: WhatsappButton) => {
  switch (btn.buttonType) {
    case "URL":
      return { text: btn.text, subtitle: btn.url };
    case "PHONE_NUMBER":
      return { text: btn.text, subtitle: btn.phoneNumber };
    case "OTP":
      return { text: btn.text, subtitle: `Code: ${btn.text}` };
    default:
      return { text: btn.text };
  }
};

/* ---------- template slice helper ---------- */
export const sliceTemplateComponents = (tpl: WhatsappTemplate | null) => {
  const byType = (t: string) =>
    tpl?.components?.find((c) => c.componentType === t);
  return {
    header: byType("HEADER"),
    body: byType("BODY"),
    footer: byType("FOOTER"),
    buttons: byType("BUTTONS"),
  };
};
