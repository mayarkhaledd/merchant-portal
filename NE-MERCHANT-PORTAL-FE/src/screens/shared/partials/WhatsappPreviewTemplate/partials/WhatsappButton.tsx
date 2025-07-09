// components/WhatsappButton.tsx
import React from "react";
import {
  WhatsappButton as Btn,
  getButtonStyles,
  getButtonContent,
} from "./whatsappTemplateUtils";

export const WhatsappButton: React.FC<{ button: Btn }> = ({ button }) => {
  if (!button?.text) return null;
  const cls = getButtonStyles(button.buttonType);
  const { text, subtitle } = getButtonContent(button);

  return (
    <button
      className={`w-full border ${cls} py-1 rounded flex flex-col items-center`}
      onClick={(e) => e.preventDefault()}
      type="button"
    >
      <div className="flex items-center gap-2 justify-between w-full px-4 break-all">
        <span className="text-sm">{text}</span>
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500 mt-1 px-4 break-all">
          {subtitle}
        </div>
      )}
    </button>
  );
};
