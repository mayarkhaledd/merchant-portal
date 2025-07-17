import { t } from "i18next";
import { IconInfoCircle } from "@tabler/icons-react";

interface WhatsappParametersHintProps {
  className?: string;
}

export const WhatsappParametersHint: React.FC<WhatsappParametersHintProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md ${className}`}
    >
      <IconInfoCircle size={16} className="text-gray-500 flex-shrink-0" />
      <span className="text-sm text-gray-600">
        {t("eventsManagement.whatsapp_parameters_hint")}
      </span>
    </div>
  );
};
