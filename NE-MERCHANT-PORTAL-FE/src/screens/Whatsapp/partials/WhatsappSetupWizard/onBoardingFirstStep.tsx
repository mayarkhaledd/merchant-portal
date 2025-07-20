import React from "react";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import { Shield, CheckCircle, Building } from "lucide-react";
import { Card, CardContent } from "@ejada/common/components/ui/card";
import { Alert, AlertDescription } from "@ejada/common/components/ui/alert";

export const OnBoardingFirstStep: React.FC<{
  onHasAccount: () => void;
  onNeedsAccount: () => void;
}> = ({ onHasAccount, onNeedsAccount }) => {
  return (
    <DesktopStepCard
      title="Account Verification"
      description="Choose how you want to set up your WhatsApp Business Account"
    >
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
                I have an account
              </h3>
              <p className="text-[#59595C] text-sm">
                Connect your existing WhatsApp Business Account.
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
                Create new account
              </h3>
              <p className="text-[#59595C] text-sm">
                Set up a new WhatsApp Business Account from scratch.
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="border-[#001081] bg-[#f8fafc]">
          <Shield className="h-5 w-5 text-[#001081]" />
          <AlertDescription className="text-[#001081]">
            <strong>Requirements:</strong> Valid business phone number,
            documents, Facebook Business Manager.
          </AlertDescription>
        </Alert>
      </div>
    </DesktopStepCard>
  );
};
