import React from "react";
import { WhatsappButton as Btn } from "./whatsappTemplateUtils";
import {
  replaceHeaderParams,
  replaceBodyParams,
} from "./whatsappTemplateUtils";
import { WhatsappButton } from "./WhatsappButton";
import { t } from "i18next";

interface Props {
  headerText?: string;
  bodyText?: string;
  footerText?: string;
  buttons?: Btn[];
  headerVarArray: string[];
  bodyVarArray: string[];
  expiryMinutes?: number;
  securityEnabled?: boolean;
  category?: string;
}

export const WhatsappMessagePreview: React.FC<Props> = ({
  headerText,
  bodyText,
  footerText,
  buttons,
  headerVarArray,
  bodyVarArray,
  securityEnabled,
  expiryMinutes,
  category,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-3 max-w-[220px] mx-auto mt-3">
    <div className="text-xs text-gray-500 mb-2">
      {new Date().toLocaleString()}
    </div>

    {headerText && (
      <div className="bg-green-100 p-2 rounded-lg mb-2 break-all">
        <strong className="block mb-1 text-sm">
          {replaceHeaderParams(headerText, headerVarArray)}
        </strong>
      </div>
    )}

    {bodyText && (
      <div className="bg-green-100 p-2 rounded-lg mb-2 break-all text-sm">
        {replaceBodyParams(bodyText, bodyVarArray)}
      </div>
    )}

    {category === "AUTHENTICATION" && (
      <strong className="block mb-4 text-m">{t("whatsapp.code_header")}</strong>
    )}
    {securityEnabled && (
      <div className="bg-green-100 p-2 rounded-lg mb-2 break-all text-sm">
        {t("whatsapp.security_section_text")}
      </div>
    )}
    {footerText && (
      <div className="text-xs text-gray-600 mt-2 break-all">{footerText}</div>
    )}
    {expiryMinutes !== undefined && category === "AUTHENTICATION" && (
      <div className="bg-green-100 p-2 rounded-lg mb-2 break-all text-sm">
        {t("whatsapp.expiry_section_text").replace(
          "{{0}}",
          expiryMinutes.toString(),
        )}
      </div>
    )}
    {buttons?.length ? (
      <div className="mt-2 space-y-1">
        {buttons.map((b) => (
          <WhatsappButton key={b.buttonId} button={b} />
        ))}
      </div>
    ) : null}
  </div>
);
