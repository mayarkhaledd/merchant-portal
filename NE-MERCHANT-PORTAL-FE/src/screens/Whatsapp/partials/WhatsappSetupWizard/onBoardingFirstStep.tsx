import React from "react";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import { Shield, CheckCircle, Building } from "lucide-react";
import { Card, CardContent } from "@ejada/common/components/ui/card";
import { Alert, AlertDescription } from "@ejada/common/components/ui/alert";
import { t } from "i18next";

export const OnBoardingFirstStep: React.FC<{
  onHasAccount: () => void;
  onNeedsAccount: () => void;
  alreadyOnboarded?: boolean;
}> = ({ onHasAccount, onNeedsAccount }) => {
  return (
    <DesktopStepCard
      title={t("onboarding.account_verification_title")}
      description={t("onboarding.account_verification_desc")}
    >
      {/* {alreadyOnboarded && (
        <div>
          <Card className="cursor-pointer border-2 group mb-4">
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
      )} */}
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:border-[#001081] hover:shadow-md transition-all border-2 group"
            onClick={onHasAccount}
          >
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto group-hover:bg-[#f0f9ff]">
                <CheckCircle className="w-8 h-8 text-[#22c55e]" />
              </div>
              <h3 className="text-xl font-semibold text-[#001081] mb-2">
                {t("onboarding.i_have_account_title")}
              </h3>
              <p className="text-[#59595C] text-sm">
                {t("onboarding.i_have_account_desc")}
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-[#001081] hover:shadow-md transition-all border-2 group"
            onClick={onNeedsAccount}
          >
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-[#f2f4ff] rounded-full flex items-center justify-center mx-auto group-hover:bg-[#f0f9ff]">
                <Building className="w-8 h-8 text-[#001081]" />
              </div>
              <h3 className="text-xl font-semibold text-[#001081] mb-2">
                {t("onboarding.create_new_account_title")}
              </h3>
              <p className="text-[#59595C] text-sm">
                {t("onboarding.create_new_account_desc")}
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="border-[#001081] bg-[#f8fafc]">
          <Shield className="h-5 w-5 text-[#001081]" />
          <AlertDescription className="text-[#001081]">
            <strong>{t("onboarding.requirements")}</strong>{" "}
            {t("onboarding.requirements_details")}
          </AlertDescription>
        </Alert>
      </div>
    </DesktopStepCard>
  );
};
