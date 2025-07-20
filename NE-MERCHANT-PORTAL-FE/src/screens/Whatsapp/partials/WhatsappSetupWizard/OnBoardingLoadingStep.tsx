import React from "react";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";

export const OnBoardingLoadingStep: React.FC = () => (
  <DesktopStepCard
    title="Setting Up"
    description="We’re verifying your account with Meta. This may take a few seconds..."
  >
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#001081]"></div>
      <p className="text-[#001081] text-lg font-medium">
        Please wait while we complete your setup.
      </p>
    </div>
  </DesktopStepCard>
);
