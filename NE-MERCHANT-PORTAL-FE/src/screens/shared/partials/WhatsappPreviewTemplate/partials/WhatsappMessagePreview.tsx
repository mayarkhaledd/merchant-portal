import React from "react";
import { WhatsappButton as Btn } from "./whatsappTemplateUtils";
import {
  replaceHeaderParams,
  replaceBodyParams,
} from "./whatsappTemplateUtils";
import { WhatsappButton } from "./WhatsappButton";

interface Props {
  headerText?: string;
  bodyText?: string;
  footerText?: string;
  buttons?: Btn[];
  headerVarArray: string[];
  bodyVarArray: string[];
}

export const WhatsappMessagePreview: React.FC<Props> = ({
  headerText,
  bodyText,
  footerText,
  buttons,
  headerVarArray,
  bodyVarArray,
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

    {footerText && (
      <div className="text-xs text-gray-600 mt-2 break-all">{footerText}</div>
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
