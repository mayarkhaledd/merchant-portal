import React from "react";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import { Button } from "@ejada/common/components/ui/button";
import { ExternalLink } from "lucide-react";

export const OnBoardingThirdStep: React.FC<{
  startSignup: () => void;
  onBack: () => void;
}> = ({ startSignup, onBack }) => (
  <DesktopStepCard
    title="Connect with Meta"
    description="Link your WhatsApp Business Account using Meta's embedded signup."
  >
    <div className="space-y-6 max-w-xl mx-auto text-center">
      <p className="text-[#59595C]">
        This will open Meta's signup window to securely link your business
        account.
      </p>
      <Button
        onClick={startSignup}
        className="w-full h-12 bg-[#001081] hover:bg-[#000d5e] font-medium"
        style={{ color: "white" }}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Connect via Meta
      </Button>
      <Button
        variant="outline"
        onClick={onBack}
        className="border-2 border-[#001081] text-[#FFFFF] hover:bg-[#001081] hover:text-white font-medium px-8"
      >
        Back
      </Button>
    </div>
  </DesktopStepCard>
);
