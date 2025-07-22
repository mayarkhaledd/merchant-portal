import React from "react";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import { t } from "i18next";

export const OnBoardingLoadingStep: React.FC = () => (
  <DesktopStepCard
    title={t("onboarding.loading_title")}
    description={t("onboarding.loading_desc")}
  >
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#001081]"></div>
      <p className="text-[#001081] text-lg font-medium">
        {t("onboarding.loading_wait")}
      </p>
    </div>
  </DesktopStepCard>
);
