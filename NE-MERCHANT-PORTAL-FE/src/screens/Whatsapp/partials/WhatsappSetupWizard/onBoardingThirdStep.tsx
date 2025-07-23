import React from "react";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import { Button } from "@ejada/common/components/ui/button";
import { ExternalLink } from "lucide-react";
import { t } from "i18next";

export const OnBoardingThirdStep: React.FC<{
  startSignup: () => void;
  onBack: () => void;
}> = ({ startSignup, onBack }) => (
  <DesktopStepCard
    title={t("onboarding.connect_with_meta_title")}
    description={t("onboarding.connect_with_meta_desc")}
  >
    <div className="space-y-6 mx-auto text-center">
      <p className="text-[#59595C]">
        {t("onboarding.connect_with_meta_info")}
      </p>
      <p
        className="text-[#89898f] text-sm"
        style={{ marginTop: "10px" }}
      >
        {t("onboarding.language-hint")}
      </p>
      <div className="flex justify-center">
        <Button
          onClick={startSignup}
          className="max-w-xl mr-4 h-10 bg-[#001081] hover:bg-[#000d5e] font-medium"
          style={{ color: "white" }}
        >
          <ExternalLink className="w-4 h-4" />
          {t("onboarding.connect_via_meta")}
        </Button>
      </div>
      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-2 border-[#001081] text-[#001081] hover:bg-[#001081] hover:text-white font-medium px-8"
        >
          {t("onboarding.back")}
        </Button>
      </div>
    </div>
  </DesktopStepCard>
);
