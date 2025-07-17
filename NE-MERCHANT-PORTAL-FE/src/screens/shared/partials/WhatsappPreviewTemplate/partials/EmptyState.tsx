import React from "react";
import { t } from "i18next";

export const EmptyState: React.FC = () => (
  <div className="flex items-center justify-center w-full h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <div className="text-center">
      <div className="text-gray-500 text-lg mb-2">
        {t("eventsManagement.select_template_to_preview")}
      </div>
      <div className="text-gray-400 text-sm">
        {t("eventsManagement.template_preview_will_appear_here")}
      </div>
    </div>
  </div>
);
