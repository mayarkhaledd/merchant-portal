import React from "react";
import { ButtonType, Variable } from "@ejada/screens/Whatsapp";
import whatsappBG from "@ejada/common/assets/whatsappBG.png";
import { renderButton } from "@ejada/screens/Whatsapp/utils";

interface PreviewSectionProps {
  header: string;
  body: string;
  footer?: string;
  headerVariables: Variable[];
  bodyVariables: Variable[];
  buttons: ButtonType[];
  replaceVariables: (text: string, variables: Variable[]) => string;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  header,
  body,
  footer,
  headerVariables,
  bodyVariables,
  buttons,
  replaceVariables,
}) => {
  return (
    <div
      className="w-2/5 p-6 rounded-lg"
      style={{
        backgroundImage: `url(${whatsappBG})`,
      }}
    >
      <div className="bg-white rounded-lg shadow p-4 max-w-xs mx-auto">
        <div className="text-xs text-gray-500 mb-2">
          {new Date().toLocaleString()}
        </div>
        <div className="bg-green-100 p-3 rounded-lg mb-2 break-all">
          <strong className="block mb-1">
            {replaceVariables(header, headerVariables)}
          </strong>
          <div>{replaceVariables(body, bodyVariables)}</div>
        </div>
        {footer && <div className="text-base text-gray-600 mt-2">{footer}</div>}
        <div className="mt-2 space-y-2">
          {buttons.map((button, index) => (
            <div key={index}>{renderButton(button, index)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
