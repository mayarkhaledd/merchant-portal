import React from "react";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import { Button } from "@ejada/common/components/ui/button";
import { Card, CardContent } from "@ejada/common/components/ui/card";
import { ExternalLink } from "lucide-react";
import { t } from "i18next";

export const OnBoardingThirdStep: React.FC<{
  startSignup: () => void;
  onBack?: () => void;
  alreadyOnboarded?: boolean;
}> = ({ startSignup, alreadyOnboarded }) => (
  <>
    {alreadyOnboarded && (
      <div>
        <Card className="cursor-pointer border-2 group mb-4 bg-[#E7E6F0]">
          <CardContent className="p-8 text-center space-y-6">
            <h3 className="text-xl font-semibold text-[#001081] mb-2">
              {t("onboarding.onboarded_title")}
            </h3>
            <p className="text-[#59595C] text-sm">
              {t("onboarding.onboarded_desc")}
            </p>
          </CardContent>
        </Card>
      </div>
    )}
    <DesktopStepCard
      title={!alreadyOnboarded ? t("onboarding.connect_with_meta_title") : ""}
      description={
        !alreadyOnboarded ? t("onboarding.connect_with_meta_desc") : ""
      }
    >
      <div className="space-y-6 mx-auto text-center">
        <p className="text-[#59595C]">
          {t("onboarding.connect_with_meta_info")}
        </p>
        <p className="text-[#89898f] text-sm" style={{ marginTop: "10px" }}>
          {t("onboarding.language-hint")}
        </p>
        <div className="flex justify-center">
          <Button
            onClick={startSignup}
            className="max-w-xl h-10 bg-[#001081] hover:bg-[#000d5e] font-medium"
            style={{ color: "white" }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {t("onboarding.connect_via_meta")}
          </Button>
        </div>
      </div>
    </DesktopStepCard>
  </>
);
